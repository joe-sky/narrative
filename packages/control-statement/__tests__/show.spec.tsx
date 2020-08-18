import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import { show } from '../src/index';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, React.Fragment);

const TestShow: React.FC<{ show: boolean }> = props => {
  return <i {...show(props.show)}>test</i>;
};

describe('show attribute', function() {
  const app = mount(<TestShow show={false} />);

  it('show false', () => {
    expect(app.html()).toContain('<i style="display: none;">test</i>');
  });

  const app2 = mount(<TestShow show />);

  it('show true', () => {
    expect(app2.html()).toContain('<i>test</i>');
  });
});
