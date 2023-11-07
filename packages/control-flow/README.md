# Narrative

<p>
  <a href="https://app.travis-ci.com/joe-sky/narrative"><img src="https://app.travis-ci.com/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

## Packages

| Package                                                                                                             | Badges                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@narrative/control-flow](https://github.com/joe-sky/narrative/tree/master/packages/control-flow)                   | <a href="https://www.npmjs.org/package/@narrative/control-flow"><img src="https://img.shields.io/npm/v/@narrative/control-flow.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-flow"><img src="https://img.shields.io/npm/dm/@narrative/control-flow.svg" alt="NPM Downloads"></a>                                     |
| [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) | <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/babel-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/babel-plugin-compiler.svg" alt="NPM Downloads"></a> |
| [@narrative/swc-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/swc-plugin-compiler)     | <a href="https://www.npmjs.org/package/@narrative/swc-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/swc-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/swc-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/swc-plugin-compiler.svg" alt="NPM Downloads"></a>         |
| [@narrative/vite-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/vite-plugin-compiler)   | <a href="https://www.npmjs.org/package/@narrative/vite-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/vite-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/vite-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/vite-plugin-compiler.svg" alt="NPM Downloads"></a>     |

## Introduction

`Narrative`(abbreviated as `nt`) is a compiler tool for create neater control flow tags such as `<If>`/`<Switch>`/`<For>` for React JSX/TSX. It does so by transforming component-like control flow tags to their JavaScript counterparts:

```tsx
<If when={condition()}>Hello World!</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  condition() ? 'Hello World!' : null;
}
```

The inspiration mainly comes from [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements), this tool can be seen as an alternative solution with syntactic differences to `jsx-control-statements`. It also only depends on Babel(or SWC), and it's compatible with React and React Native.

> In addition, its API has also referenced the following projects:

- [React If](https://github.com/romac/react-if)
- [React Loops](https://github.com/leebyron/react-loops)
- [Solid(Control Flow)](https://www.solidjs.com/docs/latest/api#control-flow)

### Basic Overview

```js
import { useState, FC } from 'react';
import { If, ElseIf, Else, For, Empty, Switch, Case, Default } from '@narrative/control-flow';

const App: FC = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos(todos.concat(`Item ${todos.length}`));
  };

  return (
    <div className="app">
      <ul>
        <For of={todos}>
          {(todo, { index }) => (
            <If when={index > 5}>
              <li key={index}>{todo * 3}</li>
              <ElseIf when={index > 10}>
                <li key={index}>{todo * 4}</li>
              </ElseIf>
              <Else>
                <li key={index}>{todo * 5}</li>
              </Else>
            </If>
          )}
          <Empty>
            <li>No data</li>
          </Empty>
        </For>
      </ul>
      <ul>
        <For in={{ a: 1, b: 2, c: 3 }}>
          {(item, { key }) => <li key={key}>{item}</li>}
          <Empty>
            <li>No data</li>
          </Empty>
        </For>
      </ul>
      <Switch value={todos.length}>
        <Case is={1}>1</Case>
        <Case is={2}>2</Case>
        <Case in={[3, 4, 5]}>3/4/5</Case>
        <Default>More than 2</Default>
      </Switch>
    </div>
  );
};
```

### Highlights

`Narrative` has similar or different features as `jsx-control-statements`:

- ✨ Tag names are more like native JavaScript control statements.
- 💫 More concise syntax keywords of tags.
- ⭐ Tags supports full TypeScript inference.
- ⚡ No runtime code, just need compiler.
- 🔥 Supports both Babel and SWC compilers.
- 🔧 Support syntax error prompt for Babel and SWC.

## Table of Contents

- [Installation](#installation)
  - [Using with Babel](#using-with-babel)
  - [Using with SWC](#using-with-swc)
- [Usage](#usage)
  - [If Tag](#if-tag)
    - [&lt;If&gt;](#if)
    - [&lt;Else&gt;](#else)
    - [&lt;ElseIf&gt;](#elseif)
    - [Function children of &lt;If&gt; &lt;ElseIf&gt; &lt;Else&gt;](#function-children-of-if-elseif-else)
  - [Switch Tag](#switch-tag)
    - [&lt;Switch&gt; &lt;Case&gt;](#switch-case)
    - [Multiple values of &lt;Case&gt;](#multiple-values-of-case)
    - [&lt;Default&gt;](#default)
    - [Function children of &lt;Case&gt; &lt;Default&gt;](#function-children-of-case-default)
  - [For Tag](#for-tag)
    - [&lt;For of&gt;](#for-of)
    - [&lt;For in&gt;](#for-in)
    - [Loop iteration metadata](#loop-iteration-metadata)
    - [&lt;Empty&gt;](#empty)

## Installation

### Using with Babel

```bash
npm i @narrative/control-flow @narrative/babel-plugin-compiler
```

Configure `Babel`:

```json
{
  "plugins": ["@narrative/compiler"]
}
```

### Using with SWC

```bash
npm install @narrative/control-flow @narrative/swc-plugin-compiler
```

Configure `SWC`:

```json
{
  "jsc": {
    "experimental": {
      "plugins": [["@narrative/swc-plugin-compiler", {}]]
    }
  }
}
```

## Usage

Each JSX tags must to be imported from `@narrative/control-flow` when use:

```tsx
import { If, Else, ElseIf } from '@narrative/control-flow';

function render(no: number) {
  return (
    <If when={no === 1}>
      <span>1</span>
      <ElseIf when={no === 2}>
        <span>2</span>
      </ElseIf>
      <Else>
        <span>0</span>
      </Else>
    </If>
  );
}
```

As above the usage is similar to the regular React components. Each tags and its props also support TypeScript type checking.

### If Tag

`<If>` tag is an alternative syntax for conditional logic in JSX, it is similar to the `if statement` in JavaScript. Also supports `<ElseIf>`, `<Else>`, and the syntax design fully supports JSX native formatting. Simple examples:

```tsx
import { If } from '@narrative/control-flow';

// simple
<If when={true}>
  <span>IfBlock</span>
</If>

// using multiple child elements or expressions
<If when={no < 5}>
  one
  {"two"}
  <span>three</span>
  <span>four</span>
  <ElseIf when={no >= 5}>
    <span>five</span>
  </ElseIf>
</If>
```

<details>
  <summary>Click here to view how the compiler works</summary>

```tsx
<If when={index > 5}>
  <li>{todo * 2}</li>
  <ElseIf when={index > 10}>
    <li>{todo * 3}</li>
  </ElseIf>
</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  index > 5 ? <li>{todo * 2}</li> : index > 10 ? <li>{todo * 3}</li> : null;
}
```

</details>

#### &lt;If&gt;

If only use `<If>`, the children of `<If>` will be returned when the value of `when prop` is true.

| Prop Name | Prop Type | Required           |
| --------- | --------- | ------------------ |
| when      | boolean   | :white_check_mark: |

```tsx
import { If } from '@narrative/control-flow';

<If when={no > 1}>
  <span>IfBlock1</span>
  <span>IfBlock2</span>
</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  no > 1 ? (
    <>
      <span>IfBlock1</span>
      <span>IfBlock2</span>
    </>
  ) : null;
}
```

#### &lt;Else&gt;

Only one `<Else>` can be added within a `<If>`. If the `when prop` value of `<If>` is false, then the children of `<Else>` will be returned:

```tsx
import { If, Else } from '@narrative/control-flow';

<If when={no > 1}>
  <span>IfBlock1</span>
  <span>IfBlock2</span>
  <Else>
    <span>IfBlock3</span>
    <span>IfBlock4</span>
  </Else>
</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  no > 1 ? (
    <>
      <span>IfBlock1</span>
      <span>IfBlock2</span>
    </>
  ) : (
    <>
      <span>IfBlock3</span>
      <span>IfBlock4</span>
    </>
  );
}
```

#### &lt;ElseIf&gt;

Multiple `<ElseIf>` can be added within a `<If>`, and any one of the tag children with a `when prop` of true will be returned:

```tsx
import { If, Else, ElseIf } from '@narrative/control-flow';

<If when={no > 10}>
  <span>IfBlock1</span>
  <ElseIf when={no > 5}>
    <span>IfBlock2</span>
  </ElseIf>
  <ElseIf when={no > 1}>
    <span>IfBlock3</span>
  </ElseIf>
  <Else>
    <span>IfBlock4</span>
  </Else>
</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  no > 10 ? (
    <span>IfBlock1</span>
  ) : no > 5 ? (
    <span>IfBlock2</span>
  ) : no > 1 ? (
    <span>IfBlock3</span>
  ) : (
    <span>IfBlock4</span>
  );
}
```

#### Function children of &lt;If&gt; &lt;ElseIf&gt; &lt;Else&gt;

The children of `<If>`, `<ElseIf>`, `<Else>` also supports a function. It can be used for logic that calculates first and then renders:

```tsx
import { If } from '@narrative/control-flow';

<If when={no > 1}>
  {() => {
    const blockName = 'IfBlock';

    return (
      <>
        <span>{blockName}1</span>
        <span>{blockName}2</span>
      </>
    );
  }}
  <Else>
    {() => {
      const blockName = 'ElseBlock';

      return (
        <>
          <span>{blockName}1</span>
          <span>{blockName}2</span>
        </>
      );
    }}
  </Else>
</If>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  no > 1
    ? (() => {
        const blockName = 'IfBlock';

        return (
          <>
            <span>{blockName}1</span>
            <span>{blockName}2</span>
          </>
        );
      })()
    : (() => {
        const blockName = 'ElseBlock';

        return (
          <>
            <span>{blockName}1</span>
            <span>{blockName}2</span>
          </>
        );
      })();
}
```

### Switch Tag

`<Switch>` tag is an alternative syntax for multi branch conditional statements in JSX, it is similar to the `switch statement` in JavaScript. Also supports `<Case>`, `<Default>`. Simple examples:

```tsx
import { Switch } from '@narrative/control-flow';

<Switch value={todos.length}>
  <Case is={1}>
    <span>1</span>
  </Case>
  <Case is={2}>
    <span>2</span>
  </Case>
  <Case is={3}>
    <span>3</span>
  </Case>
  <Default>
    <span>0</span>
  </Default>
</Switch>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos.length === 1 ? (
    <span>1</span>
  ) : todos.length === 2 ? (
    <span>2</span>
  ) : todos.length === 3 ? (
    <span>3</span>
  ) : (
    <span>0</span>
  );
}
```

#### &lt;Switch&gt; &lt;Case&gt;

`<Switch>` requires to set the `value prop`.

| Prop Name | Prop Type | Required           |
| --------- | --------- | ------------------ |
| value     | any       | :white_check_mark: |

Each `<Case>` matches the `value prop of <Switch>` via `is prop`. At least one `<Case>` is required within the `<Switch>`.

| Prop Name | Prop Type | Required                        |
| --------- | --------- | ------------------------------- |
| is        | any       | Either `is` or `in` is required |

Example:

```tsx
import { Switch, Case } from '@narrative/control-flow';

<Switch value={todos.length}>
  <Case is={1}>
    <span>1</span>
  </Case>
  <Case is={2}>
    <span>2</span>
  </Case>
</Switch>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos.length === 1 ? <span>1</span> : todos.length === 2 ? <span>2</span> : null;
}
```

As above, the `<Case>` use `strict equality(===)` when matching.

#### Multiple values of &lt;Case&gt;

If multiple values need to be matched in one `<Case>`, the `in prop` can be used.

| Prop Name | Prop Type            | Required                        |
| --------- | -------------------- | ------------------------------- |
| in        | ArrayLike&lt;any&gt; | Either `is` or `in` is required |

Example:

```tsx
import { Switch, Case } from '@narrative/control-flow';

<Switch value={todos.length}>
  <Case is={1}>
    <span>1</span>
  </Case>
  <Case is={2}>
    <span>2</span>
  </Case>
  <Case in={[3, 4, 5]}>
    <span>3/4/5</span>
  </Case>
</Switch>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos.length === 1 ? (
    <span>1</span>
  ) : todos.length === 2 ? (
    <span>2</span>
  ) : [3, 4, 5].includes(todos.length) ? (
    <span>3/4/5</span>
  ) : null;
}
```

#### &lt;Default&gt;

`<Switch>` can have one `<Default>` inside it, which will be matched to the `<Default>` when all `<Case>` do not match:

```tsx
import { Switch, Case, Default } from '@narrative/control-flow';

<Switch value={todos.length}>
  <Case is={1}>
    <span>1</span>
  </Case>
  <Case in={[2, 3]}>
    <span>2/3</span>
  </Case>
  <Default>
    <span>0</span>
  </Default>
</Switch>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos.length === 1 ? <span>1</span> : [2, 3].includes(todos.length) ? <span>2/3</span> : <span>0</span>;
}
```

#### Function children of &lt;Case&gt; &lt;Default&gt;

The children of `<Case>`, `<Default>` also supports a function. It can be used for logic that calculates first and then renders:

```tsx
import { Switch, Case, Default } from '@narrative/control-flow';

<Switch value={todos.length}>
  <Case is={1}>
    {() => {
      const blockName = 'CaseBlock';

      return (
        <>
          <span>{blockName}1</span>
          <span>{blockName}2</span>
        </>
      );
    }}
  </Case>
  <Default>
    {() => {
      const blockName = 'DefaultBlock';

      return (
        <>
          <span>{blockName}1</span>
          <span>{blockName}2</span>
        </>
      );
    }}
  </Default>
</Switch>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos.length === 1
    ? (() => {
        const blockName = 'CaseBlock';

        return (
          <>
            <span>{blockName}1</span>
            <span>{blockName}2</span>
          </>
        );
      })()
    : (() => {
        const blockName = 'DefaultBlock';

        return (
          <>
            <span>{blockName}1</span>
            <span>{blockName}2</span>
          </>
        );
      })();
}
```

### For Tag

`<For>` tag is an alternative syntax for loops logic in JSX. Example:

```tsx
import { For } from '@narrative/control-flow';

<For of={todos}>
  {(todo, { index }) => <li key={index}>{todo}</li>}
  <Empty>
    <li>No data</li>
  </Empty>
</For>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  (__arr => {
    if (__arr?.length) {
      return __arr.map((todo, index) => <i key={index}>{todo}</i>, this);
    }
    return <li>No data</li>;
  })(todos);
}
```

#### &lt;For of&gt;

`<For of>` loops is similar to the `for of statement` in JavaScript, the `of prop` accepts Arrays and Array-likes.

| Prop Name | Prop Type            | Required           |
| --------- | -------------------- | ------------------ |
| of        | ArrayLike&lt;any&gt; | :white_check_mark: |

The loop callback function is in children of `<For of>`, example:

```tsx
import { For } from '@narrative/control-flow';

<For of={todos}>{(todo, { index }, arr) => <li key={index}>{todo}</li>}</For>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  todos?.map?.((todo, index, arr) => {
    return <i key={index}>{todo}</i>;
  }, this) || null;
}
```

As above the callback function parameters:

| Parameter order | Type                                                | Description                 | Required           |
| --------------- | --------------------------------------------------- | --------------------------- | ------------------ |
| first           | type of Array items                                 | each items of Array         | :white_check_mark: |
| second          | [Loop iteration metadata](#loop-iteration-metadata) | mainly using index of Array |                    |
| third           | type of Array                                       | looping Array variable      |                    |

#### &lt;For in&gt;

`<For in>` loops is similar to the `for in statement` in JavaScript, the `in prop` accepts an Object.

| Prop Name | Prop Type        | Required           |
| --------- | ---------------- | ------------------ |
| in        | Record<any, any> | :white_check_mark: |

The loop callback function is in children of `<For in>`, example:

```tsx
import { For } from '@narrative/control-flow';

<For in={{ a: 1, b: 2, c: 3 }}>{(item, { key }, obj) => <i key={key}>{item}</i>}</For>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  (__obj => {
    const __keys = __obj ? Object.keys(__obj) : [];

    if (__keys.length) {
      return __keys.map(key => {
        const item = __obj[key];
        const obj = __obj;
        return <i key={key}>{item}</i>;
      }, this);
    }
  })({ a: 1, b: 2, c: 3 });
}
```

As above the callback function parameters:

| Parameter order | Type                                                | Description                  | Required           |
| --------------- | --------------------------------------------------- | ---------------------------- | ------------------ |
| first           | type of Object values                               | each values of source object | :white_check_mark: |
| second          | [Loop iteration metadata](#loop-iteration-metadata) | mainly using key and keys    |                    |
| third           | type of Object                                      | looping Object variable      |                    |

#### Loop iteration metadata

Access additional information about each iteration by the second callback argument:

- `index`: A number from 0 to the length of the Arrays or Objects.
- `key`: The key for this item in Objects, same as `index` for Arrays.
- `keys`: The keys Arrays for Objects.

```tsx
import { For, If } from '@narrative/control-flow';

<For in={{ a: 1, b: 2, c: 3 }}>
  {(item, { key, index, keys }) => (
    <i key={key}>
      {item}
      <If when={keys.length > 2 && index > 1}>{index}</If>
    </i>
  )}
</For>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  (__obj => {
    const __keys = __obj ? Object.keys(__obj) : [];

    if (__keys.length) {
      return __keys.map((key, index) => {
        const item = __obj[key];
        const keys = __keys;
        return (
          <i key={key}>
            {item}
            {keys.length > 2 && index > 1 ? index : null}
          </i>
        );
      }, this);
    }
  })({ a: 1, b: 2, c: 3 });
}
```

#### &lt;Empty&gt;

A common pattern when rendering a collection is to render a special case when the collection is empty. Optionally provide a `<Empty>` to handle this case for both `<For in>` and `<For of>` loops. `<Empty>` should be set in the children of `<For>`, Example:

```tsx
import { For, Empty } from '@narrative/control-flow';

const emptyObj = {};

<For in={emptyObj}>
  {(item, { key }) => <i key={key}>{item}</i>}
  <Empty>No Data</Empty>
</For>;

// Compiled ↓ ↓ ↓ ↓ ↓ ↓

{
  (__obj => {
    const __keys = __obj ? Object.keys(__obj) : [];

    if (__keys.length) {
      return __keys.map(key => {
        const item = __obj[key];
        return <i key={key}>{item}</i>;
      }, this);
    }

    return 'No Data';
  })(emptyObj);
}
```

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<p>
  <img src="https://user-images.githubusercontent.com/12705724/128486426-a0a22884-7ea4-4b64-ae17-a19bc43dd3f2.jpg" alt="Narrative" width="800" />
</p>

## License

MIT
