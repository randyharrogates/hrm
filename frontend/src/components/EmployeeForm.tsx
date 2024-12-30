/** @format */

import React, { useState } from "react";
import api, { createEmployee } from "../api";

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
			probabtion_end_date: probationEndDate,
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
		<form onSubmit={handleSubmit}>
			<h2>Add Employee</h2>
			<input type="text" value={EN} onChange={(e) => setEN(e.target.value)} placeholder="Employee Number" required />
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
			<input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" required />
			<select value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
				<option value="FullTime">Full-Time</option>
				<option value="PartTime">Part-Time</option>
				<option value="Intern">Intern</option>
				<option value="Contractor">Contractor</option>
			</select>
			<input type="text" value={trainingOutlet} onChange={(e) => setTrainingOutlet(e.target.value)} placeholder="Training Outlet" required />
			<input type="text" value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="Outlet" required />
			<input type="date" value={probationStartDate} onChange={(e) => setProbationStartDate(e.target.value)} required />
			<input type="date" value={probationEndDate} onChange={(e) => setProbationEndDate(e.target.value)} required />
			<textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks"></textarea>
			<label>
				Current Employee:
				<input type="checkbox" checked={currentEmployee} onChange={(e) => setCurrentEmployee(e.target.checked)} />
			</label>

			{/* Specific Fields Based on Employee Type */}
			{employeeType === "FullTime" && (
				<>
					<input type="number" value={annualSalary || ""} onChange={(e) => setAnnualSalary(Number(e.target.value))} placeholder="Annual Salary" />
					<input type="text" value={healthcarePlan} onChange={(e) => setHealthcarePlan(e.target.value)} placeholder="Healthcare Plan" />
				</>
			)}

			{employeeType === "PartTime" && (
				<>
					<input type="number" value={hourlyRate || ""} onChange={(e) => setHourlyRate(Number(e.target.value))} placeholder="Hourly Rate" />
					<input type="date" value={contractEndDate} onChange={(e) => setContractEndDate(e.target.value)} placeholder="Contract End Date" />
				</>
			)}

			{employeeType === "Intern" && (
				<>
					<input type="text" value={mentor} onChange={(e) => setMentor(e.target.value)} placeholder="Mentor" />
					<input type="number" value={durationInMonths || ""} onChange={(e) => setDurationInMonths(Number(e.target.value))} placeholder="Duration in Months" />
				</>
			)}

			{employeeType === "Contractor" && (
				<>
					<input type="text" value={contractAgency} onChange={(e) => setContractAgency(e.target.value)} placeholder="Contract Agency" />
					<input type="date" value={contractEndDate} onChange={(e) => setContractEndDate(e.target.value)} placeholder="Contract End Date" />
				</>
			)}

			<button type="submit">Add Employee</button>
		</form>
	);
};

export default EmployeeForm;
