/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { deleteEmployee, getEmployeeById, updateEmployee } from "../api";

interface Employee {
	_id: string;
	EN: string;
	name: string;
	contact: string;
	employee_type: string;
	training_outlet: string;
	outlet: string;
	probation_start_date: string;
	probabtion_end_date: string;
	remarks: string;
	current_employee: boolean;
}

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
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
		navigate(`/employee/${id}`);
	};

	return (
		<div>
			<h2>Employee List</h2>
			{employees.map((employee) => (
				<div key={employee._id}>
					<p>
						<strong>EN:</strong> {employee.EN} | <strong>Name:</strong> {employee.name} | <strong>Type:</strong> {employee.employee_type}
					</p>
					<button onClick={() => handleEdit(employee._id)}>Edit</button>
					<button onClick={() => handleDelete(employee._id)}>Delete</button>
					<button onClick={() => navigateToEmployeePage(employee._id)}>View Details</button>
				</div>
			))}

			{editingEmployee && (
				<form onSubmit={handleUpdate}>
					<h3>Edit Employee</h3>
					<input type="text" name="EN" value={editingEmployee.EN} onChange={handleInputChange} placeholder="Employee Number" required />
					<input type="text" name="name" value={editingEmployee.name} onChange={handleInputChange} placeholder="Name" required />
					<input type="text" name="contact" value={editingEmployee.contact} onChange={handleInputChange} placeholder="Contact" required />
					<select name="employee_type" value={editingEmployee.employee_type} onChange={handleInputChange}>
						<option value="FullTime">Full-Time</option>
						<option value="PartTime">Part-Time</option>
						<option value="Intern">Intern</option>
						<option value="Contractor">Contractor</option>
					</select>
					<input type="text" name="training_outlet" value={editingEmployee.training_outlet} onChange={handleInputChange} placeholder="Training Outlet" required />
					<input type="text" name="outlet" value={editingEmployee.outlet} onChange={handleInputChange} placeholder="Outlet" required />
					<input type="date" name="probation_start_date" value={editingEmployee.probation_start_date} onChange={handleInputChange} required />
					<input type="date" name="probation_end_date" value={editingEmployee.probabtion_end_date} onChange={handleInputChange} required />
					<textarea name="remarks" value={editingEmployee.remarks} onChange={handleInputChange} placeholder="Remarks"></textarea>
					<label>
						Current Employee:
						<input
							type="checkbox"
							name="current_employee"
							checked={editingEmployee.current_employee}
							onChange={(e) =>
								setEditingEmployee({
									...editingEmployee,
									current_employee: e.target.checked,
								})
							}
						/>
					</label>
					<button type="submit">Update Employee</button>
				</form>
			)}
		</div>
	);
};

export default EmployeeList;
