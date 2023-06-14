use swc_core::common::DUMMY_SP;
use swc_core::ecma::ast::Expr;
use swc_core::ecma::ast::{ CondExpr, JSXElement, JSXElementChild, JSXText, Lit, Null };

use crate::utils::{
  ast::{ clone_children, convert_children_to_expression, get_is_expression, get_tag_name },
  common::{ display_error, CASE, DEFAULT },
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
  let mut alt: Option<Expr> = None;
  let mut default_found = false;

  for child in jsx_element.children.iter().rev() {
    match child {
      JSXElementChild::JSXText(JSXText { value, .. }) => {
        let mut value = value.to_string();

        value = value.replace('\n', "");

        if value.trim() != "" {
          display_error(jsx_element.opening.span, "<Switch> tag should contain only <Case> or <Default> tags.");
        }
      }
      JSXElementChild::JSXElement(child_jsx_element) => {
        let element_name = get_tag_name(&child_jsx_element.opening.name);

        if element_name == DEFAULT {
          if default_found {
            display_error(child_jsx_element.opening.span, "<Switch> tag should contain only one <Default> tag.");
          } else if cons.is_empty() {
            default_found = true;

            alt = Some(convert_children_to_expression(clone_children(&child_jsx_element.children)));
          } else {
            display_error(
              child_jsx_element.opening.span,
              "<Default> tag should be last in the children of <Switch> tag."
            );
          }
        } else if element_name == CASE {
          cons.push((
            get_is_expression(child_jsx_element, jsx_element),
            convert_children_to_expression(clone_children(&child_jsx_element.children)),
          ));
        } else {
          display_error(
            child_jsx_element.opening.span,
            format!("<Switch> tag should contain only <Case> and <Default> tags, got: <{}>.", element_name).as_str()
          );
        }
      }
      _ => {
        display_error(jsx_element.opening.span, "<Switch> tag should contain only <Case> and <Default> tags.");
      }
    }
  }

  if cons.is_empty() && alt.is_none() {
    display_error(jsx_element.opening.span, "<Switch> tag should contain at least one <Case> or <Default> tag.");
  }

  if alt.is_none() {
    alt = Some(Expr::Lit(Lit::Null(Null { span: DUMMY_SP })));
  }

  (cons, alt.unwrap())
}