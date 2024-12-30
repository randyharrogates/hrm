/** @format */

import React, { useState } from "react";
import api from "../api";
import { EmployeeTypes, IFullTimeEmployee, IPartTimeEmployee, IIntern, IContractor } from "../types/Employee";

const EmployeeSearch: React.FC = () => {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState<EmployeeTypes | null>(null); // Handle all employee types

	const handleSearch = async () => {
		try {
			const response = await api.get(`/employees/${query}`);
			setResult(response.data); // Assume API returns an `EmployeeTypes` object
		} catch (error) {
			console.error("Error fetching employee:", error);
			setResult(null);
		}
	};

	const renderEmployeeDetails = (employee: EmployeeTypes) => {
		switch (employee.employee_type) {
			case "FullTime":
				const fullTime = employee as IFullTimeEmployee;
				return (
					<div>
						<h3>Full-Time Employee</h3>
						<p>Name: {fullTime.name}</p>
						<p>Outlet: {fullTime.outlet}</p>
						<p>Annual Salary: {fullTime.annual_salary}</p>
						<p>Healthcare Plan: {fullTime.healthcare_plan}</p>
					</div>
				);

			case "PartTime":
				const partTime = employee as IPartTimeEmployee;
				return (
					<div>
						<h3>Part-Time Employee</h3>
						<p>Name: {partTime.name}</p>
						<p>Position: {partTime.outlet}</p>
						<p>Hourly Rate: {partTime.hourly_rate}</p>
						<p>Contract End Date: {new Date(partTime.contract_end_date).toLocaleDateString()}</p>
					</div>
				);

			case "Intern":
				const intern = employee as IIntern;
				return (
					<div>
						<h3>Intern</h3>
						<p>Name: {intern.name}</p>
						<p>Position: {intern.outlet}</p>
						<p>Mentor: {intern.mentor}</p>
						<p>Duration: {intern.duration_in_months} months</p>
					</div>
				);

			case "Contractor":
				const contractor = employee as IContractor;
				return (
					<div>
						<h3>Contractor</h3>
						<p>Name: {contractor.name}</p>
						<p>Position: {contractor.outlet}</p>
						<p>Contract Agency: {contractor.contract_agency}</p>
						<p>Contract End Date: {new Date(contractor.contract_end_date).toLocaleDateString()}</p>
					</div>
				);

			default:
				return <p>Unknown employee type</p>;
		}
	};

	return (
		<div>
			<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID" />
			<button onClick={handleSearch}>Search</button>
			{result && <div>{renderEmployeeDetails(result)}</div>}
		</div>
	);
};

export default EmployeeSearch;
