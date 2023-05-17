use swc_core::common::DUMMY_SP;
use swc_core::ecma::ast::Expr;
use swc_core::ecma::ast::{ CondExpr, JSXElement, JSXElementChild, JSXText, Lit, Null };

use crate::utils::{
  clone_children,
  convert_children_to_expression,
  display_error,
  get_case_expression,
  get_jsx_element_name,
};

pub fn transform_switch(jsx_element: &JSXElement) -> Expr {
  let (cons, alt) = parse_switch(jsx_element);

  let mut condition_expression = alt;

  for (condition, cons) in cons {
    condition_expression = Expr::Cond(CondExpr {
      test: Box::new(condition),
      cons: Box::new(cons),
      alt: Box::new(condition_expression),
      span: DUMMY_SP,
    });
  }

  condition_expression
}

fn parse_switch(jsx_element: &JSXElement) -> (Vec<(Expr, Expr)>, Expr) {
  let mut cons: Vec<(Expr, Expr)> = Vec::new();
  let mut alt = Expr::Lit(Lit::Null(Null { span: DUMMY_SP }));

  let mut default_found = false;

  if jsx_element.children.is_empty() {
    display_error(jsx_element.opening.span, "<Switch /> tag should contain at least one <Case /> tag.");

    return (cons, alt);
  }

  for child in jsx_element.children.iter().rev() {
    match child {
      JSXElementChild::JSXText(JSXText { value, .. }) => {
        let mut value = value.to_string();

        value = value.replace('\n', "");

        if value.trim() != "" {
          display_error(jsx_element.opening.span, "<Switch /> tag should contain at least one <Case /> tag.");
        }
      }
      JSXElementChild::JSXElement(child_jsx_element) => {
        let element_name = get_jsx_element_name(&child_jsx_element.opening.name);

        if element_name == "Default" {
          if default_found {
            display_error(child_jsx_element.opening.span, "<Switch /> can contain only one <Default /> tag.");
          } else if cons.is_empty() {
            default_found = true;

            if child_jsx_element.children.is_empty() {
              display_error(child_jsx_element.opening.span, "<Default /> tag should contain children.");
            } else {
              alt = convert_children_to_expression(clone_children(&child_jsx_element.children));
            }
          } else {
            display_error(child_jsx_element.opening.span, "<Default /> tag should be last in the conditions.");
          }
        } else if element_name == "Case" {
          cons.push((
            get_case_expression(child_jsx_element, jsx_element),
            convert_children_to_expression(clone_children(&child_jsx_element.children)),
          ));
        } else {
          display_error(
            child_jsx_element.opening.span,
            format!("<Switch /> tag can contain only <Case /> and <Default /> tags, got: <{}>.", element_name).as_str()
          );
        }
      }
      _ => {
        display_error(jsx_element.opening.span, "<Switch /> tag can contain only <Case /> and <Default /> tags.");
      }
    }
  }

  if cons.is_empty() {
    display_error(jsx_element.opening.span, "<Switch /> tag should contain at least one <When /> tag.");
  }

  (cons, alt)
}