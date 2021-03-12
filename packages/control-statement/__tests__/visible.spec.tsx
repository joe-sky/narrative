import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });
import { visible } from '../src/index';

const TestVisible: React.FC<{ visible: boolean }> = props => {
  return <i {...visible(props.visible)}>test</i>;
};

describe('visible attribute', function() {
  const app = mount(<TestVisible visible={false} />);

  it('visible false', () => {
    expect(app.html()).toContain('<i style="display: none;">test</i>');
  });

  const app2 = mount(<TestVisible visible />);

  it('visible true', () => {
    expect(app2.html()).toContain('<i>test</i>');
  });
});
