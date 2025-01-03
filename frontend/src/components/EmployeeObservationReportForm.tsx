/** @format */
import React, { useState, useEffect, useCallback } from "react";

import { ObservationReport } from "../types/Employee";

interface EmployeeObservationReportFormProps {
	observationReports: ObservationReport[]; // Array of observation reports
	setObservationReports: React.Dispatch<React.SetStateAction<ObservationReport[]>>; // Callback to update observationReports
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
	{ id: "week_start_date", label: "Week Start Date", type: "date", section: "General", required: true },
	{ id: "training_centre", label: "Training Centre", type: "text", section: "General", required: true },

	// Appearance Section
	{ id: "aprons_sop", label: "SOP for Aprons", type: "number", min: 1, max: 5, section: "Appearance", required: true },
	{ id: "grooming", label: "Grooming Score", type: "number", min: 1, max: 5, section: "Appearance", required: true },
	{ id: "facial_exp", label: "Facial Expression Score", type: "number", min: 1, max: 5, section: "Appearance", required: true },
	{ id: "appearance_score", label: "Appearance Score", type: "number", min: 0, max: 5, section: "Appearance", required: true },
	{ id: "app_remarks", label: "Appearance Remarks", type: "text", section: "Appearance", required: false },

	// Equipment Section
	{ id: "handling_knowledge", label: "Handling Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: true },
	{ id: "location_knowledge", label: "Location Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: true },
	{ id: "accounting", label: "Accounting Knowledge", type: "number", min: 1, max: 5, section: "Equipment", required: true },
	{ id: "eq_knowledge", label: "Equipment Knowledge", type: "number", section: "Equipment", required: true },
	{ id: "eq_score", label: "Equipment Score", type: "number", min: 0, max: 5, section: "Equipment", required: true },
	{ id: "eq_remarks", label: "Equipment Remarks", type: "text", section: "Equipment", required: false },

	// Daily Operations Section
	{ id: "product_knowledge", label: "Product Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "outlet_knowledge", label: "Outlet Knowledge", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "opening_readiness", label: "Opening Readiness", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "float_and_front", label: "Float and Front Management", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "cleanliness", label: "Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "pest_control_awareness", label: "Pest Control Awareness", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "pos_closing", label: "POS Closing", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "eq_washing", label: "Equipment Washing", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "safe_storage", label: "Safe Storage", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "applicances", label: "Appliances Usage", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "floor_cleanliness", label: "Floor Cleanliness", type: "number", min: 1, max: 5, section: "Daily Operations", required: true },
	{ id: "daily_ops_score", label: "Daily Operations Score", type: "number", min: 0, max: 5, section: "Daily Operations", required: true },
	{ id: "daily_ops_remarks", label: "Daily Operations Remarks", type: "text", section: "Daily Operations", required: false },

	// Batter Mixing / Cooking Section
	{ id: "mixing_sop", label: "Mixing SOP Compliance", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking", required: true },
	{ id: "cooking_quality", label: "Cooking Quality", type: "number", min: 1, max: 5, section: "Batter Mixing / Cooking", required: true },
	{ id: "cooking_score", label: "Cooking Score", type: "number", min: 0, max: 5, section: "Batter Mixing / Cooking", required: true },
	{ id: "cooking_remarks", label: "Cooking Remarks", type: "text", section: "Batter Mixing / Cooking", required: false },

	// Final Product Quality Section
	{ id: "skin_quality", label: "Skin Quality", type: "number", min: 1, max: 5, section: "Final Product Quality", required: true },
	{ id: "filling_consistency", label: "Filling Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality", required: true },
	{ id: "foreign_object_check", label: "Foreign Object Check", type: "number", min: 1, max: 5, section: "Final Product Quality", required: true },
	{ id: "cut_size", label: "Cut Size Consistency", type: "number", min: 1, max: 5, section: "Final Product Quality", required: true },
	{ id: "rejected_handling", label: "Rejected Handling", type: "number", min: 1, max: 5, section: "Final Product Quality", required: true },
	{ id: "final_product_score", label: "Final Product Score", type: "number", min: 0, max: 5, section: "Final Product Quality", required: true },
	{ id: "final_product_remarks", label: "Final Product Remarks", type: "text", section: "Final Product Quality", required: false },

	// Communication Section
	{ id: "team_conversation", label: "Team Conversation", type: "number", min: 1, max: 5, section: "Communication", required: true },
	{ id: "cust_conversation", label: "Customer Conversation", type: "number", min: 1, max: 5, section: "Communication", required: true },
	{ id: "listening_skills", label: "Listening Skills", type: "number", min: 1, max: 5, section: "Communication", required: true },
	{ id: "broadcasting", label: "Broadcasting", type: "number", min: 1, max: 5, section: "Communication", required: true },
	{ id: "instruction_understanding", label: "Instruction Understanding", type: "number", min: 1, max: 5, section: "Communication", required: true },
	{ id: "communication_score", label: "Communication Score", type: "number", min: 0, max: 5, section: "Communication", required: true },
	{ id: "communication_remarks", label: "Communication Remarks", type: "text", section: "Communication", required: false },

	// Teamwork Section
	{ id: "team_efficiency", label: "Team Efficiency", type: "number", min: 1, max: 5, section: "Teamwork", required: true },
	{ id: "rotation_confidence", label: "Rotation Confidence", type: "number", min: 1, max: 5, section: "Teamwork", required: true },
	{ id: "camaraderie", label: "Camaraderie", type: "number", min: 1, max: 5, section: "Teamwork", required: true },
	{ id: "assist_initiative", label: "Assist Initiative", type: "number", min: 1, max: 5, section: "Teamwork", required: true },
	{ id: "teamwork_score", label: "Teamwork Score", type: "number", min: 0, max: 5, section: "Teamwork", required: true },
	{ id: "teamwork_remarks", label: "Teamwork Remarks", type: "text", section: "Teamwork", required: false },

	// Customer Service Section
	{ id: "politeness", label: "Politeness", type: "number", min: 1, max: 5, section: "Customer Service", required: true },
	{ id: "service", label: "Service", type: "number", min: 1, max: 5, section: "Customer Service", required: true },
	{ id: "upsell", label: "Upsell", type: "number", min: 1, max: 5, section: "Customer Service", required: true },
	{ id: "empathy", label: "Empathy", type: "number", min: 1, max: 5, section: "Customer Service", required: true },
	{ id: "customer_service_score", label: "Customer Service Score", type: "number", min: 0, max: 5, section: "Customer Service", required: true },
	{ id: "customer_service_remarks", label: "Customer Service Remarks", type: "text", section: "Customer Service", required: false },

	// Problem Solving Section
	{ id: "calmness", label: "Calmness", type: "number", min: 1, max: 5, section: "Problem Solving", required: true },
	{ id: "solving_effectiveness", label: "Solving Effectiveness", type: "number", min: 1, max: 5, section: "Problem Solving", required: true },
	{ id: "reporting", label: "Reporting", type: "number", min: 1, max: 5, section: "Problem Solving", required: true },
	{ id: "problem_solving_score", label: "Problem Solving Score", type: "number", min: 0, max: 5, section: "Problem Solving", required: true },
	{ id: "problem_solving_remarks", label: "Problem Solving Remarks", type: "text", section: "Problem Solving", required: false },

	// Industry Knowledge Section
	{ id: "food_safety", label: "Food Safety", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: true },
	{ id: "safe_workplace", label: "Safe Workplace", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: true },
	{ id: "pest_control", label: "Pest Control", type: "number", min: 1, max: 5, section: "Industry Knowledge", required: true },
	{ id: "industry_knowledge_score", label: "Industry Knowledge Score", type: "number", min: 0, max: 5, section: "Industry Knowledge", required: true },
	{ id: "industry_knowledge_remarks", label: "Industry Knowledge Remarks", type: "text", section: "Industry Knowledge", required: false },

	// Initiative and Attitude Section
	{ id: "willingness_to_cover", label: "Willingness to Cover", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: true },
	{ id: "willingness_to_do_more", label: "Willingness to Do More", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: true },
	{ id: "work_independantly", label: "Work Independently", type: "number", min: 1, max: 5, section: "Initiative and Attitude", required: true },
	{ id: "attitude_score", label: "Attitude Score", type: "number", min: 0, max: 5, section: "Initiative and Attitude", required: true },
	{ id: "attitude_remarks", label: "Attitude Remarks", type: "text", section: "Initiative and Attitude", required: false },

	// KPI Awareness Section
	{ id: "cust_satisfaction", label: "Customer Satisfaction", type: "number", min: 1, max: 5, section: "KPI Awareness", required: true },
	{ id: "inventory", label: "Inventory", type: "number", min: 1, max: 5, section: "KPI Awareness", required: true },
	{ id: "sales", label: "Sales", type: "number", min: 1, max: 5, section: "KPI Awareness", required: true },
	{ id: "individual", label: "Individual Performance", type: "number", min: 1, max: 5, section: "KPI Awareness", required: true },
	{ id: "team", label: "Team Performance", type: "number", min: 1, max: 5, section: "KPI Awareness", required: true },
	{ id: "kpi_awareness_score", label: "KPI Awareness Score", type: "number", min: 0, max: 5, section: "KPI Awareness", required: true },
	{ id: "kpi_awareness_remarks", label: "KPI Awareness Remarks", type: "text", section: "KPI Awareness", required: false },

	// Evaluator Section
	{ id: "evaluator", label: "Evaluator Name", type: "text", section: "Evaluator" },
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
		setLocalReports((prevReports) => prevReports.map((report, i) => (i === index ? { ...report, [field]: value } : report)));
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

				{/* Confirm Reports Button */}
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
			{/* Bootstrap Modal */}
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
