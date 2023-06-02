use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Options {
  pub imported_lib: Option<Vec<String>>,
}

impl Default for Options {
  fn default() -> Self {
    Self {
      imported_lib: None,
    }
  }
}