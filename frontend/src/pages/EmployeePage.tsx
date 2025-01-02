/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { IEmployee, IObservationReport } from "@shared/types/employee";

const EmployeePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [employee, setEmployee] = useState<IEmployee | null>(null);
	const [observationReports, setObservationReports] = useState<IObservationReport[]>([]);
	const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const response = await api.get(`/${id}`);
				setEmployee(response.data);
			} catch (error) {
				console.error("Error fetching employee details:", error);
			}
		};

		const fetchObservationReports = async () => {
			try {
				const response = await api.get(`/${id}/observations`);
				setObservationReports(response.data);
			} catch (error) {
				console.error("Error fetching observation reports:", error);
			}
		};

		fetchEmployee();
		fetchObservationReports();
	}, [id]);

	const toggleReport = (index: number) => {
		setExpandedReportIndex(index === expandedReportIndex ? null : index);
	};

	if (!employee) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container my-5">
			<div className="card shadow">
				<div className="card-header bg-primary text-white">
					<h1 className="card-title">
						<i className="bi bi-person-circle me-2"></i> Employee Details
					</h1>
				</div>
				<div className="card-body">
					<p>
						<strong>EN:</strong> {employee.EN}
					</p>
					<p>
						<strong>Name:</strong> {employee.name}
					</p>
					<p>
						<strong>Contact:</strong> {employee.contact}
					</p>
					<p>
						<strong>Type:</strong> {employee.employee_type}
					</p>
					<p>
						<strong>Training Outlet:</strong> {employee.training_outlet}
					</p>
					<p>
						<strong>Outlet:</strong> {employee.outlet}
					</p>
					<p>
						<strong>Probation Start Date:</strong> {new Date(employee.probation_start_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Probation End Date:</strong> {employee.probation_end_date ? new Date(employee.probation_end_date).toLocaleDateString() : "Not available"}
					</p>
					<p>
						<strong>Remarks:</strong> {employee.remarks || "None"}
					</p>
					<p>
						<strong>Current Employee:</strong> {employee.current_employee ? "Yes" : "No"}
					</p>
				</div>

				{/* Render observation reports */}
				<div className="card-body">
					<h3 className="card-title mt-4">Observation Reports</h3>
					{observationReports.length > 0 ? (
						<div className="list-group">
							{observationReports.map((report, index) => (
								<div key={index} className="list-group-item border rounded-3 shadow-sm my-2 p-3">
									<div className="d-flex justify-content-between align-items-center" onClick={() => toggleReport(index)} style={{ cursor: "pointer" }}>
										<div>
											<strong>
												<i className="bi bi-calendar3 me-2"></i>Date:
											</strong>{" "}
											{new Date(report.week_start_date).toLocaleDateString()}
										</div>
										<div>{expandedReportIndex === index ? <i className="bi bi-chevron-up text-primary"></i> : <i className="bi bi-chevron-down text-primary"></i>}</div>
									</div>
									{expandedReportIndex === index && (
										<div className="mt-3 bg-light p-3 rounded">
											<p>
												<strong>
													<i className="bi bi-person me-2"></i>Evaluator:
												</strong>{" "}
												{report.evaluator}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<p className="text-muted">No observation reports available for this employee.</p>
					)}
				</div>

				<div className="card-footer text-end">
					<button className="btn btn-primary" onClick={() => navigate("/employees")}>
						Back to List
					</button>
				</div>
			</div>
		</div>
	);
};

export default EmployeePage;
