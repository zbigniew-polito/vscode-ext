import VsCode from "./VsCode";

import print, * as printer from "./common/printer";

import { success, error } from "./common/ui";
//import { success, error } from "./common/ui";\
import { getProperty } from "./common/objects";

import * as path from "path";
import * as vscode from "vscode";
import { VsTerminalProvider } from "./TerminalProvider";

class VsCommands extends VsCode {
	constructor() {
		print("VsCommands");
		super();
	}

	public run() {
		this.existsInProject(this.config.run) &&
			this.terminal.sendText(this.projectRoot + "/" + this.config.run);
	}

	public build() {
		this.existsInProject(this.config.build) &&
			this.terminal.sendText(this.projectRoot + "/" + this.config.build);
	}

	public debug() {
		this.existsInProject(this.config.debug) &&
			this.terminal.sendText(this.projectRoot + "/" + this.config.debug);
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
}

export default VsCommands;
