/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";
import { IEmployee, IObservationReport } from "@shared/employee";



const ObservationReportSchema: Schema = new Schema({
	date: { type: Date, required: true },
	observations: { type: String, required: true },
	evaluator: { type: String, required: true },
});

// Base Employee Interface and Schema

const BaseEmployeeSchema: Schema = new Schema({
	EN: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	contact: { type: String, required: true },
	employee_type: { type: String, required: true },
	training_outlet: { type: String, required: true },
	outlet: { type: String, required: true },
	probation_start_date: { type: Date, required: true },
	probation_end_date: { type: Date, required: true },
	remarks: { type: String },
	current_employee: { type: Boolean, default: true },
	observationReports: { type: [ObservationReportSchema], default: [] },
});

// Extendable Employee Types
export interface IFullTimeEmployee extends IEmployee {
	annual_salary: number;
	healthcare_plan: string;
}

export interface IPartTimeEmployee extends IEmployee {
	hourly_rate: number;
	contract_end_date: Date;
}

export interface IIntern extends IEmployee {
	mentor: string;
	duration_in_months: number;
}

export interface IContractor extends IEmployee {
	contract_agency: string;
	contract_end_date: Date;
}

// Create Models with Discriminators
const EmployeeModel = mongoose.model<IEmployee>("Employee", BaseEmployeeSchema);

const FullTimeEmployeeModel = EmployeeModel.discriminator<IFullTimeEmployee>(
	"FullTimeEmployee",
	new Schema({
		annual_salary: { type: Number, required: true },
		healthcare_plan: { type: String, required: true },
	})
);

const PartTimeEmployeeModel = EmployeeModel.discriminator<IPartTimeEmployee>(
	"PartTimeEmployee",
	new Schema({
		hourly_rate: { type: Number, required: true },
		contract_end_date: { type: Date, required: true },
	})
);

const InternModel = EmployeeModel.discriminator<IIntern>(
	"Intern",
	new Schema({
		mentor: { type: String, required: true },
		duration_in_months: { type: Number, required: true },
	})
);

const ContractorModel = EmployeeModel.discriminator<IContractor>(
	"Contractor",
	new Schema({
		contract_agency: { type: String, required: true },
		contract_end_date: { type: Date, required: true },
	})
);

export { EmployeeModel, FullTimeEmployeeModel, PartTimeEmployeeModel, InternModel, ContractorModel };
