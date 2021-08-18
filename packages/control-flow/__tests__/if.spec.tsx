import React, { useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { If, Else, ElseIf } from '../src/index';

interface Props {
  condition?: number;
}

const TestIf: React.FC<Props> = props => {
  return (
    <If when={props.condition == 1}>
      <i>test1</i>
      <ElseIf when={props.condition == 2}>{() => <i>test2</i>}</ElseIf>
      <ElseIf when={props.condition == 3}>
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
    <If when={false}>
      test111
      <ElseIf when={true}>{() => 'test3'}</ElseIf>
      <Else>test2</Else>
    </If>
  );

  it('if', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
