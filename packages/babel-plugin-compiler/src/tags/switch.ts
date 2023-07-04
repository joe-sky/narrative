import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile, NodePath } from '@babel/core';
import * as astUtil from '../utils/ast';
import { displayError, SUB_TAGS_SWITCH, ATTRS_SWITCH } from '../utils/common';

export function transformSwitch(node: JSXElement, path: NodePath, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const valueAttr = attrs?.[ATTRS_SWITCH.VALUE];
  if (!valueAttr) {
    displayError(path, 'Attribute "value" is required for the <Switch> tag.');
  }

  const children = astUtil.getChildren(node);
  const blocks = parseSwitch(astUtil.getExpression(valueAttr), children, path, key);
  let ternaryExpression = blocks.default as types.Expression;

  blocks.cases.forEach(caseBlock => {
    ternaryExpression = types.conditionalExpression(caseBlock.condition, caseBlock.children, ternaryExpression);
  });

  return ternaryExpression;
}

function parseSwitch(expression: types.Expression, children: astUtil.JSXChild[], path: NodePath, key?: string) {
  let defaultFound = false;
  const ret = {
    cases: [] as astUtil.Attrs[],
    default: null as types.Expression | null
  };

  children.reverse().forEach((child, index) => {
    if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_SWITCH.CASE)) {
      const attrs = astUtil.getAttributeMap(child);
      const isAttr = attrs?.[ATTRS_SWITCH.IS];
      const inAttr = attrs?.[ATTRS_SWITCH.IN];
      if (!isAttr && !inAttr) {
        displayError(
          path.get(`children.${index}`) as NodePath,
          'Attribute "is" or "in" is required for the <Case> tag.'
        );
      }

      const childNodes = astUtil.getChildren(child);

      ret.cases.push({
        condition: inAttr
          ? types.callExpression(types.memberExpression(astUtil.getExpression(inAttr), types.identifier('includes')), [
              expression
            ])
          : types.binaryExpression('===', expression, astUtil.getExpression(isAttr)),
        children: astUtil.convertChildrenToExpression(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_SWITCH.DEFAULT)) {
      if (defaultFound) {
        displayError(path.get(`children.${index}`) as NodePath, '<Switch> tag should only contain one <Default> tag.');
      } else if (ret.cases.length === 0) {
        defaultFound = true;

        const childNodes = astUtil.getChildren(child);
        ret.default = astUtil.convertChildrenToExpression(childNodes, key, true);
      } else {
        displayError(
          path.get(`children.${index}`) as NodePath,
          '<Default> tag should be last in the children of <Switch> tag.'
        );
      }
    } else {
      displayError(
        path.get(`children.${index}`) as NodePath,
        '<Switch> tag should only contain <Case> or <Default> tags.'
      );
    }
  });

  if (ret.cases.length === 0 && !ret.default) {
    displayError(path, '<Switch> tag should contain at least one <Case> or <Default> tag.');
  }

  if (!ret.default) {
    ret.default = types.nullLiteral();
  }

  return ret;
}
