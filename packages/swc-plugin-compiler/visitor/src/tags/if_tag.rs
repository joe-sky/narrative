use swc_core::common::DUMMY_SP;
use swc_core::ecma::ast::Expr;
use swc_core::ecma::ast::{ CondExpr, JSXElement, JSXElementChild, JSXText };

use crate::utils::{ convert_children_to_expression, display_error, get_when_expression, get_jsx_element_name };

pub fn transform_if(jsx_element: &JSXElement) -> Expr {
  let (cons, alt) = parse_if(jsx_element);

  Expr::Cond(CondExpr {
    test: Box::new(get_when_expression(jsx_element)),
    cons: Box::new(cons),
    alt: Box::new(alt),
    span: DUMMY_SP,
  })
}

fn parse_if(jsx_element: &JSXElement) -> (Expr, Expr) {
  let mut else_found = false;

  let (left_chilren, right_children): (Vec<JSXElementChild>, Vec<JSXElementChild>) = jsx_element.children
    .iter()
    .fold((Vec::new(), Vec::new()), |(mut cons, mut alts), child| {
      match child {
        JSXElementChild::JSXText(JSXText { value, .. }) => {
          let mut value = value.to_string();

          value = value.replace('\n', "");

          if value.trim() == "" {
            return (cons, alts);
          }
        }
        JSXElementChild::JSXElement(jsx_element) => {
          let tag_name = get_jsx_element_name(&jsx_element.opening.name);

          if tag_name == "Else" {
            if jsx_element.closing.is_none() {
              display_error(jsx_element.opening.span, "<Else> should have a closing tag.");
            }

            for item in &jsx_element.children {
              match item {
                JSXElementChild::JSXText(JSXText { value, .. }) => {
                  let mut value = value.to_string();

                  value = value.replace('\n', "");

                  if value.trim() != "" {
                    alts.push((*item).clone());
                  }
                }
                _ => {
                  alts.push((*item).clone());
                }
              }
            }

            if !else_found {
              else_found = true;
            } else {
              display_error(
                jsx_element.opening.span,
                "<Else> can be used one per <If>, if you want multiple choises use <ElseIf> or <Switch>."
              );
            }

            return (cons, alts);
          }
        }
        _ => {}
      }

      cons.push((*child).clone());

      (cons, alts)
    });

  (convert_children_to_expression(left_chilren), convert_children_to_expression(right_children))
}