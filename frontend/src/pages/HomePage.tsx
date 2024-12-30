/** @format */

import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const HomePage: React.FC = () => (
	<div>
		<h1>HRM Home</h1>
		<EmployeeForm />
		<EmployeeList />
	</div>
);

export default HomePage;
