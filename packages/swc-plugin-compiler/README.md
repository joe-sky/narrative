# @narrative/swc-plugin-compiler

The compiler for `@narrative/control-flow`.

## Usage

```bash
npm install @narrative/swc-plugin-compiler
```

Configure `swc`

```json
{
  "jsc": {
    "experimental": {
      "plugins": [["@narrative/swc-plugin-compiler", {}]]
    }
  }
}
```

## How it works

```tsx
<If when={index > 5}>
  <li>{todo * 2}</li>
  <ElseIf when={index > 10}>
    <li>{todo * 3}</li>
  </ElseIf>
</If>

Compiled ↓ ↓ ↓ ↓ ↓ ↓

index > 5 ? <li>{todo * 2}</li> : index > 10 ? <li>{todo * 3}</li> : null
```
