import { Test, transpile } from './utils';

const switchTests: Test[] = [
  {
    name: 'simple switch',
    from: `
      <Switch expr={props.value}>
        <Case value={1}>test1</Case>
        <Case value={2}>test2</Case>
        <Case value={3}>test3</Case>
      </Switch>
    `
  },
  {
    name: 'nesting switch',
    from: `
    <Switch expr={props.value}>
      <Case value={1}>
        <Switch expr={props.value}>
          <Case value={1}>test1</Case>
          <Case value={2}>test2</Case>
          <Case value={3}>test3</Case>
        </Switch>
      </Case>
      <Case value={2}>
        <Switch expr={props.value}>
          <Case value={1}>test1</Case>
          <Case value={2}>test2</Case>
          <Case value={3}>test3</Case>
        </Switch>
      </Case>
      <Case value={3}>
        <Switch expr={props.value}>
          <Case value={1}>test1</Case>
          <Case value={2}>test2</Case>
          <Case value={3}>test3</Case>
        </Switch>
      </Case>
    </Switch>
    `
  },
  {
    name: 'has values',
    from: `
      <Switch expr={props.value}>
        <Case value={1}>test1</Case>
        <Case value={2}>test2</Case>
        <Case values={[3, 4, 5]}>test3</Case>
      </Switch>
    `
  },
  {
    name: 'has default',
    from: `
      <Switch expr={props.value}>
        <Case value={1}>test1</Case>
        <Case value={2}>test2</Case>
        <Case value={3}>test3</Case>
        <Default>test</Default>
      </Switch>
    `
  },
  {
    name: 'function children',
    from: `
      <Switch expr={props.value}>
        <Case value={1}>{() => 'test1'}</Case>
        <Case value={2}>{() => 'test2'}</Case>
        <Case value={3}>{() => 'test3'}</Case>
        <Default>{() => 'test'}</Default>
      </Switch>
    `
  }
];

switchTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
