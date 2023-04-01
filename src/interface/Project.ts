// Third-Party Import
import { Types } from "mongoose";

export interface Project {
	_id: Types.ObjectId | string;
	name: string
	image: string
	hyperlink: string
	description: string
}