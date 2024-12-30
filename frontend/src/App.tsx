/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import EmployeeObservationPage from "./pages/EmployeeObservationPage";

const App: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/employee" element={<EmployeePage />} />
			<Route path="/employee/:id/observations" element={<EmployeeObservationPage />} />
		</Routes>
	</Router>
);

export default App;
