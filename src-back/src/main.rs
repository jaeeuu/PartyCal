mod db;
mod services;

use crate::db::Db;
use crate::services::favicon::favicon_ser;
use crate::services::create::create_ser;
use crate::services::getdb::getdb_ser;
use ntex::web;
use tracing::{info, error};
use ntex_cors::Cors;

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
        .service(
          web::scope("/apix")
            .wrap(web::middleware::Compress::default())
            .wrap(
              Cors::new()
                .allowed_origin("https://partycal.site")
                .allowed_methods(vec!["GET", "POST"])
                .max_age(3600)
                .finish()
              )
            .service(favicon_ser)
            .service(create_ser)
            .service(getdb_ser)
        )
      // .wrap(web::middleware::DefaultHeaders::new())
      // .route(web::get().to(|| async {web::HttpResponse::Ok().body("Hello world!")})) == .service(some) #[web::get("/assets/{name}.{ext}")]
  }).keep_alive(ntex::http::KeepAlive::Os)
  .bind(("127.0.0.1", 3610))?
  .run()
  .await

}


