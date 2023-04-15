interface StringByString {
	[key: string]: string;
}

interface Provider {
	get name(): String;
	get config(): StringByString;
}
