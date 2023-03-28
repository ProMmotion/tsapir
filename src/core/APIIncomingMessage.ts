import { IncomingMessage } from "http";
import IBaseUser from "./entities/IBaseUser";

export default class APIIncomingMessage extends IncomingMessage {
	public query?: string;
	public body?: { [key: string]: string };
	public user?: IBaseUser | Partial<IBaseUser>;
	public subRoute?: string = "";
	public paramRoute?: { [key: string]: string } = {};
	public entityType?: string;
}
