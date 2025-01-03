/** @format */

import React from "react";

const HomePage: React.FC = () => (
	<div className="container my-5">
		{/* Header Section */}
		<header className="text-center mb-5">
			<h1 className="display-4 text-primary">
				<i className="bi bi-person-lines-fill"></i> Welcome to HRM Application
			</h1>
			<p className="lead text-secondary">Your all-in-one solution for managing employees efficiently and effectively.</p>
		</header>

		{/* Overview Section */}
		<section className="mb-5">
			<h2 className="text-primary">
				<i className="bi bi-clipboard-data"></i> Application Overview
			</h2>
			<p>This HRM (Human Resource Management) application provides the following key features:</p>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">
					<i className="bi bi-person-plus-fill text-success"></i> Add and manage employee records
				</li>
				<li className="list-group-item">
					<i className="bi bi-list-ul text-primary"></i> View, edit, and delete employee details
				</li>
				<li className="list-group-item">
					<i className="bi bi-funnel-fill text-warning"></i> Filter and search employees by type and details
				</li>
				<li className="list-group-item">
					<i className="bi bi-file-earmark-bar-graph-fill text-danger"></i> Generate and manage observation reports
				</li>
			</ul>
		</section>

		{/* About Creator Section */}
		<section className="mb-5">
			<h2 className="text-primary">
				<i className="bi bi-person-circle"></i> About the Creator
			</h2>
			<p>
				Hello! I'm <strong>Randy</strong>, the creator of this HRM application.
			</p>
			<p>
				You can connect with me on{" "}
				<a href="https://www.linkedin.com/in/randychan112" className="text-primary text-decoration-none" target="_blank" rel="noopener noreferrer">
					LinkedIn <i className="bi bi-linkedin"></i>
				</a>{" "}
				or visit my personal website:{" "}
				<a href="https://randyharrogates.github.io/my-portfolio" className="text-primary text-decoration-none" target="_blank" rel="noopener noreferrer">
					Here <i className="bi bi-globe"></i>
				</a>
				.
			</p>
		</section>

		{/* Navigation Section */}
		<section className="text-center">
			<h2 className="text-primary mb-4">
				<i className="bi bi-box-arrow-in-right"></i> Get Started
			</h2>
			<div className="d-grid gap-3 d-sm-flex justify-content-center">
				<a href="/add-employee" className="btn btn-success btn-lg">
					<i className="bi bi-person-plus"></i> Add Employee
				</a>
				<a href="/employees" className="btn btn-primary btn-lg">
					<i className="bi bi-people-fill"></i> Employee List
				</a>
			</div>
		</section>
	</div>
);

export default HomePage;
