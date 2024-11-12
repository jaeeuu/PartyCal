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
  id: String,
}


#[web::post("/create")]
pub async fn create_ser(db: web::types::State<Db>, req: web::types::Json<CreateRequest>) -> impl web::Responder {
  match create_core(&db.0, req.0).await {
    Ok(resp) => web::HttpResponse::Ok().json(&resp),
    Err(e) => {
      error!("Failed on create_ser: {:?}", e);
      web::HttpResponse::InternalServerError().into()
    }
  }
}

async fn create_core(db: &Pool<MySql>, req: CreateRequest) -> AnyResult<CreateResponse> {
  let data = verify_data(req).await?;
  let index = sync_db(db, data).await?;
  let sqids = Sqids::default();
  let nid = sqids.encode(&[1, 1, index])?;
  Ok(CreateResponse{
    id: nid,
  })
}

async fn sync_db(db: &Pool<MySql>, data: MainData) -> AnyResult<u64> {
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

async fn verify_data(req: CreateRequest) -> AnyResult<MainData> {
  let title_base64 = BASE64_STANDARD_NO_PAD.encode(req.t.as_bytes()).into_bytes();
  let count_add = req.c + 1;
  if title_base64.len() > 100 || !(1..=100).contains(&count_add) || !is_valid_date(req.s) {
    Err(anyhow::Error::msg("Invalid input"))
  } else {
    Ok(MainData {
      title: title_base64,
      kakao: req.k,
      result: vec![0; count_add as usize],
      start: req.s,
      count: count_add as u8,
    })
  }
}

fn is_valid_date(date_num: u32) -> bool {
  let year = (date_num / 10000) as i32;
  let month = (date_num / 100) % 100;
  let day = date_num % 100;
  chrono::NaiveDate::from_ymd_opt(year, month, day).is_some()
}