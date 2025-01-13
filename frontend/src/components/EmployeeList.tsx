/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import api, { deleteEmployee, getEmployeeById } from "../api";
import { EmployeeTypes } from "../types/Employee";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
	const [startRange, setStartRange] = useState<string>(""); // Start date range
	const [endRange, setEndRange] = useState<string>(""); // End date range
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortColumn, setSortColumn] = useState<keyof EmployeeTypes | null>(null); // Track the current column for sorting
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Track sort direction
	const navigate = useNavigate();

	// Fetch employees from the backend
	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await api.get("/");
			console.log("Fetched employees:", response.data);
			setEmployees(response.data);
		};
		fetchEmployees();
	}, []);

	// Handle delete operation
	const handleDelete = async (id: string) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
		if (confirmDelete) {
			try {
				await deleteEmployee(id);
				setEmployees(employees.filter((emp) => emp._id !== id));
				alert("Employee deleted successfully.");
			} catch (error) {
				console.error("Error deleting employee:", error);
				alert("An error occurred while deleting the employee.");
			}
		}
	};

	// Navigate to the edit page
	const handleEdit = async (id: string) => {
		try {
			const employee = await getEmployeeById(id);
			navigate("/edit-employee", { state: { employee } });
		} catch (error) {
			console.error("Error fetching employee:", error);
		}
	};

	// Navigate to the employee detail page
	const navigateToEmployeePage = (id: string) => {
		navigate(`/employee/${id}`);
	};

	// Define columns for DataTable
	const columns = [
		{
			name: "Employee Number (EN)",
			selector: (row: EmployeeTypes) => (row && row.EN ? row.EN : "N/A") || "N/A",
			sortable: true,
			minWidth: "250px",
		},
		{
			name: "Name",
			selector: (row: EmployeeTypes) => (row && row.name ? row.name : "N/A") || "N/A",
			sortable: true,
		},
		{
			name: "Contact No.",
			selector: (row: EmployeeTypes) => (row && row.contact ? row.contact : "N/A") || "N/A",
			sortable: true,
			minWidth: "150px",
		},
		{
			name: "Employee Type",
			selector: (row: EmployeeTypes) => (row && row.employee_type ? row.employee_type : "N/A"),
			sortable: true,
			minWidth: "200px",
		},
		{
			name: "Training Outlet",
			selector: (row: EmployeeTypes) => (row && row.training_outlet ? row.training_outlet : "N/A") || "N/A",
			sortable: true,
			minWidth: "200px",
		},
		{
			name: "Outlet",
			selector: (row: EmployeeTypes) => (row && row.outlet ? row.outlet : "N/A") || "N/A",
			sortable: true,
		},
		{
			name: "Probation Start Date",
			selector: (row: EmployeeTypes) => {
				// Safely parse the date
				const startDate = row.probation_start_date ? new Date(row.probation_start_date) : null;
				return startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split("T")[0] : "N/A";
			},
			sortable: true,
			minWidth: "250px",
		},
		{
			name: "Probation End Date",
			selector: (row: EmployeeTypes) => {
				// Safely parse the date
				const endDate = row.probation_end_date ? new Date(row.probation_end_date) : null;
				return endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split("T")[0] : "N/A";
			},
			sortable: true,
			minWidth: "250px",
		},

		{
			name: "Extended Probation",
			selector: (row: EmployeeTypes) => (row && row.extended_probation ? "Yes" : "No"),
			sortable: true,
			minWidth: "250px",
		},
		{
			name: "Employee Status",
			selector: (row: EmployeeTypes) => (row && row.status ? row.status : "N/A"),
			sortable: true,
			minWidth: "200px",
		},
		{
			name: "Transit Date",
			selector: (row: EmployeeTypes) => {
				// Safely parse the date
				const endDate = row.transit_date ? new Date(row.transit_date) : null;
				return endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split("T")[0] : "N/A";
			},
			sortable: true,
			minWidth: "250px",
		},
		{
			name: "Grade",
			selector: (row: EmployeeTypes) => (row && row.overall_grading_score ? row.overall_grading_score : 0 || 0),
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row: EmployeeTypes) => (
				<div>
					<button className="btn btn-outline-warning btn-sm ms-2" onClick={() => handleEdit(row._id)}>
						<i className="bi bi-pencil"></i> Edit
					</button>
					<button className="btn btn-outline-info btn-sm ms-2" onClick={() => navigateToEmployeePage(row._id)}>
						<i className="bi bi-eye"></i> View
					</button>
					<button className="btn btn-outline-danger btn-sm ms-2 disabled" onClick={() => handleDelete(row._id)}>
						<i className="bi bi-trash"></i> Delete
					</button>
				</div>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	// Filter employees based on the search query
	const filteredEmployees = employees.filter((employee) => {
		const query = searchQuery.toLowerCase();
		// Search filter
		const matchesSearch =
			employee.EN?.toLowerCase().includes(query) ||
			employee.name?.toLowerCase().includes(query) ||
			employee.contact?.toLowerCase().includes(query) ||
			employee.employee_type?.toLowerCase().includes(query) ||
			(employee.overall_grading_score ? employee.overall_grading_score.toString().includes(query) : false);

		// Date range filter
		const startDate = employee.probation_start_date ? new Date(employee.probation_start_date) : null;
		const endDate = employee.probation_end_date ? new Date(employee.probation_end_date) : null;
		const rangeStart = startRange ? new Date(startRange) : null;
		const rangeEnd = endRange ? new Date(endRange) : null;

		const matchesDateRange = (!rangeStart || (startDate && startDate >= rangeStart)) && (!rangeEnd || (endDate && endDate <= rangeEnd));

		return matchesSearch && matchesDateRange;
	});

	// Export to Excel
	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
		const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

		// Save the file
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });
		saveAs(data, "EmployeeList.xlsx");
	};

	return (
		<div className="container my-4">
			<h2 className="text-primary mb-4 text-center">
				<i className="bi bi-people-fill"></i> Employee List
			</h2>

			{/* Search and Date Range Filters */}
			<div className="row mb-4">
				<div className="col-md-4">
					<label htmlFor="search-bar" className="form-label">
						Search Employees
					</label>
					<input
						type="text"
						id="search-bar"
						className="form-control"
						placeholder="Search by Name, EN, Emp Type, or Grade..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="col-md-4">
					<label htmlFor="start-range" className="form-label">
						Probation Start Date Range
					</label>
					<input type="date" id="start-range" className="form-control" value={startRange} onChange={(e) => setStartRange(e.target.value)} />
				</div>
				<div className="col-md-4">
					<label htmlFor="end-range" className="form-label">
						Probation End Date Range
					</label>
					<input type="date" id="end-range" className="form-control" value={endRange} onChange={(e) => setEndRange(e.target.value)} />
				</div>
			</div>

			{/* Export Button */}
			<div className="mb-4">
				<button className="btn btn-success" onClick={exportToExcel}>
					<i className="bi bi-file-earmark-excel"></i> Export to Excel
				</button>
			</div>

			<DataTable
				columns={columns}
				data={filteredEmployees}
				pagination
				highlightOnHover
				striped
				defaultSortFieldId={sortColumn || "name"}
				defaultSortAsc={sortDirection === "asc"}
				onSort={(column, direction) => {
					setSortColumn(column.selector as unknown as keyof EmployeeTypes);
					setSortDirection(direction);
				}}
				customStyles={{
					headCells: {
						style: {
							whiteSpace: "normal", // Allows wrapping of header text if needed
							overflow: "visible", // Ensures the text doesn't get truncated
							textOverflow: "clip", // Avoids ellipsis in case of overflow
							wordWrap: "break-word", // Wraps long text onto the next line
							fontWeight: "bold", // Makes headers bold for visibility
							fontSize: "16px", // Adjust header font size as needed
						},
					},
				}}
			/>
		</div>
	);
};

export default EmployeeList;
