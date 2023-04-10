import { OutputChannel, window } from "vscode";


//const dictionary: Record<string, string> = {};
//const dictionary = new Map<string, string>();

class Printer {
    public history: Map<string | undefined, (string | object)[]> = new Map<string, (string | object)[]>();
    public channels: Map<string, OutputChannel> = new Map<string, OutputChannel>();

    constructor() {

    }

    public print(...args: any, channel: string | undefined) {
        let channel: OutputChannel = this.channels.get(channel ?? "default");

        this.history.get(channel) ??
            this.history.set(channel, window.createOutputChannel(channel, "js"))


    }
}

//declare var printer: Printer = Printer();
// declare var print = printer.print;

function print(...args: any) {

}

module.exports = print