import print, * as printer from "./common/printer";
import { success, error } from "./common/ui";

import * as vscode from "vscode";

import { CallbacksHandler } from "./CallbacksHandler";

class Commands extends CallbacksHandler {
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
		//success(PyUtils.ins.name + " deactivated succesfully. // TODO");
	}

	public run() {
		PyUtils.ins.existsInProject(PyUtils.ins._config.run) &&
			PyUtils.ins.terminal.sendText(
				PyUtils.ins.projectRoot + "/" + PyUtils.ins._config.run
			);
	}

	public build() {
		Commands.ins.existsInProject(PyUtils.ins._config.build) &&
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
}

//module.exports = Commands;
export default Commands;
