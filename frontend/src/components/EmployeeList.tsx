/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { deleteEmployee, getEmployeeById, updateEmployee } from "../api";
import EmployeeForList from "../types/EmployeeForList";

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState<EmployeeForList[]>([]);
	const [editingEmployee, setEditingEmployee] = useState<EmployeeForList | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filter, setFilter] = useState<string>("All");
	const [sortAttribute, setSortAttribute] = useState<string>("name");
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
		const employee = await getEmployeeById(id);
		setEditingEmployee(employee);
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (editingEmployee) {
			const updatedEmployee = await updateEmployee(editingEmployee._id, editingEmployee);
			setEmployees(employees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
			setEditingEmployee(null);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		if (editingEmployee) {
			setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value });
		}
	};

	const navigateToEmployeePage = (id: string) => {
		console.log("ID for employee: ", id);
		navigate(`/employee/${id}`);
	};

	// Search function
	const filteredEmployees = employees
		.filter((employee) => {
			if (filter !== "All" && employee.employee_type !== filter) return false;
			const query = searchQuery.toLowerCase();
			return (
				employee.EN?.toLowerCase().includes(query) ||
				"" ||
				employee.name?.toLowerCase().includes(query) ||
				"" ||
				employee.contact?.toLowerCase().includes(query) ||
				"" ||
				employee.training_outlet?.toLowerCase().includes(query) ||
				"" ||
				employee.outlet?.toLowerCase().includes(query) ||
				"" ||
				employee.probation_start_date?.toLowerCase().includes(query) ||
				"" ||
				employee.probabtion_end_date?.toLowerCase().includes(query) ||
				"" ||
				employee.remarks?.toLowerCase().includes(query) ||
				""
			);
		})
		.sort((a, b) => {
			const aValue = a[sortAttribute as keyof EmployeeForList] || "";
			const bValue = b[sortAttribute as keyof EmployeeForList] || "";
			if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});

	return (
		<div className="container my-4">
			<h2 className="text-primary mb-4">
				<i className="bi bi-people-fill"></i> Employee List
			</h2>

			{/* Search, Filter, Sort Controls */}
			<div className="d-flex mb-4 gap-2">
				{/* Search Bar */}
				<div className="w-50">
					<label htmlFor="search-bar" className="form-label">
						Search Employees
					</label>
					<input type="text" id="search-bar" className="form-control" placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</div>

				{/* Filter Dropdown */}
				<div>
					<label htmlFor="filter-dropdown" className="form-label">
						Filter by Employee Type
					</label>
					<select id="filter-dropdown" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
						<option value="All">All Types</option>
						<option value="FullTime">Full-Time</option>
						<option value="PartTime">Part-Time</option>
						<option value="Intern">Intern</option>
						<option value="Contractor">Contractor</option>
					</select>
				</div>

				{/* Sort Attribute Dropdown */}
				<div>
					<label htmlFor="sort-attribute" className="form-label">
						Sort by
					</label>
					<select id="sort-attribute" className="form-select" value={sortAttribute} onChange={(e) => setSortAttribute(e.target.value)}>
						<option value="name">Name</option>
						<option value="EN">Employee Number</option>
						<option value="contact">Contact</option>
						<option value="employee_type">Type</option>
						<option value="training_outlet">Training Outlet</option>
						<option value="outlet">Outlet</option>
						<option value="probation_start_date">Probation Start Date</option>
						<option value="probabtion_end_date">Probation End Date</option>
					</select>
				</div>

				{/* Sort Order Dropdown */}
				<div>
					<label htmlFor="sort-order" className="form-label">
						Sort Order
					</label>
					<select id="sort-order" className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
			</div>

			{/* Check if employees exist */}
			{filteredEmployees.length === 0 ? (
				<div className="alert alert-warning text-center">
					<i className="bi bi-exclamation-triangle-fill"></i> No Employees found matching your criteria.
				</div>
			) : (
				<div className="list-group">
					{filteredEmployees.map((employee) => (
						<div key={employee._id} className="list-group-item d-flex justify-content-between align-items-center">
							<div>
								<strong>EN:</strong> {employee.EN} | <strong>Name:</strong> {employee.name} | <strong>Type:</strong> {employee.employee_type}
							</div>
							<div>
								<button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(employee._id)}>
									<i className="bi bi-pencil-square"></i> Edit
								</button>
								<button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(employee._id)}>
									<i className="bi bi-trash-fill"></i> Delete
								</button>
								<button className="btn btn-sm btn-info" onClick={() => navigateToEmployeePage(employee._id)}>
									<i className="bi bi-info-circle-fill"></i> View Details
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Editing Employee Form */}
			{editingEmployee && (
				<div className="card mt-4">
					<div className="card-body">
						<h3 className="card-title text-primary">
							<i className="bi bi-pencil-fill"></i> Edit Employee
						</h3>
						<form onSubmit={handleUpdate}>
							<div className="mb-3">
								<label htmlFor="EN" className="form-label">
									Employee Number
								</label>
								<input type="text" className="form-control" id="EN" name="EN" value={editingEmployee.EN} onChange={handleInputChange} required />
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input type="text" className="form-control" id="name" name="name" value={editingEmployee.name} onChange={handleInputChange} required />
							</div>
							<div className="mb-3">
								<label htmlFor="contact" className="form-label">
									Contact
								</label>
								<input type="text" className="form-control" id="contact" name="contact" value={editingEmployee.contact} onChange={handleInputChange} required />
							</div>
							<div className="mb-3">
								<label htmlFor="employee_type" className="form-label">
									Employee Type
								</label>
								<select className="form-select" id="employee_type" name="employee_type" value={editingEmployee.employee_type} onChange={handleInputChange}>
									<option value="FullTime">Full-Time</option>
									<option value="PartTime">Part-Time</option>
									<option value="Intern">Intern</option>
									<option value="Contractor">Contractor</option>
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="training_outlet" className="form-label">
									Training Outlet
								</label>
								<input type="text" className="form-control" id="training_outlet" name="training_outlet" value={editingEmployee.training_outlet} onChange={handleInputChange} required />
							</div>
							<div className="mb-3">
								<label htmlFor="outlet" className="form-label">
									Outlet
								</label>
								<input type="text" className="form-control" id="outlet" name="outlet" value={editingEmployee.outlet} onChange={handleInputChange} required />
							</div>
							<div className="mb-3">
								<label htmlFor="probation_start_date" className="form-label">
									Probation Start Date
								</label>
								<input
									type="date"
									className="form-control"
									id="probation_start_date"
									name="probation_start_date"
									value={editingEmployee.probation_start_date}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="probation_end_date" className="form-label">
									Probation End Date
								</label>
								<input
									type="date"
									className="form-control"
									id="probation_end_date"
									name="probation_end_date"
									value={editingEmployee.probabtion_end_date}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="remarks" className="form-label">
									Remarks
								</label>
								<textarea className="form-control" id="remarks" name="remarks" value={editingEmployee.remarks} onChange={handleInputChange}></textarea>
							</div>
							<div className="mb-3 form-check">
								<input
									type="checkbox"
									className="form-check-input"
									id="current_employee"
									name="current_employee"
									checked={editingEmployee.current_employee}
									onChange={(e) =>
										setEditingEmployee({
											...editingEmployee,
											current_employee: e.target.checked,
										})
									}
								/>
								<label htmlFor="current_employee" className="form-check-label">
									Current Employee
								</label>
							</div>
							<button type="submit" className="btn btn-primary">
								<i className="bi bi-save"></i> Save Changes
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmployeeList;
