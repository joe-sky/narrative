import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '../src/index';

/** @jsx jsx */
const jsx = nt.bind<React.ReactElement>(React.createElement, React.Fragment);

nt.registerElement('p-in-div', ({ h }, props, ...children) => <div {...props}>{h('p', null, ...children)}</div>);

const TestPinDiv = props => {
  return <p-in-div>test</p-in-div>;
};

describe('custom elements', function() {
  const app = mount(<TestPinDiv />);

  it('p-in-div', () => {
    expect(app.html()).toContain('<p>test</p>');
  });
});
