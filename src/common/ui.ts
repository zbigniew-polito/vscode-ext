import * as vscode from 'vscode';
import * from "./printer"

function success(msg: any) {
    print(msg)
    vscode.window.showInformationMessage(msg);
    return true;
}

function error(msg: any) {
    print(msg);
    vscode.window.showErrorMessage(msg);
    return false;
}


declare var printer: Printer;