import * as vscode from "vscode";
//import * as fs from "fs-extra";

import { SidebarProvider } from "./views/SidebarProvider";
import { KeyObject } from "crypto";

import print, * as printer from "./common/printer";

import { success, error } from "./common/ui";

import { getProperty } from "./common/objects";

import { Commands } from "./Commands";

// Object.assign(global, nvk);
const pjson = require("../package.json");

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
	private static _instance?: PyUtils;

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
		if (PyUtils._instance) {
			throw new Error("Use Singleton.instance instead of new.");
		}

		PyUtils._instance = this;

		print(pjson["name"]);
		print(pjson["publisher"]);
	}

	static get ins() {
		return PyUtils._instance ?? (PyUtils._instance = new PyUtils());
	}

	/*
	public get _config(): StringByString {
		return vscode.workspace.getConfiguration()?.get("pyutils") ?? {};
	}
	*/

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
	/*
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
	*/

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
	/*
	public existsInProject(path: string): boolean {
		return (
			fs.existsSync(PyUtils.ins.projectRoot + "/" + path) ||
			error("Cant find : " + path)
		);
	}
	*/

	public run() {
		PyUtils.ins.existsInProject(PyUtils.ins._config.run) &&
			PyUtils.ins.terminal.sendText(
				PyUtils.ins.projectRoot + "/" + PyUtils.ins._config.run
			);
	}

	public build() {
		PyUtils.ins.existsInProject(PyUtils.ins._config.build) &&
			PyUtils.ins.terminal.sendText(
				PyUtils.ins.projectRoot + "/" + PyUtils.ins._config.build
			);
	}

	public debug() {
		PyUtils.ins.existsInProject(PyUtils.ins._config.debug) &&
			PyUtils.ins.terminal.sendText(
				PyUtils.ins.projectRoot + "/" + PyUtils.ins._config.debug
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
