# Narrative

<p>
  <a href="https://travis-ci.org/joe-sky/narrative"><img src="https://travis-ci.org/joe-sky/narrative.svg?branch=master" alt="Travis CI Status"></a>
  <a href="https://codecov.io/gh/joe-sky/narrative"><img src="https://codecov.io/gh/joe-sky/narrative/branch/master/graph/badge.svg" alt="Codecov"></a>
  <a href="https://www.npmjs.com/package/@narrative/core"><img src="https://img.shields.io/npm/l/@narrative/core.svg" alt="License"></a>
</p>

`Narrative` (abbreviated as `nt`) is a tiny size(about `1kb`) library that create runtime JSX custom elements and attributes. It's type safe and can cross environment(React/Vue/Preact/htm/vanilla js).

## Packages

| Package                                                                                                     | Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@narrative/core](https://github.com/joe-sky/narrative/tree/master/packages/core)                           | <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/v/@narrative/core.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/core"><img src="https://img.shields.io/npm/dm/@narrative/core.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/core"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/core.svg?style=flat" alt="Minzipped Size"></a>                                                                               |
| [@narrative/control-statement](https://github.com/joe-sky/narrative/tree/master/packages/control-statement) | <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/v/@narrative/control-statement.svg" alt="NPM Version"></a> <a href="https://www.npmjs.org/package/@narrative/control-statement"><img src="https://img.shields.io/npm/dm/@narrative/control-statement.svg" alt="NPM Downloads"></a> <a href="https://bundlephobia.com/result?p=@narrative/control-statement"><img src="https://img.shields.io/bundlephobia/minzip/@narrative/control-statement.svg?style=flat" alt="Minzipped Size"></a> |

## Installation

```bash
npm install @narrative/core
```

## Usage

React/Preact:

```js
import React from 'react';
import * as nt from '@narrative/core';

/** @jsx ntH */
const ntH = nt.bind(React.createElement, React.Fragment);
```

Vue(v3 only at present):

```js
import * as Vue from 'vue';
import * as nt from '@narrative/core';

/** @jsx ntH */
const ntH = nt.bind(Vue.h);
```

## The Origin Of Name

🤖 `Narrative Gundam`, ready to launch!

<img src="./public/images/narrative-gundam.jpg" alt="Narrative">

## License

MIT
