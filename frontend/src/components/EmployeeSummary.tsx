/** @format */

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Bar, Line, Pie } from "react-chartjs-2";
import api from "../api";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);
const EmployeeSummary: React.FC = () => {
	const [employees, setEmployees] = useState<any[]>([]);
	const [filterEndDate, setFilterEndDate] = useState<string>("");
	const [filterStartDate, setFilterStartDate] = useState<string>("");
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [selectedRow, setSelectedRow] = useState<any>(null);
	const [detailedBreakdown, setDetailedBreakdown] = useState<any[]>([]);

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

			if (!acc[category]) {
				acc[category] = { dateRange: dateRangeText, newTrainee: 0, passed: 0, terminated: 0, inProgress: 0, total: 0 };
			}

			// New Trainee
			if (employee.status === "InProgress" && probationStartDate && probationStartDate >= twoWeeksBefore && probationStartDate <= endDate) {
				acc[category].newTrainee += 1;
			}

			// In Progress
			if (employee.status === "InProgress" && !transitDate) {
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
			// Calculate the total for each row
			acc[category].total = acc[category].inProgress + acc[category].passed + acc[category].terminated;

			return acc;
		}, {});

		const tableData = Object.keys(summary).map((category) => ({
			category,
			...summary[category],
		}));

		setFilteredData(tableData);
	};

	const exportToExcel = () => {
		// Define a mapping for category names
		const categoryNameMapping: { [key: string]: string } = {
			LocalCrew: "Local Crew",
			ForeignCrew: "Foreign Crew",
			SeniorCrew: "Senior Crew",
			MasterCrew: "Master Crew",
			Intern: "Intern",
			SpecialistTrainee: "Specialist Trainee",
			DirectIntake: "Direct Intake",
		};
		// Format and arrange columns for export
		const formattedData = filteredData.map((row) => ({
			"Date Range": row.dateRange,
			Category: categoryNameMapping[row.category] || row.category,
			"New Training": row.newTrainee,
			Passed: row.passed,
			Terminated: row.terminated,
			"In Progress": row.inProgress,
			"Total Employees": row.total,
		}));

		// Add total rows to the data
		formattedData.push({
			"Date Range": "Grand Total",
			Category: "All Categories",
			"New Training": filteredData.reduce((acc, row) => acc + row.newTrainee, 0),
			Passed: filteredData.reduce((acc, row) => acc + row.passed, 0),
			Terminated: filteredData.reduce((acc, row) => acc + row.terminated, 0),
			"In Progress": totalInProgress,
			"Total Employees": totalEmployees,
		});

		// Convert filteredData into a worksheet
		const worksheet = XLSX.utils.json_to_sheet(formattedData);
		// Create a workbook
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Summary");

		// Generate Excel file and trigger download
		const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });
		saveAs(data, "EmployeeSummary.xlsx");
	};

	const handleRowClick = (row: any) => {
		setSelectedRow(row);

		const endDate = new Date(filterEndDate);
		const startDate = new Date(filterStartDate);

		// Filter employees based on the selected category and date range
		const breakdownData = employees.filter((employee: any) => {
			const probationStartDate = employee.probation_start_date ? new Date(employee.probation_start_date) : null;
			const transitDate = employee.transit_date ? new Date(employee.transit_date) : null;

			// Match category
			if (employee.employee_type !== row.category) return false;

			// Determine status group
			if (employee.status === "InProgress" && probationStartDate && probationStartDate >= startDate && probationStartDate <= endDate) {
				return "newTrainee";
			} else if (employee.status === "InProgress") {
				return "inProgress";
			} else if (employee.status === "Passed" && transitDate && transitDate >= startDate && transitDate <= endDate) {
				return "passed";
			} else if (employee.status === "Terminated" && transitDate && transitDate >= startDate && transitDate <= endDate) {
				return "terminated";
			}
			return true;
		});

		setDetailedBreakdown(breakdownData);
	};

	const detailedColumns = [
		{ name: "EN", selector: (row: any) => row.EN, sortable: true },
		{ name: "Name", selector: (row: any) => row.name, sortable: true },
		{ name: "Status", selector: (row: any) => row.status, sortable: true },
		{ name: "Start Date", selector: (row: any) => new Date(row.probation_start_date).toLocaleDateString(), sortable: true },
		{ name: "Transit Date", selector: (row: any) => (row.transit_date ? new Date(row.transit_date).toLocaleDateString() : "-"), sortable: true },
	];

	const columns = [
		{ name: "Date Range", selector: (row: any) => row.dateRange, sortable: true, minWidth: "300px" },
		{ name: "Category", selector: (row: any) => row.category, sortable: true },
		{ name: "New Training", selector: (row: any) => row.newTrainee, sortable: true },
		{ name: "Passed", selector: (row: any) => row.passed, sortable: true },
		{ name: "Terminated", selector: (row: any) => row.terminated, sortable: true },
		{ name: "In Progress", selector: (row: any) => row.inProgress, sortable: true },
		{ name: "Total", selector: (row: any) => row.total, sortable: true }, // Add Total column
	];

	// Calculate total employees for the footer
	const totalEmployees = filteredData.reduce((acc, row) => acc + row.total, 0);

	const totalInProgress = filteredData.reduce((acc, row) => acc + row.inProgress, 0);

	// Chart Data Preparation
	const chartData = {
		labels: filteredData.map((item) => item.category),
		datasets: [
			{
				label: "New Training",
				data: filteredData.map((item) => item.newTrainee),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			},
			{
				label: "In Progress",
				data: filteredData.map((item) => item.inProgress),
				backgroundColor: "rgba(54, 162, 235, 0.6)",
			},
			{
				label: "Passed",
				data: filteredData.map((item) => item.passed),
				backgroundColor: "rgba(153, 102, 255, 0.6)",
			},
			{
				label: "Terminated",
				data: filteredData.map((item) => item.terminated),
				backgroundColor: "rgba(255, 99, 132, 0.6)",
			},
		],
	};

	// Line Chart Data
	const lineChartData = {
		labels: filteredData.map((item) => item.category),
		datasets: [
			{
				label: "New Training",
				data: filteredData.map((item) => item.newTrainee),
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				fill: true,
			},
			{
				label: "In Progress",
				data: filteredData.map((item) => item.inProgress),
				borderColor: "rgba(54, 162, 235, 1)",
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				fill: true,
			},
			{
				label: "Passed",
				data: filteredData.map((item) => item.passed),
				borderColor: "rgba(153, 102, 255, 1)",
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				fill: true,
			},
			{
				label: "Terminated",
				data: filteredData.map((item) => item.terminated),
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				fill: true,
			},
		],
	};

	// Pie Chart Data
	const pieChartData = {
		labels: ["New Training", "In Progress", "Passed", "Terminated"],
		datasets: [
			{
				data: [
					filteredData.reduce((acc, item) => acc + item.newTrainee, 0),
					filteredData.reduce((acc, item) => acc + item.inProgress, 0),
					filteredData.reduce((acc, item) => acc + item.passed, 0),
					filteredData.reduce((acc, item) => acc + item.terminated, 0),
				],
				backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 99, 132, 0.6)"],
			},
		],
	};

	const minData = 0;
	const maxData = 20;
	const stepSize = 2;

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: true, // Maintains the aspect ratio
		aspectRatio: 2, // Adjusts the width-to-height ratio
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Employee Summary Chart" },
		},
		scales: {
			x: {
				type: "category" as const,
				title: { display: true, text: "Category" },
			},
			y: {
				type: "linear" as const,
				title: { display: true, text: "Count" },
				min: minData, // Set the minimum Y-axis value
				max: maxData, // Set the maximum Y-axis value
				ticks: {
					stepSize: stepSize, // Optional: Control step size for ticks
				},
			},
		},
	};

	// Chart Options (for Line Chart and Pie Chart)
	const lineChartOptions = {
		responsive: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Employee Summary Line Chart" },
		},
		scales: {
			y: {
				type: "linear" as const,
				title: { display: true, text: "Count" },
				min: minData,
				max: maxData,
				ticks: { stepSize: stepSize },
			},
		},
	};

	const pieChartOptions = {
		responsive: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Employee Distribution by Status" },
		},
	};

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

			{/* Custom Header Row */}
			<div className="card mt-3 p-3">
				<div className="row">
					<div className="col text-center">
						<strong>Total Intake to date:</strong> {totalEmployees}
					</div>
				</div>
				<div className="row">
					<div className="col text-center">
						<strong>Total In Progress to date:</strong> {totalInProgress}
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
				onRowClicked={handleRowClick}
				customStyles={{
					headCells: {
						style: {
							whiteSpace: "normal",
							fontWeight: "bold",
							fontSize: "16px",
						},
					},
					rows: {
						style: {
							cursor: "pointer",
						},
					},
				}}
			/>
			{/* Add the detailed breakdown table */}
			{selectedRow && (
				<div className="card shadow p-4 mt-4">
					<h4 className="text-secondary mb-3">Detailed Breakdown for {selectedRow.category}</h4>
					<DataTable
						columns={detailedColumns}
						data={detailedBreakdown}
						pagination
						highlightOnHover
						striped
						customStyles={{
							headCells: {
								style: {
									whiteSpace: "normal",
									fontWeight: "bold",
									fontSize: "14px",
								},
							},
						}}
					/>
				</div>
			)}
			{/* Export Button */}
			<div className="text-end mb-3">
				<button className="btn btn-success" onClick={exportToExcel}>
					<i className="bi bi-file-earmark-excel"></i> Export to Excel
				</button>
			</div>
			{/* Visualization Section */}
			<div className="card shadow p-4 mb-4">
				<h4 className="text-secondary mb-3">Visualization</h4>
				<div style={{ height: "500px", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
					<Bar data={chartData} options={chartOptions} />
				</div>
				<div style={{ height: "500px", width: "100%", maxWidth: "1200px", margin: "0 auto", marginTop: "30px" }}>
					<Line data={lineChartData} options={lineChartOptions} />
				</div>
				<div style={{ height: "500px", width: "100%", maxWidth: "600px", margin: "30px auto" }}>
					<Pie data={pieChartData} options={pieChartOptions} />
				</div>
			</div>
		</div>
	);
};

export default EmployeeSummary;
