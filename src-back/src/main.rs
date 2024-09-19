mod db;
mod services;

use crate::db::Db;
use crate::services::favicon::favicon_ser;
use crate::services::create::create_ser;
use ntex::web;
use tracing::{info, error};
use tracing_subscriber;
// use anyhow::{Result as AnyResult, Context};

#[ntex::main]
async fn main() -> std::io::Result<()> {
  tracing_subscriber::fmt::init();
  std::panic::set_hook(Box::new(|panic_info| {
    error!("Panic occurred: {:?}", panic_info);
  }));

  let db = Db::new().await;

  info!("Server listening on 3610");

  web::HttpServer::new(move || {
    web::App::new()
      .state(db.clone())
      .wrap(web::middleware::Compress::default())
      // .wrap(web::middleware::DefaultHeaders::new())
      // .route(web::get().to(|| async {web::HttpResponse::Ok().body("Hello world!")})) == .service(some) #[web::get("/assets/{name}.{ext}")] 이거랑 같음
      .service(favicon_ser)
      .service(create_ser)

  }).keep_alive(ntex::http::KeepAlive::Os)
  .bind(("127.0.0.1", 3610))?
  .run()
  .await

}


