export function GetPrivateKey(): string {
	const key = process.env["API_PRIVATE_KEY"];
	if (key != null) return key;
	throw new Error("env 'API_PRIVATE_KEY' not set");
}
