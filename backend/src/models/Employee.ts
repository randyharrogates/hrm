/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";
import { IEmployee, IObservationReport } from "@shared/employee";

// Extendable Employee Types
export interface IMasterCrew extends IEmployee {
	master_crew_remarks: string;
}

export interface ISeniorCrew extends IEmployee {
	senior_crew_remarks: string;
}

export interface IIntern extends IEmployee {
	mentor: string;
	intern_start_date: Date;
	intern_end_date: Date;
	intern_remarks: string;
}

export interface ISpecialistTrainee extends IEmployee {
	specialist_trainee_remarks: string;
}

export interface ILocalCrew extends IEmployee {
	local_crew_remarks: string;
}

export interface IForeignCrew extends IEmployee {
	foreign_crew_remarks: string;
}

export interface IDirectIntake extends IEmployee {
	direct_intake_remarks: string;
}

const ObservationReportSchema: Schema = new Schema({
	week_start_date: { type: Date, required: true },
	training_centre: { type: String, required: true },
	overall_score: { type: Number },

	// Appearance
	aprons_sop: { type: Number, required: false, default: null },
	grooming: { type: Number, required: false, default: null },
	facial_exp: { type: Number, required: false, default: null },
	app_remarks: { type: String, required: false },

	// Equipment
	handling_knowledge: { type: Number, required: false, default: null },
	location_knowledge: { type: Number, required: false, default: null },
	accounting: { type: Number, required: false, default: null },
	eq_knowledge: { type: String, required: false, default: null },
	eq_remarks: { type: String, required: false },

	// Daily Ops
	product_knowledge: { type: Number, required: false, default: null },
	outlet_knowledge: { type: Number, required: false, default: null },
	opening_readiness: { type: Number, required: false, default: null },
	float_and_front: { type: Number, required: false, default: null },
	cleanliness: { type: Number, required: false, default: null },
	pest_control_awareness: { type: Number, required: false, default: null },
	pos_closing: { type: Number, required: false, default: null },
	eq_washing: { type: Number, required: false, default: null },
	safe_storage: { type: Number, required: false, default: null },
	applicances: { type: Number, required: false, default: null },
	floor_cleanliness: { type: Number, required: false, default: null },
	daily_ops_remarks: { type: String, required: false },

	// Batter Mixing/Cooking
	mixing_sop: { type: Number, required: false, default: null },
	cooking_quality: { type: Number, required: false, default: null },
	cooking_remarks: { type: String, required: false },

	// Final Product Quality
	skin_quality: { type: Number, required: false, default: null },
	filling_consistency: { type: Number, required: false, default: null },
	foreign_object_check: { type: Number, required: false, default: null },
	cut_size: { type: Number, required: false, default: null },
	rejected_handling: { type: Number, required: false, default: null },
	final_product_remarks: { type: String, required: false },

	// Communication
	team_conversation: { type: Number, required: false, default: null },
	cust_conversation: { type: Number, required: false, default: null },
	listening_skills: { type: Number, required: false, default: null },
	broadcasting: { type: Number, required: false, default: null },
	instruction_understanding: { type: Number, required: false, default: null },
	communication_remarks: { type: String, required: false },

	// Teamwork
	team_efficiency: { type: Number, required: false, default: null },
	rotation_confidence: { type: Number, required: false, default: null },
	camaraderie: { type: Number, required: false, default: null },
	assist_initiative: { type: Number, required: false, default: null },
	teamwork_remarks: { type: String, required: false },

	// Customer Service
	politeness: { type: Number, required: false, default: null },
	service: { type: Number, required: false, default: null },
	upsell: { type: Number, required: false, default: null },
	empathy: { type: Number, required: false, default: null },
	customer_service_remarks: { type: String, required: false },

	// Problem Solving
	calmness: { type: Number, required: false, default: null },
	solving_effectiveness: { type: Number, required: false, default: null },
	reporting: { type: Number, required: false, default: null },
	problem_solving_remarks: { type: String, required: false },

	// Industry Knowledge
	food_safety: { type: Number, required: false, default: null },
	safe_workplace: { type: Number, required: false, default: null },
	pest_control: { type: Number, required: false, default: null },
	industry_knowledge_remarks: { type: String, required: false },

	// Initiative and Attitude
	willingness_to_cover: { type: Number, required: false, default: null },
	willingness_to_do_more: { type: Number, required: false, default: null },
	work_independantly: { type: Number, required: false, default: null },
	attitude_remarks: { type: String, required: false },

	// KPI Awareness
	cust_satisfaction: { type: Number, required: false, default: null },
	inventory: { type: Number, required: false, default: null },
	sales: { type: Number, required: false, default: null },
	individual: { type: Number, required: false, default: null },
	team: { type: Number, required: false, default: null },
	kpi_awareness_remarks: { type: String, required: false },

	evaluator: { type: String },
});

// Base Employee Interface and Schema

const BaseEmployeeSchema: Schema = new Schema({
	EN: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	contact: { type: String, required: true },
	employee_type: { type: String, required: true },
	training_outlet: { type: String, required: true },
	outlet: { type: String, required: true },
	probation_start_date: { type: Date },
	probation_end_date: { type: Date },
	extended_probation: { type: Boolean, default: false },
	status: { type: String, required: true },
	transit_date: { type: Date },
	remarks: { type: String },
	training_form: { type: String },
	forteen_hours_shift: { type: Date },
	verbal_and_practical: { type: Date },
	certificate: { type: String, required: false },
	hourly_rate: { type: Number, required: false },
	pass_type: { type: String, required: false },
	overall_grading_score: { type: Number, default: 0 },
	observationReports: { type: [ObservationReportSchema], default: [] },
});

BaseEmployeeSchema.pre("save", async function (next) {
	const employee = this as unknown as IEmployee; // Type assertion

	// Check if observationReports is an array
	if (Array.isArray(employee.observationReports) && employee.observationReports.length > 0) {
		employee.observationReports = employee.observationReports.map((report, index) => {
			// Convert the Mongoose subdocument to a plain object
			const plainReport = (report as unknown as mongoose.Document).toJSON();

			// Get the numeric fields from the schema-defined fields
			// Get the numeric fields from the schema-defined fields
			const numericFields = Object.keys(plainReport).filter((field) => {
				const value = plainReport[field];
				// Exclude remarks fields, non-numeric fields, and fields marked as "NA" or null
				return !field.endsWith("_remarks") && typeof value === "number" && value !== null;
			});

			const total = numericFields.reduce((sum, field) => {
				return sum + (plainReport[field] as number);
			}, 0);

			const average = total / numericFields.length;

			console.log(`Report ${index + 1}:`);
			console.log(`Numeric Fields:`, numericFields);
			console.log(
				`Values:`,
				numericFields.map((field) => plainReport[field])
			);
			console.log(`Total:`, total);
			console.log(`Average:`, average);

			// Update the overall_score in the original report object
			report.overall_score = parseFloat(average.toFixed(2));
			return report;
		});
	}

	// Calculate and update the employee's overall grading score
	if (employee.observationReports.length > 0) {
		const totalScore = employee.observationReports.reduce((sum, report) => {
			return sum + report.overall_score;
		}, 0);

		employee.overall_grading_score = Math.round((totalScore / employee.observationReports.length) * 100) / 100;
	} else {
		employee.overall_grading_score = 0;
	}

	next();
});

BaseEmployeeSchema.statics.updateOverallScore = async function (employeeId: string) {
	const employee = await this.findById(employeeId);
	if (!employee) throw new Error("Employee not found");

	if (employee.observationReports.length > 0) {
		const totalScore = employee.observationReports.reduce((sum: number, report: IObservationReport) => {
			return sum + (report.overall_score || 0);
		}, 0);

		employee.overall_grading_score = parseFloat((totalScore / employee.observationReports.length).toFixed(2));
	} else {
		employee.overall_grading_score = 0; // Set to 0 if there are no observation reports
	}

	await employee.save();
};

interface IEmployeeModel extends Model<IEmployee> {
	updateOverallScore(employeeId: string): Promise<void>;
}

// Create Models with Discriminators
const EmployeeModel = mongoose.model<IEmployee, IEmployeeModel>("Employee", BaseEmployeeSchema);

const MasterCrewEmployeeModel = EmployeeModel.discriminator<IMasterCrew>(
	"MasterCrewEmployee",
	new Schema({
		master_crew_remarks: { type: String },
	})
);

const SeniorCrewEmployeeModel = EmployeeModel.discriminator<ISeniorCrew>(
	"SeniorCrewEmployee",
	new Schema({
		senior_crew_remarks: { type: String },
	})
);

const InternModel = EmployeeModel.discriminator<IIntern>(
	"Intern",
	new Schema({
		mentor: { type: String },
		intern_start_date: { type: Date },
		intern_end_date: { type: Date },
		intern_remarks: { type: String },
		duration_in_months: { type: Number },
	})
);

const SpecialistTraineeModel = EmployeeModel.discriminator<ISpecialistTrainee>(
	"SpecialistTrainee",
	new Schema({
		specialist_trainee_remarks: { type: String },
	})
);

const LocalCrewModel = EmployeeModel.discriminator<ILocalCrew>(
	"LocalCrew",
	new Schema({
		local_crew_remarks: { type: String },
	})
);

const ForeignCrewModel = EmployeeModel.discriminator<IForeignCrew>(
	"ForeignCrew",
	new Schema({
		foreign_crew_remarks: { type: String },
	})
);

const DirectIntakeModel = EmployeeModel.discriminator<IDirectIntake>(
	"DirectIntake",
	new Schema({
		direct_intake_remarks: { type: String },
	})
);

export { EmployeeModel, MasterCrewEmployeeModel, SeniorCrewEmployeeModel, SpecialistTraineeModel, InternModel, LocalCrewModel, ForeignCrewModel, DirectIntakeModel, ObservationReportSchema };
