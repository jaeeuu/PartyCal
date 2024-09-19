use ntex::{http, web::{self, BodyEncoding}};
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
  const FAVICON_BINARY: &[u8] = include_bytes!("../static/favicon.ico");
  const FAVICON_BINARY_BR: &[u8] = include_bytes!("../static/favicon.ico.br");
  const FAVICON_BINARY_GZ: &[u8] = include_bytes!("../static/favicon.ico.gz");

  let cookie = req.headers().get("Cookie");
  let accept_encoding = req.headers().get("Accept-Encoding");
  let mut resp = web::HttpResponseBuilder::new(http::StatusCode::OK);
  resp.content_type("image/x-icon");

  if cookie.and_then(|coo| coo.to_str().ok()).map_or(true, |s| !s.contains("ss")) {
    let uid = lid::easy::generate_distributed(); //this is 20bytes, change db size to 20bytes
    resp.set_header(http::header::SET_COOKIE, format!("ss={}; Max-Age=7884000; Path=/; Secure; HttpOnly", uid));
  }

  if let Some(accept) = accept_encoding {
    let acc = accept.to_str().ok();
    if acc.filter(|s| s.contains("br")).is_some() {
      resp.set_header(http::header::CONTENT_ENCODING, "br");
      resp.body(FAVICON_BINARY_BR.as_ref())
    } else if acc.filter(|s| s.contains("gzip")).is_some() {
      resp.set_header(http::header::CONTENT_ENCODING, "gzip");
      resp.body(FAVICON_BINARY_GZ.as_ref())
    } else {
      resp.set_header(http::header::CONTENT_ENCODING, "identity");
      resp.body(FAVICON_BINARY.as_ref())
    }
  } else {
    resp.set_header(http::header::CONTENT_ENCODING, "identity");
    resp.body(FAVICON_BINARY.as_ref())
  }

}
