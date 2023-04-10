import { OutputChannel } from "vscode";


interface IDictionary {
    [key: string]: string | object[];
}

class Printer {
    public history[]: any[] =[];

    constructor() {

    }
    public print(...args: any, channel: any | undefined) {

    }
}

//declare var printer: Printer = Printer();
// declare var print = printer.print;

function print(...args: any) {

}

module.exports = print