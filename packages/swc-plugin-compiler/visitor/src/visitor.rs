use swc_core::ecma::ast::JSXElementChild;
use swc_core::ecma::{ ast::Expr, visit::{ Fold, FoldWith, VisitMut } };
use tracing::debug;

use crate::tags::if_tag::transform_if;
use crate::tags::switch_tag::transform_switch;
use crate::utils::{ get_jsx_element_name, wrap_by_child_jsx_expr_container };

pub fn transform_narrative() -> impl Fold {
  NtCompiler
}

pub struct NtCompiler;

impl VisitMut for NtCompiler {}

impl Fold for NtCompiler {
  fn fold_expr(&mut self, expr: Expr) -> Expr {
    let expr = expr.fold_children_with(self);

    match expr {
      Expr::JSXElement(jsx_element) => {
        let tag_name = get_jsx_element_name(&jsx_element.opening.name);

        debug!("fold_expr::Expr::JSXElement::tag_name = {}", tag_name);

        match tag_name {
          "If" => transform_if(&jsx_element),
          "Switch" => transform_switch(&jsx_element),
          _ => { Expr::JSXElement(jsx_element) }
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

        let tag_name = get_jsx_element_name(&jsx_element.opening.name);

        debug!("fold_jsx_element_child::JSXElementChild::JSXElement::tag_name = {}", tag_name);

        match tag_name {
          "If" => wrap_by_child_jsx_expr_container(transform_if(&jsx_element)),
          "Switch" => { wrap_by_child_jsx_expr_container(transform_switch(&jsx_element)) }
          _ => { JSXElementChild::JSXElement(Box::new(jsx_element)) }
        }
      }
      _ => element,
    }
  }
}