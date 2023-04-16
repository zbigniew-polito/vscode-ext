import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import print, * as printer from "./common/printer";

import { success, error } from "./common/ui";
//import { getProperty } from "./common/objects";

import VsCode from "./VsCode";

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

class PyUtils extends VsCode {
	//
	// private static _instance?: PyUtils;

	// private context?: vscode.ExtensionContext;

	// https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts
	// https://code.visualstudio.com/api/references/icons-in-labels

	/*
	private diary?: SidebarProvider;
	private wave?: SidebarProvider;
	private noise?: SidebarProvider;
	private svgdraw?: SidebarProvider;
	private localdoc?: SidebarProvider;
	private unicode?: SidebarProvider;
	*/

	private constructor() {
		super();
		print("PyUtils Constructor");
		// print(pjson["name"]);
		// print(pjson["publisher"]);
	}

	// static get ins() {
	//	return PyUtils._instance ?? (PyUtils._instance = new PyUtils());
	// }

	/*
	get projectRoot() {
		const workspaces: readonly vscode.WorkspaceFolder[] =
			vscode.workspace.workspaceFolders ?? [];
		let ret: vscode.WorkspaceFolder | undefined = undefined;

		if (workspaces.length === 0) {
			ret = {
				uri: vscode.Uri.file(process.cwd()),
				name: path.basename(process.cwd()),
				index: 0,
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
	*/

	// get ext_dir() {
	//	return (
	//		PyUtils.ins.projectRoot + "/." + PyUtils.ins.name?.toLocaleLowerCase()
	//	);
	// }

	// get name() {
	//	return PyUtils.ins.context?.extension.id;
	//}

	/*
	public activate(context: vscode.ExtensionContext) {
		PyUtils.ins.context = context;

		let methods = Reflect.ownKeys(PyUtils.prototype);

		
		// vscode.window.terminals.forEach((terminal: vscode.Terminal) => {
		//	try {
		//		terminal.dispose();
		//	} catch (error: any) {
		//		error("Terminal disposition error.");
		//	}
		// });
		

		for (var method of methods) {
			const __method = method;
			if (method.toString().startsWith("workspace_")) {
				let _workspace = getProperty(vscode, "workspace");
				let _method = method.toString().split("_")[1];
				const __target: Function = getProperty(
					PyUtils.ins,
					method.toString()
				) as any;
				let _call: Function = getProperty(_workspace, _method.toString());

				context.subscriptions.push(
					_call((arg: any) => {
						print(__method.toString());
						print(arg);
						__target(arg);
					})
				);
				print("Registered callback vscode." + method.toString());
			} else if (method.toString().startsWith("window_")) {
				let _window = getProperty(vscode, "window");
				let _method = method.toString().split("_")[1];
				const __target: Function = getProperty(
					PyUtils.ins,
					method.toString()
				) as any;
				let _call: Function = getProperty(_window, _method.toString());
				context.subscriptions.push(
					_call((arg: any) => {
						print(__method.toString());
						print(arg);
						__target(arg);
					})
				);
				print("Registered callback vscode." + method.toString());
			}
		}

		PyUtils.ins.isEnabled = true;

		success(
			PyUtils.ins.name + " activated succesfully in " + PyUtils.ins.projectRoot
		);

		// context.subscriptions.push(
		//	vscode.commands.registerCommand("pyutils.", commandHandler)
		//);

		//PyUtils.ins.create();
		this.create();
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
	public workspace_onDidChangeWorkspaceFolders(
		event: vscode.WorkspaceFoldersChangeEvent
	) {}
	*/

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

	// inkpaint
	// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/

	// One per Editor
	// One per Workspace
}

module.exports = PyUtils.ins;
