use serde::{Deserialize, Serialize};
pub mod favicon;
pub mod create;
pub mod vote;

#[derive(Deserialize, Serialize)]
pub struct MainData {
  title: Vec<u8>,
  kakao: bool,
  result: Vec<u8>,
  start: u32,
  count: u8,
}

#[derive(Deserialize, Serialize)]
pub struct UserData {
  name: String,
  total: String,
}