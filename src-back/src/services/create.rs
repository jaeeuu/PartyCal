use crate::db::Db;
use crate::services::CreateReq;
use ntex::{http, web};
use sqlx::{Error, Pool, MySql};

#[web::post("/create")]
pub async fn create_ser(db: web::types::State<Db>, req: web::types::Json<CreateReq>,) -> impl web::Responder {
  web::HttpResponse::Ok().body("Hello world!")
}

// async fn insert(db: &Pool<MySql>, req: CreateReq) -> Result<CreateReq, Error> {
//   sqlx::query_as!(
//       CreateReq,
//       "INSERT INTO main (title, kakao, password, start_date, result) VALUES ($1, $2, $3, $4, $5, $6)",
//   )
//   .fetch_one(db)
//   .await
// }