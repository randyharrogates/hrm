/** @format */

import { Request, Response } from "express";
import xlsx from "xlsx";
import { EmployeeModel } from "../models/Employee";
import { IObservationReport } from "@shared/employee";

export const uploadObservationReports = async (req: Request, res: Response) => {
	try {
		// Parse and process uploaded Excel files
		const files = req.files as Express.Multer.File[];
		const newObservationReports = [];

		for (const file of files) {
			// Read the Excel file
			const workbook = xlsx.read(file.buffer, { type: "buffer" });

			// Assume the first sheet contains data
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			// Convert the sheet to JSON format with headers
			const data = xlsx.utils.sheet_to_json<any>(sheet, { header: 1 }); // Extract data as an array of arrays

			// Loop through the columns starting from the one containing Employee Number
			const headers = data[16]; // Assuming row 17 contains headers, adjust index accordingly

			for (let col = 7; col < headers.length; col++) {
				const employeeEN = data[17][col]; // Assuming row 18 contains Employee Numbers, adjust index accordingly

				if (!employeeEN) continue;

				// Find the employee by EN
				const employee = await EmployeeModel.findOne({ EN: employeeEN });
				if (!employee) {
					console.error(`Employee with EN ${employeeEN} not found`);
					continue;
				}

				// Create observation report object for the current column
				const observationReport: IObservationReport = {
					week_start_date: new Date(data[2][col]), // Week start date, adjust index accordingly
					training_centre: data[4][col], // Training centre, adjust index accordingly
					aprons_sop: data[21][col], // SOP for aprons, adjust index accordingly
					grooming: data[22][col], // Grooming, adjust index accordingly
					facial_exp: data[23][col], // Facial expression, adjust index accordingly
					app_remarks: data[25][col], // Appearance remarks, adjust index accordingly
					handling_knowledge: data[29][col], // Handling knowledge, adjust index accordingly
					location_knowledge: data[30][col], // Location knowledge, adjust index accordingly
					accounting: data[31][col], // Accounting, adjust index accordingly
					eq_knowledge: data[32][col], // Equipment knowledge, adjust index accordingly
					eq_remarks: data[34][col], // Equipment remarks, adjust index accordingly
					// Add other fields similarly...
					evaluator: data[50][col], // Evaluator name, adjust index accordingly
				};

				// Append the report to the employee's observationReports array
				employee.observationReports.push(observationReport);

				// Save the updated employee
				await employee.save();

				newObservationReports.push({
					employeeEN,
					observationReport,
				});
			}
		}

		res.status(200).json({
			message: "Observation reports uploaded and added successfully",
			newObservationReports,
		});
	} catch (error) {
		console.error("Error uploading observation reports:", error);
		res.status(500).json({ message: "Error uploading observation reports", error });
	}
};
