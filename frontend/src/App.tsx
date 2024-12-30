/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";

const App: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/employee" element={<EmployeePage />} />
		</Routes>
	</Router>
);

export default App;
