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
  ObjectPatProp,
  AssignPatProp,
  KeyValuePatProp,
  BindingIdent,
  ParenExpr,
  BlockStmtOrExpr,
  BlockStmt,
  Stmt,
  ReturnStmt,
  IfStmt,
  Decl,
  VarDecl,
  VarDeclKind,
  VarDeclarator,
  CondExpr,
  ArrayLit,
  ComputedPropName,
  PropName,
};
use swc_core::ecma::atoms::JsWord;

use crate::utils::{
  ast::{ convert_children_to_expression, get_of_expression, get_tag_name, clone_children, null_literal },
  common::{ display_error, EMPTY, ARR_PARAM, OBJ_PARAM, KEYS_PARAM },
};

pub fn transform_for(jsx_element: &JSXElement) -> Expr {
  let (source, callback, empty, has_in) = parse_for(jsx_element);

  if let Expr::Arrow(ArrowExpr { params, body, .. }) = callback {
    let mut generated_params: Vec<Pat> = Vec::new();

    let item_param = params.get(0);
    if !has_in && item_param.is_some() {
      generated_params.push(item_param.unwrap().clone());
    }

    let mut for_in_key_param = None;
    let meta_param = params.get(1);
    if let Some(Pat::Object(ObjectPat { props, .. })) = meta_param {
      if has_in {
        for prop in props.iter() {
          match prop {
            ObjectPatProp::Assign(AssignPatProp { key, .. }) => {
              let Ident { sym, .. } = key;
              if sym == "key" {
                generated_params.push(
                  Pat::Ident(BindingIdent {
                    id: key.clone(),
                    type_ann: None,
                  })
                );
                for_in_key_param = Some(key.clone());
              }
            }
            ObjectPatProp::KeyValue(KeyValuePatProp { key, value, .. }) => {
              if let PropName::Ident(Ident { sym, .. }) = key {
                if sym == "key" {
                  if let Pat::Ident(BindingIdent { id, .. }) = &**value {
                    generated_params.push(
                      Pat::Ident(BindingIdent {
                        id: id.clone(),
                        type_ann: None,
                      })
                    );
                    for_in_key_param = Some(id.clone());
                  }
                }
              }
            }
            _ => {}
          }
        }
      }

      for prop in props.iter() {
        match prop {
          ObjectPatProp::Assign(AssignPatProp { key, .. }) => {
            let Ident { sym, .. } = key;
            if sym == "index" {
              generated_params.push(
                Pat::Ident(BindingIdent {
                  id: key.clone(),
                  type_ann: None,
                })
              );
            }
          }
          ObjectPatProp::KeyValue(KeyValuePatProp { key, value, .. }) => {
            if let PropName::Ident(Ident { sym, .. }) = key {
              if sym == "index" {
                if let Pat::Ident(BindingIdent { id, .. }) = &**value {
                  generated_params.push(
                    Pat::Ident(BindingIdent {
                      id: id.clone(),
                      type_ann: None,
                    })
                  );
                }
              }
            }
          }
          _ => {}
        }
      }
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
      } else {
        let arr_param = Ident {
          sym: JsWord::from(ARR_PARAM),
          span: DUMMY_SP,
          optional: false,
        };

        return Expr::Call(CallExpr {
          callee: Callee::Expr(
            Box::new(
              Expr::Paren(ParenExpr {
                expr: Box::new(
                  Expr::Arrow(ArrowExpr {
                    params: vec![
                      Pat::Ident(BindingIdent {
                        id: arr_param.clone(),
                        type_ann: None,
                      })
                    ],
                    body: Box::new(
                      BlockStmtOrExpr::BlockStmt(BlockStmt {
                        stmts: vec![
                          Stmt::If(IfStmt {
                            test: Box::new(
                              Expr::OptChain(OptChainExpr {
                                base: Box::new(
                                  OptChainBase::Member(MemberExpr {
                                    obj: Box::new(Expr::Ident(arr_param.clone())),
                                    prop: MemberProp::Ident(Ident {
                                      sym: JsWord::from("length"),
                                      optional: false,
                                      span: DUMMY_SP,
                                    }),
                                    span: DUMMY_SP,
                                  })
                                ),
                                question_dot_token: jsx_element.opening.span,
                                span: DUMMY_SP,
                              })
                            ),
                            cons: Box::new(
                              Stmt::Block(BlockStmt {
                                stmts: vec![
                                  Stmt::Return(ReturnStmt {
                                    arg: Some(
                                      Box::new(
                                        Expr::Call(CallExpr {
                                          callee: Callee::Expr(
                                            Box::new(
                                              Expr::Member(MemberExpr {
                                                obj: Box::new(Expr::Ident(arr_param.clone())),
                                                prop: MemberProp::Ident(Ident {
                                                  sym: JsWord::from("map"),
                                                  optional: false,
                                                  span: DUMMY_SP,
                                                }),
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
                                      )
                                    ),
                                    span: DUMMY_SP,
                                  })
                                ],
                                span: DUMMY_SP,
                              })
                            ),
                            alt: None,
                            span: DUMMY_SP,
                          }),
                          Stmt::Return(ReturnStmt {
                            arg: empty,
                            span: DUMMY_SP,
                          })
                        ],
                        span: DUMMY_SP,
                      })
                    ),
                    is_async: false,
                    is_generator: false,
                    type_params: None,
                    return_type: None,
                    span: DUMMY_SP,
                  })
                ),
                span: DUMMY_SP,
              })
            )
          ),
          args: vec![ExprOrSpread {
            expr: Box::new(source.clone()),
            spread: None,
          }],
          type_args: None,
          span: DUMMY_SP,
        });
      }
    } else {
      let obj_param = Ident {
        sym: JsWord::from(OBJ_PARAM),
        span: DUMMY_SP,
        optional: false,
      };
      let key_param = Ident {
        sym: JsWord::from(KEYS_PARAM),
        span: DUMMY_SP,
        optional: false,
      };

      let mut outer_block_stmt: Vec<Stmt> = Vec::new();
      outer_block_stmt.push(
        Stmt::Decl(
          Decl::Var(
            Box::new(VarDecl {
              kind: VarDeclKind::Const,
              declare: false,
              decls: vec![VarDeclarator {
                span: DUMMY_SP,
                name: Pat::Ident(BindingIdent {
                  id: key_param.clone(),
                  type_ann: None,
                }),
                init: Some(
                  Box::new(
                    Expr::Cond(CondExpr {
                      test: Box::new(Expr::Ident(obj_param.clone())),
                      cons: Box::new(
                        Expr::Call(CallExpr {
                          callee: Callee::Expr(
                            Box::new(
                              Expr::Member(MemberExpr {
                                obj: Box::new(
                                  Expr::Ident(Ident {
                                    sym: JsWord::from("Object"),
                                    optional: false,
                                    span: DUMMY_SP,
                                  })
                                ),
                                prop: MemberProp::Ident(Ident {
                                  sym: JsWord::from("keys"),
                                  optional: false,
                                  span: DUMMY_SP,
                                }),
                                span: DUMMY_SP,
                              })
                            )
                          ),
                          args: vec![ExprOrSpread {
                            expr: Box::new(Expr::Ident(obj_param.clone())),
                            spread: None,
                          }],
                          type_args: None,
                          span: DUMMY_SP,
                        })
                      ),
                      alt: Box::new(
                        Expr::Array(ArrayLit {
                          elems: vec![],
                          span: DUMMY_SP,
                        })
                      ),
                      span: DUMMY_SP,
                    })
                  )
                ),
                definite: false,
              }],
              span: DUMMY_SP,
            })
          )
        )
      );

      outer_block_stmt.push(
        Stmt::If(IfStmt {
          test: Box::new(
            Expr::Member(MemberExpr {
              obj: Box::new(Expr::Ident(key_param.clone())),
              prop: MemberProp::Ident(Ident {
                sym: JsWord::from("length"),
                optional: false,
                span: DUMMY_SP,
              }),
              span: DUMMY_SP,
            })
          ),
          cons: Box::new(
            Stmt::Block(BlockStmt {
              stmts: vec![
                Stmt::Return(ReturnStmt {
                  arg: Some(
                    Box::new(
                      Expr::Call(CallExpr {
                        callee: Callee::Expr(
                          Box::new(
                            Expr::Member(MemberExpr {
                              obj: Box::new(Expr::Ident(key_param.clone())),
                              prop: MemberProp::Ident(Ident {
                                sym: JsWord::from("map"),
                                optional: false,
                                span: DUMMY_SP,
                              }),
                              span: DUMMY_SP,
                            })
                          )
                        ),
                        args: vec![
                          ExprOrSpread {
                            expr: Box::new(
                              Expr::Arrow(ArrowExpr {
                                params: generated_params,
                                body: Box::new(
                                  BlockStmtOrExpr::BlockStmt(BlockStmt {
                                    stmts: [
                                      vec![
                                        Stmt::Decl(
                                          Decl::Var(
                                            Box::new(VarDecl {
                                              kind: VarDeclKind::Const,
                                              declare: false,
                                              decls: vec![VarDeclarator {
                                                span: DUMMY_SP,
                                                name: item_param.unwrap().clone(),
                                                init: Some(
                                                  Box::new(
                                                    Expr::Member(MemberExpr {
                                                      obj: Box::new(Expr::Ident(obj_param.clone())),
                                                      prop: MemberProp::Computed(ComputedPropName {
                                                        expr: Box::new(Expr::Ident(for_in_key_param.unwrap().clone())),
                                                        span: DUMMY_SP,
                                                      }),
                                                      span: DUMMY_SP,
                                                    })
                                                  )
                                                ),
                                                definite: false,
                                              }],
                                              span: DUMMY_SP,
                                            })
                                          )
                                        )
                                      ],
                                      match *body {
                                        BlockStmtOrExpr::BlockStmt(BlockStmt { stmts, .. }) => { stmts }
                                        BlockStmtOrExpr::Expr(expr) => {
                                          vec![
                                            Stmt::Return(ReturnStmt {
                                              arg: Some(expr),
                                              span: DUMMY_SP,
                                            })
                                          ]
                                        }
                                      },
                                    ].concat(),
                                    span: DUMMY_SP,
                                  })
                                ),
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
                    )
                  ),
                  span: DUMMY_SP,
                })
              ],
              span: DUMMY_SP,
            })
          ),
          alt: None,
          span: DUMMY_SP,
        })
      );

      if empty.is_some() {
        outer_block_stmt.push(
          Stmt::Return(ReturnStmt {
            arg: empty,
            span: DUMMY_SP,
          })
        );
      }

      return Expr::Call(CallExpr {
        callee: Callee::Expr(
          Box::new(
            Expr::Paren(ParenExpr {
              expr: Box::new(
                Expr::Arrow(ArrowExpr {
                  params: vec![
                    Pat::Ident(BindingIdent {
                      id: obj_param.clone(),
                      type_ann: None,
                    })
                  ],
                  body: Box::new(
                    BlockStmtOrExpr::BlockStmt(BlockStmt {
                      stmts: outer_block_stmt,
                      span: DUMMY_SP,
                    })
                  ),
                  is_async: false,
                  is_generator: false,
                  type_params: None,
                  return_type: None,
                  span: DUMMY_SP,
                })
              ),
              span: DUMMY_SP,
            })
          )
        ),
        args: vec![ExprOrSpread {
          expr: Box::new(source.clone()),
          spread: None,
        }],
        type_args: None,
        span: DUMMY_SP,
      });
    }
  }

  null_literal()
}

fn parse_for(jsx_element: &JSXElement) -> (Expr, Expr, Option<Box<Expr>>, bool) {
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
            "<For> tag should only contain one <Empty> tag and one callback function."
          );
        }
      }
      JSXElementChild::JSXExprContainer(JSXExprContainer { expr: JSXExpr::Expr(expr), .. }) => {
        match &**expr {
          Expr::Arrow(array_expr) => {
            callback = Some(Expr::Arrow((*array_expr).clone()));
          }
          _ => {
            display_error(jsx_element.opening.span, "<For> tag should only contain one callback function.");
          }
        }
      }
      JSXElementChild::JSXElement(child_jsx_element) => {
        let element_name = get_tag_name(&child_jsx_element.opening.name);

        if element_name == EMPTY {
          if empty_found {
            display_error(child_jsx_element.opening.span, "<For> tag should only contain one <Empty> tag.");
          } else {
            empty_found = true;

            if child_jsx_element.children.is_empty() {
              display_error(child_jsx_element.opening.span, "<Empty> tag should contain children.");
            } else {
              empty = Some(Box::new(convert_children_to_expression(clone_children(&child_jsx_element.children))));
            }
          }
        } else {
          display_error(
            child_jsx_element.opening.span,
            format!("<For> tag should only contain <Empty> tags, got: <{}>.", element_name).as_str()
          );
        }
      }
      _ => {
        display_error(
          jsx_element.opening.span,
          "<For> tag should only contain one <Empty> tag and one callback function."
        );
      }
    }
  }

  if callback.is_none() {
    display_error(jsx_element.opening.span, "<For> tag should contain at least one callback function.");
  }

  (source, callback.unwrap(), empty, has_in)
}