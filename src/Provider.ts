interface StringByString {
	[key: string]: string;
}

interface Provider {
	get name(): String;
	get config(): StringByString;
	get terminal(): any;
	showStatusMessage(msg: String): any;
}
