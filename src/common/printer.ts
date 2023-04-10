import { OutputChannel, window } from "vscode";

const pjson = require('../package.json');

//const dictionary: Record<string, string> = {};
//const dictionary = new Map<string, string>();

class Printer {
    public history: Map<string | undefined, (string | object)[]> = new Map<string, (string | object)[]>();
    public channels: Map<string | undefined, OutputChannel> = new Map<string, OutputChannel>();

    constructor() {

    }

    public print(...args: any, channel: string | undefined) {
        let name: string = pjson['displayName'];

        let chan: OutputChannel = this.channels.get(name) ?? this.channels.set(name, window.createOutputChannel(name)).get(name);
        chan.appendLine

    }
}

//declare var printer: Printer = Printer();
// declare var print = printer.print;

function print(...args: any) {

}

module.exports = print