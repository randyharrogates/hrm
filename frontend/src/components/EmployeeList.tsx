/** @format */

import React, { useEffect, useState } from "react";
import api from "../api";

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await api.get("/");
			setEmployees(response.data);
		};
		fetchEmployees();
	}, []);

	return (
		<ul>
			{employees.map((emp) => (
				<li key={emp._id}>
					{emp.name} - {emp.position}
				</li>
			))}
		</ul>
	);
};

export default EmployeeList;
