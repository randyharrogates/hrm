/** @format */

import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EmployeeTypes, IMasterCrew, ISeniorCrew, IIntern, ISpecialistTrainee, ObservationReport } from "../types/Employee";
import EmployeeObservationReportForm from "./EmployeeObservationReportForm";

const EmployeeForm: React.FC = () => {
	const [employee, setEmployee] = useState<Partial<EmployeeTypes>>({
		employee_type: "Intern",
		current_employee: true,
		observationReports: [],
	});
	const navigate = useNavigate();

	// Type guards
	const isMasterCrew = (emp: Partial<EmployeeTypes>): emp is IMasterCrew => emp.employee_type === "MasterCrew";
	const isSeniorCrew = (emp: Partial<EmployeeTypes>): emp is ISeniorCrew => emp.employee_type === "SeniorCrew";
	const isIntern = (emp: Partial<EmployeeTypes>): emp is IIntern => emp.employee_type === "Intern";
	const isSpecialistTrainee = (emp: Partial<EmployeeTypes>): emp is ISpecialistTrainee => emp.employee_type === "SpecialistTrainee";

	const handleInputChange = (field: string, value: any) => {
		setEmployee((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleAddObservation = (observation: ObservationReport) => {
		setEmployee((prev) => ({
			...prev,
			observationReports: [...(prev.observationReports || []), observation],
		}));
	};

	const handleRemoveObservation = (index: number) => {
		setEmployee((prev) => ({
			...prev,
			observationReports: prev.observationReports?.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!employee.employee_type) {
			alert("Please select an employee type.");
			return;
		}
		try {
			await api.post("/", employee);
			navigate("/");
		} catch (error) {
			console.error("Error submitting employee:", error);
			alert("An error occurred while submitting the form.");
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">
				<i className="bi bi-person-plus"></i> Add Employee
			</h2>
			<form onSubmit={handleSubmit} className="row g-3">
				{/* General Fields */}
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Employee Number
					</label>
					<input type="text" id="EN" className="form-control" value={employee.EN || ""} onChange={(e) => handleInputChange("EN", e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input type="text" id="name" className="form-control" value={employee.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} required />
				</div>
				<div className="col-md-6">
					<label htmlFor="contact" className="form-label">
						Contact Number
					</label>
					<input type="text" id="contact" className="form-control" value={employee.contact || ""} onChange={(e) => handleInputChange("contact", e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="employee_type" className="form-label">
						Employee Type
					</label>
					<select id="employee_type" className="form-select" value={employee.employee_type} onChange={(e) => handleInputChange("employee_type", e.target.value)} required>
						<option value="MasterCrew">Master Crew</option>
						<option value="SeniorCrew">Senior Crew</option>
						<option value="Intern">Intern</option>
						<option value="SpecialistTrainee">Specialist Trainee</option>
					</select>
				</div>
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Training Outlet
					</label>
					<input type="text" id="EN" className="form-control" value={employee.training_outlet || ""} onChange={(e) => handleInputChange("training_outlet", e.target.value)} required />
				</div>
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Outlet
					</label>
					<input type="text" id="EN" className="form-control" value={employee.outlet || ""} onChange={(e) => handleInputChange("outlet", e.target.value)} required />
				</div>
				<div className="col-md-6">
					<label htmlFor="probation_start_date" className="form-label">
						Probation Start Date
					</label>
					<input
						type="date"
						id="probation_start_date"
						className="form-control"
						value={employee.probation_start_date ? employee.probation_start_date.toISOString().split("T")[0] : ""}
						onChange={(e) => handleInputChange("probation_start_date", new Date(e.target.value))}
						required
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="probation_end_date" className="form-label">
						Probation End Date
					</label>
					<input
						type="date"
						id="probation_end_date"
						className="form-control"
						value={employee.probation_end_date ? employee.probation_end_date.toISOString().split("T")[0] : ""}
						onChange={(e) => handleInputChange("probation_end_date", new Date(e.target.value))}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Remarks
					</label>
					<input type="text" id="EN" className="form-control" value={employee.remarks || ""} onChange={(e) => handleInputChange("remarks", e.target.value)} />
				</div>
				<div className="col-md-6 mt-4">
					<label htmlFor="current_employee" className="form-label me-3">
						Is this a current employee?
					</label>
					<input
						type="checkbox"
						id="current_employee"
						className="form-check-input"
						checked={employee.current_employee || false} // Use `checked` for boolean values
						onChange={(e) => handleInputChange("current_employee", e.target.checked)}
					/>
				</div>

				{/* Conditional Fields */}
				{isMasterCrew(employee) && (
					<div className="row justify-content-center mt-4">
						<div className="col-md-6">
							<label htmlFor="master_crew_remarks" className="form-label">
								Master Crew Remarks
							</label>
							<input
								type="text"
								id="master_crew_remarks"
								className="form-control"
								value={employee.master_crew_remarks || ""}
								onChange={(e) => handleInputChange("master_crew_remarks", e.target.value)}
							/>
						</div>
					</div>
				)}
				{isSeniorCrew(employee) && (
					<div className="row justify-content-center mt-4">
						<div className="col-md-6">
							<label htmlFor="senior_crew_remarks" className="form-label mt-4">
								Senior Crew Remarks
							</label>
							<input
								type="text"
								id="senior_crew_remarks"
								className="form-control"
								value={employee.senior_crew_remarks || ""}
								onChange={(e) => handleInputChange("senior_crew_remarks", e.target.value)}
							/>
						</div>

						{/* Training Form */}
						<div className="col-md-6">
							<label htmlFor="training_form" className="form-label mt-4">
								Training Form
							</label>
							<input type="text" id="training_form" className="form-control" value={employee.training_form || ""} onChange={(e) => handleInputChange("training_form", e.target.value)} />
						</div>

						{/* Fourteen Hours Shift */}
						<div className="col-md-6">
							<label htmlFor="forteen_hours_shift" className="form-label mt-4">
								Fourteen Hours Shift
							</label>
							<input
								type="date"
								id="forteen_hours_shift"
								className="form-control"
								value={employee.forteen_hours_shift ? employee.forteen_hours_shift.toISOString().split("T")[0] : ""}
								onChange={(e) => handleInputChange("forteen_hours_shift", new Date(e.target.value))}
							/>
						</div>

						{/* Verbal and Practical */}
						<div className="col-md-6">
							<label htmlFor="verbal_and_practical" className="form-label mt-4">
								Verbal and Practical
							</label>
							<input
								type="date"
								id="verbal_and_practical"
								className="form-control"
								value={employee.verbal_and_practical ? employee.verbal_and_practical.toISOString().split("T")[0] : ""}
								onChange={(e) => handleInputChange("verbal_and_practical", new Date(e.target.value))}
							/>
						</div>

						{/* Certificate */}
						<div className="col-md-6">
							<label htmlFor="certificate" className="form-label mt-4">
								Certificate
							</label>
							<input type="text" id="certificate" className="form-control" value={employee.certificate || ""} onChange={(e) => handleInputChange("certificate", e.target.value)} />
						</div>

						{/* Hourly Rate */}
						<div className="col-md-6">
							<label htmlFor="hourly_rate" className="form-label mt-4">
								Hourly Rate
							</label>
							<input type="number" id="hourly_rate" className="form-control" value={employee.hourly_rate || ""} onChange={(e) => handleInputChange("hourly_rate", +e.target.value)} />
						</div>

						{/* Contract End Date */}
						<div className="col-md-6">
							<label htmlFor="contract_end_date" className="form-label mt-4">
								Contract End Date
							</label>
							<input
								type="date"
								id="contract_end_date"
								className="form-control"
								value={employee.contract_end_date ? employee.contract_end_date.toISOString().split("T")[0] : ""}
								onChange={(e) => handleInputChange("contract_end_date", new Date(e.target.value))}
							/>
						</div>
					</div>
				)}

				{isIntern(employee) && (
					<div>
						<div className="row justify-content-center mt-4">
							{/* Mentor */}
							<div className="col-md-6">
								<label htmlFor="mentor" className="form-label mt-4">
									Mentor
								</label>
								<input type="text" id="mentor" className="form-control" value={employee.mentor || ""} onChange={(e) => handleInputChange("mentor", e.target.value)} />
							</div>

							{/* Intern Start Date */}
							<div className="col-md-6">
								<label htmlFor="intern_start_date" className="form-label mt-4">
									Intern Start Date
								</label>
								<input
									type="date"
									id="intern_start_date"
									className="form-control"
									value={employee.intern_start_date ? employee.intern_start_date.toISOString().split("T")[0] : ""}
									onChange={(e) => handleInputChange("intern_start_date", new Date(e.target.value))}
									required
								/>
							</div>

							{/* Intern End Date */}
							<div className="col-md-6">
								<label htmlFor="intern_end_date" className="form-label mt-4">
									Intern End Date
								</label>
								<input
									type="date"
									id="intern_end_date"
									className="form-control"
									value={employee.intern_end_date ? employee.intern_end_date.toISOString().split("T")[0] : ""}
									onChange={(e) => handleInputChange("intern_end_date", new Date(e.target.value))}
								/>
							</div>

							{/* Intern Remarks */}
							<div className="col-md-6">
								<label htmlFor="intern_remarks" className="form-label mt-4">
									Intern Remarks
								</label>
								<input
									type="text"
									id="intern_remarks"
									className="form-control"
									value={employee.intern_remarks || ""}
									onChange={(e) => handleInputChange("intern_remarks", e.target.value)}
								/>
							</div>

							{/* Duration in Months */}
							<div className="col-md-6">
								<label htmlFor="duration_in_months" className="form-label mt-4">
									Duration in Months
								</label>
								<input
									type="number"
									id="duration_in_months"
									className="form-control"
									value={employee.duration_in_months || ""}
									onChange={(e) => handleInputChange("duration_in_months", parseInt(e.target.value))}
								/>
							</div>
						</div>
					</div>
				)}

				{isSpecialistTrainee(employee) && (
					<div>
						{/* Specialist Trainee Remarks */}
						<div className="row justify-content-center mt-4">
							<div className="col-md-6">
								<label htmlFor="specialist_trainee_remarks" className="form-label mt-4">
									Specialist Trainee Remarks
								</label>
								<input
									type="text"
									id="specialist_trainee_remarks"
									className="form-control"
									value={employee.specialist_trainee_remarks || ""}
									onChange={(e) => handleInputChange("specialist_trainee_remarks", e.target.value)}
								/>
							</div>

							{/* Training Form */}
							<div className="col-md-6">
								<label htmlFor="training_form" className="form-label mt-4">
									Training Form
								</label>
								<input
									type="text"
									id="training_form"
									className="form-control"
									value={employee.training_form || ""}
									onChange={(e) => handleInputChange("training_form", e.target.value)}
								/>
							</div>

							{/* Fourteen Hours Shift */}
							<div className="col-md-6">
								<label htmlFor="forteen_hours_shift" className="form-label mt-4">
									Fourteen Hours Shift
								</label>
								<input
									type="date"
									id="forteen_hours_shift"
									className="form-control"
									value={employee.forteen_hours_shift ? employee.forteen_hours_shift.toISOString().split("T")[0] : ""}
									onChange={(e) => handleInputChange("forteen_hours_shift", new Date(e.target.value))}
								/>
							</div>

							{/* Verbal and Practical */}
							<div className="col-md-6">
								<label htmlFor="verbal_and_practical" className="form-label mt-4">
									Verbal and Practical
								</label>
								<input
									type="date"
									id="verbal_and_practical"
									className="form-control"
									value={employee.verbal_and_practical ? employee.verbal_and_practical.toISOString().split("T")[0] : ""}
									onChange={(e) => handleInputChange("verbal_and_practical", new Date(e.target.value))}
								/>
							</div>
						</div>
					</div>
				)}

				<div className="col-12">
					{/* Render existing observation reports */}
					{employee.observationReports?.map((report, index) => (
						<div key={index} className="border rounded p-3 mb-3">
							<h5>Report {index + 1}</h5>

							<button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveObservation(index)}>
								Remove Report
							</button>
						</div>
					))}

					{/* Add new observation reports */}
					<EmployeeObservationReportForm onAddObservation={handleAddObservation} />
				</div>

				{/* Submit Button */}
				<div className="col-12">
					<button type="submit" className="btn btn-primary w-100">
						<i className="bi bi-check-circle"></i> Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EmployeeForm;
