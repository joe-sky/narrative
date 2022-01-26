import { Test, transpile } from './utils';

const onlyIfTests: Test[] = [
  {
    name: 'simple',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
      </If>
    `
  },
  {
    name: 'nesting',
    from: `
      <If when={props.condition == 1}>
        <i>test1</i>
        <If when={props.condition == 2}>
          <i>test2</i>
        </If>
      </If>
    `
  }
];

onlyIfTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
