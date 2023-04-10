import { OutputChannel } from "vscode";


//const dictionary: Record<string, string> = {};
//const dictionary = new Map<string, string>();

class Printer {
    public history: Map<string, string | object> = new Map<string, string | object | undefined>();

    constructor() {

    }
    public print(...args: any, channel: any | undefined) {
        history
    }
}

//declare var printer: Printer = Printer();
// declare var print = printer.print;

function print(...args: any) {

}

module.exports = print