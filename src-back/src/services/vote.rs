use crate::db::Db;
use crate::services::MainData;

use ntex::{http, web};
use sqlx::{Pool, MySql};
use anyhow::{Result as AnyResult, Context};
use tracing::error;
use sqids::Sqids;
use base64::prelude::*;
use serde::Serialize;


#[derive(Serialize)]
struct VoteResponse {
  id: String,
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
  if path_id.is_empty() {
    Err(anyhow::Error::msg("No id"))
  } else {
    let sqids = Sqids::default();
    let ids = sqids.decode(&path_id);
    let id = ids.get(2).context("Failed to decode id")?;
    let cal_db = get_cal(db, id.clone()).await?;
    let title_str = BASE64_STANDARD_NO_PAD.decode(cal_db.title)?;
    let cookie = req.headers().get("Cookie");
    if cookie.and_then(|coo| coo.to_str().ok()).map_or(true, |s| !s.contains("ss")) {

    } else {

    }
  }
}


async fn get_cal(db: &Pool<MySql>, id: u64) -> AnyResult<MainData> {
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
    kakao: sql.kakao,
    result: sql.result,
    start: sql.start,
    count: sql.count,
  })
}

async fn get_user(db: &Pool<MySql>, id: u32, user: String) -> AnyResult<UserData> {

}