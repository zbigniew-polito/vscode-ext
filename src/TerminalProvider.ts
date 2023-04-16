import * as vscode from "vscode";

interface TermianlProvider {
	terminal: any;
}

class TerminalProvider {
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

export default TerminalProvider;
