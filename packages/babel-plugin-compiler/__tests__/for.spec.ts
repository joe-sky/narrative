import { Test, transpile } from './utils';

const onlyForTests: Test[] = [
  {
    name: 'of',
    from: `
      <For of={[1, 2, 3]}>
        {item => <i>{item}</i>}
      </For>
    `
  },
  {
    name: 'in',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key }) => <i key={key}>{item}</i>}
      </For>
    `
  },
  {
    name: 'in with func block',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key }) => {
          console.log(item);
          return <i key={key}>{item}</i>;
        }}
      </For>
    `
  }
];

onlyForTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
