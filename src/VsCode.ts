import * as vscode from "vscode";
import print, * as printer from "./common/printer";
import * as fs from "fs";
import * as path from "path";

class VsCode implements Provider {
	private context?: vscode.ExtensionContext;

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
		return this.context?.extension.id;
	}
}

export default VsCode;
