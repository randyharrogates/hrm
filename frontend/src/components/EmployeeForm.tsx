/** @format */

import React, { useState } from "react";
import { createEmployee } from "../api";

const EmployeeForm: React.FC = () => {
	const [EN, setEN] = useState("");
	const [name, setName] = useState("");
	const [contact, setContact] = useState("");
	const [employeeType, setEmployeeType] = useState("FullTime");
	const [trainingOutlet, setTrainingOutlet] = useState("");
	const [outlet, setOutlet] = useState("");
	const [probationStartDate, setProbationStartDate] = useState("");
	const [probationEndDate, setProbationEndDate] = useState("");
	const [remarks, setRemarks] = useState("");
	const [currentEmployee, setCurrentEmployee] = useState(true);

	// Specific fields for employee types
	const [annualSalary, setAnnualSalary] = useState<number | null>(null);
	const [healthcarePlan, setHealthcarePlan] = useState("");
	const [hourlyRate, setHourlyRate] = useState<number | null>(null);
	const [contractEndDate, setContractEndDate] = useState("");
	const [mentor, setMentor] = useState("");
	const [durationInMonths, setDurationInMonths] = useState<number | null>(null);
	const [contractAgency, setContractAgency] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const baseData = {
			EN,
			name,
			contact,
			employee_type: employeeType,
			training_outlet: trainingOutlet,
			outlet,
			probation_start_date: probationStartDate,
			probation_end_date: probationEndDate,
			remarks,
			current_employee: currentEmployee,
		};

		let specificData = {};
		switch (employeeType) {
			case "FullTime":
				specificData = { annual_salary: annualSalary, healthcare_plan: healthcarePlan };
				break;
			case "PartTime":
				specificData = { hourly_rate: hourlyRate, contract_end_date: contractEndDate };
				break;
			case "Intern":
				specificData = { mentor, duration_in_months: durationInMonths };
				break;
			case "Contractor":
				specificData = { contract_agency: contractAgency, contract_end_date: contractEndDate };
				break;
			default:
				break;
		}

		await createEmployee({ ...baseData, ...specificData });

		// Clear fields
		setEN("");
		setName("");
		setContact("");
		setEmployeeType("FullTime");
		setTrainingOutlet("");
		setOutlet("");
		setProbationStartDate("");
		setProbationEndDate("");
		setRemarks("");
		setCurrentEmployee(true);
		setAnnualSalary(null);
		setHealthcarePlan("");
		setHourlyRate(null);
		setContractEndDate("");
		setMentor("");
		setDurationInMonths(null);
		setContractAgency("");
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">
				<i className="bi bi-person-plus"></i> Add Employee
			</h2>
			<form onSubmit={handleSubmit} className="row g-3">
				{/* Employee Number */}
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Employee Number
					</label>
					<input type="text" id="EN" className="form-control" value={EN} onChange={(e) => setEN(e.target.value)} required />
				</div>

				{/* Name */}
				<div className="col-md-6">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
				</div>

				{/* Contact */}
				<div className="col-md-6">
					<label htmlFor="contact" className="form-label">
						Contact
					</label>
					<input type="text" id="contact" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
				</div>

				{/* Employee Type */}
				<div className="col-md-6">
					<label htmlFor="employeeType" className="form-label">
						Employee Type
					</label>
					<select id="employeeType" className="form-select" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
						<option value="FullTime">Full-Time</option>
						<option value="PartTime">Part-Time</option>
						<option value="Intern">Intern</option>
						<option value="Contractor">Contractor</option>
					</select>
				</div>

				{/* Training Outlet */}
				<div className="col-md-6">
					<label htmlFor="trainingOutlet" className="form-label">
						Training Outlet
					</label>
					<input type="text" id="trainingOutlet" className="form-control" value={trainingOutlet} onChange={(e) => setTrainingOutlet(e.target.value)} required />
				</div>

				{/* Outlet */}
				<div className="col-md-6">
					<label htmlFor="outlet" className="form-label">
						Outlet
					</label>
					<input type="text" id="outlet" className="form-control" value={outlet} onChange={(e) => setOutlet(e.target.value)} required />
				</div>

				{/* Probation Dates */}
				<div className="col-md-6">
					<label htmlFor="probationStartDate" className="form-label">
						Probation Start Date
					</label>
					<input type="date" id="probationStartDate" className="form-control" value={probationStartDate} onChange={(e) => setProbationStartDate(e.target.value)} required />
				</div>
				<div className="col-md-6">
					<label htmlFor="probationEndDate" className="form-label">
						Probation End Date
					</label>
					<input type="date" id="probationEndDate" className="form-control" value={probationEndDate} onChange={(e) => setProbationEndDate(e.target.value)} required />
				</div>

				{/* Remarks */}
				<div className="col-12">
					<label htmlFor="remarks" className="form-label">
						Remarks
					</label>
					<textarea id="remarks" className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
				</div>

				{/* Current Employee */}
				<div className="col-12">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="currentEmployee" checked={currentEmployee} onChange={(e) => setCurrentEmployee(e.target.checked)} />
						<label className="form-check-label" htmlFor="currentEmployee">
							Current Employee
						</label>
					</div>
				</div>

				{/* Specific Fields */}
				{employeeType === "FullTime" && (
					<>
						<div className="col-md-6">
							<label htmlFor="annualSalary" className="form-label">
								Annual Salary
							</label>
							<input type="number" id="annualSalary" className="form-control" value={annualSalary || ""} onChange={(e) => setAnnualSalary(Number(e.target.value))} />
						</div>
						<div className="col-md-6">
							<label htmlFor="healthcarePlan" className="form-label">
								Healthcare Plan
							</label>
							<input type="text" id="healthcarePlan" className="form-control" value={healthcarePlan} onChange={(e) => setHealthcarePlan(e.target.value)} />
						</div>
					</>
				)}

				{employeeType === "PartTime" && (
					<>
						<div className="col-md-6">
							<label htmlFor="hourlyRate" className="form-label">
								Hourly Rate
							</label>
							<input type="number" id="hourlyRate" className="form-control" value={hourlyRate || ""} onChange={(e) => setHourlyRate(Number(e.target.value))} />
						</div>
						<div className="col-md-6">
							<label htmlFor="contractEndDate" className="form-label">
								Contract End Date
							</label>
							<input type="date" id="contractEndDate" className="form-control" value={contractEndDate} onChange={(e) => setContractEndDate(e.target.value)} />
						</div>
					</>
				)}

				{employeeType === "Intern" && (
					<>
						<div className="col-md-6">
							<label htmlFor="mentor" className="form-label">
								Mentor
							</label>
							<input type="text" id="mentor" className="form-control" value={mentor} onChange={(e) => setMentor(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="durationInMonths" className="form-label">
								Duration (Months)
							</label>
							<input type="number" id="durationInMonths" className="form-control" value={durationInMonths || ""} onChange={(e) => setDurationInMonths(Number(e.target.value))} />
						</div>
					</>
				)}

				{employeeType === "Contractor" && (
					<>
						<div className="col-md-6">
							<label htmlFor="contractAgency" className="form-label">
								Contract Agency
							</label>
							<input type="text" id="contractAgency" className="form-control" value={contractAgency} onChange={(e) => setContractAgency(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="contractEndDate" className="form-label">
								Contract End Date
							</label>
							<input type="date" id="contractEndDate" className="form-control" value={contractEndDate} onChange={(e) => setContractEndDate(e.target.value)} />
						</div>
					</>
				)}

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
