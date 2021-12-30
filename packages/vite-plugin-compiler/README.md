# @narrative/vite-plugin-compiler

Vite plugin for compile and enhance the limitation of `Narrative` runtime code.

## Usage

```bash
npm install @narrative/vite-plugin-compiler
```

- Configure Vite(v2.x with `@vitejs/plugin-react`):

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nt from '@narrative/vite-plugin-compiler';

export default defineConfig({
  plugins: [nt(), react()]
});
```

## License

MIT
