/** @format */

import { Request, Response } from "express";
import xlsx from "xlsx";
import { EmployeeModel } from "../models/Employee";
import { IObservationReport } from "@shared/employee";

export const uploadObservationReports = async (req: Request, res: Response) => {
	try {
		// Parse and process uploaded Excel files
		const files = req.files as Express.Multer.File[];

		for (const file of files) {
			// Read the Excel file
			const workbook = xlsx.read(file.buffer, { type: "buffer" });

			// Assume the first sheet contains data
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			// Convert the sheet to JSON format with headers
			const data = xlsx.utils.sheet_to_json<any>(sheet, { header: 1 }); // Extract data as an array of arrays
			const startEmpCol = 7;
			const endEmpCol = 10;
			for (let col = startEmpCol; col <= endEmpCol; col++) {
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
					week_start_date: new Date(data[9][6]), // Week start date, adjust index accordingly
					training_centre: data[11][6], // Training centre, adjust index accordingly
					evaluator: data[13][6], // Evaluator name, adjust index accordingly

					aprons_sop: data[22][col], // SOP for aprons, adjust index accordingly
					grooming: data[23][col], // Grooming, adjust index accordingly
					facial_exp: data[24][col], // Facial expression, adjust index accordingly
					app_remarks: data[25][col], // Appearance remarks, adjust index accordingly

					handling_knowledge: data[29][col], // Handling knowledge, adjust index accordingly
					location_knowledge: data[30][col], // Location knowledge, adjust index accordingly
					eq_knowledge: data[31][col], // Equipment knowledge, adjust index accordingly
					accounting: data[32][col], // Accounting, adjust index accordingly
					eq_remarks: data[33][col], // Equipment remarks, adjust index accordingly

					// Daily Ops
					product_knowledge: data[37][col], // Product knowledge, adjust index accordingly
					outlet_knowledge: data[38][col], // Outlet knowledge, adjust index accordingly
					opening_readiness: data[40][col], // Opening readiness, adjust index accordingly
					float_and_front: data[41][col], // Float and front, adjust index accordingly
					cleanliness: data[42][col], // Cleanliness, adjust index accordingly
					pest_control_awareness: data[43][col], // Pest control awareness, adjust index accordingly
					pos_closing: data[45][col], // POS closing, adjust index accordingly
					eq_washing: data[46][col], // Equipment washing, adjust index accordingly
					safe_storage: data[47][col], // Safe storage, adjust index accordingly
					applicances: data[48][col], // Appliances, adjust index accordingly
					floor_cleanliness: data[49][col], // Floor cleanliness, adjust index accordingly
					daily_ops_remarks: data[50][col], // Daily Ops remarks, adjust index accordingly

					// Batter Mixing/Cooking
					mixing_sop: data[54][col], // Mixing SOP, adjust index accordingly
					cooking_quality: data[55][col], // Cooking quality, adjust index accordingly
					cooking_remarks: data[56][col], // Cooking remarks, adjust index accordingly

					// Final Product Quality
					skin_quality: data[61][col], // Skin quality, adjust index accordingly
					filling_consistency: data[62][col], // Filling consistency, adjust index accordingly
					foreign_object_check: data[63][col], // Foreign object check, adjust index accordingly
					cut_size: data[64][col], // Cut size, adjust index accordingly
					rejected_handling: data[65][col], // Rejected handling, adjust index accordingly
					final_product_remarks: data[66][col], // Final product remarks, adjust index accordingly

					// Communication
					team_conversation: data[70][col], // Team conversation, adjust index accordingly
					cust_conversation: data[71][col], // Customer conversation, adjust index accordingly
					listening_skills: data[72][col], // Listening skills, adjust index accordingly
					broadcasting: data[73][col], // Broadcasting, adjust index accordingly
					instruction_understanding: data[74][col], // Instruction understanding, adjust index accordingly
					communication_remarks: data[75][col], // Communication remarks, adjust index accordingly

					// Teamwork
					team_efficiency: data[80][col], // Team efficiency, adjust index accordingly
					rotation_confidence: data[81][col], // Rotation confidence, adjust index accordingly
					camaraderie: data[82][col], // Camaraderie, adjust index accordingly
					assist_initiative: data[83][col], // Assist initiative, adjust index accordingly
					teamwork_remarks: data[84][col], // Teamwork remarks, adjust index accordingly

					// Customer Service
					politeness: data[89][col], // Politeness, adjust index accordingly
					service: data[90][col], // Service, adjust index accordingly
					upsell: data[91][col], // Upsell, adjust index accordingly
					empathy: data[92][col], // Empathy, adjust index accordingly
					customer_service_remarks: data[93][col], // Customer service remarks, adjust index accordingly

					// Problem Solving
					calmness: data[98][col], // Calmness, adjust index accordingly
					solving_effectiveness: data[99][col], // Solving effectiveness, adjust index accordingly
					reporting: data[100][col], // Reporting, adjust index accordingly
					problem_solving_remarks: data[101][col], // Problem solving remarks, adjust index accordingly

					// Industry Knowledge
					food_safety: data[106][col], // Food safety, adjust index accordingly
					safe_workplace: data[107][col], // Safe workplace, adjust index accordingly
					pest_control: data[108][col], // Pest control, adjust index accordingly
					industry_knowledge_remarks: data[109][col], // Industry knowledge remarks, adjust index accordingly

					// Initiative and Attitude
					willingness_to_cover: data[114][col], // Willingness to cover, adjust index accordingly
					willingness_to_do_more: data[115][col], // Willingness to do more, adjust index accordingly
					work_independantly: data[116][col], // Work independently, adjust index accordingly
					attitude_remarks: data[117][col], // Attitude remarks, adjust index accordingly

					// KPI Awareness
					cust_satisfaction: data[123][col], // Customer satisfaction, adjust index accordingly
					inventory: data[124][col], // Inventory, adjust index accordingly
					sales: data[125][col], // Sales, adjust index accordingly
					individual: data[126][col], // Individual, adjust index accordingly
					team: data[127][col], // Team, adjust index accordingly
					kpi_awareness_remarks: data[128][col], // KPI awareness remarks, adjust index accordingly
					overall_score: 0, // Initialize overall score to 0 first
				};

				// Append the report to the employee's observationReports array
				employee.observationReports.push(observationReport);

				// Save the updated employee
				await employee.save();
			}
		}

		res.status(200).json({
			message: "Observation reports uploaded and added successfully",
		});
	} catch (error) {
		console.error("Error uploading observation reports:", error);
		res.status(500).json({ message: "Error uploading observation reports", error });
	}
};
