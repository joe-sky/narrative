# CHANGELOG

## [v1.0.1] 2023.08.03

- 👆 Optimization display errors.

## [v1.0.0] 2023.03.14

- 🐞 Fix transform errors wrapped in `React.Fragment`.

## [v1.0.0-rc2.1] 2022.03.02

- 💥 The attributes of `Switch` tag have been changed to `value`, `is`, `in`.

## [v1.0.0-rc.2] 2022.01.20

- 🌟 Add `Empty` tag compiler.

## [v1.0.0-rc.1] 2021.12.30

- 🌟 Add `@narrative/vite-plugin-compiler`.

## [v1.0.0-alpha.1] 2021.10.20

- 🌟 Add `For` tag compiler.

## [v0.5.0-alpha.2] 2021.08.18

- 🌟 Add `@narrative/control-flow` package to replace `@narrative/control-statement`.
- 💥 Remove `show` and `visible`.

## [v0.4.0] 2021.03.12

- 💥 The `show` attribute has been changed to control whether to render.
- 🌟 Add `visible` attribute(control `style.display`).

## [v0.3.6] 2021.02.07

- 🐞 Fix a compile syntax bug for `<Case value="1">`.

## [v0.3.5] 2020.09.29

- 🌟 Add `values` property to `Case`, for judge multiple values at the same time.

## [v0.3.4] 2020.09.16

- 🐞 `@narrative/babel-plugin-compiler` has supported Vue 2.

## [v0.3.3] 2020.09.09

- 🌟 Changed `nt.element`, `nt.attribute` to `nt.defineElement`, `nt.defineAttribute`.
- 🌟 Add `nt.as`.

## [v0.3.2] 2020.09.04

- 🌟 Use esbuild instead babel and uglify.
- 🌟 Remove the custom element features and use them like the components only.
- 🌟 The first version of `@narrative/babel-plugin-compiler` have been completed.
- 🌟 Add `in`, `ofMap`, `ofSet` props to `For` element.

## [v0.3.1] 2020.08.31

- 🌟 Support React 15.
- 🌟 Rename `Elseif` to `ElseIf`.

## [v0.2.6] 2020.08.28

- 🐞 Fix `renderPrevDelegate`.

## [v0.2.4] 2020.08.20

- 🐞 Add `WeakMap` and `WeakSet` typings for element `for`.

## [v0.2.3] 2020.08.19

- 🌟 Support custom attributes.
- 🌟 Add `show` attribute.

## [v0.2.1] 2020.08.07

- 🌟 Changed the children argument to pure array for `ElementDelegate`.

## [v0.1.4] 2020.08.05

- 🐞 Fixed the wrong form of children nodes on Vue 3.

## [v0.1.0] 2020.08.05

- 🌟 The first version of `@narrative/core` and `@narrative/control-statement` have been completed.
