use serde::{Deserialize, Serialize};
pub mod favicon;
pub mod create;

#[derive(Deserialize, Serialize)]
pub struct MainData {
  title: Vec<u8>,
  kakao: bool,
  result: Vec<u8>,
  start: u32,
  count: u8,
}