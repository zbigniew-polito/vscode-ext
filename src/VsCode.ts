import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import print, * as printer from "./common/printer";

import { success, error } from "./common/ui";
import { getProperty } from "./common/objects";

import TerminalProvider, { VsTerminalProvider } from "./TerminalProvider";

class VsCode extends VsTerminalProvider implements Provider {
	public context?: vscode.ExtensionContext;
	public isEnabled: boolean;
	public static instance: VsCode;

	static get ins() {
		return VsCode.instance ?? (VsCode.instance = new VsCode());
	}

	constructor() {
		super();
		this.isEnabled = false;
	}

	public get config(): StringByString {
		return vscode.workspace.getConfiguration()?.get("pyutils") ?? {};
	}

	get extensionDir() {
		return this.projectRoot + "/." + this.name?.toLocaleLowerCase();
	}

	get name() {
		return this.context?.extension.id ?? "Unknown";
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

	public existsInProject(path: string): boolean {
		return (
			fs.existsSync(this.projectRoot + "/" + path) ||
			error("Cant find : " + path)
		);
	}

	/*
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
    */

	public workspace_onDidCloseTextDocument(event: any) {
		print(event);
	}

	public workspace_onDidChangeConfiguration() {
		// PyUtils.ins.loadConfig();
	}

	public workspace_onDidSaveTextDocument(document: vscode.TextDocument) {
		this.existsInProject(this.config.callback) &&
			this.inTerm(
				this.projectRoot +
					"/" +
					this.config["callback"] +
					" " +
					document.uri.fsPath
			);
	}

	public window_onDidChangeVisibleTextEditors(event: any) {
		// print(event)
		// close terminal when one terminal per editor
	}

	public window_onDidChangeActiveTextEditor(event: any) {
		if (event.document.uri.scheme == "file") {
			this.terminal.show();
		}
	}
}

export default VsCode;
export { VsCode };
