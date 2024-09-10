use axum::{
  http::{header, HeaderMap, StatusCode}, response::IntoResponse, routing::{get, head}, Router
};
use tokio::signal;
use tracing::{info, error};
use tracing_subscriber;
use nuid;
// use anyhow::{Result as AnyResult, Context};

#[tokio::main]
async fn main() {
  tracing_subscriber::fmt::init();
  std::panic::set_hook(Box::new(|panic_info| {
    error!("Panic occurred: {:?}", panic_info);
  }));
  //database의 session 21에서 22로 변경 필요
  
  let app = Router::new()
    .route("/hello", get(|| async { "Hello, World!" }))
    .route("/session", head(new_session));

  let listener = tokio::net::TcpListener::bind("0.0.0.0:3610").await.unwrap();
  info!("Server listening on 3610");

  axum::serve(listener, app)
    .with_graceful_shutdown(shutdown_signal())
    .await
    .expect("axum start failed");

}

async fn new_session() -> impl IntoResponse {
  let uid = nuid::next();
  let cookie_value = format!("session={}; Max-Age=7884000; Path=/; Secure; HttpOnly", uid);
  let mut headers = HeaderMap::new();
  headers.insert(header::SET_COOKIE, cookie_value.parse().unwrap());
  (StatusCode::OK, headers)
}

async fn shutdown_signal() {
  let ctrl_c = async {
      signal::ctrl_c()
          .await
          .expect("failed to install CTRL+C signal handler");
  };

  #[cfg(unix)]
  let terminate = async {
      signal::unix::signal(signal::unix::SignalKind::terminate())
          .expect("failed to install signal handler")
          .recv()
          .await;
  };

  #[cfg(not(unix))]
  let terminate = std::future::pending::<()>();

  tokio::select! {
      _ = ctrl_c => {},
      _ = terminate => {},
  }
}