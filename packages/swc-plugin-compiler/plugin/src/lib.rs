#![allow(clippy::not_unsafe_ptr_arg_deref)]

use narrative_swc_compiler_visitor::visitor;
use swc_core::{
  ecma::{ ast::Program, visit::FoldWith },
  plugin::{ plugin_transform, proxies::TransformPluginProgramMetadata },
};
use visitor::transform_narrative;

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
  let options = metadata
    .get_transform_plugin_config()
    .map(|json| { serde_json::from_str(&json).expect("failed to get plugin config for Narrative") })
    .unwrap_or_default();

  program.fold_with(&mut transform_narrative(options, metadata.unresolved_mark, metadata.comments))
}