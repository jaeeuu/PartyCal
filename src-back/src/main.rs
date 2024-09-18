use ntex::{web, http};
use tracing::{info, error};
use tracing_subscriber;
// use anyhow::{Result as AnyResult, Context};

// struct AppState {
//   nuid: nuid::NUID,
// }

#[ntex::main]
async fn main() -> std::io::Result<()> {
  tracing_subscriber::fmt::init();
  std::panic::set_hook(Box::new(|panic_info| {
    error!("Panic occurred: {:?}", panic_info);
  }));

  info!("Server listening on 3610");

  // let appstate = AppState {
  //   nuid: nuid::NUID::new(),
  // };

  web::HttpServer::new(|| {
    web::App::new()
      .wrap(web::middleware::Compress::default())
      // .wrap(web::middleware::DefaultHeaders::new())
      // .route(web::get().to(|| async {web::HttpResponse::Ok().body("Hello world!")})) == .service(some) #[web::get("/assets/{name}.{ext}")] 이거랑 같음
      .service((
        favicon,
        // web::resource("/new")
        //   .route(web::get().to(|| async {web::HttpResponse::Ok().body("Hello world!")}))
      ))
      // .service(
      //   web::scope("/_build")
      //     .wrap(web::middleware::DefaultHeaders::new())
      //     .service(builds)
      // )
      // .default_service(
      //   web::resource("")
      //       .route(web::get().to(p404))
      //       .route(
      //           web::route()
      //               .guard(web::guard::Not(web::guard::Get()))
      //               .to(|| async {web::HttpResponse::MethodNotAllowed() }),
      //       ),
      // )
  }).keep_alive(ntex::http::KeepAlive::Os)
  .bind(("127.0.0.1", 3610))?
  .run()
  .await

}

// async fn p404() -> Result<ntex_files::NamedFile, web::Error> {
//   Ok(ntex_files::NamedFile::open("")?.set_status_code(http::StatusCode::NOT_FOUND))
// }

// #[web::get("/assets/{name}.{ext}")]
// async fn builds(req: web::HttpRequest) -> web::HttpResponse {
//   let name: String = req.match_info().query("name").parse().unwrap();
//   let ext: String = req.match_info().query("ext").parse().unwrap();
//   let file = ntex_files::NamedFile::open(path);
//   match file {
//     Ok(f) => {
//       f.into_response(&req)
//     },
//     Err(e) => {
//       web::HttpResponse::NotFound().finish()
//     }
//   }
// }

#[web::get("/favicon.ico")]
async fn favicon(req: web::HttpRequest) -> impl web::Responder {
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
  let uid = lid::easy::generate_distributed(); //this is 20bytes, change db size to 20bytes
  web::HttpResponse::Ok()
    // .set_header("content-encoding", "identity")
    .set_header(http::header::SET_COOKIE, format!("session={}; Max-Age=7884000; Path=/; Secure; HttpOnly", uid))
    .set_header(http::header::CONTENT_TYPE, "image/x-icon")
    // .set_header(http::header::CACHE_CONTROL, "public, max-age=604800")
    .body(FAVICON_BINARY.as_ref())
}

// async fn new_session() -> impl IntoResponse {
//   let uid = nuid::next();
//   let cookie_value = format!("session={}; Max-Age=7884000; Path=/; Secure", uid);
//   let mut headers = HeaderMap::new();
//   headers.insert(header::SET_COOKIE, cookie_value.parse().unwrap());
//   (StatusCode::OK, headers)
// }