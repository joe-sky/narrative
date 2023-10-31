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

`Narrative`(abbreviated as `nt`) is a compiler tool for create neater control flow tags such as `<If>`/`<For>`/`<Switch>` for React JSX/TSX.

The inspiration comes from [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements), it's an alternative solution with syntactic differences to `jsx-control-statements`.

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

### Features

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
  - [Switch Tag](#switch-tag)
  - [For Tag](#for-tag)

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

As above the usage is similar to the regular React components. Each tags and its attributes also support TypeScript type checking.

### If Tag

`<If>` tags used to write conditional logic in JSX, it is similar to the `if statement` in JavaScript. Also supports `<ElseIf>`, `<Else>`, and the syntax design fully supports JSX native formatting. Simple examples:

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

If only use `<If>`, the body of `<If>` will be returned when the value of `when attribute` is true.

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

Only one `<Else>` can be added within a `<If>`. If the `when attribute` value of `<If>` is false, then the body of `<Else>` will be returned:

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

Multiple `<ElseIf>` can be added within a `<If>`, and any one of the tag bodys with a `when attribute` of true will be returned:

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

#### Function Body of &lt;If&gt;

The body of `<If>`, `<ElseIf>`, `<Else>` also supports a function. It can be used for logic that calculates first and then renders:

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

### For Tag

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<p>
  <img src="https://user-images.githubusercontent.com/12705724/128486426-a0a22884-7ea4-4b64-ae17-a19bc43dd3f2.jpg" alt="Narrative" width="800" />
</p>

## License

MIT
