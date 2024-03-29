import { Test, transpile } from './utils';

const forTests: Test[] = [
  {
    name: 'for of',
    from: `
      <For of={[1, 2, 3]}>
        {item => <i>{item}</i>}
      </For>
    `
  },
  {
    name: 'for in',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key }) => <i key={key}>{item}</i>}
      </For>
    `
  },
  {
    name: 'for in with function block',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key }) => {
          console.log(item);
          return <i key={key}>{item}</i>;
        }}
      </For>
    `
  },
  {
    name: 'has index',
    from: `
      <For of={[1, 2, 3]}>
        {(item, { index }) => <i key={index}>{item}</i>}
      </For>
    `
  },
  {
    name: 'has index alias',
    from: `
      <For of={[1, 2, 3]}>
        {(item, { index: i }) => <i key={i}>{item}</i>}
      </For>
    `
  },
  {
    name: 'for of with empty',
    from: `
      <For of={[1, 2, 3]}>
        {item => <i>{item}</i>}
        <Empty>no data</Empty>
      </For>
    `
  },
  {
    name: 'for in with empty',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key }) => <i key={key}>{item}</i>}
        <Empty>no data</Empty>
      </For>
    `
  },
  {
    name: 'has key alias',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key: k, index: i }) => <i key={k}>{item}-{i}</i>}
        <Empty>no data</Empty>
      </For>
    `
  },
  {
    name: 'for of with function children empty',
    from: `
      <For of={[1, 2, 3]}>
        {item => <i>{item}</i>}
        <Empty>{() => 'no data'}</Empty>
      </For>
    `
  },
  {
    name: 'for wrapped in Fragments',
    from: `
      const jsx = <>
        <div></div>
        <For of={[1, 2, 3]}>
          {item => <i>{item}</i>}
        </For>
        <div></div>
      </>
    `
  },
  {
    name: 'for of with source',
    from: `
      <For of={[1, 2, 3]}>
        {(item, { index }, arr) => (
          <i>
            {item}
            <If when={index < arr.length - 1}> </If>
          </i>
        )}
      </For>
    `
  },
  {
    name: 'for in with source',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key, index }, obj) => (
          <i key={key}>
            {item}
            <If when={index < Object.keys(obj).length - 1}> </If>
          </i>
        )}
        <Empty>no data</Empty>
      </For>
    `
  },
  {
    name: 'for in with keys',
    from: `
      <For in={{ a: 1, b: 2, c: 3 }}>
        {(item, { key, index, keys }) => (
          <i key={key}>
            {item}
            <If when={index < keys.length - 1}> </If>
          </i>
        )}
        <Empty>no data</Empty>
      </For>
    `
  }
];

forTests.forEach(({ name, from }) => {
  test(name, async () => {
    expect(await transpile(from)).toMatchSnapshot(name);
  });
});
