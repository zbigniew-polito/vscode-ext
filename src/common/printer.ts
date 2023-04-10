import { OutputChannel } from "vscode";

class Printer {
    constructor(channels: OutputChannel | undefined) {
        channels?.array.forEach(element => {

        });
    }
}

declare var printer: Printer = Printer();


module.exports = printer