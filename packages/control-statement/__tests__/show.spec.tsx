import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });
import { show } from '../src/index';

const TestShow: React.FC<{ show: boolean }> = props => {
  return (
    <span>
      <i {...show(props.show)}>test</i>
    </span>
  );
};

describe('show attribute', function() {
  const app = mount(<TestShow show={false} />);

  it('show false', () => {
    expect(app.html()).not.toContain('test');
  });

  const app2 = mount(<TestShow show />);

  it('show true', () => {
    expect(app2.html()).toContain('<i>test</i>');
  });
});
