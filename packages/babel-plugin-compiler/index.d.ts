/*!
 * @narrative/babel-plugin-compiler v1.1.0
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
import { Visitor } from '@babel/traverse';

interface CompilerOptions {
    importedLib?: string[] | 'none';
}

declare function NtCompiler(): {
    inherits: any;
    name: string;
    visitor: Visitor<{}>;
};

export default NtCompiler;
export { CompilerOptions };
