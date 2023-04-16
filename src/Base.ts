import * as vscode from "vscode";

import print, * as printer from "./common/printer";
const pjson = require("../package.json"); //  int context

class Base {
	private static _instance?: Base;
	private context?: vscode.ExtensionContext;

	constructor() {
		if (Base._instance) {
			throw new Error("Use Singleton.instance instead of new.");
		}

		Base._instance = this;

		print(pjson["name"]);
		print(pjson["publisher"]);
	}

	static get ins() {
		return Base._instance ?? (Base._instance = new Base());
	}

	public inTerm(cmd: string): void {
		print(cmd);

		Base.ins.terminal.sendText(cmd);
	}

	get name() {
		return Base.ins.context?.extension.id;
	}

	public get terminal(): vscode.Terminal {
		var terminal = null;
		for (var it = 0; it < vscode.window.terminals.length; it++) {
			if (vscode.window.terminals[it].name === vscode.workspace.name) {
				terminal = vscode.window.terminals[it];
				break;
			}
		}

		var options = {
			shellpath: "$workspaceFolder",
			name: vscode.workspace.name,
			location: vscode.TerminalLocation.Panel,
		};

		terminal = terminal || vscode.window.createTerminal(options);
		terminal.show();
		return terminal;
	}
}

//module.exports = Base;
export default Base;
