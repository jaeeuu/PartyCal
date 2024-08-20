use axum::{
  routing::get,
  Router,
};
use tokio::signal;
use sea_orm::{Database, DatabaseConnection};

#[tokio::main]
async fn main() {
  let conn: DatabaseConnection = Database::connect("postgres://jreset@localhost:5433/database").await.unwrap();
  // build our application with a single route
  let app = Router::new().route("/", get(|| async { "Hello, World!" }));

  let listener = tokio::net::TcpListener::bind("0.0.0.0:3600").await.unwrap();
  axum::serve(listener, app)
    .with_graceful_shutdown(shutdown_signal())
    .await
    .unwrap();
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