import print, * as printer from "./common/printer";
import { success, error } from "./common/ui";

import * as vscode from "vscode";

import { Base } from "./Base";

class Commands extends Base {
	constructor() {
		super();
	}

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

module.exports = Commands;
