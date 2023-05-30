use std::path::PathBuf;

use swc_core::{
  common::{ chain, Mark },
  ecma::{ parser::{ EsConfig, Syntax }, transforms::{ base::resolver, testing::{ test_fixture, FixtureTestConfig } } },
};

use narrative_swc_compiler_visitor::visitor::transform_narrative;

fn syntax() -> Syntax {
  Syntax::Es(EsConfig {
    jsx: true,
    ..Default::default()
  })
}

#[testing::fixture("tests/fixture/**/input.js")]
fn narrative_swc_compiler_fixture(input: PathBuf) {
  let output = input.parent().unwrap().join("output.js");

  test_fixture(
    syntax(),
    &(|_| { chain!(resolver(Mark::new(), Mark::new(), false), transform_narrative()) }),
    &input,
    &output,
    FixtureTestConfig {
      allow_error: true,
      ..Default::default()
    }
  );
}