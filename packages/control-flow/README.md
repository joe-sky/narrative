# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

## Packages

| Package                                                                                                             | Badges                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@narrative/control-flow](https://github.com/joe-sky/narrative/tree/master/packages/control-flow)                   | <a href="https://www.npmjs.org/package/@narrative/control-flow"><img src="https://img.shields.io/npm/v/@narrative/control-flow.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-flow"><img src="https://img.shields.io/npm/dm/@narrative/control-flow.svg" alt="NPM Downloads"></a>                                     |
| [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) | <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/babel-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/babel-plugin-compiler.svg" alt="NPM Downloads"></a> |
| [@narrative/vite-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/vite-plugin-compiler)   | <a href="https://www.npmjs.org/package/@narrative/vite-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/vite-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/vite-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/vite-plugin-compiler.svg" alt="NPM Downloads"></a>     |

## Introduction

`Narrative`(abbreviated as `nt`) is a compiler tool for create neater control flow tags such as `<If>`/`<For>`/`<Switch>` for JSX/TSX.

> Current status: WIP.

[Live demo is here.](https://codesandbox.io/s/green-resonance-3fz52)

## Features

- ⚡ No runtime code, 0kb size.

<!-- - 🌟 **Goal:** A utility-first idea that run JSX at any expressions or statements.
- ✨ **Small:** Tiny size. `core`(about `750b`, can be used independently); `control-statement`(about `1.2kb`, optional).
- 💫 **Simple:** No new syntax, just like regular JSX.
- ⭐ **Type safe:** Developed by TypeScript, supports type inference.
- 🔥 **Cross frameworks:** One write, run in multiple frameworks(React/Vue/Vanilla JS/etc).
- 🔧 **Extensible:** Everything is extensible.
- 🚀 **No dependencies** No any dependencies(except compiler). -->

## Table of Contents

<!-- - [Features](#features) -->

- [Packages](#packages)
- [Installation](#installation)
  - [Using with Babel](#using-with-babel)
- [Basic Overview](#basic-overview)
- [The Origin of Name](#the-origin-of-name)

## Installation

### Using with Babel

```bash
npm i @narrative/control-flow @narrative/babel-plugin-compiler
```

.babelrc:

```json
{
  "plugins": ["@narrative/compiler"]
}
```

## Basic Overview

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
      <Switch expr={todos.length}>
        <Case value={1}>1</Case>
        <Case value={2}>2</Case>
        <Case values={[3, 4, 5]}>3/4/5</Case>
        <Default>More than 2</Default>
      </Switch>
    </div>
  );
};
```

> At present, the features of above tags has been fully implemented, and next the documentation needs to be completed.

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<p>
  <img src="https://user-images.githubusercontent.com/12705724/128486426-a0a22884-7ea4-4b64-ae17-a19bc43dd3f2.jpg" alt="Narrative" width="800" />
</p>

## License

MIT
