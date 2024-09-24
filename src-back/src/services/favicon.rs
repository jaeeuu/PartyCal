use ntex::{http, web};
use anyhow::{Result as AnyResult, Context};

const FAVICON_BINARY: &[u8] = include_bytes!("../assets/favicon.ico");
const FAVICON_BINARY_BR: &[u8] = include_bytes!("../assets/favicon.ico.br");
const FAVICON_BINARY_GZ: &[u8] = include_bytes!("../assets/favicon.ico.gz");

#[web::get("/favicon.ico")]
pub async fn favicon_ser(req: web::HttpRequest) -> impl web::Responder {
  let cookie = req.headers().get("Cookie");
  let accept_encoding = req.headers().get("Accept-Encoding");
  let mut resp = web::HttpResponseBuilder::new(http::StatusCode::OK);
  resp.content_type("image/x-icon");

  if cookie.and_then(|coo| coo.to_str().ok()).map_or(true, |s| !s.contains("ss")) {
    let uid = lid::easy::generate_distributed();
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