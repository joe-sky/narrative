# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

`Narrative` (abbreviated as `nt`) is a tiny size(about `1kb`) library that create runtime JSX custom elements and attributes. It's type safe and can cross environment(React/Vue/Preact/htm/vanilla js).

> Currently it is in the experimental stage.

## Packages

| Package                                                                                                     | Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@narrative/core](https://github.com/joe-sky/narrative/tree/master/packages/core)                           | <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/v/@narrative/core.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/dm/@narrative/core.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/core"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/core.svg?style=flat" alt="Minzipped Size"></a>                                                                               |
| [@narrative/control-statement](https://github.com/joe-sky/narrative/tree/master/packages/control-statement) | <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/v/@narrative/control-statement.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/dm/@narrative/control-statement.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/control-statement"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/control-statement.svg?style=flat" alt="Minzipped Size"></a> |

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

`Narrative`'s inspired by `react-if` and `react-loops`, it fully supports runtime, so users will no longer have to worry about JSX compiler problems! :wink:

And the author is also proficient in developing Babel plugins, so we will provide optional compilers to optimize performance in the future.

## Features

- 🌟 **Goal:** Define a new way to use JSX in specific scenes: `Custom Elements and Attributes`.
- ✨ **Small:** Tiny size: core(About `1kb`, can be used independently), control-statement(About `2kb`).
- 💫 **Extensible:** Everything is extensible(With all built-in JSX syntax).
- ⭐ **Type safe:** Fully developed with TS, all JSX syntax fully supports type inference.
- 🔥 **Cross environment:** Support one write, run in multiple environments(React/Vue/etc).
- ⚡ **Fast:** Be as fast as possible at runtime. Optional compiler optimizations are also supported.
- 🚀 **No dependencies**

## Installation

```bash
npm install @narrative/core
```

## Usage

React/Preact:

```js
import React, { Fragment } from 'react';
import * as nt from '@narrative/core';

/** @jsx ntH */
const ntH = nt.bind(React.createElement, { Fragment });
```

Vue(v3):

```js
import * as Vue from 'vue';
import * as nt from '@narrative/core';

/** @jsx ntH */
const ntH = nt.bind(Vue.h);
```

Vue(v2):

- To do

## Roadmap

- To do

## The Origin Of Name

🤖 `Narrative Gundam`, ready to launch!

<img src="./public/images/narrative-gundam.jpg" alt="Narrative">

## License

MIT
