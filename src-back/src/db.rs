use sqlx::mysql::MySqlPoolOptions;
use sqlx::{Pool, MySql};
use std::sync::Arc;

#[allow(dead_code)]
#[derive(Clone)]
pub struct Db(pub(crate) Arc<Pool<MySql>>);

impl Db {
    pub async fn new() -> Db {
        let pool = MySqlPoolOptions::new()
            .max_connections(100)
            .connect(
                "mysql://root:sdb@localhost:3306/public",
            )
            .await
            .unwrap_or_else(|_| {
                panic!("Cannot connect to the database.")
            });

        Db(Arc::new(pool))
    }
}