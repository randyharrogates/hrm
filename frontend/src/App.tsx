/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import EmployeeObservationPage from "./pages/EmployeeObservationPage";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";

const App: React.FC = () => (
	<Router>
		<Navbar />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/add-employee" element={<EmployeeForm />} />
			<Route path="/employees" element={<EmployeeList />} />
			<Route path="/employee/:id" element={<EmployeePage />} />
			<Route path="/employee/:id/observations" element={<EmployeeObservationPage />} />
		</Routes>
	</Router>
);

export default App;
