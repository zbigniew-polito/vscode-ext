import * as vscode from "vscode";
import print from "./printer";

export function success(msg: any) {
	print(msg);
	vscode.window.showInformationMessage(msg);
	return true;
}

export function error(msg: any) {
	print(msg);
	vscode.window.showErrorMessage(msg);
	return false;
}
/*
module.exports = {
	success,
	error,
};
*?

exports = {
	success,
	error,
};
*/
