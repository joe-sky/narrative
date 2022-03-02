import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { Switch, Case, Default } from '../src/index';

interface Props {
  expression?: number;
  expressionStr?: string;
}

const TestSwitch: React.FC<Props> = props => {
  return (
    <Switch value={props.expression}>
      <Case is={1}>
        <i>test1</i>
      </Case>
      <Case is={2}>
        <i>test2</i>
      </Case>
      <Default>
        <i>test3</i>
      </Default>
    </Switch>
  );
};

test('switch-case with value', function () {
  const el = render(<TestSwitch expression={2} />);
  expect(el.container.firstChild).toMatchSnapshot(`<i>test2</i>`);
});

const TestSwitchValues: React.FC<Props> = props => {
  return (
    <Switch value={props.expressionStr}>
      <Case is="1">
        <i>test1</i>
      </Case>
      <Case in={['2', '3']}>
        <i>test2</i>
      </Case>
      <Default>
        <i>test3</i>
      </Default>
    </Switch>
  );
};

test('switch-case with values', function () {
  const el = render(<TestSwitchValues expressionStr="2" />);
  expect(el.container.firstChild).toMatchSnapshot(`<i>test2</i>`);
});
