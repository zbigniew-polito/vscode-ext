import { OutputChannel } from "vscode";

class Printer {
    constructor(channels: OutputChannel | undefined) {
        channels?.array.forEach(element => {

        });
    }
    export public print(data...: any) {

    }
}

declare var printer: Printer = Printer();
declare var print = printer.print;

module.exports = print