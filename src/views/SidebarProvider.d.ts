import * as vscode from "vscode";
export declare class SidebarProvider implements vscode.WebviewViewProvider {
    private readonly _extensionUri;
    constructor(_extensionUri: vscode.Uri);
    resolveWebviewView(webviewView: vscode.WebviewView): void;
}
