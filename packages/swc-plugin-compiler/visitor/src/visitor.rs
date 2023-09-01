use swc_core::ecma::ast::{ ImportDecl, ImportSpecifier, ImportNamedSpecifier, Ident, JSXElementChild };
use swc_core::ecma::{ ast::Expr, visit::{ Fold, FoldWith, VisitMut } };
use swc_core::common::{ comments::Comments, Mark };
use tracing::debug;

use crate::tags::{ if_tag::transform_if, switch_tag::transform_switch, for_tag::transform_for };
use crate::utils::{
  ast::{ get_tag_name, wrap_by_child_jsx_expr_container },
  common::{ NT_CONTROL_FLOW, IF, SWITCH, FOR },
};
use crate::options::Options;

const NT_TAGS: [&str; 3] = [IF, SWITCH, FOR];

pub fn transform_narrative<C: Comments>(options: Options, unresolved_mark: Mark, comments: Option<C>) -> impl Fold {
  NtCompiler::new(options, unresolved_mark, comments)
}

pub struct NtCompiler<C: Comments> {
  options: Options,
  unresolved_mark: Mark,
  comments: Option<C>,
  imported_tags: Vec<String>,
}

impl<C: Comments> NtCompiler<C> {
  pub fn new(options: Options, unresolved_mark: Mark, comments: Option<C>) -> Self {
    Self {
      options,
      unresolved_mark,
      comments,
      imported_tags: vec![],
    }
  }
}

impl<C: Comments> VisitMut for NtCompiler<C> {}

impl<C: Comments> Fold for NtCompiler<C> {
  fn fold_import_decl(&mut self, import_decl: ImportDecl) -> ImportDecl {
    let import_decl = import_decl.fold_children_with(self);

    match &import_decl {
      ImportDecl { specifiers, src, .. } => {
        if src.value.to_string() == NT_CONTROL_FLOW {
          for specifier in specifiers {
            match specifier {
              ImportSpecifier::Named(ImportNamedSpecifier { local, .. }) => {
                match local {
                  Ident { sym, .. } => {
                    self.imported_tags.push(sym.to_string());
                  }
                }
              }
              _ => {}
            }
          }

          return ImportDecl {
            specifiers: vec![],
            src: src.clone(),
            span: import_decl.span,
            type_only: false,
            with: None,
          };
        }
      }
    }

    import_decl
  }

  fn fold_expr(&mut self, expr: Expr) -> Expr {
    let expr = expr.fold_children_with(self);

    match expr {
      Expr::JSXElement(jsx_element) => {
        let tag_name = get_tag_name(&jsx_element.opening.name);

        if NT_TAGS.contains(&tag_name) && !self.imported_tags.contains(&tag_name.to_string()) {
          return Expr::JSXElement(jsx_element);
        }

        debug!("fold_expr::Expr::JSXElement::tag_name = {}", tag_name);

        match tag_name {
          IF => transform_if(&jsx_element),
          SWITCH => transform_switch(&jsx_element),
          FOR => transform_for(&jsx_element),
          _ => Expr::JSXElement(jsx_element),
        }
      }
      _ => expr,
    }
  }

  fn fold_jsx_element_child(&mut self, element: JSXElementChild) -> JSXElementChild {
    let element = element.fold_children_with(self);

    match element {
      JSXElementChild::JSXElement(value) => {
        let jsx_element = *value;
        let tag_name = get_tag_name(&jsx_element.opening.name);

        if NT_TAGS.contains(&tag_name) && !self.imported_tags.contains(&tag_name.to_string()) {
          return JSXElementChild::JSXElement(Box::new(jsx_element));
        }

        debug!("fold_jsx_element_child::JSXElementChild::JSXElement::tag_name = {}", tag_name);

        match tag_name {
          IF => wrap_by_child_jsx_expr_container(transform_if(&jsx_element)),
          SWITCH => wrap_by_child_jsx_expr_container(transform_switch(&jsx_element)),
          FOR => wrap_by_child_jsx_expr_container(transform_for(&jsx_element)),
          _ => JSXElementChild::JSXElement(Box::new(jsx_element)),
        }
      }
      _ => element,
    }
  }
}