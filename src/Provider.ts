interface StringByString {
	[key: string]: string;
}

interface Provider {
	get name(): String;
	get config(): StringByString;
	static get ins(): Provider;
	showStatusMessage(msg: String): any;
}
