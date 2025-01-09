/** @format */

import { Request, Response } from "express";
import xlsx from "xlsx";
import { EmployeeModel } from "../models/Employee";

import { ObservationReportSchema } from "../models/Employee";
import { DocumentType } from "@typegoose/typegoose";

export const uploadObservationReports = async (req: Request, res: Response) => {
	try {
		const employeeId = req.params.id;

		// Find the employee by ID
		const employee = await EmployeeModel.findById(employeeId);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}

		// Parse and process uploaded Excel files
		const files = req.files as Express.Multer.File[];
		const newObservationReports: (typeof ObservationReportSchema)[] = [];

		for (const file of files) {
			// Read the Excel file
			const workbook = xlsx.read(file.buffer, { type: "buffer" });

			// Assume the first sheet contains data
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			// Convert the sheet data to JSON
			const data = xlsx.utils.sheet_to_json(sheet);

			// Validate and map data to the `ObservationReport` schema
			data.forEach((row) => {
				const observationReport: DocumentType<typeof ObservationReportSchema> = {
					week_start_date: new Date(row["Week Start Date"]),
					training_centre: row["Training Centre"],
					overall_score: row["Overall Score"],
					aprons_sop: row["Aprons SOP"],
					grooming: row["Grooming"],
					// Map other fields accordingly
				};
				newObservationReports.push(observationReport);
			});
		}

		// Append new reports to the employee's observation reports
		employee.observationReports.push(...newObservationReports);

		// Save the updated employee
		await employee.save();

		res.status(200).json({
			message: "Observation reports uploaded and added successfully",
			employee,
		});
	} catch (error) {
		console.error("Error uploading observation reports:", error);
		res.status(500).json({ message: "Error uploading observation reports", error });
	}
};
