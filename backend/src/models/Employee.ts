/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";
import { IEmployee, IObservationReport } from "@shared/employee";

// Extendable Employee Types
export interface IMasterCrew extends IEmployee {
	master_crew_remarks: string;
}

export interface ISeniorCrew extends IEmployee {
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	certificate: string;
	senior_crew_remarks: string;
}

export interface IIntern extends IEmployee {
	mentor: string;
	intern_start_date: Date;
	intern_end_date: Date;
	intern_remarks: string;
}

export interface ISpecialistTrainee extends IEmployee {
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	specialist_trainee_remarks: string;
}

export interface ILocalCrew extends IEmployee {
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	local_crew_remarks: string;
}

export interface IForeignCrew extends IEmployee {
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	pass_type: string;
	foreign_crew_remarks: string;
}

const ObservationReportSchema: Schema = new Schema({
	week_start_date: { type: Date, required: true },
	training_centre: { type: String, required: true },
	overall_score: { type: Number },

	// Appearance
	aprons_sop: { type: Number, required: true },
	grooming: { type: Number, required: true },
	facial_exp: { type: Number, required: true },
	app_remarks: { type: String, required: false },

	// Equipment
	handling_knowledge: { type: Number, required: true },
	location_knowledge: { type: Number, required: true },
	accounting: { type: Number, required: true },
	eq_knowledge: { type: String, required: true },
	eq_remarks: { type: String, required: false },

	// Daily Ops
	product_knowledge: { type: Number, required: true },
	outlet_knowledge: { type: Number, required: true },
	opening_readiness: { type: Number, required: true },
	float_and_front: { type: Number, required: true },
	cleanliness: { type: Number, required: true },
	pest_control_awareness: { type: Number, required: true },
	pos_closing: { type: Number, required: true },
	eq_washing: { type: Number, required: true },
	safe_storage: { type: Number, required: true },
	applicances: { type: Number, required: true },
	floor_cleanliness: { type: Number, required: true },
	daily_ops_remarks: { type: String, required: false },

	// Batter Mixing/Cooking
	mixing_sop: { type: Number, required: true },
	cooking_quality: { type: Number, required: true },
	cooking_remarks: { type: String, required: false },

	// Final Product Quality
	skin_quality: { type: Number, required: true },
	filling_consistency: { type: Number, required: true },
	foreign_object_check: { type: Number, required: true },
	cut_size: { type: Number, required: true },
	rejected_handling: { type: Number, required: true },
	final_product_remarks: { type: String, required: false },

	// Communication
	team_conversation: { type: Number, required: true },
	cust_conversation: { type: Number, required: true },
	listening_skills: { type: Number, required: true },
	broadcasting: { type: Number, required: true },
	instruction_understanding: { type: Number, required: true },
	communication_remarks: { type: String, required: false },

	// Teamwork
	team_efficiency: { type: Number, required: true },
	rotation_confidence: { type: Number, required: true },
	camaraderie: { type: Number, required: true },
	assist_initiative: { type: Number, required: true },
	teamwork_remarks: { type: String, required: false },

	// Customer Service
	politeness: { type: Number, required: true },
	service: { type: Number, required: true },
	upsell: { type: Number, required: true },
	empathy: { type: Number, required: true },
	customer_service_remarks: { type: String, required: false },

	// Problem Solving
	calmness: { type: Number, required: true },
	solving_effectiveness: { type: Number, required: true },
	reporting: { type: Number, required: true },
	problem_solving_remarks: { type: String, required: false },

	// Industry Knowledge
	food_safety: { type: Number, required: true },
	safe_workplace: { type: Number, required: true },
	pest_control: { type: Number, required: true },
	industry_knowledge_remarks: { type: String, required: false },

	// Initiative and Attitude
	willingness_to_cover: { type: Number, required: true },
	willingness_to_do_more: { type: Number, required: true },
	work_independantly: { type: Number, required: true },
	attitude_remarks: { type: String, required: false },

	// KPI Awareness
	cust_satisfaction: { type: Number, required: true },
	inventory: { type: Number, required: true },
	sales: { type: Number, required: true },
	individual: { type: Number, required: true },
	team: { type: Number, required: true },
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
	passed_probation: { type: Boolean, default: false },
	terminated: { type: Boolean, default: false },
	remarks: { type: String },
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
			const numericFields = Object.keys(plainReport).filter((field) => {
				// Exclude remarks fields and non-numeric fields
				return !field.endsWith("_remarks") && typeof plainReport[field] === "number" && !field.endsWith("overall_score");
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
			return sum + parseFloat(report.overall_score.toFixed(2));
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
		training_form: { type: String },
		forteen_hours_shift: { type: Date },
		verbal_and_practical: { type: Date },
		certificate: { type: String },
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
		training_form: { type: String },
		forteen_hours_shift: { type: Date },
		verbal_and_practical: { type: Date },
		specialist_trainee_remarks: { type: String },
	})
);

const LocalCrewModel = EmployeeModel.discriminator<ILocalCrew>(
	"LocalCrew",
	new Schema({
		training_form: { type: String },
		forteen_hours_shift: { type: Date },
		verbal_and_practical: { type: Date },
		local_crew_remarks: { type: String },
	})
);

const ForeignCrewModel = EmployeeModel.discriminator<IForeignCrew>(
	"ForeignCrew",
	new Schema({
		training_form: { type: String },
		forteen_hours_shift: { type: Date },
		verbal_and_practical: { type: Date },
		pass_type: { type: String },
		foreign_crew_remarks: { type: String },
	})
);

export { EmployeeModel, MasterCrewEmployeeModel, SeniorCrewEmployeeModel, SpecialistTraineeModel, InternModel, LocalCrewModel, ForeignCrewModel, ObservationReportSchema };
