# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

`Narrative`(abbreviated as `nt`) is a tiny library(<1kb minimum) for create **a utility-first pattern to use JSX in custom functional elements and attributes way**. It's type safe and can cross environments(React/Vue/Preact/htm/vanilla js/etc).

> Currently it is in the experimental stage, the main syntax of v1.0 should not change, but there may be minor adjustments to the APIs. JSX automatic runtime is currently being processed.

<!-- ## JSX !== React JSX

There are many frameworks using JSX at present, such as React/Vue/[Omi](https://github.com/Tencent/omi)/etc. **So this library is just created for JSX, not just for React JSX**. But it can also adapt to various frameworks that use JSX, and follow the JSX pattern. 😉 -->

[Live demo is here.](https://codesandbox.io/s/green-resonance-3fz52)

## Table of Contents

- [Features](#features)
- [Packages](#packages)
- [Installation](#installation)
  - [Using with Babel](#using-with-babel)
- [Basic Overview](#basic-overview)
- [Usage](#usage)
  - [`<If>`](#if)
  - [`<Switch>`](#switch)
  - [`<For>`](#for)
  - [`{...show}`](#show)
  - [`{...visible}`](#visible)
  - [How to expand](#how-to-expand)
    - [Elements](#elements)
    - [Attributes](#attributes)
  - [Usage in Vue](#usage-in-vue)
- [Why](#why)
- [Inspiration](#inspiration)
- [Roadmap](#roadmap)
- [Who is using](#who-is-using)
- [The Origin of Name](#the-origin-of-name)

## Features

- 🌟 **Goal:** A fun idea that run JSX at any expressions or statements.
- ✨ **Small:** Tiny size. `core`(about `750b`, can be used independently); `control-statement`(about `1.2kb`, optional).
- 💫 **Simple:** No new syntax, just like native JSX.
- ⭐ **Type safe:** Fully developed by TypeScript, fully supports type inference.
- 🔥 **Cross environments:** One write, run in multiple environments(React/Vue/etc).
- ⚡ **Fast:** Be as fast as possible at runtime. Optional compiler optimizations are also supported.
- 🔧 **Extensible:** Everything is extensible.
- 🚀 **No dependencies**

## Packages

| Package                                                                                                             | Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@narrative/core](https://github.com/joe-sky/narrative/tree/master/packages/core)                                   | <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/v/@narrative/core.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/dm/@narrative/core.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/core"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/core.svg?style=flat" alt="Minzipped Size"></a>                                                                               |
| [@narrative/control-statement](https://github.com/joe-sky/narrative/tree/master/packages/control-statement)         | <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/v/@narrative/control-statement.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/dm/@narrative/control-statement.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/control-statement"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/control-statement.svg?style=flat" alt="Minzipped Size"></a> |
| [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) | <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/v/@narrative/babel-plugin-compiler.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/babel-plugin-compiler"><img src="https://img.shields.io/npm/dm/@narrative/babel-plugin-compiler.svg" alt="NPM Downloads"></a>                                                                                                                                                                                      |

## Installation

```bash
npm install @narrative/core @narrative/control-statement
```

### Using with Babel

```bash
npm @narrative/babel-plugin-compiler
```

.babelrc:

```json
{
  "plugins": ["@narrative/compiler"]
}
```

## Basic Overview

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

<!-- ## The Benefit

- To do -->

## Usage

> The api document of `@narrative/control-statement` please look at the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts) first. The complete document will be supplemented later.

### `<If>`

See the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts#L23) and [tests](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/__tests__/if.spec.tsx).

### `<Switch>`

See the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts#L121) and [tests](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/__tests__/switch.spec.tsx).

### `<For>`

See the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts#L106) and [tests](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/__tests__/for.spec.tsx).

### `{...show}`

See the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts#L146) and [tests](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/__tests__/show.spec.tsx).

### `{...visible}`

See the [type definition](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/types/narrative-control-statement.d.ts#L154) and [tests](https://github.com/joe-sky/narrative/blob/master/packages/control-statement/__tests__/visible.spec.tsx).

### How to expand

> All of `Narrative elements and attributes` are extensible. The specific API documentation will be completed later.

#### Elements

See the [tests](https://github.com/joe-sky/narrative/blob/master/packages/core/__tests__/element.spec.tsx).

#### Attributes

See the [tests](https://github.com/joe-sky/narrative/blob/master/packages/core/__tests__/attribute.spec.tsx).

### Usage in Vue

- Vue(v3)

The usage in vue 3 is almost the same as react:

```js
import { h, defineComponent } from 'vue';
import * as nt from '@narrative/core';
/** @jsx jsx */
const jsx = nt.bind(h);
import { If, Else } from '@narrative/control-statement';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <If condition={Math.random() > 0.5}>
        <div id="app">Hello World!</div>
        <Else>nothing</Else>
      </If>
    );
  }
});
```

- Vue(v2)

Currently, only use [@narrative/babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler) to transform JSX in Vue 2:

```vue
<script>
import { If, Else } from '@narrative/control-statement';

export default {
  name: 'App',
  render() {
    return (
      <If condition={Math.random() > 0.5}>
        <div id="app">Hello World!</div>
        <Else>nothing</Else>
      </If>
    );
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

<!-- ## Performance

- To do -->

## Why

At present, there are some Babel plugins that can implement special JSX syntax, such as:

- [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements) (React)

- [babel-plugin-react-directives](https://github.com/peakchen90/babel-plugin-react-directives) (React)

- [@vue/babel-plugin-jsx](https://github.com/vuejs/jsx-next) (Vue)

All of these projects only deal with JSX syntax at compile time, so the performance can be optimized to be very good without additional runtime code.

### Troubled issues

But there is an important fact that all the above plugins must rely on Babel to run~ 😂

For example, it is difficult to run in some environments without Babel (such as TSC, [esbuild](https://github.com/evanw/esbuild), [Vite](https://github.com/vitejs/vite) and so on). Sometimes we even need to rebuild a same compiler plugin for the specific environment.

### Another way of thinking

At this point, we can think in a different way:

**Is there any way we can accept it at runtime? It's solved without compiling.**

It turns out that it is feasible to implement JSX special syntax at runtime, such as these libraries:

- [react-if](https://github.com/romac/react-if)

- [react-loops](https://github.com/leebyron/react-loops)

These are two excellent implementations of React JSX syntax, but they can't run in other environments like preact/Vue.

## Inspiration

Part of `Narrative` inspired by `react-if` and `react-loops`, it fully supports runtime, so users will no longer have to worry about JSX compiler environments. It can also support the development of extensibility at runtime like React/Vue! 😉

However, we also developed a optional [babel-plugin-compiler](https://github.com/joe-sky/narrative/tree/master/packages/babel-plugin-compiler), it can provide better performance.

In addition, part of its inspiration comes from another project [NornJ](https://github.com/joe-sky/nornj) of the same author.

## Roadmap

- [ ] Support JSX automatic runtime

## Who is using

The author `Joe_Sky` and his front-end team in jd.com.

## The Origin of Name

🤖 `RX-9 Narrative Gundam`, ready to launch!

<img src="public/images/narrative-gundam.jpg" alt="Narrative">

## License

MIT
