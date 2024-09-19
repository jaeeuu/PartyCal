use serde::{Deserialize, Serialize};
pub mod favicon;
pub mod create;

#[derive(Deserialize, Serialize)]
pub struct CreateReq {
  ss: String,
  title: String,
  pw: String,
  kakao: bool,
  start: u32,
  count: u8,
}