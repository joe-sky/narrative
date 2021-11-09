import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { For, Empty } from '../src/index';

const TestFor = (props: { list: number[] }) => {
  return (
    <For of={props.list}>
      {(item, { index }) => <i key={index}>{item}</i>}
      {/* <Empty>empty</Empty> */}
    </For>
  );
};

const TestForFuncEmpty = (props: { list: number[] }) => {
  return (
    <For of={props.list}>
      {(item, { index }) => <i key={index}>{item}</i>}
      {/* <Empty>{() => 'empty'}</Empty> */}
    </For>
  );
};

// const TestForObject = (props: { obj: Record<string, number> }) => {
//   return (
//     <For in={props.obj}>
//       {(item, { key }) => <i key={key}>{item}</i>}
//       <Empty>empty</Empty>
//     </For>
//   );
// };

describe('for element', function() {
  const app = mount(<TestFor list={[1, 2, 3]} />);

  it('for', () => {
    expect(app.html()).toEqual('<i>1</i><i>2</i><i>3</i>');
  });

  // const appWithEmpty = mount(<TestFor list={[]} />);

  // it('for with empty', () => {
  //   expect(appWithEmpty.html()).toEqual('empty');
  // });

  // const appWithFuncEmpty = mount(<TestForFuncEmpty list={[]} />);

  // it('for with function empty', () => {
  //   expect(appWithFuncEmpty.html()).toEqual('empty');
  // });

  // const appObject = mount(<TestForObject obj={{ a: 1, b: 2, c: 3 }} />);

  // it('for object', () => {
  //   expect(appObject.html()).toEqual('<i>1</i><i>2</i><i>3</i>');
  // });
});
