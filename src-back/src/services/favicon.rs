use ntex::{http, web};

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

  let accept_encoding = accept_encoding
    .and_then(|hdr| hdr.to_str().ok())
    .unwrap_or("");

  let (encoding, binary) = if accept_encoding.contains("br") {
    ("br", FAVICON_BINARY_BR.as_ref())
  } else if accept_encoding.contains("gzip") {
    ("gzip", FAVICON_BINARY_GZ.as_ref())
  } else {
    ("identity", FAVICON_BINARY.as_ref())
  };

  resp.set_header(http::header::CONTENT_ENCODING, encoding);
  resp.body(binary)

}