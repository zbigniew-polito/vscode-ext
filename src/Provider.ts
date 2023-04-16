interface StringByString {
	[key: string]: string;
}

interface Provider {
	get name(): String;
	get config(): StringByString;
	get ins(): Provider;
	showStatusMessage(msg: String): any;
}
