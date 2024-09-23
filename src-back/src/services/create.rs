use crate::db::Db;
use crate::services::MainData;
use ntex::web;
use sqlx::{Pool, MySql};
use serde::{Deserialize, Serialize};
use anyhow::Result as AnyResult;
use tracing::error;
use sqids::Sqids;
use base64::prelude::*;

#[derive(Deserialize)]
struct CreateRequest {
  t: String,
  k: bool,
  s: u32,
  c: u32,
}

#[derive(Serialize)]
struct CreateResponse {
  status: u16,
  id: String,
}

#[web::post("/create")]
pub async fn create_ser(db: web::types::State<Db>, req: web::types::Json<CreateRequest>) -> impl web::Responder {
  let val_data = match validate(req.0).await {
    Ok(data) => data,
    Err(e) => {
      error!("Failed to validate: {:?}", e);
      let resp = CreateResponse{
        status: 100,
        id: e.to_string(),
      };
      return web::HttpResponse::Ok().json(&resp);
    }
  };
  match insert(&db.0, val_data).await {
    Ok(index) => {
      let sqids = Sqids::default();
      let uid = sqids.encode(&[0, 0, index]).unwrap();
      let resp = CreateResponse{
        status: 200,
        id: uid,
      };
      web::HttpResponse::Ok().json(&resp)
    }
    Err(e) => {
      error!("Failed to create: {:?}", e);
      web::HttpResponse::InternalServerError().into()
    }
  }
}

async fn insert(db: &Pool<MySql>, data: MainData) -> AnyResult<u64> {
  let sql = sqlx::query!(
    r#"
    INSERT INTO main (title, kakao, result, start, count) VALUES (?, ?, ?, ?, ?);
    "#,
    data.title,
    data.kakao,
    data.result,
    data.start,
    data.count,
  )
  .execute(db)
  .await?;
  Ok(sql.last_insert_id())
}

async fn validate(req: CreateRequest) -> AnyResult<MainData> {
  let title_base64 = BASE64_STANDARD_NO_PAD.decode(req.t.as_bytes()).unwrap();
  if title_base64.len() > 100 {
    return Err(anyhow::anyhow!("1"));
  } 
  else if req.c < 1 || req.c > 100 {
    return Err(anyhow::anyhow!("2"));
  }
  else if !is_valid_date(req.s) {
    return Err(anyhow::anyhow!("3"));
  }
  else {
    return Ok(MainData {
      title: title_base64,
      kakao: req.k,
      result: vec![0; req.c as usize],
      start: req.s,
      count: req.c as u8,
    });
  }
}

fn is_valid_date(date_num: u32) -> bool {
  let year = (date_num / 10000) as i32;
  let month = ((date_num / 100) % 100) as u32;
  let day = (date_num % 100) as u32;

  chrono::NaiveDate::from_ymd_opt(year, month, day).is_some()
}