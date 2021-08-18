import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { Switch, Case, Default } from '../src/index';

interface Props {
  expression?: number;
  expressionStr?: string;
}

const TestSwitch: React.FC<Props> = props => {
  return (
    <Switch expr={props.expression}>
      <Case value={1}>
        <i>test1</i>
      </Case>
      <Case value={2}>
        <i>test2</i>
      </Case>
      <Default>
        <i>test3</i>
      </Default>
    </Switch>
  );
};

const TestSwitchComponent: React.FC<Props> = props => {
  return (
    <Switch expr={props.expressionStr}>
      <Case value="1">
        <i>test1</i>
      </Case>
      <Case values={['2', '3']}>
        <i>test2</i>
      </Case>
      <Default>
        <i>test3</i>
      </Default>
    </Switch>
  );
};

describe('switch element', function() {
  const app = mount(<TestSwitch expression={2} />);

  it('switch', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });

  const app2 = mount(<TestSwitchComponent expressionStr="2" />);

  it('switch component', () => {
    expect(app2.html()).toEqual('<i>test2</i>');
  });
});
