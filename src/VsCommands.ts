import VsCode from "./VsCode";

class VsCommands extends VsCode {
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
}

export default VsCommands;
