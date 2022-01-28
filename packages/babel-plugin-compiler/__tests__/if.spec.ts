import { Test, transpile } from './utils';

const ifTests: Test[] = [
  {
    name: 'simple if',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
      </If>
    `
  },
  {
    name: 'nesting if',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
        <If when={props.condition == 2}>
          <i>test2</i>
        </If>
      </If>
    `
  },
  {
    name: 'else if',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
        <ElseIf when={props.condition == 2}>
          <i>test2</i>
        </ElseIf>
      </If>
    `
  },
  {
    name: 'else',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
        <ElseIf when={props.condition == 2}>
          <i>test2</i>
        </ElseIf>
        <Else>
          <i>test3</i>
        </Else>
      </If>
    `
  },
  {
    name: 'function children',
    from: `
      <If when={props.condition == 1}>
        {() => <i>test1</i>}
        <Else>
          {() => <i>test2</i>}
        </Else>
      </If>
    `
  }
];

ifTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
