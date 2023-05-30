#![allow(clippy::not_unsafe_ptr_arg_deref)]

use narrative_swc_compiler_visitor::visitor;
use swc_core::{
  ecma::{ ast::Program, visit::FoldWith },
  plugin::{ plugin_transform, proxies::TransformPluginProgramMetadata },
};

#[plugin_transform]
pub fn process_transform(program: Program, _metadata: TransformPluginProgramMetadata) -> Program {
  program.fold_with(&mut visitor::transform_narrative())
}