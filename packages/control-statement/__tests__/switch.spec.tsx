import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import { Switch, Case, Default } from '../src/index';

/** @jsx ntH */
const ntH = nt.bind(React.createElement, { Fragment });

const TestSwitch = props => {
  return (
    <nt-switch expression={props.expression}>
      <case value={1}>
        <i>test1</i>
      </case>
      <case value={2}>
        <i>test2</i>
      </case>
      <default>
        <i>test3</i>
      </default>
    </nt-switch>
  );
};

const TestSwitchComponent = props => {
  return (
    <Switch expression={props.expression}>
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

describe('switch element', function() {
  const app = mount(<TestSwitch expression={2} />);

  it('switch', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });

  const app2 = mount(<TestSwitchComponent expression={2} />);

  it('switch component', () => {
    expect(app2.html()).toEqual('<i>test2</i>');
  });
});
