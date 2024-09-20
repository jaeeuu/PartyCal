use crate::db::Db;
use crate::services::MainData;
use ntex::{http, web};
use sqlx::{Error, Pool, MySql};
use serde::{Deserialize, Serialize};
use anyhow::{Result as AnyResult, Context};
use tracing::{info, error};

#[derive(Deserialize)]
struct CreateRequest {
    title: String,
    status: String,
}

#[derive(Serialize)]
struct CreateResponse {
    todo: String,
}

#[web::post("/create")]
pub async fn create_ser(db: web::types::State<Db>, req: web::types::Json<CreateRequest>,) -> impl web::Responder {
  web::HttpResponse::Ok().body("Hello world!")
}

async fn insert(db: &Pool<MySql>, data: MainData) {
  let qu = sqlx::query!(
      r#"INSERT INTO main (title, kakao, password, result, start, count) VALUES (?, ?, ?, ?, ?, ?)"#,
      data.title,
      data.kakao,
      data.password,
      data.result,
      data.start,
      data.count,
  )
  .fetch_one(db)
  .await;
  if qu.is_err() {
      error!("Failed to insert data: {:?}", qu.err());
  } else {
      info!("Data inserted successfully");
  }
}