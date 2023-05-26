use swc_core::common::DUMMY_SP;
use swc_core::ecma::ast::{
  Expr,
  JSXElement,
  JSXElementChild,
  JSXText,
  JSXExprContainer,
  JSXExpr,
  BinExpr,
  op,
  CallExpr,
  Callee,
  OptChainExpr,
  OptChainBase,
  MemberExpr,
  MemberProp,
  Ident,
  ArrowExpr,
  ExprOrSpread,
  ThisExpr,
  Pat,
  ObjectPat,
};
use swc_core::ecma::atoms::JsWord;
use tracing::debug;

use crate::utils::{
  ast::{
    convert_children_to_expression,
    display_error,
    get_of_expression,
    get_jsx_element_name,
    clone_children,
    null_literal,
  },
  common::{ FOR, EMPTY, OF, IN },
};

pub fn transform_for(jsx_element: &JSXElement) -> Expr {
  let (source, callback, empty, has_in) = parse_for(jsx_element);
  // debug!("compile for tag1: {}", has_in);
  // debug!("compile for tag2: {}", empty.is_none());

  if let Expr::Arrow(ArrowExpr { params, body, .. }) = callback {
    let mut generated_params: Vec<Pat> = Vec::new();

    let item_param = params.get(0);
    if item_param.is_some() {
      generated_params.push(item_param.unwrap().clone());
    }

    let meta_param = params.get(1);
    if let Some(Pat::Object(ObjectPat { props, .. })) = meta_param {
      // let mut props = props.clone();
      // let mut key = None;
      // let mut index = None;

      // for prop in props.iter() {
      //   if let Some(Expr::Ident(Ident { sym, .. })) = &prop.key {
      //     if sym == "key" {
      //       key = Some(prop.value.clone());
      //     } else if sym == "index" {
      //       index = Some(prop.value.clone());
      //     }
      //   }
      // }

      // if key.is_none() {
      //   key = Some(
      //     Expr::Ident(Ident {
      //       sym: JsWord::from("key"),
      //       span: DUMMY_SP,
      //       optional: false,
      //     })
      //   );
      // }

      // if index.is_none() {
      //   index = Some(
      //     Expr::Ident(Ident {
      //       sym: JsWord::from("index"),
      //       span: DUMMY_SP,
      //       optional: false,
      //     })
      //   );
      // }

      // generated_params.push(
      //   Pat::Object(ObjectPat {
      //     props: vec![],
      //     span: DUMMY_SP,
      //     optional: false,
      //     type_ann: None,
      //   })
      // );

      // generated_params.push(
      //   Pat::Object(ObjectPat {
      //     props: vec![
      //       ObjectPatProp::KeyValue(KeyValuePatProp {
      //         key: PropName::Ident(Ident {
      //           sym: JsWord::from("key"),
      //           span: DUMMY_SP,
      //           optional: false,
      //         }),
      //         value: key.unwrap(),
      //       }),
      //       ObjectPatProp::KeyValue(KeyValuePatProp {
      //         key: PropName::Ident(Ident {
      //           sym: JsWord::from("index"),
      //           span: DUMMY_SP,
      //           optional: false,
      //         }),
      //         value: index.unwrap(),
      //       })
      //     ],
      //     span: DUMMY_SP,
      //     optional: false,
      //     type_ann: None,
      //   })
      // );
    }

    if !has_in {
      if empty.is_none() {
        return Expr::Bin(BinExpr {
          op: op!("||"),
          left: Box::new(
            Expr::Call(CallExpr {
              callee: Callee::Expr(
                Box::new(
                  Expr::OptChain(OptChainExpr {
                    base: Box::new(
                      OptChainBase::Member(MemberExpr {
                        obj: Box::new(source.clone()),
                        prop: MemberProp::Ident(Ident {
                          sym: JsWord::from("map"),
                          optional: false,
                          span: DUMMY_SP,
                        }),
                        span: DUMMY_SP,
                      })
                    ),
                    question_dot_token: jsx_element.opening.span,
                    span: DUMMY_SP,
                  })
                )
              ),
              args: vec![
                ExprOrSpread {
                  expr: Box::new(
                    Expr::Arrow(ArrowExpr {
                      params: generated_params,
                      body,
                      is_async: false,
                      is_generator: false,
                      type_params: None,
                      return_type: None,
                      span: DUMMY_SP,
                    })
                  ),
                  spread: None,
                },
                ExprOrSpread {
                  expr: Box::new(
                    Expr::This(ThisExpr {
                      span: DUMMY_SP,
                    })
                  ),
                  spread: None,
                }
              ],
              type_args: None,
              span: DUMMY_SP,
            })
          ),
          right: Box::new(null_literal()),
          span: DUMMY_SP,
        });
      }
    }
  }

  source
}

fn parse_for(jsx_element: &JSXElement) -> (Expr, Expr, Option<Expr>, bool) {
  let (source, has_in) = get_of_expression(jsx_element);
  let mut callback = None;
  let mut empty = None;
  let mut empty_found = false;

  for child in jsx_element.children.iter() {
    match child {
      JSXElementChild::JSXText(JSXText { value, .. }) => {
        let mut value = value.to_string();

        value = value.replace('\n', "");

        if value.trim() != "" {
          display_error(
            jsx_element.opening.span,
            "<For /> tag can contain only a <Empty> tag and a callback function."
          );
        }
      }
      JSXElementChild::JSXExprContainer(JSXExprContainer { expr: JSXExpr::Expr(expr), .. }) => {
        match &**expr {
          Expr::Arrow(array_expr) => {
            callback = Some(Expr::Arrow((*array_expr).clone()));
          }
          _ => {
            display_error(jsx_element.opening.span, "<For /> tag can contain only one callback function.");
          }
        }
      }
      JSXElementChild::JSXElement(child_jsx_element) => {
        let element_name = get_jsx_element_name(&child_jsx_element.opening.name);

        if element_name == EMPTY {
          if empty_found {
            display_error(child_jsx_element.opening.span, "<For /> can contain only one <Empty /> tag.");
          } else {
            empty_found = true;

            if child_jsx_element.children.is_empty() {
              display_error(child_jsx_element.opening.span, "<Empty /> tag should contain children.");
            } else {
              empty = Some(convert_children_to_expression(clone_children(&child_jsx_element.children)));
            }
          }
        } else {
          display_error(
            child_jsx_element.opening.span,
            format!("<For /> tag can contain only <Empty /> tags, got: <{}>.", element_name).as_str()
          );
        }
      }
      _ => {
        display_error(jsx_element.opening.span, "<For /> tag can contain only a <Empty> tag and a callback function.");
      }
    }
  }

  if callback.is_none() {
    display_error(jsx_element.opening.span, "<For /> tag should contain at least one callback function.");
  }

  (source, callback.unwrap(), empty, has_in)
}