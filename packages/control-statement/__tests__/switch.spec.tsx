import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import '../src/index';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, React.Fragment);

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

describe('switch element', function() {
  const app = mount(<TestSwitch expression={2} />);

  it('switch', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
