/** @format */

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../api"; // Replace with your API endpoint

const EmployeeSummary: React.FC = () => {
	const [employees, setEmployees] = useState<any[]>([]);
	const [filterEndDate, setFilterEndDate] = useState<string>("");
	const [filterStartDate, setFilterStartDate] = useState<string>("");
	const [filteredData, setFilteredData] = useState<any[]>([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await api.get("/"); // Fetch employees from your backend
			setEmployees(response.data);
		};
		fetchEmployees();
	}, []);

	const calculateSummary = () => {
		if (!filterEndDate || !filterStartDate) return;

		const endDate = new Date(filterEndDate);
		const twoWeeksBefore = new Date(filterStartDate);
		const dateRangeText = `${twoWeeksBefore.toDateString()} - ${endDate.toDateString()}`;

		const summary = employees.reduce((acc: any, employee: any) => {
			const probationStartDate = employee.probation_start_date ? new Date(employee.probation_start_date) : null;
			const transitDate = employee.transit_date ? new Date(employee.transit_date) : null;
			const category = employee.employee_type;
			console.log("Employee", employee.name);
			console.log("Employee status", employee.status);
			console.log("category", category);
			console.log("probationStartDate", probationStartDate);
			console.log("transitDate", transitDate);
			console.log("\n");

			if (!acc[category]) {
				acc[category] = { newTrainee: 0, inProgress: 0, passed: 0, terminated: 0, dateRange: dateRangeText };
			}

			// New Trainee
			if (employee.status === "InProgress" && probationStartDate && probationStartDate >= twoWeeksBefore && probationStartDate <= endDate) {
				acc[category].newTrainee += 1;
			}

			// In Progress
			if (employee.status === "InProgress" && (!probationStartDate || probationStartDate < twoWeeksBefore)) {
				acc[category].inProgress += 1;
			}

			// Passed
			if (employee.status === "Passed" && transitDate && transitDate >= twoWeeksBefore && transitDate <= endDate) {
				acc[category].passed += 1;
			}

			// Terminated
			if (employee.status === "Terminated" && transitDate && transitDate >= twoWeeksBefore && transitDate <= endDate) {
				acc[category].terminated += 1;
			}

			return acc;
		}, {});

		const tableData = Object.keys(summary).map((category) => ({
			category,
			...summary[category],
		}));

		setFilteredData(tableData);
	};

	const columns = [
		{ name: "Date Range", selector: (row: any) => row.dateRange, sortable: true },
		{ name: "Category", selector: (row: any) => row.category, sortable: true },
		{ name: "New Training", selector: (row: any) => row.newTrainee, sortable: true },
		{ name: "In Progress", selector: (row: any) => row.inProgress, sortable: true },
		{ name: "Passed", selector: (row: any) => row.passed, sortable: true },
		{ name: "Terminated", selector: (row: any) => row.terminated, sortable: true },
	];

	return (
		<div className="container my-4">
			<h2 className="text-primary mb-4 text-center">
				<i className="bi bi-table"></i> Employee Summary
			</h2>

			{/* Filter Section */}
			<div className="card shadow p-4 mb-4">
				<div className="row align-items-end">
					<div className="col-md-4">
						<label htmlFor="filter_start_date" className="form-label fw-bold">
							Filter Start Date
						</label>
						<input type="date" id="filter_start_date" className="form-control border-primary" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
					</div>
					<div className="col-md-4">
						<label htmlFor="filter_end_date" className="form-label fw-bold">
							Filter End Date
						</label>
						<input type="date" id="filter_end_date" className="form-control border-primary" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
					</div>
					<div className="col-md-4 text-center">
						<button className="btn btn-primary btn-lg w-100 mt-4" onClick={calculateSummary}>
							<i className="bi bi-filter-circle"></i> Apply Filter
						</button>
					</div>
				</div>
			</div>

			{/* DataTable */}
			<DataTable
				columns={columns}
				data={filteredData}
				pagination
				highlightOnHover
				striped
				customStyles={{
					headCells: {
						style: {
							whiteSpace: "normal",
							fontWeight: "bold",
							fontSize: "16px",
						},
					},
				}}
			/>
		</div>
	);
};

export default EmployeeSummary;
