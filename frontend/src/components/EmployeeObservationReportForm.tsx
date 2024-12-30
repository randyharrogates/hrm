/** @format */

import React, { useState } from "react";
import api from "../api";

interface ObservationReportFormProps {
	employeeId: string;
}

const ObservationReportForm: React.FC<ObservationReportFormProps> = ({ employeeId }) => {
	const [date, setDate] = useState("");
	const [observations, setObservations] = useState("");
	const [evaluator, setEvaluator] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await api.post(`/${employeeId}/observations`, {
			date,
			observations,
			evaluator,
		});
		setDate("");
		setObservations("");
		setEvaluator("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add Observation Report</h3>
			<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
			<textarea value={observations} onChange={(e) => setObservations(e.target.value)} placeholder="Observations" required></textarea>
			<input type="text" value={evaluator} onChange={(e) => setEvaluator(e.target.value)} placeholder="Evaluator" required />
			<button type="submit">Submit Report</button>
		</form>
	);
};

export default ObservationReportForm;
