use swc_core::common::DUMMY_SP;
use swc_core::ecma::ast::Expr;
use swc_core::ecma::ast::{ CondExpr, JSXElement, JSXElementChild, JSXText };

use crate::utils::{
  ast::{ convert_children_to_expression, get_when_expression, get_jsx_element_name, clone_children },
  common::{ display_error, ELSE, ELSE_IF },
};

pub fn transform_if(jsx_element: &JSXElement) -> Expr {
  let (cons, alt) = parse_if(jsx_element);
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

fn parse_if(jsx_element: &JSXElement) -> (Vec<(Expr, Expr)>, Expr) {
  let mut else_found = false;

  let (cons, alts, elseif_cons): (Vec<JSXElementChild>, Vec<JSXElementChild>, Vec<(Expr, Expr)>) = jsx_element.children
    .iter()
    .fold((Vec::new(), Vec::new(), Vec::new()), |(mut cons, mut alts, mut elseif_cons), child| {
      match child {
        JSXElementChild::JSXText(JSXText { value, .. }) => {
          let mut value = value.to_string();

          value = value.replace('\n', "");

          if value.trim() == "" {
            return (cons, alts, elseif_cons);
          }
        }
        JSXElementChild::JSXElement(child_jsx_element) => {
          let tag_name = get_jsx_element_name(&child_jsx_element.opening.name);

          if tag_name == ELSE {
            if child_jsx_element.closing.is_none() {
              display_error(child_jsx_element.opening.span, "<Else> should have a closing tag.");
            }

            for item in &child_jsx_element.children {
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
                child_jsx_element.opening.span,
                "<Else> can be used one per <If>, if you want multiple choises use <ElseIf> or <Switch>."
              );
            }

            return (cons, alts, elseif_cons);
          } else if tag_name == ELSE_IF {
            elseif_cons.push((
              get_when_expression(child_jsx_element),
              convert_children_to_expression(clone_children(&child_jsx_element.children)),
            ));

            return (cons, alts, elseif_cons);
          }
        }
        _ => {}
      }

      cons.push((*child).clone());

      (cons, alts, elseif_cons)
    });

  (
    [vec![(get_when_expression(jsx_element), convert_children_to_expression(cons))], elseif_cons]
      .concat()
      .into_iter()
      .rev()
      .collect(),
    convert_children_to_expression(alts),
  )
}