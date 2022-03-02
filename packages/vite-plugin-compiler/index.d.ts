/*!
 * @narrative/vite-plugin-compiler v1.0.0-rc2.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
import { Plugin } from 'vite';
import { ParserOptions } from '@babel/core';

interface Options {
    parserPlugins?: ParserOptions['plugins'];
}
declare function ntPlugin(opts?: Options): Plugin;

export default ntPlugin;
export { Options };
