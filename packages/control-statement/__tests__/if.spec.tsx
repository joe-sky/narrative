import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import '../src/index';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, React.Fragment);

const TestIf = props => {
  return (
    <if condition={props.condition}>
      <i>test</i>
      <else>
        <i>test2</i>
      </else>
    </if>
  );
};

describe('if element', function() {
  const app = mount(<TestIf condition={false} />);
  console.log(
    <nt-if condition={false}>
      test111
      <nt-elseif condition={true}>test3</nt-elseif>
      <nt-else>test2</nt-else>
    </nt-if>
  );

  it('if', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
