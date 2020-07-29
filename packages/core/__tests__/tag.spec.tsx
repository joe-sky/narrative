import React, { Component, useState, useEffect, Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '../src/index';
/** @jsx jsx */
const jsx = nt.bind<React.ReactElement>(React.createElement);

nt.registerTag('if', (h, props, ...children) => {
  if (props?.condition) {
    return children.length === 1 ? children[0] : h(Fragment, null, children);
  } else {
    return null;
  }
});

const TestIf = props => {
  return (
    <if condition={props.condition}>
      <i>test</i>
    </if>
  );
};

describe('tags', function() {
  const app = mount(<TestIf condition={true} />);
  console.log(<if condition={true}>test111</if>);

  it('if', () => {
    expect(app.html()).toEqual('<i>test</i>');
  });
});
