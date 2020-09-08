# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

`Narrative`(abbreviated as `nt`) is a tiny library(about `800b`) that **create a kind of useful JSX Functional Elements and Attributes**. It's type safe and can cross environments(React/Vue/Preact/htm/vanilla js/etc).

> Currently it is in the experimental stage.

## JSX !== React JSX

There are many frameworks using JSX at present, such as React/Vue/[Omi](https://github.com/Tencent/omi)/etc. **So this library is just created for JSX, not just for React JSX**. But it can also adapt to various frameworks that use JSX, and follow the JSX pattern. 😉

## Packages

| Package                                                                                                             | Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@narrative/core](https://github.com/joe-sky/narrative/tree/master/packages/core)                                   | <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/v/@narrative/core.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/dm/@narrative/core.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/core"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/core.svg?style=flat" alt="Minzipped Size"></a>                                                                               |
| [@narrative/control-statement](https://github.com/joe-sky/narrative/tree/master/packages/control-statement)         | <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/v/@narrative/control-statement.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/dm/@narrative/control-statement.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/control-statement"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/control-statement.svg?style=flat" alt="Minzipped Size"></a> |
| [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) | <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/babel-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/babel-plugin-compiler.svg" alt="NPM Downloads"></a>                                                                                                                                                                                      |

## Features

- 🌟 **Goal:** A wonderful idea, run JSX at any expressions or statements.
- ✨ **Small:** Tiny size. `core`(about `800b`, can be used independently); `control-statement`(about `1.2kb`, optional).
- 💫 **Simple:** No new syntax, just like native JSX.
- ⭐ **Type safe:** Fully developed by TypeScript, fully supports type inference.
- 🔥 **Cross environments:** One write, run in multiple environments(React/Vue/etc).
- ⚡ **Fast:** Be as fast as possible at runtime. Optional compiler optimizations are also supported.
- 🔧 **Extensible:** Everything is extensible.
- 🚀 **No dependencies**

## Installation

```bash
npm install @narrative/core @narrative/control-statement
```

## Basic Usage

`Narrative` usually needs to work with a host framework, let's take a look at a React example. We use `nt.bind` to bind React as the host, and use `@jsx` to tell the compiler that `JSX factory` has changed:

```js
import React, { Fragment } from 'react';
import * as nt from '@narrative/core';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });
```

Then we can use the `Narrative` registered Elements and Attributes:

```js
import { If, ElseIf, For, show } from '@narrative/control-statement';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState([]);

  const addTodo = () => {
    setTodos(todos.concat(`Item ${todos.length}`));
  };

  return (
    <div className="app">
      <ul>
        <For of={todos}>
          {(todo, { index }) => (
            <If condition={index > 5}>
              <li>{todo * 2}</li>
              <ElseIf condition={index > 10}>
                <li>{todo * 3}</li>
              </ElseIf>
            </If>
          )}
        </For>
      </ul>
      <button {...show(todos.length < 10)} onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
};
```

The feature of above example:

- `If/ElseIf/For` are not normal React components, they will not be parsed to the VDOM by React. Actually, they are special functions which is handled by `Narrative`.

- The same, `show` is not a normal JSX spread attribute, it also is a special function which is handled by `Narrative`.

## The Benefit

- To do

### Elements

### Attributes

## Performance

- To do

## Why

At present, there are some Babel plugins that can implement special JSX syntax, such as:

- [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements) (React)

- [babel-plugin-react-directives](https://github.com/peakchen90/babel-plugin-react-directives) (React)

- [@vue/babel-plugin-jsx](https://github.com/vuejs/jsx-next) (Vue)

All of these schemes only deal with JSX syntax at compile time, so the performance can be optimized to be very good without additional runtime code.

### New issues

But recently, Unbundled build tools(such as: [Vite](https://github.com/vitejs/vite)/[Snowpack](https://github.com/pikapkg/snowpack)) have come into people's view, they all use extremely fast tool `esbuild` to convert JSX by default. So the Babel plugins often can't be used(or not work perfectly) when using the new type build tools.

### Another way of thinking

At this point, we can think in a different way:

**Is there any way we can accept it at runtime? It's solved without compiling.**

It turns out that it is feasible to implement JSX special syntax at runtime, such as these libraries:

- [react-if](https://github.com/romac/react-if)

- [react-loops](https://github.com/leebyron/react-loops)

These are two excellent implementations of react JSX syntax, but they can't run in other environments like preact/Vue.

## Inspiration

`Narrative` inspired by `react-if` and `react-loops`, it fully supports runtime, so users will no longer have to worry about JSX compiler problems! :wink:

And the author is also proficient in developing Babel plugins, so the optional [babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) can provide better performance.

## About Vue

Vue(v3):

```js
import * as Vue from 'vue';
import * as nt from '@narrative/core';

/** @jsx jsx */
const jsx = nt.bind(Vue.h);
```

Vue(v2):

- To do

## Roadmap

- To do

## Who is using it

- To do

## The Origin Of Name

🤖 `Narrative Gundam`, ready to launch!

<img src="https://raw.githubusercontent.com/joe-sky/narrative/master/public/images/narrative-gundam.jpg" alt="Narrative">

## License

MIT
