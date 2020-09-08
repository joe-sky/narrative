import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });
import { If, Else, ElseIf } from '../src/index';

const TestIf = props => {
  return (
    <If condition={props.condition == 1}>
      <i>test1</i>
      <ElseIf condition={props.condition == 2}>{() => <i>test2</i>}</ElseIf>
      <ElseIf condition={props.condition == 3}>
        <i>test3</i>
      </ElseIf>
      <Else>
        <i>else</i>
      </Else>
    </If>
  );
};

describe('if element', function() {
  const app = mount(<TestIf condition={2} />);
  console.log(
    <If condition={false}>
      test111
      <ElseIf condition={true}>{() => 'test3'}</ElseIf>
      <Else>test2</Else>
    </If>
  );

  it('if', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
