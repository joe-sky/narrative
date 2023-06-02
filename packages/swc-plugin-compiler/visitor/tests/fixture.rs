use std::path::PathBuf;
use swc_core::{
  common::{ chain, Mark },
  ecma::{ parser::{ EsConfig, Syntax }, transforms::{ base::resolver, testing::{ test_fixture, FixtureTestConfig } } },
};

use narrative_swc_compiler_visitor::{ visitor::transform_narrative, options::Options };

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
    &(|tester| {
      let unresolved_mark = Mark::new();
      chain!(
        resolver(unresolved_mark, Mark::new(), false),
        transform_narrative(
          Options {
            ..Default::default()
          },
          unresolved_mark,
          Some(tester.comments.clone())
        )
      )
    }),
    &input,
    &output,
    FixtureTestConfig {
      allow_error: true,
      ..Default::default()
    }
  );
}