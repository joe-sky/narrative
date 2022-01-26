import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { For, Empty } from '../src/index';

const TestFor = (props: { list: number[] | null }) => {
  return (
    <div>
      <For of={props.list}>{(item, { index }) => <i key={index}>{item}</i>}</For>
    </div>
  );
};

const TestForIndexAlias = (props: { list: number[] | null }) => {
  return (
    <div>
      <For of={props.list}>{(item, { index: i }) => <i key={i}>{item}</i>}</For>
    </div>
  );
};

test('for without empty', function() {
  const el = render(<TestFor list={[1, 2, 3]} />);
  expect(el.container.firstChild).toMatchSnapshot(`<div><i>1</i><i>2</i><i>3</i></div>`);
  el.unmount();

  const el2 = render(<TestFor list={[]} />);
  expect(el2.container.firstChild).toMatchSnapshot(`<div></div>`);
  el2.unmount();

  const el3 = render(<TestFor list={null} />);
  expect(el3.container.firstChild).toMatchSnapshot(`<div></div>`);

  const el4 = render(<TestForIndexAlias list={[1, 2, 3]} />);
  expect(el4.container.firstChild).toMatchSnapshot(`<div><i>1</i><i>2</i><i>3</i></div>`);
});

const TestForEmpty = (props: { list: number[] | null }) => {
  return (
    <div>
      <For of={props.list}>
        {(item, { index }) => <i key={index}>{item}</i>}
        <Empty>empty</Empty>
      </For>
    </div>
  );
};

const TestForFuncEmpty = (props: { list: number[] }) => {
  return (
    <For of={props.list}>
      {(item, { index }) => <i key={index}>{item}</i>}
      <Empty>{() => 'empty'}</Empty>
    </For>
  );
};

test('for with empty', function() {
  const el = render(<TestForEmpty list={[]} />);
  expect(el.container.firstChild).toMatchSnapshot(`empty`);
  el.unmount();

  const el2 = render(<TestForFuncEmpty list={[]} />);
  expect(el2.container.firstChild).toMatchSnapshot(`empty`);
});

const TestForObject = (props: { obj: Record<string, number> }) => {
  return (
    <div>
      <For in={props.obj}>
        {(item, { key }) => <i key={key}>{item}</i>}
        <Empty>empty</Empty>
      </For>
    </div>
  );
};

test('for object', function() {
  const el = render(<TestForObject obj={{ a: 1, b: 2, c: 3 }} />);
  expect(el.container.firstChild).toMatchSnapshot(`<i>1</i><i>2</i><i>3</i>`);
});
