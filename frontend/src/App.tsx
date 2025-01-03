/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import {} from "./pages/EmployeeObservationPage";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import api from "./api";
import { EmployeeTypes } from "./types/Employee";

const App: React.FC = () => {
	const handleAddOrEditEmployee = async (employee: Partial<EmployeeTypes>) => {
		try {
			if (employee._id) {
				// Edit existing employee
				await api.put(`/:${employee._id}`, employee);
				alert("Employee updated successfully!");
			} else {
				// Add new employee
				await api.post("/", employee);
				alert("Employee added successfully!");
			}
		} catch (error) {
			console.error("Error submitting employee:", error);
			alert("An error occurred while submitting the form.");
		}
	};

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add-employee" element={<EmployeeForm onSubmit={handleAddOrEditEmployee} isEditing={false} />} />
				<Route
					path="/edit-employee"
					element={
						<EmployeeForm
							onSubmit={handleAddOrEditEmployee} // Handle update here
							isEditing={true} // Indicate editing mode
						/>
					}
				/>
				<Route path="/employees" element={<EmployeeList />} />
				<Route path="/employee/:id" element={<EmployeePage />} />
			</Routes>
		</Router>
	);
};

export default App;