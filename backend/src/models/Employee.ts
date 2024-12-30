/** @format */

import mongoose, { Schema, Document } from "mongoose";

export interface IObservationReport {
	date: Date;
	observations: string;
	evaluator: string;
}

export interface IEmployee extends Document {
	name: string;
	position: string;
	department: string;
	email: string;
	observationReports: IObservationReport[];
}

const ObservationReportSchema: Schema = new Schema({
	date: { type: Date, required: true },
	observations: { type: String, required: true },
	evaluator: { type: String, required: true },
});

const EmployeeSchema: Schema = new Schema({
	name: { type: String, required: true },
	position: { type: String, required: true },
	department: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	observationReports: { type: [ObservationReportSchema], default: [] },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
