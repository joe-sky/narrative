import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import { For } from '../src/index';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, React.Fragment);

const TestFor = (props: { list: number[] }) => {
  return (
    <For of={props.list}>
      <empty>empty</empty>
      {(item, { index }) => <i key={index}>{item}</i>}
    </For>
  );
};

describe('for element', function() {
  const app = mount(<TestFor list={[1, 2, 3]} />);

  it('for', () => {
    expect(app.html()).toEqual('<i>1</i><i>2</i><i>3</i>');
  });

  const app2 = mount(<TestFor list={[]} />);

  it('for with empty', () => {
    expect(app2.html()).toEqual('empty');
  });
});
