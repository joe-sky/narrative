import React from 'react';
import { render } from '@testing-library/react';
import { If, Else, ElseIf } from '../src/index';

interface Props {
  condition?: number;
}

const OnlyIf: React.FC<Props> = props => {
  return (
    <If when={props.condition == 1}>
      <i>test1</i>
    </If>
  );
};

test('only if', () => {
  const el = render(<OnlyIf condition={1} />);
  expect(el.queryByText('test1')).toBeInTheDocument();
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<OnlyIf condition={2} />);
  expect(el2.queryByText('test1')).toBeNull();
});

const IfAndElse: React.FC<Props> = props => {
  return (
    <If when={props.condition == 1}>
      <i>test1</i>
      <Else>
        <i>else</i>
      </Else>
    </If>
  );
};

test('if and else', () => {
  const el = render(<IfAndElse condition={1} />);
  expect(el.queryByText('test1')).toBeInTheDocument();
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<IfAndElse condition={2} />);
  expect(el2.queryByText('else')).toBeInTheDocument();
  expect(el2.container.firstChild).toMatchSnapshot();
});

const IfAndElseIf: React.FC<Props> = props => {
  return (
    <If when={props.condition == 1}>
      <i>test1</i>
      <ElseIf when={props.condition == 2}>{() => <i>test2</i>}</ElseIf>
      <ElseIf when={props.condition == 3}>
        <i>test3</i>
      </ElseIf>
    </If>
  );
};

test('if and else', () => {
  const el = render(<IfAndElseIf condition={1} />);
  expect(el.queryByText('test1')).toBeInTheDocument();
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<IfAndElseIf condition={3} />);
  expect(el2.queryByText('test3')).toBeInTheDocument();
  expect(el2.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el3 = render(<IfAndElseIf condition={0} />);
  expect(el3.queryByText('<i>')).toBeNull();
});

const AllIfTags: React.FC<Props> = props => {
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

test('all if tags', () => {
  const el = render(<AllIfTags condition={1} />);
  expect(el.queryByText('test1')).toBeInTheDocument();
  expect(el.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el2 = render(<AllIfTags condition={3} />);
  expect(el2.queryByText('test3')).toBeInTheDocument();
  expect(el2.container.firstChild).toMatchSnapshot();
  el.unmount();

  const el3 = render(<AllIfTags condition={0} />);
  expect(el3.queryByText('else')).toBeInTheDocument();
  expect(el3.container.firstChild).toMatchSnapshot();
});
