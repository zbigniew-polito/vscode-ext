import * as vscode from "vscode";

class VsCode implements Provider {
	public get config(): StringByString {
		return vscode.workspace.getConfiguration()?.get("pyutils") ?? {};
	}
}

export default VsCode;
