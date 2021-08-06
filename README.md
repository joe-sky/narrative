# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

`Narrative`(abbreviated as `nt`) is a compiler tool for create neater control flow tags `<If>`/`<For>`/`<Switch>` for JSX/TSX.

> Current status: WIP.

[Live demo is here.](https://codesandbox.io/s/green-resonance-3fz52)

## Table of Contents

<!-- - [Features](#features) -->

- [Packages](#packages)
- [Installation](#installation)
  - [Using with Babel](#using-with-babel)
- [Basic Overview](#basic-overview)
- [The Origin of Name](#the-origin-of-name)

<!-- ## Features

- 🌟 **Goal:** A utility-first idea that run JSX at any expressions or statements.
- ✨ **Small:** Tiny size. `core`(about `750b`, can be used independently); `control-statement`(about `1.2kb`, optional).
- 💫 **Simple:** No new syntax, just like regular JSX.
- ⭐ **Type safe:** Developed by TypeScript, supports type inference.
- 🔥 **Cross frameworks:** One write, run in multiple frameworks(React/Vue/Vanilla JS/etc).
- ⚡ **Fast:** Be as fast as possible at runtime. Optional compiler optimizations are also supported.
- 🔧 **Extensible:** Everything is extensible.
- 🚀 **No dependencies** No any dependencies(except compiler). -->

## Packages

| Package                                                                                                             | Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@narrative/control-flow](https://github.com/joe-sky/narrative/tree/master/packages/control-statement)              | <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/v/@narrative/control-statement.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/dm/@narrative/control-statement.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/control-statement"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/control-statement.svg?style=flat" alt="Minzipped Size"></a> |
| [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) | <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/babel-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/babel-plugin-compiler.svg" alt="NPM Downloads"></a>                                                                                                                                                                                      |

## Installation

### Using with Babel

```bash
npm i @narrative/babel-plugin-compiler
```

.babelrc:

```json
{
  "plugins": ["@narrative/compiler"]
}
```

## Basic Overview

> The following has not yet been fully implemented.

```js
import { useState, FC } from 'react';
import { If, ElseIf, Else, For, Empty, Show, Switch, Case, Default } from '@narrative/control-flow';

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
              <li>{todo * 3}</li>
              <ElseIf when={index > 10}>
                <li>{todo * 4}</li>
              </ElseIf>
              <Else>
                <li>{todo * 5}</li>
              </Else>
            </If>
          )}
          <Empty>No data</Empty>
        </For>
      </ul>
      <Show when={todos.length < 10}>
        <button onClick={addTodo}>Add Todo</button>
      </Show>
      <Switch expr={todos.length}>
        <Case when={1}>1</Case>
        <Case when={2}>2</Case>
        <Default>More than 2</Default>
      </Switch>
    </div>
  );
};
```

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<p>
  <img src="https://user-images.githubusercontent.com/12705724/128486426-a0a22884-7ea4-4b64-ae17-a19bc43dd3f2.jpg" alt="Narrative" width="800" />
</p>

## License

MIT
