import * as vscode from "vscode";
import { VsTerminalProvider } from "./TerminalProvider";
declare class VsCode extends VsTerminalProvider implements Provider {
    context?: vscode.ExtensionContext;
    isEnabled: boolean;
    static instance: VsCode;
    static get ins(): VsCode;
    constructor();
    get name(): string;
    get config(): StringByString;
    get extensionDir(): string;
    get projectRoot(): string;
    create(): void;
    existsInProject(path: string): boolean;
    workspace_onDidCloseTextDocument(event: any): void;
    workspace_onDidChangeConfiguration(): void;
    workspace_onDidSaveTextDocument(document: vscode.TextDocument): void;
    window_onDidChangeVisibleTextEditors(event: any): void;
    window_onDidChangeActiveTextEditor(event: any): void;
}
export default VsCode;
export { VsCode };
