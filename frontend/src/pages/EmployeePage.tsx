/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { IEmployee, IObservationReport } from "@shared/types/employee";
import { IMasterCrew, ISeniorCrew, IIntern, ISpecialistTrainee, ILocalCrew, IForeignCrew } from "../types/Employee";

const EmployeePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [employee, setEmployee] = useState<IEmployee | null>(null);
	const [observationReports, setObservationReports] = useState<IObservationReport[]>([]);
	const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	const isMasterCrew = (employee: IEmployee): employee is IMasterCrew => employee.employee_type === "MasterCrew";

	const isSeniorCrew = (employee: IEmployee): employee is ISeniorCrew => employee.employee_type === "SeniorCrew";

	const isIntern = (employee: IEmployee): employee is IIntern => employee.employee_type === "Intern";

	const isSpecialistTrainee = (employee: IEmployee): employee is ISpecialistTrainee => employee.employee_type === "SpecialistTrainee";

	const isLocalCrew = (employee: IEmployee): employee is ILocalCrew => employee.employee_type === "LocalCrew";

	const isForeignCrew = (employee: IEmployee): employee is IForeignCrew => employee.employee_type === "ForeignCrew";

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const response = await api.get(`/${id}`);
				setEmployee(response.data);
			} catch (error) {
				console.error("Error fetching employee details:", error);
			}
		};

		const fetchObservationReports = async () => {
			try {
				const response = await api.get(`/${id}/observations`);
				setObservationReports(response.data);
			} catch (error) {
				console.error("Error fetching observation reports:", error);
			}
		};

		fetchEmployee();
		fetchObservationReports();
	}, [id]);

	const toggleReport = (index: number) => {
		setExpandedReportIndex(index === expandedReportIndex ? null : index);
	};

	if (!employee) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	const renderDiscriminatorFields = () => {
		if (!employee) return null;

		if (isMasterCrew(employee)) {
			return (
				<p>
					<strong>Master Crew Remarks:</strong> {employee.master_crew_remarks}
				</p>
			);
		}

		if (isSeniorCrew(employee)) {
			return (
				<>
					<p>
						<strong>Training Form:</strong> {employee.training_form}
					</p>
					<p>
						<strong>14-Hour Shift:</strong> {employee.forteen_hours_shift ? new Date(employee.forteen_hours_shift).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Verbal and Practical:</strong> {employee.verbal_and_practical ? new Date(employee.verbal_and_practical).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Certificate:</strong> {employee.certificate}
					</p>
					<p>
						<strong>Senior Crew Remarks:</strong> {employee.senior_crew_remarks}
					</p>
				</>
			);
		}

		if (isIntern(employee)) {
			return (
				<>
					<p>
						<strong>Mentor:</strong> {employee.mentor}
					</p>
					<p>
						<strong>Intern Start Date:</strong> {employee.intern_start_date ? new Date(employee.intern_start_date).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Intern End Date:</strong> {employee.intern_end_date ? new Date(employee.intern_end_date).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Intern Remarks:</strong> {employee.intern_remarks}
					</p>
				</>
			);
		}

		if (isSpecialistTrainee(employee)) {
			return (
				<>
					<p>
						<strong>Training Form:</strong> {employee.training_form}
					</p>
					<p>
						<strong>14-Hour Shift:</strong> {employee.forteen_hours_shift ? new Date(employee.forteen_hours_shift).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Verbal and Practical:</strong> {employee.verbal_and_practical ? new Date(employee.verbal_and_practical).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Specialist Trainee Remarks:</strong> {employee.specialist_trainee_remarks}
					</p>
				</>
			);
		}

		if (isLocalCrew(employee)) {
			return (
				<>
					<p>
						<strong>Training Form:</strong> {employee.training_form}
					</p>
					<p>
						<strong>14-Hour Shift:</strong> {employee.forteen_hours_shift ? new Date(employee.forteen_hours_shift).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Verbal and Practical:</strong> {employee.verbal_and_practical ? new Date(employee.verbal_and_practical).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Local Crew Remarks:</strong> {employee.local_crew_remarks}
					</p>
				</>
			);
		}

		if (isForeignCrew(employee)) {
			return (
				<>
					<p>
						<strong>Training Form:</strong> {employee.training_form}
					</p>
					<p>
						<strong>14-Hour Shift:</strong> {employee.forteen_hours_shift ? new Date(employee.forteen_hours_shift).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Verbal and Practical:</strong> {employee.verbal_and_practical ? new Date(employee.verbal_and_practical).toLocaleDateString() : "N/A"}
					</p>
					<p>
						<strong>Foreign Crew Remarks:</strong> {employee.foreign_crew_remarks}
					</p>
					<p>
						<strong>Employee Pass Type:</strong> {employee.pass_type}
					</p>
				</>
			);
		}

		return <p className="text-muted">No additional fields available for this employee type.</p>;
	};

	return (
		<div className="container my-5">
			<div className="card shadow">
				<div className="card-header bg-primary text-white">
					<h1 className="card-title">
						<i className="bi bi-person-circle me-2"></i> Employee Details
					</h1>
				</div>
				<div className="card-body">
					<p>
						<strong>EN:</strong> {employee.EN}
					</p>
					<p>
						<strong>Name:</strong> {employee.name}
					</p>
					<p>
						<strong>Contact:</strong> {employee.contact}
					</p>
					<p>
						<strong>Employee Type:</strong> {employee.employee_type}
					</p>
					<p>
						<strong>Training Outlet:</strong> {employee.training_outlet}
					</p>
					<p>
						<strong>Outlet:</strong> {employee.outlet}
					</p>
					<p>
						<strong>Probation Start Date:</strong> {new Date(employee.probation_start_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Probation End Date:</strong> {employee.probation_end_date ? new Date(employee.probation_end_date).toLocaleDateString() : "Not available"}
					</p>
					<p>
						<strong>Remarks:</strong> {employee.remarks || "None"}
					</p>
					<p>
						<strong>Terminated?:</strong> {employee.terminated ? "Yes" : "No"}
					</p>
					<p>
						<strong>Passed probation?:</strong> {employee.passed_probation ? "Yes" : "No"}
					</p>
					<p>
						<strong>Extended probation?:</strong> {employee.extended_probation ? "Yes" : "No"}
					</p>
					<p>
						<strong>Overall Grading Score:</strong> {employee.overall_grading_score || 0}
					</p>
					{/* Render discriminator-specific fields */}
					{renderDiscriminatorFields()}
				</div>

				{/* Render observation reports */}
				<div className="card-body">
					<h3 className="card-title mt-4">Observation Reports</h3>
					{observationReports.length > 0 ? (
						<div className="list-group">
							{observationReports.map((report, index) => (
								<div key={index} className="list-group-item border rounded-3 shadow-sm my-2 p-3">
									<div className="d-flex justify-content-between align-items-center" onClick={() => toggleReport(index)} style={{ cursor: "pointer" }}>
										<div>
											<strong>
												<i className="bi bi-calendar3 me-2"></i>Date:
											</strong>{" "}
											{new Date(report.week_start_date).toLocaleDateString()}
										</div>
										<div>{expandedReportIndex === index ? <i className="bi bi-chevron-up text-primary"></i> : <i className="bi bi-chevron-down text-primary"></i>}</div>
									</div>
									{expandedReportIndex === index && (
										<div className="mt-3 bg-light p-4 rounded shadow-sm">
											<h5 className="mb-5">
												<i className="bi bi-clipboard-check me-2"></i> Observation Report Details
											</h5>

											{/* General */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-geo-alt-fill me-2"></i> General
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Training Centre:</strong> {report.training_centre}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Evaluator:</strong> {report.evaluator}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Overall score:</strong> {report.overall_score}
														</p>
													</div>
												</div>
											</div>

											{/* Appearance */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-person-fill me-2"></i> Appearance
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>SOP for Aprons:</strong> {report.aprons_sop}
														</p>
														<p>
															<strong>Grooming:</strong> {report.grooming}
														</p>
														<p>
															<strong>Facial Expression:</strong> {report.facial_exp}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Remarks:</strong> {report.app_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Equipment */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-tools me-2"></i> Equipment
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Handling Knowledge:</strong> {report.handling_knowledge}
														</p>
														<p>
															<strong>Location Knowledge:</strong> {report.location_knowledge}
														</p>
														<p>
															<strong>Accounting:</strong> {report.accounting}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Equipment Knowledge:</strong> {report.eq_knowledge}
														</p>
														<p>
															<strong>Remarks:</strong> {report.eq_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Daily Operations */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-calendar-check-fill me-2"></i> Daily Operations
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Product Knowledge:</strong> {report.product_knowledge}
														</p>
														<p>
															<strong>Outlet Knowledge:</strong> {report.outlet_knowledge}
														</p>
														<p>
															<strong>Opening Readiness:</strong> {report.opening_readiness}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Float and Front:</strong> {report.float_and_front}
														</p>
														<p>
															<strong>Cleanliness:</strong> {report.cleanliness}
														</p>
														<p>
															<strong>Pest Control Awareness:</strong> {report.pest_control_awareness}
														</p>
													</div>
												</div>
											</div>

											{/* Batter Mixing / Cooking */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-egg-fried me-2"></i> Batter Mixing / Cooking
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Mixing SOP:</strong> {report.mixing_sop}
														</p>
														<p>
															<strong>Cooking Quality:</strong> {report.cooking_quality}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Remarks:</strong> {report.cooking_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Final Product Quality */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-box2-heart-fill me-2"></i> Final Product Quality
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Skin Quality:</strong> {report.skin_quality}
														</p>
														<p>
															<strong>Filling Consistency:</strong> {report.filling_consistency}
														</p>
														<p>
															<strong>Foreign Object Check:</strong> {report.foreign_object_check}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Cut Size:</strong> {report.cut_size}
														</p>
														<p>
															<strong>Rejected Handling:</strong> {report.rejected_handling}
														</p>
													</div>
												</div>
											</div>

											{/* Communication */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-chat-right-dots-fill me-2"></i> Communication
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Team Conversation:</strong> {report.team_conversation}
														</p>
														<p>
															<strong>Customer Conversation:</strong> {report.cust_conversation}
														</p>
														<p>
															<strong>Listening Skills:</strong> {report.listening_skills}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Broadcasting:</strong> {report.broadcasting}
														</p>
														<p>
															<strong>Instruction Understanding:</strong> {report.instruction_understanding}
														</p>
													</div>
												</div>
											</div>

											{/* Teamwork */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-person-check-fill me-2"></i> Teamwork
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Team Efficiency:</strong> {report.team_efficiency}
														</p>
														<p>
															<strong>Rotation Confidence:</strong> {report.rotation_confidence}
														</p>
														<p>
															<strong>Camaraderie:</strong> {report.camaraderie}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Assist Initiative:</strong> {report.assist_initiative}
														</p>
														<p>
															<strong>Remarks:</strong> {report.teamwork_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Customer Service */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-heart-fill me-2"></i> Customer Service
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Politeness:</strong> {report.politeness}
														</p>
														<p>
															<strong>Service:</strong> {report.service}
														</p>
														<p>
															<strong>Upsell:</strong> {report.upsell}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Empathy:</strong> {report.empathy}
														</p>
														<p>
															<strong>Remarks:</strong> {report.customer_service_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Problem Solving */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-question-circle-fill me-2"></i> Problem Solving
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Calmness:</strong> {report.calmness}
														</p>
														<p>
															<strong>Solving Effectiveness:</strong> {report.solving_effectiveness}
														</p>
														<p>
															<strong>Reporting:</strong> {report.reporting}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Remarks:</strong> {report.problem_solving_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Industry Knowledge */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-book-fill me-2"></i> Industry Knowledge
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Food Safety:</strong> {report.food_safety}
														</p>
														<p>
															<strong>Safe Workplace:</strong> {report.safe_workplace}
														</p>
														<p>
															<strong>Pest Control:</strong> {report.pest_control}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Remarks:</strong> {report.industry_knowledge_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* Initiative and Attitude */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-flag-fill me-2"></i> Initiative and Attitude
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Willingness to Cover:</strong> {report.willingness_to_cover}
														</p>
														<p>
															<strong>Willingness to Do More:</strong> {report.willingness_to_do_more}
														</p>
														<p>
															<strong>Work Independently:</strong> {report.work_independantly}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Remarks:</strong> {report.attitude_remarks}
														</p>
													</div>
												</div>
											</div>

											{/* KPI Awareness */}
											<div className="mb-4">
												<h6 className="text-primary">
													<i className="bi bi-bar-chart-fill me-2"></i> KPI Awareness
												</h6>
												<div className="row">
													<div className="col-md-6">
														<p>
															<strong>Customer Satisfaction:</strong> {report.cust_satisfaction}
														</p>
														<p>
															<strong>Inventory:</strong> {report.inventory}
														</p>
														<p>
															<strong>Sales:</strong> {report.sales}
														</p>
													</div>
													<div className="col-md-6">
														<p>
															<strong>Individual KPI:</strong> {report.individual}
														</p>
														<p>
															<strong>Team KPI:</strong> {report.team}
														</p>
														<p>
															<strong>Remarks:</strong> {report.kpi_awareness_remarks}
														</p>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<p className="text-muted">No observation reports available for this employee.</p>
					)}
				</div>

				<div className="card-footer text-end">
					<button className="btn btn-primary" onClick={() => navigate("/employees")}>
						Back to List
					</button>
				</div>
			</div>
		</div>
	);
};

export default EmployeePage;
