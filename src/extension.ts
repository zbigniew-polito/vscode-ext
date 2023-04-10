import * as vscode from 'vscode';
import * as fs from "fs";
//import * as fs from "fs-extra";
import * as path from 'path';

import { SidebarProvider } from './views/SidebarProvider';
import { KeyObject } from 'crypto';

/*
export module String {
	static exec(s: String): void {
		PyUtils.ins.terminal.sendText((s as string));
	}
}

let t: String = "test";
let w: string = "test";

w.exec();
t.exec();
*/



// Object.assign(global, nvk);




interface StringByString {
	[key: string]: string;
}


function print(msg: string | any) {
	//Array.isArray(msg)
	if (typeof msg === 'string') {
		PyUtils.ins.printToOutputChannel(msg);
	}
	else {
		if (PyUtils.ins._config["verbose"] == "true") {
			PyUtils.ins.printToOutputChannel(JSON.stringify(msg, null, 2));
		}
	}

}

function success(msg: any) {
	print(msg)
	vscode.window.showInformationMessage(msg);
}

function error(msg: any) {
	print(msg);
	vscode.window.showErrorMessage(msg);
}

function getProperty<T, K extends keyof T>(obj: T, key: string): T[K] {
	if (key in obj) { return obj[key as K]; }
	throw new Error(`Invalid object member "${key}"`);
}


class PyUtils {
	public static _line_counter: number = 0;
	private static _instance?: PyUtils;

	private _dir?: string;

	//private _workspaceRoot?: string;
	private _outputChannel?: vscode.OutputChannel;
	private _context?: vscode.ExtensionContext;


	//https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts
	//https://code.visualstudio.com/api/references/icons-in-labels


	private diary?: SidebarProvider;
	private wave?: SidebarProvider;
	private noise?: SidebarProvider;
	private svgdraw?: SidebarProvider;
	private localdoc?: SidebarProvider;
	private unicode?: SidebarProvider;


	// const sidebarProvider = new SidebarProvider(context.extensionUri);


	public _config: StringByString = {};

	private constructor() {
		if (PyUtils._instance) {
			throw new Error("Use Singleton.instance instead of new.");
		};

		PyUtils._instance = this;
		PyUtils.ins._outputChannel = vscode.window.createOutputChannel("PyUtils", { log: false });

		PyUtils.ins.loadConfig();

	}

	static get ins() {
		return PyUtils._instance ?? (PyUtils._instance = new PyUtils());
	}

	get workspaceRoot() {
		//PyUtils.ins.workspaceRoot = ( : undefined;
		//if (!PyUtils.ins.workspaceRoot) {
		//	error("No workspaceRoot !")
		//	return;
		//}
		//vscode.workspace.workspaceFolders
		//PyUtils.ins._dir = PyUtils.ins._workspaceRoot + "/." + PyUtils.ins.name.toLowerCase();
		//vscode.workspace.getWorkspaceFolder()
		//vscode.workspace.workspaceFolders
		//vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0)) ?vscode.workspace.workspaceFolders[0].uri.fsPath
		vscode.workspace.workspaceFolders ?? [
			{
				uri: vscode.Uri.file(process.cwd()),
				name: path.basename(process.cwd()),
				index: 0,
			}
		].forEach(w => {
			if (fs.existsSync(w.uri.fsPath)) {
				root = w.uri.fsPath;
				rootWorkspace = w;
			}
		})

		//let rootWorkspace = 
	}
	get ext_dir() {
		return PyUtils.ins.workspaceRoot + "/." + PyUtils.ins.name.toLocaleLowerCase();
	}

	get name() {
		return "PyUtils"
		// got obfuscated
		// return PyUtils.ins.constructor.name
	}


	public activate(context: vscode.ExtensionContext) {

		PyUtils.ins._context = context;


		let methods = Reflect.ownKeys(PyUtils.prototype);

		vscode.window.terminals.forEach((terminal: vscode.Terminal) => {
			try {
				terminal.dispose();
			} catch (error: any) {
				error("Terminal disposition error.")
			}
		})

		for (var method of methods) {
			const __method = method;
			if (method.toString().startsWith("workspace_")) {
				let _workspace = getProperty(vscode, "workspace");
				let _method = method.toString().split("_")[1]
				const __target: Function = getProperty(PyUtils.ins, method.toString()) as any;
				let _call: Function = getProperty(_workspace, _method.toString());

				context.subscriptions.push(_call((arg: any) => {
					print(__method.toString());
					print(arg);
					__target(arg);
				}));
				print("Registered callback vscode." + method.toString());
			}
			else if (method.toString().startsWith("window_")) {
				let _window = getProperty(vscode, "window");
				let _method = method.toString().split("_")[1]
				const __target: Function = getProperty(PyUtils.ins, method.toString()) as any;
				let _call: Function = getProperty(_window, _method.toString());
				context.subscriptions.push(_call((arg: any) => {
					print(__method.toString())
					print(arg);
					__target(arg);
				}))
				print("Registered callback vscode." + method.toString());
			}
		}

		PyUtils.ins.isEnabled = true;

		success(PyUtils.ins.name + " activated succesfully in " + PyUtils.ins.workspaceRoot);

		PyUtils.ins.create()

	}

	public deactivate() {
		success(PyUtils.ins.name + " deactivated succesfully. // TODO");
	}


	public loadConfig(): void {
		var config: { [index: string]: any } | undefined = vscode.workspace.getConfiguration()?.get('pyutils');
		for (let key in config) {
			PyUtils.ins._config[key] = config[key];
		}
	}

	public create(): void {
		// make a skel boundled with package and copy it
		if (!(PyUtils.ins._dir ? fs.existsSync(PyUtils.ins._dir) : false)) {
			PyUtils.ins._dir ? fs.mkdir(PyUtils.ins._dir, { recursive: false }, (err) => {
				error(err);
			}) : error("_dir creation error")
		}
	}


	public get isEnabled(): boolean {
		return !!PyUtils.ins._context?.globalState.get('isEnabled', true);
	}

	public set isEnabled(value: boolean) {
		PyUtils.ins._context?.globalState.update('isEnabled', value);
	}

	public printToOutputChannel(message: string) {
		PyUtils.ins._outputChannel?.appendLine((" ".repeat(PyUtils._line_counter.toString().length - 1)) + PyUtils._line_counter.toString().length + " : " + message);
		PyUtils._line_counter++;
	}

	public showStatusMessage(message: string): vscode.Disposable {
		print(message);
		return vscode.window.setStatusBarMessage(message);
	}

	public workspace_onDidChangeConfiguration() {
		PyUtils.ins.loadConfig()
	}

	public run() {
		if (fs.existsSync(PyUtils.ins._config.run)) {
			PyUtils.ins.terminal.sendText("${workspaceFolder}/" + PyUtils.ins._config.run)
		} else {
			error("Cant find : ${workspaceFolder} " + PyUtils.ins._config.run)
		}
	}

	public build() {
		if (fs.existsSync(PyUtils.ins._config.build)) {
			PyUtils.ins.terminal.sendText("${workspaceFolder}/" + PyUtils.ins._config.build)
		} else {
			error("Cant find : ${workspaceFolder} " + PyUtils.ins._config.build)
		}
	}

	public debug() {
		if (fs.existsSync(PyUtils.ins._config.debug)) {
			PyUtils.ins.terminal.sendText("${workspaceFolder}/" + PyUtils.ins._config.debug)
		} else {
			error("Cant find : ${workspaceFolder} " + PyUtils.ins._config.debug)
		}
	}

	public workspace_onDidChangeWorkspaceFolders(event: vscode.WorkspaceFoldersChangeEvent) {
		//print("onDidChangedWorkspaceFolders")
		//print("On did changed workspace folders. Make terminal follow Editor. or create private terminal for every editor.");
		//PyUtils.ins._current_workspaceRoot = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0)) ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
		//print()
	}

	public workspace_onDidSaveTextDocument(document: vscode.TextDocument) {
		if (fs.existsSync("${workspaceFolder}/" + PyUtils.ins._config.callback)) {
			PyUtils.ins.inTerm("${workspaceFolder}/" + PyUtils.ins._config['callback'] + " " + document.uri.fsPath)
		} else {
			error("Cant find : ${workspaceFolder} " + PyUtils.ins._config.build)
		}

	}



	public window_onDidChangeActiveTextEditor(event: any) {
		if (event.document.uri.scheme == "file") {
			PyUtils.ins.terminal.show();
		}
	}

	public workspace_onDidCloseTextDocument(event: any) {
		print(event)

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

	public inTerm(cmd: string): void {
		print(cmd);
		PyUtils.ins.terminal.sendText(cmd);
	}

	// inkpaint
	// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/

	// One per Editor
	// One per Workspace

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
		}

		terminal = terminal || vscode.window.createTerminal(options);
		terminal.show();
		return terminal;
	}
}

module.exports = PyUtils.ins