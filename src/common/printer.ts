import { OutputChannel, window } from "vscode";

const pjson = require("../../package.json");

//const dictionary: Record<string, string> = {};
//const dictionary = new Map<string, string>();

class Printer {
	public history: Map<string | undefined, any[]> = new Map<string, string[]>();
	public channels: Map<string | undefined, OutputChannel> = new Map<
		string,
		OutputChannel
	>();

	constructor() {
		this.print("*" + __filename + "/" + __dirname);
		//process.
		/*
            NodeRequire
            NodeResolve
            NodeModule

            process
            console
        */
	}

	public getChannel(name: string) {
		return this.channels.get(name); //?this.channels.set( name, window.createOutputChannel(name) ).get( name );
	}

	public print(args: string | [any], channel?: string) {
		let chan: string = channel ? "when_undefined_true" : "when_undefined_false";
		let name: string = pjson["displayName"] + "." + chan;
		channel ? channel : ".global"; //@ ?? ".all";
		//let chan: OutputChannel | undefined
		//	this.channels.get(name) ??
		//	this.channels.set(name, window.createOutputChannel(name)).get(name);

		//chan = chan ?? this.channels.get(name);

		this.getChannel().appendLine(JSON.stringify(args, null, 2));

		if (typeof args !== "string") {
			let types: Set<any> = new Set();
			args.forEach((e) => {
				types.add(typeof e);
			});
			types.forEach((t) => {
				args.forEach((a) => {
					if (typeof a == t) {
						name = pjson["displayName"] + "." + t;
						chan =
							this.channels.get(name) ??
							this.channels
								.set(name, window.createOutputChannel(name))
								.get(name);
						chan?.appendLine(JSON.stringify(args, null, 2));
					}
				});
			});
		}
	}

	public clear(channel?: string) {
		this.channels.get(channel ?? pjson["displayName"])?.clear();
	}
}

let printer = new Printer();

function print(args: string | [any], channel?: string) {
	printer.print(args, channel);
}

module.exports = print;
export default print;
