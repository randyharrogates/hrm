/** @format */
import React, { useState, useEffect, useCallback } from "react";

import { ObservationReport } from "../types/Employee";

export interface EmployeeObservationReportFormProps {
	observationReports: ObservationReport[]; // Array of observation reports
	setObservationReports: React.Dispatch<React.SetStateAction<ObservationReport[]>>; // Callback to update observationReports
}

export const initializeObservationReport = (): ObservationReport => ({
	week_start_date: new Date(),
	training_centre: "",
	overall_score: 0,
	aprons_sop: null,
	grooming: null,
	facial_exp: null,
	app_remarks: "",
	handling_knowledge: null,
	location_knowledge: null,
	accounting: null,
	eq_knowledge: null,
	eq_remarks: "",
	product_knowledge: null,
	outlet_knowledge: null,
	opening_readiness: null,
	float_and_front: null,
	cleanliness: null,
	pest_control_awareness: null,
	pos_closing: null,
	eq_washing: null,
	safe_storage: null,
	applicances: null,
	floor_cleanliness: null,
	daily_ops_remarks: "",
	mixing_sop: null,
	cooking_quality: null,
	cooking_remarks: "",
	skin_quality: null,
	filling_consistency: null,
	foreign_object_check: null,
	cut_size: null,
	rejected_handling: null,
	final_product_remarks: "",
	team_conversation: null,
	cust_conversation: null,
	listening_skills: null,
	broadcasting: null,
	instruction_understanding: null,
	communication_remarks: "",
	team_efficiency: null,
	rotation_confidence: null,
	camaraderie: null,
	assist_initiative: null,
	teamwork_remarks: "",
	politeness: null,
	service: null,
	upsell: null,
	empathy: null,
	customer_service_remarks: "",
	calmness: null,
	solving_effectiveness: null,
	reporting: null,
	problem_solving_remarks: "",
	food_safety: null,
	safe_workplace: null,
	pest_control: null,
	industry_knowledge_remarks: "",
	willingness_to_cover: null,
	willingness_to_do_more: null,
	work_independantly: null,
	attitude_remarks: "",
	cust_satisfaction: null,
	inventory: null,
	sales: null,
	individual: null,
	team: null,
	kpi_awareness_remarks: "",
	evaluator: "",
});

const fieldConfigs = [
	// General Section
	{ id: "week_start_date", label: "Week Start Date", type: "date", section: "General", required: true },
	{ id: "training_centre", label: "Training Centre", type: "text", section: "General", required: false },
	{ id: "overall_score", label: "overall_score", type: "number", section: "General", required: false },

	// Appearance Section
	{ id: "aprons_sop", label: "SOP for Aprons", type: "number", min: 1, max: 5, step: 1, section: "Appearance", required: false },
	{ id: "grooming", label: "Grooming Score", type: "number", min: 1, max: 5, section: "Appearance", required: false },
	{ id: "facial_exp", label: "Facial Expression Score", type: "number", min: 1, max: 5, section: "Appearance", required: false },
	{ id: "app_remarks", label: "Appearance Remarks", type: "text", section: "Appearance", required: false },

	// Equipment Section
	{ id: "handling_knowledge", label: "Handling Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: false },
	{ id: "eq_knowledge", label: "Mgmt/Maintenance Check", type: "number", section: "Equipment", required: false },
	{ id: "location_knowledge", label: "Location Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: false },
	{ id: "accounting", label: "Accounting Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: false },

	{ id: "eq_remarks", label: "Equipment Remarks", type: "text", section: "Equipment", required: false },

	// Daily Operations Section
	{ id: "product_knowledge", label: "Product Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "outlet_knowledge", label: "Outlet Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "opening_readiness", label: "Opening Readiness", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "float_and_front", label: "Float and Front Management", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "cleanliness", label: "Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "pest_control_awareness", label: "Pest Control Awareness", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "pos_closing", label: "POS Closing", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "eq_washing", label: "Equipment Washing", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "safe_storage", label: "Safe Storage", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "applicances", label: "Appliances Usage", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "floor_cleanliness", label: "Floor Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations", required: false },
	{ id: "daily_ops_remarks", label: "Daily Operations Remarks", type: "text", section: "Daily Operations", required: false },

	// Batter Mixing / Cooking Section
	{ id: "mixing_sop", label: "Mixing SOP Compliance", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking", required: false },
	{ id: "cooking_quality", label: "Cooking Quality", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking", required: false },
	{ id: "cooking_remarks", label: "Cooking Remarks", type: "text", section: "Batter Mixing / Cooking", required: false },

	// Final Product Quality Section
	{ id: "skin_quality", label: "Skin Quality", type: "number", min: 1, max: 5, section: "Final Product Quality", required: false },
	{ id: "filling_consistency", label: "Filling Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality", required: false },
	{ id: "foreign_object_check", label: "Foreign Object Check", type: "number", min: 1, max: 5, section: "Final Product Quality", required: false },
	{ id: "cut_size", label: "Cut Size Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality", required: false },
	{ id: "rejected_handling", label: "Rejected Handling", type: "number", min: 1, max: 5, section: "Final Product Quality", required: false },
	{ id: "final_product_remarks", label: "Final Product Remarks", type: "text", section: "Final Product Quality", required: false },

	// Communication Section
	{ id: "team_conversation", label: "Team Conversation", type: "number", min: 1, max: 5, section: "Communication", required: false },
	{ id: "cust_conversation", label: "Customer Conversation", type: "number", min: 1, max: 5, section: "Communication", required: false },
	{ id: "listening_skills", label: "Listening Skills", type: "number", min: 1, max: 5, section: "Communication", required: false },
	{ id: "broadcasting", label: "Broadcasting", type: "number", min: 1, max: 5, section: "Communication", required: false },
	{ id: "instruction_understanding", label: "Instruction Understanding", type: "number", min: 1, max: 5, section: "Communication", required: false },
	{ id: "communication_remarks", label: "Communication Remarks", type: "text", section: "Communication", required: false },

	// Teamwork Section
	{ id: "team_efficiency", label: "Team Efficiency", type: "number", min: 1, max: 5, section: "Teamwork", required: false },
	{ id: "rotation_confidence", label: "Rotation Confidence", type: "number", min: 1, max: 5, section: "Teamwork", required: false },
	{ id: "camaraderie", label: "Camaraderie", type: "number", min: 1, max: 5, section: "Teamwork", required: false },
	{ id: "assist_initiative", label: "Assist Initiative", type: "number", min: 1, max: 5, section: "Teamwork", required: false },
	{ id: "teamwork_remarks", label: "Teamwork Remarks", type: "text", section: "Teamwork", required: false },

	// Customer Service Section
	{ id: "politeness", label: "Politeness", type: "number", min: 1, max: 5, section: "Customer Service", required: false },
	{ id: "service", label: "Service", type: "number", min: 1, max: 5, section: "Customer Service", required: false },
	{ id: "upsell", label: "Upsell", type: "number", min: 1, max: 5, section: "Customer Service", required: false },
	{ id: "empathy", label: "Empathy", type: "number", min: 1, max: 5, section: "Customer Service", required: false },
	{ id: "customer_service_remarks", label: "Customer Service Remarks", type: "text", section: "Customer Service", required: false },

	// Problem Solving Section
	{ id: "calmness", label: "Calmness", type: "number", min: 1, max: 5, section: "Problem Solving", required: false },
	{ id: "solving_effectiveness", label: "Solving Effectiveness", type: "number", min: 1, max: 5, section: "Problem Solving", required: false },
	{ id: "reporting", label: "Reporting", type: "number", min: 1, max: 5, section: "Problem Solving", required: false },
	{ id: "problem_solving_remarks", label: "Problem Solving Remarks", type: "text", section: "Problem Solving", required: false },

	// Industry Knowledge Section
	{ id: "food_safety", label: "Food Safety", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: false },
	{ id: "safe_workplace", label: "Safe Workplace", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: false },
	{ id: "pest_control", label: "Pest Control", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: false },
	{ id: "industry_knowledge_remarks", label: "Industry Knowledge Remarks", type: "text", section: "Industry Knowledge", required: false },

	// Initiative and Attitude Section
	{ id: "willingness_to_cover", label: "Willingness to Cover", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: false },
	{ id: "willingness_to_do_more", label: "Willingness to Do More", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: false },
	{ id: "work_independantly", label: "Work Independently", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: false },
	{ id: "attitude_remarks", label: "Attitude Remarks", type: "text", section: "Initiative and Attitude", required: false },

	// KPI Awareness Section
	{ id: "cust_satisfaction", label: "Customer Satisfaction", type: "number", min: 1, max: 5, section: "KPI Awareness", required: false },
	{ id: "inventory", label: "Inventory", type: "number", min: 1, max: 5, section: "KPI Awareness", required: false },
	{ id: "sales", label: "Sales", type: "number", min: 1, max: 5, section: "KPI Awareness", required: false },
	{ id: "individual", label: "Individual Performance", type: "number", min: 1, max: 5, section: "KPI Awareness", required: false },
	{ id: "team", label: "Team Performance", type: "number", min: 1, max: 5, section: "KPI Awareness", required: false },
	{ id: "kpi_awareness_remarks", label: "KPI Awareness Remarks", type: "text", section: "KPI Awareness", required: false },

	// Evaluator Section
	{ id: "evaluator", label: "Evaluator Name", required: true, type: "text", section: "Evaluator" },
];

const EmployeeObservationReportForm: React.FC<EmployeeObservationReportFormProps> = ({ observationReports, setObservationReports }) => {
	const [localReports, setLocalReports] = useState<ObservationReport[]>(observationReports);
	const [showModal, setShowModal] = useState(false); // State to control modal visibility
	const parseDate = (dateString: string | Date | undefined): Date | null => {
		if (!dateString) return null; // Handle undefined or empty values
		if (dateString instanceof Date) return dateString; // If already a Date object, return it
		const parsedDate = new Date(dateString); // Convert string to Date
		return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null if invalid date
	};

	const handleInputChange = (index: number, field: keyof ObservationReport, value: any) => {
		setLocalReports((prevReports) => prevReports.map((report, i) => (i === index ? { ...report, [field]: value === "" ? null : value } : report)));
	};

	// Add a new report
	const handleAddReport = () => {
		setLocalReports((prevReports) => [...prevReports, initializeObservationReport()]);
	};

	// Remove a report
	const handleRemoveReport = (index: number) => {
		setLocalReports((prevReports) => prevReports.filter((_, i) => i !== index));
	};

	useEffect(() => {
		setLocalReports(
			observationReports.map((report) => ({
				...report,
				week_start_date: parseDate(report.week_start_date) || new Date(), // Ensure a valid Date object
			}))
		);
	}, [observationReports]);

	// Call `setObservationReports` on user actions like Add/Remove/Change
	const syncToParent = useCallback(() => {
		if (JSON.stringify(localReports) !== JSON.stringify(observationReports)) {
			console.log("Syncing to parent:", localReports);
			setObservationReports(localReports);
		}
	}, [localReports, observationReports, setObservationReports]);

	return (
		<div className="container">
			<h4>Observation Reports</h4>
			{localReports.map((report, index) => (
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
								{fields.map((field) => {
									return (
										<div key={field.id} className="col-md-4 mb-3">
											<label htmlFor={`${field.id}-${index}`} className="form-label">
												{field.label}
											</label>
											{field.id === "overall_score" ? (
												<div className="form-control-plaintext">{report.overall_score}</div>
											) : (
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
														const inputValue = e.target.value;

														let value: any;

														if (field.type === "number") {
															if (inputValue === "") {
																// Allow empty input to support intermediate states
																value = "";
															} else {
																const numericValue = Number(inputValue);
																// Clamp value to min/max, if applicable
																value = isNaN(numericValue) ? "" : Math.min(Math.max(numericValue, field.min || 0), field.max || Infinity);
															}
														} else if (report[field.id as keyof ObservationReport] === "") {
															value = null;
														} else if (field.type === "date") {
															// Convert date string to Date object
															value = new Date(inputValue);
														} else {
															// For all other types, set the raw value
															value = inputValue;
														}

														handleInputChange(index, field.id as keyof ObservationReport, value);
													}}
													{...(field.min !== undefined && { min: field.min })}
													{...(field.max !== undefined && { max: field.max })}
													{...((field.required ?? false) && { required: false })}
													{...(field.step !== undefined && { step: field.step })}
												/>
											)}
										</div>
									);
								})}
							</div>
						</div>
					))}
					<button
						type="button"
						className="btn btn-danger mt-3"
						onClick={() => {
							handleRemoveReport(index);
							syncToParent();
						}}
					>
						Remove Report
					</button>
				</div>
			))}
			<div className="d-flex">
				{/* Add Observation Report Button */}
				<div className="me-2">
					<button
						type="button"
						className="btn btn-primary mt-4"
						onClick={() => {
							handleAddReport();
							syncToParent(); // Sync changes to parent
						}}
					>
						Add More Observation Reports
					</button>
				</div>

				<div>
					<button
						type="button"
						className="btn btn-success mt-4"
						onClick={() => {
							syncToParent(); // Sync changes to parent
							setShowModal(true); // Show the modal
						}} // Use syncToParent to explicitly update the parent state
					>
						Save Reports Changes
					</button>
				</div>
			</div>
			{showModal && (
				<div className="modal show" tabIndex={-1} style={{ display: "block" }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									<i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
									Reminder
								</h5>
								<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body">
								<p>
									Reports have been saved temporarily. Please click the
									<strong> Update</strong> or <strong>Create Employee</strong> button to save the employee data.
								</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmployeeObservationReportForm;
