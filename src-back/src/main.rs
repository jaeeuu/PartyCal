use ntex::{web, http};
use tracing::{info, error};
use tracing_subscriber;
use nuid;
// use anyhow::{Result as AnyResult, Context};

#[ntex::main]
async fn main() -> std::io::Result<()> {
  tracing_subscriber::fmt::init();
  std::panic::set_hook(Box::new(|panic_info| {
    error!("Panic occurred: {:?}", panic_info);
  }));

  info!("Server listening on 3610");

  web::HttpServer::new(|| {
    web::App::new()
      .wrap(web::middleware::Compress::default())
      .service(favicon)
  })
  .bind(("127.0.0.1", 3610))?
  .run()
  .await

}

#[web::get("/favicon.ico")]
async fn favicon(req: web::HttpRequest) -> impl web::Responder {
  let uid = nuid::next();
  let cookie = req.headers().get("Cookie");
  const FAVICON_BINARY: &[u8] = include_bytes!("../static/favicon.ico");

  if let Some(coo) = cookie {
    if coo.to_str().unwrap().contains("session") {
      return web::HttpResponse::Ok()
        // .set_header("content-encoding", "identity")
        .set_header(http::header::CONTENT_TYPE, "image/x-icon")
        // .set_header(http::header::CACHE_CONTROL, "public, max-age=604800")
        .body(FAVICON_BINARY.as_ref());
    }
  }

  web::HttpResponse::Ok()
    // .set_header("content-encoding", "identity")
    .set_header(http::header::SET_COOKIE, format!("session={}; Max-Age=7884000; Path=/; Secure; HttpOnly", uid))
    .set_header(http::header::CONTENT_TYPE, "image/x-icon")
    .set_header(http::header::CACHE_CONTROL, "public, max-age=604800")
    .body(FAVICON_BINARY.as_ref())
}

// async fn new_session() -> impl IntoResponse {
//   let uid = nuid::next();
//   let cookie_value = format!("session={}; Max-Age=7884000; Path=/; Secure", uid);
//   let mut headers = HeaderMap::new();
//   headers.insert(header::SET_COOKIE, cookie_value.parse().unwrap());
//   (StatusCode::OK, headers)
// }