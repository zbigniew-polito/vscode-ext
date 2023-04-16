import VsCode from "./VsCode";

class VsCommands extends VsCode {
	public run() {
		this.existsInProject(PyUtils.ins._config.run) &&
			this.terminal.sendText(
				PyUtils.ins.projectRoot + "/" + PyUtils.ins._config.run
			);
	}

	public build() {
		PyUtils.ins.existsInProject(PyUtils.ins._config.build) &&
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

export default VsCommand;
