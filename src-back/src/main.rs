use axum::{
  routing::get,
  Router,
};
use tokio::signal;
// use fred::prelude::*;
use tracing::{info, error};
use tracing_subscriber;
// use anyhow::{Result as AnyResult, Context};

#[tokio::main]
async fn main() {
  tracing_subscriber::fmt::init();
  std::panic::set_hook(Box::new(|panic_info| {
    error!("Panic occurred: {:?}", panic_info);
  }));
  // let connection_url: String = String::from("postgresql://127.0.0.1:5433/yugabyte?user=yugabyte&password=yugabyte&load_balance=true");
  // let (client, connection) =
  //   yb_tokio_postgres::connect(&connection_url, NoTls).await.expect("Failed to connect to YugabyteDB");
  // let client = RedisClient::default();
  //client.init().await.expect("Failed to connect to Redis");
  
  let app = Router::new().route("/", get(|| async { "Hello, World!" }));

  let listener = tokio::net::TcpListener::bind("0.0.0.0:3600").await.unwrap();
  info!("Server listening on 3600");

  axum::serve(listener, app)
    .with_graceful_shutdown(shutdown_signal())
    .await
    .expect("axum start failed");

  //client.quit().await.expect("Failed to quit Redis");
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