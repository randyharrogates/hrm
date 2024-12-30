/** @format */

import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
	name: string;
	position: string;
	department: string;
	email: string;
}

const EmployeeSchema: Schema = new Schema({
	name: { type: String, required: true },
	position: { type: String, required: true },
	department: { type: String, required: true },
	email: { type: String, required: true, unique: true },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
