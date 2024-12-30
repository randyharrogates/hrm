/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const EmployeePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [employee, setEmployee] = useState<any>(null);

	useEffect(() => {
		const fetchEmployee = async () => {
			const response = await api.get(`/${id}`);
			setEmployee(response.data);
		};
		fetchEmployee();
	}, [id]);

	if (!employee) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Employee Details</h1>
			<p>
				<strong>EN:</strong> {employee.EN}
			</p>
			<p>
				<strong>Name:</strong> {employee.name}
			</p>
			<p>
				<strong>Contact:</strong> {employee.contact}
			</p>
			<p>
				<strong>Type:</strong> {employee.employee_type}
			</p>
			<p>
				<strong>Training Outlet:</strong> {employee.training_outlet}
			</p>
			<p>
				<strong>Outlet:</strong> {employee.outlet}
			</p>
			<p>
				<strong>Probation Start Date:</strong> {employee.probation_start_date}
			</p>
			<p>
				<strong>Probation End Date:</strong> {employee.probabtion_end_date}
			</p>
			<p>
				<strong>Remarks:</strong> {employee.remarks}
			</p>
			<p>
				<strong>Current Employee:</strong> {employee.current_employee ? "Yes" : "No"}
			</p>
		</div>
	);
};

export default EmployeePage;
