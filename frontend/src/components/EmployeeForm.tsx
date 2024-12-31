/** @format */

import React, { useState } from "react";
import { createEmployee } from "../api";
import { useNavigate } from "react-router-dom";

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

	// Observation reports
	const [observationReports, setObservationReports] = useState<{ date: string; observations: string; evaluator: string }[]>([{ date: "", observations: "", evaluator: "" }]);

	const navigate = useNavigate();

	const handleAddObservation = () => {
		setObservationReports([...observationReports, { date: "", observations: "", evaluator: "" }]);
	};

	const handleObservationChange = (index: number, field: string, value: string) => {
		const updatedReports = [...observationReports];
		updatedReports[index] = { ...updatedReports[index], [field]: value };
		setObservationReports(updatedReports);
	};

	const handleRemoveObservation = (index: number) => {
		const updatedReports = observationReports.filter((_, i) => i !== index);
		setObservationReports(updatedReports);
	};

	const handleEmployeeTypeChange = (newType: string) => {
		setEmployeeType(newType);

		// Clear specific fields when switching employee type
		setAnnualSalary(null);
		setHealthcarePlan("");
		setHourlyRate(null);
		setContractEndDate("");
		setMentor("");
		setDurationInMonths(null);
		setContractAgency("");
	};

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
			observationReports, // Include all observation reports in the payload
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
		navigate("/employees");
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">
				<i className="bi bi-person-plus"></i> Add Employee
			</h2>
			<form onSubmit={handleSubmit} className="row g-3">
				<div className="col-md-6">
					<label htmlFor="EN" className="form-label">
						Employee Number
					</label>
					<input type="text" id="EN" className="form-control" value={EN} onChange={(e) => setEN(e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="contact" className="form-label">
						Contact
					</label>
					<input type="text" id="contact" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="employeeType" className="form-label">
						Employee Type
					</label>
					<select id="employeeType" className="form-select" value={employeeType} onChange={(e) => handleEmployeeTypeChange(e.target.value)}>
						<option value="FullTime">Full-Time</option>
						<option value="PartTime">Part-Time</option>
						<option value="Intern">Intern</option>
						<option value="Contractor">Contractor</option>
					</select>
				</div>

				<div className="col-md-6">
					<label htmlFor="trainingOutlet" className="form-label">
						Training Outlet
					</label>
					<input type="text" id="trainingOutlet" className="form-control" value={trainingOutlet} onChange={(e) => setTrainingOutlet(e.target.value)} required />
				</div>

				<div className="col-md-6">
					<label htmlFor="outlet" className="form-label">
						Outlet
					</label>
					<input type="text" id="outlet" className="form-control" value={outlet} onChange={(e) => setOutlet(e.target.value)} required />
				</div>

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

				<div className="col-12">
					<label htmlFor="remarks" className="form-label">
						Remarks
					</label>
					<textarea id="remarks" className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
				</div>

				<div className="col-12">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="currentEmployee" checked={currentEmployee} onChange={(e) => setCurrentEmployee(e.target.checked)} />
						<label className="form-check-label" htmlFor="currentEmployee">
							Current Employee
						</label>
					</div>
				</div>

				{/* Observation Reports Section */}
				<div className="col-12">
					<h4 className="mt-4">Observation Reports</h4>
					{observationReports.map((report, index) => (
						<div key={index} className="row g-3 mb-3 border rounded p-3">
							<div className="col-md-4">
								<label htmlFor={`date-${index}`} className="form-label">
									Date
								</label>
								<input
									type="date"
									id={`date-${index}`}
									className="form-control"
									value={report.date}
									onChange={(e) => handleObservationChange(index, "date", e.target.value)}
									required
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor={`evaluator-${index}`} className="form-label">
									Evaluator
								</label>
								<input
									type="text"
									id={`evaluator-${index}`}
									className="form-control"
									value={report.evaluator}
									onChange={(e) => handleObservationChange(index, "evaluator", e.target.value)}
									required
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor={`observations-${index}`} className="form-label">
									Observations
								</label>
								<textarea
									id={`observations-${index}`}
									className="form-control"
									value={report.observations}
									onChange={(e) => handleObservationChange(index, "observations", e.target.value)}
									required
								></textarea>
							</div>
							<div className="col-12 text-end">
								<button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveObservation(index)}>
									<i className="bi bi-trash"></i> Remove
								</button>
							</div>
						</div>
					))}
					<button type="button" className="btn btn-secondary" onClick={handleAddObservation}>
						<i className="bi bi-plus-circle"></i> Add Observation
					</button>
				</div>

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
