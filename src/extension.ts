import * as vscode from "vscode";
import * as fs from "fs";

//import * as fs from "fs-extra";

import * as path from "path";

import { SidebarProvider } from "./views/SidebarProvider";
import { KeyObject } from "crypto";


import { success, error } from "./common/ui";

import { getProperty } from "./common/objects";

import { Commands } from "./Commands";

// Object.assign(global, nvk);

interface StringByString {
	[key: string]: string;
}

/*
function print(msg: string | any) {
	if (typeof msg === "string") {
		PyUtils.ins.printToOutputChannel(msg);
	} else {
		//if (PyUtils.ins._config["verbose"] == "true") {
		//	PyUtils.ins.printToOutputChannel(JSON.stringify(msg, null, 2));
		//}
	}
}


	Ekran z katalogiem builda
	i roznicami z ostatnim buildem na podstawie gita

	add git besides terminal and output

*/

/*
function getProperty<T, K extends keyof T>(obj: T, key: string): T[K] {
	if (key in obj) {
		return obj[key as K];
	}
	throw new Error(`Invalid object member "${key}"`);
}

*/

class PyUtils extends Commands {

	
	//https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts
	//https://code.visualstudio.com/api/references/icons-in-labels

	private diary?: SidebarProvider;
	private wave?: SidebarProvider;
	private noise?: SidebarProvider;
	private svgdraw?: SidebarProvider;
	private localdoc?: SidebarProvider;
	private unicode?: SidebarProvider;

	private constructor() {
		super();
	}

	static get ins() {
		return PyUtils._instance ?? (PyUtils._instance = new PyUtils());
	}

	get projectRoot() {
		const workspaces: readonly vscode.WorkspaceFolder[] =
			vscode.workspace.workspaceFolders ?? [];
		let ret: vscode.WorkspaceFolder | undefined = undefined;
		public inTerm(cmd: string): void {
			print(cmd);
			PyUtils.ins.terminal.sendText(cmd);
		}
	
			};
		} else if (workspaces.length === 1) {
			ret = workspaces[0];
			//return workspaces[0];
		} else {
			let rootWorkspace = workspaces[0];
			let root = undefined;
			for (const w of workspaces) {
				if (fs.existsSync(w.uri.fsPath)) {
					root = w.uri.fsPath;
					rootWorkspace = w;
					break;
				}
			}

			for (const w of workspaces) {
				if (
					root &&
					root.length > w.uri.fsPath.length &&
					fs.existsSync(w.uri.fsPath)
				) {
					root = w.uri.fsPath;
					rootWorkspace = w;
				}
			}
			ret = rootWorkspace;
		}

		print("Project Root " + ret.uri.fsPath);
		return ret.uri.fsPath;
	}

	get ext_dir() {
		return (
			PyUtils.ins.projectRoot + "/." + PyUtils.ins.name?.toLocaleLowerCase()
		);
	}

	
	

	public get _config(): StringByString {
		return vscode.workspace.getConfiguration()?.get("pyutils") ?? {};
	}

	/*
	public loadConfig(): void {
		var config: { [index: string]: any } | undefined = vscode.workspace
			.getConfiguration()
			?.get("pyutils");
		for (let key in config) {
			PyUtils.ins._config[key] = config[key];
		}
	}
	*/

	public create(): void {
		// make a skel boundled with package and copy it
		if (!(PyUtils.ins.ext_dir ? fs.existsSync(PyUtils.ins.ext_dir) : false)) {
			PyUtils.ins.ext_dir
				? fs.mkdir(PyUtils.ins.ext_dir, { recursive: false }, (err) => {
						error(err);
				  })
				: error("ext_dir creation error");
		}
	}

	/*
	public printToOutputChannel(message: string) {
		PyUtils.ins._outputChannel?.appendLine(
			" ".repeat(PyUtils._line_counter.toString().length - 1) +
				PyUtils._line_counter.toString().length +
				" : " +
				message
		);
		PyUtils._line_counter++;
	}
	*/

	public showStatusMessage(message: string): vscode.Disposable {
		print(message);
		return vscode.window.setStatusBarMessage(message);
	}

	public existsInProject(path: string): boolean {
		return (
			fs.existsSync(PyUtils.ins.projectRoot + "/" + path) ||
			error("Cant find : " + path)
		);
	}

	

	/*
	public workspace_onDidChangeWorkspaceFolders(
		event: vscode.WorkspaceFoldersChangeEvent
	) {}
	*/

	public window_onDidChangeActiveTextEditor(event: any) {
		if (event.document.uri.scheme == "file") {
			PyUtils.ins.terminal.show();
		}
	}

	public workspace_onDidSaveTextDocument(document: vscode.TextDocument) {
		PyUtils.ins.existsInProject(PyUtils.ins._config.callback) &&
			PyUtils.ins.inTerm(
				PyUtils.ins.projectRoot +
					"/" +
					PyUtils.ins._config["callback"] +
					" " +
					document.uri.fsPath
			);
	}

	public workspace_onDidCloseTextDocument(event: any) {
		print(event);
	}

	public workspace_onDidChangeConfiguration() {
		//PyUtils.ins.loadConfig();
	}

	public window_onDidChangeVisibleTextEditors(event: any) {
		//print(event)
		// close terminal when one terminal per editor
	}

	//public _window_registerSidebarProvider(event: any) {
	// const sidebarProvider = new SidebarProvider(context.extensionUri);

	// vscode.window.registerWebviewViewProvider(
	//	"myextension-sidebar",
	//	sidebarProvider
	//)

	/*
	vscode.window.activeTerminal
	vscode.window.activeTextEditor
	vscode.window.onDidChangeTextEditorSelection
	vscode.window.onDidChangeTextEditorViewColumn
	vscode.window.onDidChangeTextEditorVisibleRanges
	
	

	vscode.window.onDidChangeVisibleTextEditors
	vscode.window.onDidChangeVisibleNotebookEditors
	
	vscode.window.registerCustomEditorProvider
	vscode.window.registerFileDecorationProvider
	vscode.window.registerTreeDataProvider
	vscode.window.registerUriHandler
	vscode.window.registerWebviewPanelSerializer
	vscode.window.registerWebviewViewProvider

	vscode.window.createTreeView
	vscode.window.createWebviewPanel

	vscode.window.showTextDocument
	vscode.window.showNotebookDocument

	
*/

	//}

	/*

	https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts

	https://github.com/benawad/vstodo.git
	window.registerWebviewViewProvider

	views
	viewsContainers
	menu
		view/title
		view/item/context



	window.createTreeView
	window.registerTreeDataProvider
	TreeView
	TreeDataProvider

	*/

	// secondary sidebar
	// classes and objects
	// classes and objects
	// graphs

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

	// inkpaint
	// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/

	// One per Editor
	// One per Workspace
}

module.exports = PyUtils.ins;
