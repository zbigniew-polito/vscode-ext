interface StringByString {
	[key: string]: string;
}

interface Provider {
	get config(): StringByString;
}
