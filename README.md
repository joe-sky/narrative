# Narrative

`Narrative` (abbreviated as `nt`)

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

Vue(v3 only):

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
