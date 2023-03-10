import { Test, transpile } from './utils';

const switchTests: Test[] = [
  {
    name: 'simple switch',
    from: `
      <Switch value={props.value}>
        <Case is={1}>test1</Case>
        <Case is={2}>test2</Case>
        <Case is={3}>test3</Case>
      </Switch>
    `
  },
  {
    name: 'nesting switch',
    from: `
    <Switch value={props.value}>
      <Case is={1}>
        <Switch value={props.value}>
          <Case is={1}>test1</Case>
          <Case is={2}>test2</Case>
          <Case is={3}>test3</Case>
        </Switch>
      </Case>
      <Case is={2}>
        <Switch value={props.value}>
          <Case is={1}>test1</Case>
          <Case is={2}>test2</Case>
          <Case is={3}>test3</Case>
        </Switch>
      </Case>
      <Case is={3}>
        <Switch value={props.value}>
          <Case is={1}>test1</Case>
          <Case is={2}>test2</Case>
          <Case is={3}>test3</Case>
        </Switch>
      </Case>
    </Switch>
    `
  },
  {
    name: 'has values',
    from: `
      <Switch value={props.value}>
        <Case is={1}>test1</Case>
        <Case is={2}>test2</Case>
        <Case in={[3, 4, 5]}>test3</Case>
      </Switch>
    `
  },
  {
    name: 'has default',
    from: `
      <Switch value={props.value}>
        <Case is={1}>test1</Case>
        <Case is={2}>test2</Case>
        <Case is={3}>test3</Case>
        <Default>test</Default>
      </Switch>
    `
  },
  {
    name: 'function children',
    from: `
      <Switch value={props.value}>
        <Case is={1}>{() => 'test1'}</Case>
        <Case is={2}>{() => 'test2'}</Case>
        <Case is={3}>{() => 'test3'}</Case>
        <Default>{() => 'test'}</Default>
      </Switch>
    `
  },
  {
    name: 'if wrapped in Fragments',
    from: `
      const jsx = <>
        <div></div>
        <Switch value={props.value}>
          <Case is={1}>test1</Case>
          <Case is={2}>test2</Case>
          <Case is={3}>test3</Case>
        </Switch>
        <div></div>
      </>
    `
  }
];

switchTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
