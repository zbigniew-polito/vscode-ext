import VsCode from "./VsCode";
import * as vscode from "vscode";
declare class VsCommands extends VsCode {
    run(): void;
    build(): void;
    debug(): void;
    activate(context: vscode.ExtensionContext): void;
}
export default VsCommands;
