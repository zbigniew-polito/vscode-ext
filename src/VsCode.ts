import * as vscode from "vscode";
import print, * as printer from "./common/printer";
import * as fs from "fs";
import * as path from "path";

import { getProperty } from "./common/objects";

import { success, error } from "./common/ui";

class VsCode extends TerminalProvider implements Provider {
	private context?: vscode.ExtensionContext;

	private isEnabled: boolean;

	constructor() {
		super();
		this.isEnabled = false;
		//print(pjson["name"]);
		//print(pjson["publisher"]);
		print(this.name);
	}

	public get config(): StringByString {
		return vscode.workspace.getConfiguration()?.get("pyutils") ?? {};
	}

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

	get extensionDir() {
		return this.projectRoot + "/." + this.name?.toLocaleLowerCase();
	}

	get name() {
		return this.context?.extension.id ?? "Unknown";
	}

	public create(): void {
		// make a skel boundled with package and copy it
		if (!(this.extensionDir ? fs.existsSync(this.extensionDir) : false)) {
			this.extensionDir
				? fs.mkdir(this.extensionDir, { recursive: false }, (err) => {
						error(err);
				  })
				: error("ext_dir creation error");
		}
	}

	public activate(context: vscode.ExtensionContext) {
		this.context = context;

		let methods = Reflect.ownKeys(VsCode.prototype);

		/*
		vscode.window.terminals.forEach((terminal: vscode.Terminal) => {
			try {
				terminal.dispose();
			} catch (error: any) {
				error("Terminal disposition error.");
			}
		});
		*/

		for (var method of methods) {
			const __method = method;
			if (method.toString().startsWith("workspace_")) {
				let _workspace = getProperty(vscode, "workspace");
				let _method = method.toString().split("_")[1];
				const __target: Function = getProperty(this, method.toString()) as any;
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
				const __target: Function = getProperty(this, method.toString()) as any;
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

		this.isEnabled = true;

		success(this.name + " activated succesfully in " + this.projectRoot);

		/*
		context.subscriptions.push(
			vscode.commands.registerCommand("pyutils.", commandHandler)
		);
        */

		this.create();
	}

	public showStatusMessage(message: string): vscode.Disposable {
		print(message);
		return vscode.window.setStatusBarMessage(message);
	}

	public existsInProject(path: string): boolean {
		return (
			fs.existsSync(this.projectRoot + "/" + path) ||
			error("Cant find : " + path)
		);
	}
}

export default VsCode;
