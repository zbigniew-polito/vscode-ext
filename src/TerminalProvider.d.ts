import * as vscode from "vscode";
interface TerminalProvider {
    terminal: any;
    inTerm(cmd: string): void;
    window_onDidOpenTerminal(terminal: any): void;
    window_onDidChangeTerminalState(event: any): void;
    window_onDidChangeActiveTerminal(terminal: any): void;
    window_onDidCloseTerminal(terminal: any): void;
}
declare class VsTerminalProvider implements TerminalProvider {
    constructor();
    get terminal(): vscode.Terminal;
    inTerm(cmd: string): void;
    showStatusMessage(message: string): vscode.Disposable;
    window_onDidOpenTerminal(terminal: vscode.Terminal): void;
    window_onDidChangeTerminalState(event: any): void;
    window_onDidChangeActiveTerminal(terminal: vscode.Terminal): void;
    window_onDidCloseTerminal(terminal: vscode.Terminal): void;
}
export { VsTerminalProvider, TerminalProvider };
export default TerminalProvider;
