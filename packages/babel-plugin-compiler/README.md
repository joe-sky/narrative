# @narrative/babel-plugin-compiler

Performance enhancement compiler for `Narrative`.

## Usage

```bash
npm install @narrative/babel-plugin-compiler
```

.babelrc:

```json
{
  "plugins": ["@narrative/compiler"]
}
```

## How it works

```tsx
<If condition={index > 5}>
  <li>{todo * 2}</li>
  <ElseIf condition={index > 10}>
    <li>{todo * 3}</li>
  </ElseIf>
</If>

↓ ↓ ↓ ↓ ↓ ↓

index > 5 ? <li>{todo * 2}</li> : (index > 10 ? <li>{todo * 3}</li> : null)
```
