/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import api from "./api";
import { EmployeeTypes } from "./types/Employee";
import UploadObservationReports from "./components/UploadObservationReports"; // Correct import

const App: React.FC = () => {
	const handleAddOrEditEmployee = async (employee: Partial<EmployeeTypes>) => {
		try {
			if (employee._id) {
				// Edit existing employee
				await api.put(`/${employee._id}`, employee); // Fixed the URL
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
				<Route path="/edit-employee" element={<EmployeeForm onSubmit={handleAddOrEditEmployee} isEditing={true} />} />
				<Route path="/employees" element={<EmployeeList />} />
				<Route path="/employee/:id" element={<EmployeePage />} />
				<Route
					path="/upload-observation-report"
					element={<UploadObservationReports />} // Use the correct component
				/>
			</Routes>
		</Router>
	);
};

export default App;
