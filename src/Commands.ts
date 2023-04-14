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

	public activate(context: vscode.ExtensionContext) {
		Commands.ins.context = context;

		let methods = Reflect.ownKeys(PyUtils.prototype);

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
				const __target: Function = getProperty(
					PyUtils.ins,
					method.toString()
				) as any;
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
				const __target: Function = getProperty(
					PyUtils.ins,
					method.toString()
				) as any;
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

		PyUtils.ins.isEnabled = true;

		success(
			PyUtils.ins.name + " activated succesfully in " + PyUtils.ins.projectRoot
		);

		context.subscriptions.push(
			vscode.commands.registerCommand("pyutils.", commandHandler)
		);

		PyUtils.ins.create();
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
