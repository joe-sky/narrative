import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import '../src/index';

/** @jsx jsx */
const jsx = nt.bind<React.ReactElement>(React.createElement, React.Fragment);

const TestFor = props => {
  return <for of={[1, 2, 3]}>{item => <i>{item}</i>}</for>;
};

describe('if element', function() {
  const app = mount(<TestFor condition={false} />);

  it('if', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
