/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<i className="bi bi-people-fill"></i> HRM
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/add-employee">
								Add Employee
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/employees">
								Employee List
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/upload-observation-report">
								Upload Observation Reports
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/employeeSummary">
								Employee Summary
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
