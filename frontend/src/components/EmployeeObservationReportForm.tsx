/** @format */

import React, { useState } from "react";
import api from "../api";

export interface EmployeeObservationReportFormProps {
	employeeId?: string; // Optional because in some contexts the employee may not be created yet
	onAddObservation?: (report: { date: string; observations: string; evaluator: string }) => void;
}

const EmployeeObservationReportForm: React.FC<EmployeeObservationReportFormProps> = ({ employeeId, onAddObservation }) => {
	const [date, setDate] = useState("");
	const [observations, setObservations] = useState("");
	const [evaluator, setEvaluator] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const report = {
			date,
			observations,
			evaluator,
		};

		// If `employeeId` is provided, save to the backend
		if (employeeId) {
			await api.post(`/${employeeId}/observations`, report);
		}

		// Notify parent component (if applicable)
		if (onAddObservation) {
			onAddObservation(report);
		}

		// Clear the form
		setDate("");
		setObservations("");
		setEvaluator("");
	};

	return (
		<div className="border rounded p-3 mb-3">
			<h4>Add Observation Report</h4>
			<form onSubmit={handleSubmit} className="row g-3">
				<div className="col-md-4">
					<label htmlFor="date" className="form-label">
						Date
					</label>
					<input type="date" id="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
				</div>
				<div className="col-md-4">
					<label htmlFor="evaluator" className="form-label">
						Evaluator
					</label>
					<input type="text" id="evaluator" className="form-control" value={evaluator} onChange={(e) => setEvaluator(e.target.value)} required />
				</div>
				<div className="col-md-4">
					<label htmlFor="observations" className="form-label">
						Observations
					</label>
					<textarea id="observations" className="form-control" value={observations} onChange={(e) => setObservations(e.target.value)} required></textarea>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary w-100">
						<i className="bi bi-check-circle"></i> Submit Report
					</button>
				</div>
			</form>
		</div>
	);
};

export default EmployeeObservationReportForm;
