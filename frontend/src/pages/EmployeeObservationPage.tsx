/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import EmployeeObservationReportForm from "../components/EmployeeObservationReportForm";

interface ObservationReport {
	date: string;
	observations: string;
	evaluator: string;
}

const EmployeeObservationPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [reports, setReports] = useState<ObservationReport[]>([]);

	const fetchReports = async () => {
		const response = await api.get(`/${id}/observations`);
		setReports(response.data);
	};

	const handleAddObservation = (newReport: ObservationReport) => {
		setReports((prevReports) => [...prevReports, newReport]);
	};

	useEffect(() => {
		fetchReports();
	}, [id]);

	return (
		<div className="container mt-4">
			<h1 className="text-center mb-4">Observation Reports</h1>
			<EmployeeObservationReportForm employeeId={id!} onAddObservation={handleAddObservation} />
			<h3 className="mt-4">Existing Reports</h3>
			<ul className="list-group">
				{reports.length > 0 ? (
					reports.map((report, index) => (
						<li key={index} className="list-group-item">
							<strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
							<strong>Observations:</strong> {report.observations} <br />
							<strong>Evaluator:</strong> {report.evaluator}
						</li>
					))
				) : (
					<li className="list-group-item text-center">No reports available</li>
				)}
			</ul>
		</div>
	);
};

export default EmployeeObservationPage;
