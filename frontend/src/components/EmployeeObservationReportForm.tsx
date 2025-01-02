/** @format */
import React, { useState } from "react";
import { ObservationReport } from "../types/Employee";

interface EmployeeObservationReportFormProps {
	onAddObservation: (observation: ObservationReport) => void;
}

export const initializeObservationReport = (): ObservationReport => ({
	week_start_date: new Date(),
	training_centre: "",
	aprons_sop: 1,
	grooming: 1,
	facial_exp: 1,
	appearance_score: 1,
	app_remarks: "",
	handling_knowledge: 1,
	location_knowledge: 1,
	accounting: 1,
	eq_knowledge: 1,
	eq_score: 1,
	eq_remarks: "",
	product_knowledge: 1,
	outlet_knowledge: 1,
	opening_readiness: 1,
	float_and_front: 1,
	cleanliness: 1,
	pest_control_awareness: 1,
	pos_closing: 1,
	eq_washing: 1,
	safe_storage: 1,
	applicances: 1,
	floor_cleanliness: 1,
	daily_ops_score: 1,
	daily_ops_remarks: "",
	mixing_sop: 1,
	cooking_quality: 1,
	cooking_remarks: "",
	cooking_score: 1,
	skin_quality: 1,
	filling_consistency: 1,
	foreign_object_check: 1,
	cut_size: 1,
	rejected_handling: 1,
	final_product_score: 1,
	final_product_remarks: "",
	team_conversation: 1,
	cust_conversation: 1,
	listening_skills: 1,
	broadcasting: 1,
	instruction_understanding: 1,
	communication_score: 1,
	communication_remarks: "",
	team_efficiency: 1,
	rotation_confidence: 1,
	camaraderie: 1,
	assist_initiative: 1,
	teamwork_score: 1,
	teamwork_remarks: "",
	politeness: 1,
	service: 1,
	upsell: 1,
	empathy: 1,
	customer_service_score: 1,
	customer_service_remarks: "",
	calmness: 1,
	solving_effectiveness: 1,
	reporting: 1,
	problem_solving_score: 1,
	problem_solving_remarks: "",
	food_safety: 1,
	safe_workplace: 1,
	pest_control: 1,
	industry_knowledge_score: 1,
	industry_knowledge_remarks: "",
	willingness_to_cover: 1,
	willingness_to_do_more: 1,
	work_independantly: 1,
	attitude_score: 1,
	attitude_remarks: "",
	cust_satisfaction: 1,
	inventory: 1,
	sales: 1,
	individual: 1,
	team: 1,
	kpi_awareness_score: 1,
	kpi_awareness_remarks: "",
	evaluator: "",
});

const fieldConfigs = [
	// General Section
	{ id: "week_start_date", label: "Week Start Date", type: "date", section: "General" },
	{ id: "training_centre", label: "Training Centre", type: "text", section: "General" },

	// Appearance Section
	{ id: "aprons_sop", label: "SOP for Aprons", type: "number", min: 1, max: 5, section: "Appearance" },
	{ id: "grooming", label: "Grooming Score", type: "number", min: 1, max: 5, section: "Appearance" },
	{ id: "facial_exp", label: "Facial Expression Score", type: "number", min: 1, max: 5, section: "Appearance" },
	{ id: "appearance_score", label: "Appearance Score", type: "number", min: 0, max: 100, section: "Appearance" },
	{ id: "app_remarks", label: "Appearance Remarks", type: "text", section: "Appearance", required: false },

	// Equipment Section
	{ id: "handling_knowledge", label: "Handling Knowledge", type: "number", min: 1, max: 5, section: "Equipment" },
	{ id: "location_knowledge", label: "Location Knowledge", type: "number", min: 1, max: 5, section: "Equipment" },
	{ id: "accounting", label: "Accounting Knowledge", type: "number", min: 1, max: 5, section: "Equipment" },
	{ id: "eq_knowledge", label: "Equipment Knowledge", type: "number", section: "Equipment" },
	{ id: "eq_score", label: "Equipment Score", type: "number", min: 0, max: 100, section: "Equipment" },
	{ id: "eq_remarks", label: "Equipment Remarks", type: "text", section: "Equipment", required: false },

	// Daily Operations Section
	{ id: "product_knowledge", label: "Product Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "outlet_knowledge", label: "Outlet Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "opening_readiness", label: "Opening Readiness", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "float_and_front", label: "Float and Front Management", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "cleanliness", label: "Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "pest_control_awareness", label: "Pest Control Awareness", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "pos_closing", label: "POS Closing", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "eq_washing", label: "Equipment Washing", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "safe_storage", label: "Safe Storage", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "applicances", label: "Appliances Usage", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "floor_cleanliness", label: "Floor Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations" },
	{ id: "daily_ops_score", label: "Daily Operations Score", type: "number", min: 0, max: 100, section: "Daily Operations" },
	{ id: "daily_ops_remarks", label: "Daily Operations Remarks", type: "text", section: "Daily Operations", required: false },

	// Batter Mixing / Cooking Section
	{ id: "mixing_sop", label: "Mixing SOP Compliance", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking" },
	{ id: "cooking_quality", label: "Cooking Quality", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking" },
	{ id: "cooking_score", label: "Cooking Score", type: "number", min: 0, max: 100, section: "Batter Mixing / Cooking" },
	{ id: "cooking_remarks", label: "Cooking Remarks", type: "text", section: "Batter Mixing / Cooking", required: false },

	// Final Product Quality Section
	{ id: "skin_quality", label: "Skin Quality", type: "number", min: 1, max: 5, section: "Final Product Quality" },
	{ id: "filling_consistency", label: "Filling Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality" },
	{ id: "foreign_object_check", label: "Foreign Object Check", type: "number", min: 1, max: 5, section: "Final Product Quality" },
	{ id: "cut_size", label: "Cut Size Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality" },
	{ id: "rejected_handling", label: "Rejected Handling", type: "number", min: 1, max: 5, section: "Final Product Quality" },
	{ id: "final_product_score", label: "Final Product Score", type: "number", min: 0, max: 5, section: "Final Product Quality" },
	{ id: "final_product_remarks", label: "Final Product Remarks", type: "text", section: "Final Product Quality", required: false },

	// Communication Section
	{ id: "team_conversation", label: "Team Conversation", type: "number", min: 1, max: 5, section: "Communication" },
	{ id: "cust_conversation", label: "Customer Conversation", type: "number", min: 1, max: 5, section: "Communication" },
	{ id: "listening_skills", label: "Listening Skills", type: "number", min: 1, max: 5, section: "Communication" },
	{ id: "broadcasting", label: "Broadcasting", type: "number", min: 1, max: 5, section: "Communication" },
	{ id: "instruction_understanding", label: "Instruction Understanding", type: "number", min: 1, max: 5, section: "Communication" },
	{ id: "communication_score", label: "Communication Score", type: "number", min: 0, max: 100, section: "Communication" },
	{ id: "communication_remarks", label: "Communication Remarks", type: "text", section: "Communication", required: false },

	// Add the remaining sections here similarly...

	// Evaluator Section
	{ id: "evaluator", label: "Evaluator Name", type: "text", section: "Evaluator", required: false },
];

const EmployeeObservationReportForm: React.FC<EmployeeObservationReportFormProps> = ({ onAddObservation }) => {
	const [reports, setReports] = useState<ObservationReport[]>([initializeObservationReport()]);

	const handleInputChange = (index: number, field: keyof ObservationReport, value: any) => {
		setReports((prevReports) => prevReports.map((report, i) => (i === index ? { ...report, [field]: value } : report)));
	};

	const handleAddReport = () => {
		setReports((prevReports) => [...prevReports, initializeObservationReport()]);
	};

	const handleRemoveReport = (index: number) => {
		setReports((prevReports) => prevReports.filter((_, i) => i !== index));
	};

	return (
		<div className="container">
			<h4>Observation Reports</h4>
			{reports.map((report, index) => (
				<div key={index} className="border rounded p-3 mb-3">
					<h5>Observation Report {index + 1}</h5>
					{Object.entries(
						fieldConfigs.reduce((sections, field) => {
							// Group fields by section
							sections[field.section] = sections[field.section] || [];
							sections[field.section].push(field);
							return sections;
						}, {} as Record<string, typeof fieldConfigs>)
					).map(([section, fields]) => (
						<div key={section} className="mb-4">
							<h6 className="mb-3">{section}</h6>
							<div className="row">
								{fields.map((field) => (
									<div key={field.id} className="col-md-4 mb-3">
										<label htmlFor={`${field.id}-${index}`} className="form-label">
											{field.label}
										</label>
										<input
											id={`${field.id}-${index}`}
											type={field.type}
											className="form-control"
											value={
												field.type === "date"
													? report[field.id as keyof ObservationReport] instanceof Date
														? (report[field.id as keyof ObservationReport] as Date).toISOString().split("T")[0]
														: ""
													: report[field.id as keyof ObservationReport]?.toString() || ""
											}
											onChange={(e) => {
												const value =
													field.type === "number"
														? Math.min(Math.max(Number(e.target.value), field.min || 0), field.max || Infinity)
														: field.type === "date"
														? new Date(e.target.value)
														: e.target.value;
												handleInputChange(index, field.id as keyof ObservationReport, value);
											}}
											{...(field.min !== undefined && { min: field.min })}
											{...(field.max !== undefined && { max: field.max })}
											{...((field.required ?? true) && { required: true })} // Default to `true` if not specified
										/>
									</div>
								))}
							</div>
						</div>
					))}
					<button type="button" className="btn btn-danger mt-3" onClick={() => handleRemoveReport(index)}>
						Remove Report
					</button>
				</div>
			))}
			<button type="button" className="btn btn-success mt-4" onClick={handleAddReport}>
				Add Observation Report
			</button>
		</div>
	);
};

export default EmployeeObservationReportForm;
