import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
import { For, Empty, If } from '../src/index';

const TestFor = (props: { list: number[] | null }) => {
  return (
    <div>
      <For of={props.list}>
        {(item, { index }, arr) => (
          <Fragment key={index}>
            <i>{item}</i>
            <If when={index < arr.length - 1}> </If>
          </Fragment>
        )}
      </For>
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

test('for without empty', () => {
  const el = render(<TestFor list={[1, 2, 3]} />);
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<TestFor list={[]} />);
  expect(el2.container.firstChild).toMatchSnapshot();
  el2.unmount();

  const el3 = render(<TestFor list={null} />);
  expect(el3.container.firstChild).toMatchSnapshot();

  const el4 = render(<TestForIndexAlias list={[1, 2, 3]} />);
  expect(el4.container.firstChild).toMatchSnapshot();
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

test('for with empty', () => {
  const el = render(<TestForEmpty list={[]} />);
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<TestForFuncEmpty list={[]} />);
  expect(el2.container.firstChild).toMatchSnapshot();
});

const TestForObject = (props: { obj: Record<string, number> }) => {
  return (
    <div>
      <For in={props.obj}>
        {(value, { key, index, keys }, obj) => (
          <Fragment key={key}>
            <If when={value !== 0}>
              <i>{obj.prefix}</i>
              <i>{value}</i>
            </If>
            <If when={index < keys.length - 2}> </If>
          </Fragment>
        )}
        <Empty>empty</Empty>
      </For>
    </div>
  );
};

test('for object', () => {
  const el = render(<TestForObject obj={{ a: 1, b: 2, c: 3, prefix: 0 }} />);
  expect(el.container.firstChild).toMatchSnapshot();
});
