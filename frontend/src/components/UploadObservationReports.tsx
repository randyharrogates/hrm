/** @format */

import React, { useState } from "react";
import axios from "axios";

const UploadObservationReports: React.FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	// Handle file selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFiles(Array.from(event.target.files));
		}
	};

	// Handle form submission
	const handleUpload = async (event: React.FormEvent) => {
		event.preventDefault();

		if (selectedFiles.length === 0) {
			setMessage("Please select at least one file.");
			return;
		}

		setLoading(true);
		setMessage(null);

		const formData = new FormData();
		selectedFiles.forEach((file) => formData.append("files", file));

		try {
			const response = await axios.post("http://localhost:5000/api/employees/observation-reports/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setMessage(response.data.message);
		} catch (error: any) {
			console.error("Error uploading files:", error);
			setMessage(error.response?.data?.message || "An error occurred while uploading files.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container my-4">
			<h2 className="text-center">Upload Observation Reports</h2>

			<form onSubmit={handleUpload}>
				<div className="mb-3">
					<label htmlFor="fileInput" className="form-label">
						Select Excel Files
					</label>
					<input
						type="file"
						id="fileInput"
						className="form-control"
						accept=".xlsx, .xls"
						multiple // Allows multiple file selection
						onChange={handleFileChange}
					/>
				</div>

				<button type="submit" className="btn btn-primary" disabled={loading || selectedFiles.length === 0}>
					{loading ? "Uploading..." : "Upload"}
				</button>
			</form>

			{message && <div className="mt-3 alert alert-info">{message}</div>}
		</div>
	);
};

export default UploadObservationReports;
