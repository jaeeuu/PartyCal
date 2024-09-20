use serde::{Deserialize, Serialize};
pub mod favicon;
pub mod create;

#[derive(Deserialize, Serialize)]
pub struct MainData {
  main_id: u32,
  title: String,
  kakao: bool,
  password: String,
  result: Vec<u8>,
  start: u32,
  count: u8,
}