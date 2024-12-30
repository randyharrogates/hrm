/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import ObservationReportForm from "../components/ObservationReportForm";

interface ObservationReport {
	date: string;
	observations: string;
	evaluator: string;
}

const EmployeeObservationPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [reports, setReports] = useState<ObservationReport[]>([]);

	useEffect(() => {
		const fetchReports = async () => {
			const response = await api.get(`/${id}/observations`);
			setReports(response.data);
		};
		fetchReports();
	}, [id]);

	return (
		<div>
			<h1>Observation Reports</h1>
			<ObservationReportForm employeeId={id!} />
			<ul>
				{reports.map((report, index) => (
					<li key={index}>
						<strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
						<strong>Observations:</strong> {report.observations} <br />
						<strong>Evaluator:</strong> {report.evaluator}
					</li>
				))}
			</ul>
		</div>
	);
};

export default EmployeeObservationPage;
