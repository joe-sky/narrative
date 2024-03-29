use swc_core::common::{ DUMMY_SP, Spanned };
use swc_core::ecma::ast::{
  Expr,
  Ident,
  JSXAttr,
  JSXAttrName,
  JSXAttrOrSpread,
  JSXAttrValue,
  JSXClosingFragment,
  JSXElement,
  JSXElementChild,
  JSXElementName,
  JSXExpr,
  JSXExprContainer,
  JSXFragment,
  JSXOpeningFragment,
  JSXText,
  Lit,
  Null,
  Str,
  BinExpr,
  op,
  CallExpr,
  Callee,
  MemberExpr,
  MemberProp,
  ExprOrSpread,
};
use swc_core::ecma::atoms::JsWord;
use regex::Regex;

use super::common::{ display_error, WHEN, IS, IN, VALUE, OF, FOR_IN };

pub fn get_tag_name(tag_name: &JSXElementName) -> &str {
  match tag_name {
    JSXElementName::Ident(Ident { sym, .. }) => sym,
    _ => "unknown",
  }
}

/// Clean up the text of the JSX element, remove the blank lines at the beginning and end of the text, and remove the blank lines between the text.
///
/// Reference from: https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts
pub fn clean_jsx_element_literal_child(text: &str) -> String {
  let mut jsx_text_lines = text.lines().enumerate().peekable();

  let regex_blank_space = Regex::new(r"[^ \t]").unwrap();
  let mut last_non_empty_line = 0;
  for (index, line) in &mut jsx_text_lines.clone() {
    if regex_blank_space.is_match(line) {
      last_non_empty_line = index;
    }
  }

  let mut lines = vec![];
  while let Some((index, line)) = jsx_text_lines.next() {
    let is_first_line = index == 0;
    let is_last_line = jsx_text_lines.peek().is_none();
    let is_last_non_empty_line = index == last_non_empty_line;

    let mut trimmed_line = line.replace('\t', " ");
    if !is_first_line {
      trimmed_line = String::from(trimmed_line.trim_start());
    }
    if !is_last_line {
      trimmed_line = String::from(trimmed_line.trim_end());
    }

    if !trimmed_line.is_empty() {
      lines.push(trimmed_line);

      if !is_last_non_empty_line {
        lines.push(String::from(" "));
      }
    }
  }

  lines.join("")
}

pub fn jsx_text(content: &str) -> JSXElementChild {
  JSXElementChild::JSXText(JSXText {
    span: DUMMY_SP,
    value: content.into(),
    raw: content.into(),
  })
}

pub fn clone_children(children: &Vec<JSXElementChild>) -> Vec<JSXElementChild> {
  let mut copy: Vec<JSXElementChild> = Vec::new();

  for child in children {
    match child {
      JSXElementChild::JSXText(JSXText { value, .. }) => {
        let content = clean_jsx_element_literal_child(&value.to_string());

        if content != "" {
          copy.push(jsx_text(&content));
        }
      }
      _ => {
        copy.push((*child).clone());
      }
    }
  }

  copy
}

pub fn convert_children_to_expression(children: Vec<JSXElementChild>) -> Expr {
  match children.len() {
    0 => Expr::Lit(Lit::Null(Null { span: DUMMY_SP })),
    1 => {
      let sub_element = &children[0];

      match sub_element {
        JSXElementChild::JSXElement(value) => Expr::JSXElement(Box::new((**value).clone())),
        JSXElementChild::JSXExprContainer(JSXExprContainer { expr: JSXExpr::Expr(expr), .. }) => {
          match &**expr {
            Expr::Arrow(array_expr) =>
              Expr::Call(CallExpr {
                callee: Callee::Expr(Box::new(Expr::Arrow((*array_expr).clone()))),
                args: vec![],
                type_args: None,
                span: DUMMY_SP,
              }),
            _ => (**expr).clone(),
          }
        }
        JSXElementChild::JSXText(JSXText { value, .. }) => {
          Expr::Lit(
            Lit::Str(Str {
              span: DUMMY_SP,
              value: value.to_string().into(),
              raw: None,
            })
          )
        }
        _ => Expr::Lit(Lit::Null(Null { span: DUMMY_SP })),
      }
    }
    _ =>
      Expr::JSXFragment(JSXFragment {
        span: DUMMY_SP,
        children,
        opening: JSXOpeningFragment { span: DUMMY_SP },
        closing: JSXClosingFragment { span: DUMMY_SP },
      }),
  }
}

pub fn get_when_expression(jsx_element: &JSXElement) -> Expr {
  jsx_element.opening.attrs
    .iter()
    .find(|attr| {
      if let JSXAttrOrSpread::JSXAttr(JSXAttr { name: JSXAttrName::Ident(Ident { sym, span, .. }), .. }) = attr {
        if sym == WHEN {
          return true;
        } else {
          display_error(*span, format!("Only \"when\" attribute allowed, got: \"{}\".", sym).as_str());
        }
      }

      false
    })
    .map(|attr| {
      match attr {
        JSXAttrOrSpread::JSXAttr(JSXAttr { value, .. }) =>
          match value {
            Some(JSXAttrValue::JSXExprContainer(value)) => {
              let JSXExprContainer { expr, .. } = value;

              match expr {
                JSXExpr::Expr(value) => (**value).clone(),
                _ => Expr::Lit(Lit::Bool(false.into())),
              }
            }
            _ => Expr::Lit(Lit::Bool(false.into())),
          }
        JSXAttrOrSpread::SpreadElement(value) => {
          display_error(value.dot3_token.span(), "Spread is invalid for the value of when.");

          Expr::Lit(Lit::Bool(false.into()))
        }
      }
    })
    .unwrap_or_else(|| {
      let element_name = get_tag_name(&jsx_element.opening.name);

      display_error(
        jsx_element.opening.span,
        format!("Attribute \"when\" is required for the <{}> tag.", element_name).as_str()
      );

      Expr::Lit(Lit::Bool(false.into()))
    })
}

fn match_is_attr(parent_jsx_element: &JSXElement, expr_value: &Box<Expr>, has_in: bool) -> Expr {
  parent_jsx_element.opening.attrs
    .iter()
    .find(|attr| {
      if let JSXAttrOrSpread::JSXAttr(JSXAttr { name: JSXAttrName::Ident(Ident { sym, span, .. }), .. }) = attr {
        if sym == VALUE {
          return true;
        } else {
          display_error(*span, format!("Only \"value\" attribute allowed, got: \"{}\".", sym).as_str());
        }
      }

      false
    })
    .map(|attr| {
      match attr {
        JSXAttrOrSpread::JSXAttr(JSXAttr { value, .. }) =>
          match value {
            Some(JSXAttrValue::JSXExprContainer(value)) => {
              let JSXExprContainer { expr, .. } = value;

              match expr {
                JSXExpr::Expr(parent_expr_value) => {
                  if has_in {
                    Expr::Call(CallExpr {
                      callee: Callee::Expr(
                        Box::new(
                          Expr::Member(MemberExpr {
                            obj: (*expr_value).clone(),
                            prop: MemberProp::Ident(Ident {
                              sym: JsWord::from("includes"),
                              optional: false,
                              span: DUMMY_SP,
                            }),
                            span: DUMMY_SP,
                          })
                        )
                      ),
                      args: vec![ExprOrSpread { expr: (*parent_expr_value).clone(), spread: None }],
                      type_args: None,
                      span: DUMMY_SP,
                    })
                  } else {
                    Expr::Bin(BinExpr {
                      op: op!("==="),
                      left: (*parent_expr_value).clone(),
                      right: (*expr_value).clone(),
                      span: DUMMY_SP,
                    })
                  }
                }
                _ => Expr::Lit(Lit::Bool(false.into())),
              }
            }
            _ => Expr::Lit(Lit::Bool(false.into())),
          }
        JSXAttrOrSpread::SpreadElement(value) => {
          display_error(value.dot3_token.span(), "Spread is invalid for the value of \"value\".");

          Expr::Lit(Lit::Bool(false.into()))
        }
      }
    })
    .unwrap_or_else(|| {
      let element_name = get_tag_name(&parent_jsx_element.opening.name);

      display_error(
        parent_jsx_element.opening.span,
        format!("Attribute \"value\" is required for the <{}> tag.", element_name).as_str()
      );

      Expr::Lit(Lit::Bool(false.into()))
    })
}

pub fn get_is_expression(jsx_element: &JSXElement, parent_jsx_element: &JSXElement) -> Expr {
  let mut has_in = false;

  jsx_element.opening.attrs
    .iter()
    .find(|attr| {
      if let JSXAttrOrSpread::JSXAttr(JSXAttr { name: JSXAttrName::Ident(Ident { sym, span, .. }), .. }) = attr {
        if sym == IS || sym == IN {
          if sym == IN {
            has_in = true;
          }

          return true;
        } else {
          display_error(*span, format!("Only \"is\" or \"in\" attribute allowed, got: \"{}\".", sym).as_str());
        }
      }

      false
    })
    .map(|attr| {
      match attr {
        JSXAttrOrSpread::JSXAttr(JSXAttr { value, .. }) =>
          match value {
            Some(JSXAttrValue::JSXExprContainer(value)) => {
              let JSXExprContainer { expr, .. } = value;

              match expr {
                JSXExpr::Expr(expr_value) => { match_is_attr(parent_jsx_element, expr_value, has_in) }
                _ => Expr::Lit(Lit::Bool(false.into())),
              }
            }
            Some(JSXAttrValue::Lit(Lit::Str(value))) => {
              let expr_value = Box::new(Expr::Lit(Lit::Str(value.clone())));

              match_is_attr(parent_jsx_element, &expr_value, has_in)
            }
            _ => Expr::Lit(Lit::Bool(false.into())),
          }
        JSXAttrOrSpread::SpreadElement(value) => {
          display_error(
            value.dot3_token.span(),
            format!("Spread is invalid for the value of \"{}\".", if has_in { IN } else { IS }).as_str()
          );

          Expr::Lit(Lit::Bool(false.into()))
        }
      }
    })
    .unwrap_or_else(|| {
      let element_name = get_tag_name(&jsx_element.opening.name);

      display_error(
        jsx_element.opening.span,
        format!("Attribute \"is\" or \"in\" is required for the <{}> tag.", element_name).as_str()
      );

      Expr::Lit(Lit::Bool(false.into()))
    })
}

pub fn get_of_expression(jsx_element: &JSXElement) -> (Expr, bool) {
  let mut has_in = false;

  let source = jsx_element.opening.attrs
    .iter()
    .find(|attr| {
      if let JSXAttrOrSpread::JSXAttr(JSXAttr { name: JSXAttrName::Ident(Ident { sym, span, .. }), .. }) = attr {
        if sym == OF || sym == FOR_IN {
          if sym == FOR_IN {
            has_in = true;
          }

          return true;
        } else {
          display_error(*span, format!("Only \"of\" or \"in\" attribute allowed, got: \"{}\".", sym).as_str());
        }
      }

      false
    })
    .map(|attr| {
      match attr {
        JSXAttrOrSpread::JSXAttr(JSXAttr { value, .. }) =>
          match value {
            Some(JSXAttrValue::JSXExprContainer(value)) => {
              let JSXExprContainer { expr, .. } = value;

              match expr {
                JSXExpr::Expr(value) => (**value).clone(),
                _ => Expr::Lit(Lit::Bool(false.into())),
              }
            }
            _ => Expr::Lit(Lit::Bool(false.into())),
          }
        JSXAttrOrSpread::SpreadElement(value) => {
          display_error(
            value.dot3_token.span(),
            format!("Spread is invalid for the value of \"{}\".", if has_in { FOR_IN } else { OF }).as_str()
          );

          Expr::Lit(Lit::Bool(false.into()))
        }
      }
    })
    .unwrap_or_else(|| {
      let element_name = get_tag_name(&jsx_element.opening.name);

      display_error(
        jsx_element.opening.span,
        format!("Attribute \"of\" or \"in\" is required for the <{}> tag.", element_name).as_str()
      );

      Expr::Lit(Lit::Bool(false.into()))
    });

  (source, has_in)
}

pub fn wrap_by_child_jsx_expr_container(expr: Expr) -> JSXElementChild {
  JSXElementChild::JSXExprContainer(JSXExprContainer {
    span: DUMMY_SP,
    expr: JSXExpr::Expr(Box::new(expr)),
  })
}

pub fn null_literal() -> Expr {
  Expr::Lit(Lit::Null(Null { span: DUMMY_SP }))
}