interface StringByString {
	[key: string]: string;
}

interface Provider {
	name: String;
	get config(): StringByString;
}
