import * as vscode from "vscode";
import print from "./common/printer";

interface TerminalProvider {
	terminal: any;
	inTerm(cmd: string): void;

	window_onDidOpenTerminal(terminal: any): void;
	window_onDidChangeTerminalState(event: any): void;
	window_onDidChangeActiveTerminal(terminal: any): void;
	window_onDidCloseTerminal(terminal: any): void;
}

class VsTerminalProvider implements TerminalProvider {
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

	public inTerm(cmd: string): void {
		print(cmd);
		this.terminal.sendText(cmd);
	}

	public showStatusMessage(message: string): vscode.Disposable {
		print(message);
		return vscode.window.setStatusBarMessage(message);
	}

	public window_onDidOpenTerminal(terminal: vscode.Terminal) {
		//PyUtils.ins.terminal.sendText("echo 'onDidOpenTerminal >"+terminal.name+"<'");
	}

	public window_onDidChangeTerminalState(event: any) {
		//PyUtils.ins.terminal.sendText("echo 'onDidChangeTerminalState >"+(event?event.name:'undefined')+"<'");
	}

	public window_onDidChangeActiveTerminal(terminal: vscode.Terminal) {
		//PyUtils.ins.terminal.sendText("echo 'onDidChangeActiveTerminal >"+terminal.name+"<'");
	}

	public window_onDidCloseTerminal(terminal: vscode.Terminal) {
		//PyUtils.ins.terminal.sendText("echo 'onDidCloseTerminal >"+terminal.name+"<'");
	}
}

export { VsTerminalProvider, TerminalProvider };
export default TerminalProvider;
