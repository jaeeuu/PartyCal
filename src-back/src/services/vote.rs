use crate::db::Db;
use crate::services::MainData;
use crate::services::UserData;

use ntex::web;
use sqlx::{Pool, MySql};
use anyhow::{Result as AnyResult, Context};
use tracing::error;
use sqids::Sqids;
use base64::prelude::*;
use serde::Serialize;


#[derive(Serialize)]
struct VoteResponse {
  t: String,
  s: u64,
  c: u8,
  k: bool,

  n: String,
  v: String,
}

#[web::get("/vote/{vote_id}")]
pub async fn vote_ser(path: web::types::Path<String>, req: web::HttpRequest, db: web::types::State<Db>) -> impl web::Responder {
  let vote_id = path.into_inner();
  match vote_core(vote_id, req, &db.0).await {
    Ok(resp) => web::HttpResponse::Ok().json(&resp),
    Err(e) => {
      error!("Failed on create_ser: {:?}", e);
      web::HttpResponse::InternalServerError().into()
    }
  }
}


async fn vote_core(path_id: String, req: web::HttpRequest, db: &Pool<MySql>) -> AnyResult<VoteResponse> {
  if verify_path(&path_id).await {
    Err(anyhow::Error::msg("Invalid id"))
  } else {
    let sqids = Sqids::default();
    let ids = sqids.decode(&path_id);
    let id = ids.get(2).context("Failed to decode id")?;

    let cal = get_cal(db, id).await?;
    let title_bytes = BASE64_STANDARD_NO_PAD.decode(cal.title)?;
    let title_str = String::from_utf8(title_bytes)?;
    let cookie = req.headers().get("Cookie");

    if let Some(session) = cookie
      .and_then(|coo| coo.to_str().ok())
      .and_then(|s| {
        s.split(';')
          .map(|cookie_str| cookie_str.trim())
          .find(|cookie_str| cookie_str.starts_with("ss="))
          .and_then(|ss_cookie| ss_cookie.strip_prefix("ss="))
      })
    {
      if verify_session(session).await {
        if let Some(user) = get_user(db, id, session).await {
          Ok(VoteResponse{
            t: title_str,
            s: cal.start as u64,
            c: cal.count,
            k: cal.kakao,
            n: user.name,
            v: user.total,
          })
        } else {
          // not voted
          Ok(VoteResponse{
            t: title_str,
            s: cal.start as u64,
            c: cal.count,
            k: cal.kakao,
            n: "".to_string(),
            v: "".to_string(),
          })
        }
      } else {
        Err(anyhow::Error::msg("Invalid session"))
      }
    } else {
      // no cookie
      Ok(VoteResponse{
        t: title_str,
        s: cal.start as u64,
        c: cal.count,
        k: cal.kakao,
        n: "".to_string(),
        v: "".to_string(),
      })
    }
  }
}

async fn verify_path (path: &str) -> bool {
  !(path.is_empty() || !path.chars().all(|c| c.is_ascii_alphanumeric()) || path.len() > 10)
}

async fn verify_session (path: &str) -> bool {
  path.chars().all(|c| c.is_ascii_alphanumeric()) && path.len() <= 20
}


async fn get_cal(db: &Pool<MySql>, id: &u64) -> AnyResult<MainData> {
  let sql = sqlx::query!(
    r#"
    SELECT title,kakao,start,count,result FROM main WHERE main_id = ? LIMIT 1;
    "#,
    id,
  )
  .fetch_one(db)
  .await?;

  Ok(MainData{
    title: sql.title,
    kakao: sql.kakao != 0,
    result: sql.result,
    start: sql.start as u32,
    count: sql.count as u8,
  })
}

async fn get_user(db: &Pool<MySql>, main_id: &u64, session: &str) -> Option<UserData> {
  let sql = sqlx::query!(
    r#"
    SELECT name, total FROM submit WHERE main_id = ? and session = ? LIMIT 1;
    "#,
    main_id, session,
  )
  .fetch_optional(db)
  .await.ok()?;

  if let Some(row) = sql {
    let name_str = if let Some(name_before) = row.name {
      let name_bytes = BASE64_STANDARD_NO_PAD.decode(name_before).ok()?;
      String::from_utf8(name_bytes).ok()?
    } else {
      "".to_string()
    };
    let total_str = vec_u8_to_string(row.total);
    Some(UserData{
      name: name_str,
      total: total_str,
    })
  } else {
    None
  }
}

fn vec_u8_to_string(nums: Vec<u8>) -> String {
  nums.iter()
    .filter(|&&x| x != 0)
    .map(|&x| (b'0' + x) as char)
    .collect()
}