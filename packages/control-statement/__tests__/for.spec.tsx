import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });
import { For, Empty } from '../src/index';

const TestFor = (props: { list: number[] }) => {
  return (
    <For of={props.list}>
      <Empty>{() => 'empty'}</Empty>
      {(item, { index, key }) => <i key={index}>{item}</i>}
    </For>
  );
};

const TestForObject = (props: { obj: Record<string, number> }) => {
  return (
    <For in={props.obj}>
      <Empty>empty</Empty>
      {(item, { key }) => <i key={key}>{item}</i>}
    </For>
  );
};

const TestForMap = (props: { map: Map<string, number> }) => {
  return (
    <For ofMap={props.map}>
      <Empty>{() => 'empty'}</Empty>
      {(item, { index, key }) => <i key={index}>{item}</i>}
    </For>
  );
};

const TestForWeakMap = (props: { map: WeakMap<object, number> }) => {
  return (
    <For ofMap={props.map}>
      <Empty>{() => 'empty'}</Empty>
      {(item, { index, key }) => <i key={index}>{item}</i>}
    </For>
  );
};

const TestForSet = (props: { set: Set<number> }) => {
  return (
    <For ofSet={props.set}>
      <Empty>{() => 'empty'}</Empty>
      {(item, { index }) => <i key={index}>{item}</i>}
    </For>
  );
};

const TestForWeakSet = (props: { set: WeakSet<object> }) => {
  return (
    <For ofSet={props.set}>
      <Empty>{() => 'empty'}</Empty>
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

  const app3 = mount(<TestForObject obj={{ a: 1, b: 2, c: 3 }} />);

  it('for object', () => {
    expect(app3.html()).toEqual('<i>1</i><i>2</i><i>3</i>');
  });
});
