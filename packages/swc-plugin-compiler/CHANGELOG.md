# CHANGELOG

## [v2.0.1] 2023.10.30

- 🐞 Compiler optimization for `<For>`: `xxx.xxx?.map(...)` --> `xxx.xxx?.map?.(...)`

## [v2.0.0] 2023.09.04

- 💥 Upgrade `swc_core` from `v0.76.x` to `v0.82.x`.

## [v1.1.0] 2023.08.28

- 🌟 Add `keys` and `looping source` parameters to the `<For>` tag callback.

## [v1.0.0] 2023.07.27

- 🌟 Fix `index`, `key` parameters alias of `<For>`.

## [v0.1.3] 2023.06.30

- 🐞 Support `StringLiteral JSXAttribute` for `is` attribute of `<Case>`.

## [v0.1.2] 2023.06.05

- 🌟 Fix import declarations.

## [v0.1.1] 2023.06.02

- 🌟 Improved error message prompts.

## [v0.1.0] 2023.05.31

- 🌟 The first version of `@narrative/swc-plugin-compiler` have been completed.
