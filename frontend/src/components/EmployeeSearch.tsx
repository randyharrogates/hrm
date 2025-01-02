/** @format */

import React, { useState } from "react";
import api from "../api";
import { EmployeeTypes, IMasterCrew, ISeniorCrew, IIntern, ISpecialistTrainee } from "../types/Employee";

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
			case "MasterCrew":
				const masterCrew = employee as IMasterCrew;
				return (
					<div>
						<h3>Master Crew Employee</h3>
						<p>Name: {masterCrew.name}</p>
						<p>Employee Number: {masterCrew.EN}</p>
						<p>Outlet: {masterCrew.outlet}</p>
						<p>Master Crew Remarks: {masterCrew.master_crew_remarks}</p>
					</div>
				);

			case "SeniorCrew":
				const seniorCrew = employee as ISeniorCrew;
				return (
					<div>
						<h3>Senior Crew Employee</h3>
						<p>Name: {seniorCrew.name}</p>
						<p>Employee Number: {seniorCrew.EN}</p>
						<p>Outlet: {seniorCrew.outlet}</p>
						<p>Hourly Rate: {seniorCrew.hourly_rate}</p>
						<p>Contract End Date: {new Date(seniorCrew.contract_end_date).toLocaleDateString()}</p>
						<p>Senior Crew Remarks: {seniorCrew.senior_crew_remarks}</p>
					</div>
				);

			case "Intern":
				const intern = employee as IIntern;
				return (
					<div>
						<h3>Intern</h3>
						<p>Name: {intern.name}</p>
						<p>Employee Number: {intern.EN}</p>
						<p>Outlet: {intern.outlet}</p>
						<p>Mentor: {intern.mentor}</p>
						<p>Intern Start Date: {new Date(intern.intern_start_date).toLocaleDateString()}</p>
						<p>Intern End Date: {new Date(intern.intern_end_date).toLocaleDateString()}</p>
						<p>Duration: {intern.duration_in_months} months</p>
					</div>
				);

			case "SpecialistTrainee":
				const specialistTrainee = employee as ISpecialistTrainee;
				return (
					<div>
						<h3>Specialist Trainee</h3>
						<p>Name: {specialistTrainee.name}</p>
						<p>Employee Number: {specialistTrainee.EN}</p>
						<p>Outlet: {specialistTrainee.outlet}</p>
						<p>Specialist Trainee Remarks: {specialistTrainee.specialist_trainee_remarks}</p>
					</div>
				);

			default:
				return <p>Unknown employee type</p>;
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">
				<i className="bi bi-search"></i> Employee Search
			</h2>
			<div className="mb-3">
				<input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter Employee ID" />
			</div>
			<div className="text-center">
				<button className="btn btn-primary" onClick={handleSearch}>
					<i className="bi bi-search"></i> Search
				</button>
			</div>
			{result ? <div className="mt-4 border p-4">{renderEmployeeDetails(result)}</div> : <p className="mt-4 text-center">No employee found.</p>}
		</div>
	);
};

export default EmployeeSearch;
