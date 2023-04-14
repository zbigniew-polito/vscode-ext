import print, * as printer from "./common/printer";
import { success, error } from "./common/ui";

import * as vscode from "vscode";

class Commands extends Base {
	constructor() {}

	public activateMe(context?: vscode.ExtensionContext) {
		print("activateMe");
	}

	public activateMeM() {
		print("activateMe");
	}

	public deactivate() {
		success(PyUtils.ins.name + " deactivated succesfully. // TODO");
	}
}
