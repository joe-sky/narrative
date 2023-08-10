import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile, NodePath } from '@babel/core';
import * as astUtil from '../utils/ast';
import { displayError, SUB_TAGS_FOR, ATTRS_FOR, ARR_PARAM, OBJ_PARAM, KEYS_PARAM } from '../utils/common';
// import generate from '@babel/generator';

export function transformFor(node: JSXElement, path: NodePath, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const ofAttr = attrs?.[ATTRS_FOR.OF];
  const inAttr = attrs?.[ATTRS_FOR.IN];
  if (!ofAttr && !inAttr) {
    displayError(path, 'Attribute "of" or "in" is required for the <For> tag.');
  }

  const children = astUtil.getChildren(node);
  const blocks = parseFor(astUtil.getExpression(ofAttr || inAttr), children, path, key);
  const cbParams = blocks.callback.params;
  const itemParam = cbParams[0];
  const metaParam = cbParams[1] as types.ObjectPattern;
  const sourceParam = cbParams[2];
  const generatedParams: astUtil.FuncParam[] = [];
  let keyProp: types.ObjectProperty | null = null;
  let keysProp: types.ObjectProperty | null = null;

  if (attrs[ATTRS_FOR.OF]) {
    generatedParams.push(itemParam);
  } else if (attrs[ATTRS_FOR.IN]) {
    if (metaParam) {
      keyProp = astUtil.findPropByName(metaParam, 'key');
      if (keyProp) {
        generatedParams.push(keyProp.value as types.Identifier);
      }

      keysProp = astUtil.findPropByName(metaParam, 'keys');
    }
  }

  if (metaParam) {
    const indexProp = astUtil.findPropByName(metaParam, 'index');
    if (indexProp) {
      generatedParams.push(indexProp.value as types.Identifier);
    }
  }

  if (sourceParam && attrs[ATTRS_FOR.OF]) {
    generatedParams.push(sourceParam);
  }

  let ret: types.CallExpression | types.LogicalExpression | null = null;

  if (attrs[ATTRS_FOR.OF]) {
    ret = !blocks.empty
      ? types.logicalExpression(
          '||',
          types.optionalCallExpression(
            types.optionalMemberExpression(blocks.source, types.identifier('map'), false, true),
            [types.arrowFunctionExpression(generatedParams, blocks.callback.body), types.identifier('this')],
            false
          ),
          types.nullLiteral()
        )
      : types.callExpression(
          types.arrowFunctionExpression(
            [types.identifier(ARR_PARAM)],
            types.blockStatement([
              types.ifStatement(
                types.optionalMemberExpression(types.identifier(ARR_PARAM), types.identifier('length'), false, true),
                types.blockStatement([
                  types.returnStatement(
                    types.callExpression(types.memberExpression(types.identifier(ARR_PARAM), types.identifier('map')), [
                      types.arrowFunctionExpression(generatedParams, blocks.callback.body),
                      types.identifier('this')
                    ])
                  )
                ])
              ),
              types.returnStatement(blocks.empty)
            ])
          ),
          [blocks.source]
        );
  } else if (attrs[ATTRS_FOR.IN]) {
    const funcBody: types.Statement[] = [
      types.variableDeclaration('const', [
        types.variableDeclarator(
          types.identifier(KEYS_PARAM),
          types.conditionalExpression(
            types.identifier(OBJ_PARAM),
            types.callExpression(types.memberExpression(types.identifier('Object'), types.identifier('keys')), [
              types.identifier(OBJ_PARAM)
            ]),
            types.arrayExpression()
          )
        )
      ]),
      types.ifStatement(
        types.memberExpression(types.identifier(KEYS_PARAM), types.identifier('length')),
        types.blockStatement([
          types.returnStatement(
            types.callExpression(types.memberExpression(types.identifier(KEYS_PARAM), types.identifier('map')), [
              types.arrowFunctionExpression(
                generatedParams,
                types.blockStatement([
                  types.variableDeclaration('const', [
                    types.variableDeclarator(
                      itemParam,
                      types.memberExpression(types.identifier(OBJ_PARAM), keyProp?.value as types.Identifier, true)
                    )
                  ]),
                  ...(keysProp
                    ? [
                        types.variableDeclaration('const', [
                          types.variableDeclarator(keysProp.value as types.Identifier, types.identifier(KEYS_PARAM))
                        ])
                      ]
                    : []),
                  ...(sourceParam
                    ? [
                        types.variableDeclaration('const', [
                          types.variableDeclarator(sourceParam, types.identifier(OBJ_PARAM))
                        ])
                      ]
                    : []),
                  ...(types.isBlockStatement(blocks.callback.body)
                    ? blocks.callback.body.body
                    : [types.returnStatement(blocks.callback.body)])
                ])
              ),
              types.identifier('this')
            ])
          )
        ])
      )
    ];

    if (blocks.empty) {
      funcBody.push(types.returnStatement(blocks.empty));
    }

    ret = types.callExpression(
      types.arrowFunctionExpression([types.identifier(OBJ_PARAM)], types.blockStatement(funcBody)),
      [blocks.source]
    );
  }

  /* You can use @babel/generator here when debugging */
  // ret && console.log(generate(ret).code);

  return ret;
}

function parseFor(source: types.Expression, children: astUtil.JSXChild[], path: NodePath, key?: string) {
  const ret: astUtil.ForAttrs = {
    source,
    callback: astUtil.noopArrowFunctionExpression()
  };
  let emptyFound = false;
  let callbackFound = false;

  children.forEach((child, index) => {
    if (types.isJSXElement(child)) {
      if (astUtil.isTag(child, SUB_TAGS_FOR.EMPTY)) {
        if (emptyFound) {
          displayError(path.get(`children.${index}`) as NodePath, '<For> tag should only contain one <Empty> tag.');
        } else {
          emptyFound = true;
          const childNodes = astUtil.getChildren(child);

          if (childNodes.length > 0) {
            ret.empty = astUtil.convertChildrenToExpression(childNodes, key, true);
          } else {
            displayError(path.get(`children.${index}`) as NodePath, '<Empty> tag should contain children.');
          }
        }
      } else {
        displayError(
          path.get(`children.${index}`) as NodePath,
          `<For> tag should only contain <Empty> tags, got: <${astUtil.getTagName(child)}>.`
        );
      }
    } else if (types.isArrowFunctionExpression(child)) {
      if (callbackFound) {
        displayError(path.get(`children.${index}`) as NodePath, '<For> tag should only contain one callback function.');
      } else {
        callbackFound = true;
        ret.callback = child;
      }
    } else {
      displayError(
        path.get(`children.${index}`) as NodePath,
        '<For> tag should only contain one <Empty> tag and one callback function.'
      );
    }
  });

  return ret;
}
