/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { deleteEmployee, getEmployeeById, updateEmployee } from "../api";
import { EmployeeTypes } from "../types/Employee";

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
	const [editingEmployee, setEditingEmployee] = useState<EmployeeTypes | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filter, setFilter] = useState<string>("All");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await api.get("/");
			setEmployees(response.data);
		};
		fetchEmployees();
	}, []);

	const handleDelete = async (id: string) => {
		await deleteEmployee(id);
		setEmployees(employees.filter((emp) => emp._id !== id));
	};

	const handleEdit = async (id: string) => {
		try {
			const employee = await getEmployeeById(id);
			console.log("Fetched Employee:", employee); // Debugging
			setEditingEmployee(employee);
			navigate("/edit-employee", { state: { employee } });
		} catch (error) {
			console.error("Error fetching employee:", error);
		}
	};

	const navigateToEmployeePage = (id: string) => {
		navigate(`/employee/${id}`);
	};

	const filteredEmployees = employees
		.filter((employee) => {
			if (filter !== "All" && employee.employee_type !== filter) return false;
			const query = searchQuery.toLowerCase();
			return (
				employee.EN?.toLowerCase().includes(query) ||
				employee.name?.toLowerCase().includes(query) ||
				employee.contact?.toLowerCase().includes(query) ||
				employee.training_outlet?.toLowerCase().includes(query) ||
				employee.outlet?.toLowerCase().includes(query) ||
				employee.probation_start_date?.toISOString().toLowerCase().includes(query) ||
				employee.probation_end_date?.toISOString().toLowerCase().includes(query) ||
				employee.remarks?.toLowerCase().includes(query)
			);
		})
		.sort((a, b) => {
			const aValue = a.name || "";
			const bValue = b.name || "";
			if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});

	return (
		<div className="container my-4">
			<h2 className="text-primary mb-4 text-center">
				<i className="bi bi-people-fill"></i> Employee List
			</h2>

			{/* Search, Filter, Sort Controls */}
			<div className="row mb-4">
				<div className="col-md-6">
					<label htmlFor="search-bar" className="form-label">
						Search Employees
					</label>
					<input type="text" id="search-bar" className="form-control" placeholder="Search by name, EN, or outlet..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</div>

				<div className="col-md-3">
					<label htmlFor="filter-dropdown" className="form-label">
						Filter by Type
					</label>
					<select id="filter-dropdown" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
						<option value="All">All Types</option>
						<option value="MasterCrew">Master Crew</option>
						<option value="SeniorCrew">Senior Crew</option>
						<option value="Intern">Intern</option>
						<option value="SpecialistTrainee">Specialist Trainee</option>
					</select>
				</div>

				<div className="col-md-3">
					<label htmlFor="sort-order" className="form-label">
						Sort Order
					</label>
					<select id="sort-order" className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
			</div>

			{/* Employee List */}
			<div className="list-group">
				{filteredEmployees.length === 0 ? (
					<div className="alert alert-warning text-center">
						<i className="bi bi-exclamation-triangle-fill"></i> No employees found.
					</div>
				) : (
					filteredEmployees.map((employee) => (
						<div key={employee._id} className="list-group-item d-flex justify-content-between align-items-center">
							<div>
								<span className="fw-bold text-primary">EN:</span> {employee.EN} | <span className="fw-bold text-primary">Name:</span> {employee.name} |{" "}
								<span className="fw-bold text-primary">Type:</span> {employee.employee_type}
							</div>
							<div>
								<button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(employee._id)}>
									<i className="bi bi-pencil"></i> Edit
								</button>
								<button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(employee._id)}>
									<i className="bi bi-trash"></i> Delete
								</button>
								<button className="btn btn-sm btn-outline-info" onClick={() => navigateToEmployeePage(employee._id)}>
									<i className="bi bi-eye"></i> View
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default EmployeeList;
