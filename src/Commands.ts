import print, * as printer from "./common/printer";
import { success, error } from "./common/ui";

class Commands {
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
