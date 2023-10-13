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
- [The Origin of Name](#the-origin-of-name)

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

### If Tag

### Switch Tag

### For Tag

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<p>
  <img src="https://user-images.githubusercontent.com/12705724/128486426-a0a22884-7ea4-4b64-ae17-a19bc43dd3f2.jpg" alt="Narrative" width="800" />
</p>

## License

MIT
