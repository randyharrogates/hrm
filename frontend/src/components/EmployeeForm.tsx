/** @format */

import React, { useState } from "react";
import api from "../api";

const EmployeeForm: React.FC = () => {
	const [name, setName] = useState("");
	const [position, setPosition] = useState("");
	const [department, setDepartment] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await api.post("/", { name, position, department, email });
		setName("");
		setPosition("");
		setDepartment("");
		setEmail("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
			<input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
			<input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
			<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			<button type="submit">Add Employee</button>
		</form>
	);
};

export default EmployeeForm;
