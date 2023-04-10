import { OutputChannel, window } from "vscode";

const pjson = require('../package.json');

//const dictionary: Record<string, string> = {};
//const dictionary = new Map<string, string>();

class Printer {
    public history: Map<string | undefined, (string | object)[]> = new Map<string, (string | object)[]>();
    public channels: Map<string | undefined, OutputChannel> = new Map<string, OutputChannel>();

    constructor() {

    }

    public print(args: string | [any], channel?: string) {
        let name: string = pjson['displayName'];
        let chan: OutputChannel | undefined = (this.channels.get(name)
            ?? this.channels.set(name, window.createOutputChannel(name)).get(name));
        chan?.appendLine(JSON.stringify(args));

        if (typeof args !== 'string') {


            let types: Set<any> = new Set();
            args.forEach(e => {
                types.add(typeof e);
            })
            types.forEach(t => {
                args.forEach(a => {
                    if (typeof a == t) {

                    }
                })
            })
        }
    }
}

//declare var printer: Printer = Printer();
// declare var print = printer.print;

function print(args: string | [any], channel?: string) {

}

module.exports = print