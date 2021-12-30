/*!
 * @narrative/babel-plugin-compiler v1.0.0-rc.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
import { Visitor } from '@babel/traverse';

interface NtCompilerOptions {
    importedLib?: string[] | 'none';
}

declare function NtCompiler(): {
    inherits: any;
    name: string;
    visitor: Visitor<{}>;
};

export default NtCompiler;
export { NtCompilerOptions };
