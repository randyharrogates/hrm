/** @format */

import { Request, Response } from "express";
import { EmployeeModel, MasterCrewEmployeeModel, SeniorCrewEmployeeModel, InternModel, SpecialistTraineeModel, LocalCrewModel, ForeignCrewModel, DirectIntakeModel } from "../models/Employee";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
	try {
		const employees = await EmployeeModel.find();
		// console.log("Number of Employees fetched:", employees.length);
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ message: "Error fetching employees", error });
	}
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const employee = await EmployeeModel.findById(id);
		if (!employee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}
		res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({ message: "Error fetching employee", error });
	}
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
	try {
		const { employee_type, observationReports = [], ...rest } = req.body;
		console.log("Received Data:", req.body);

		// Select the correct discriminator model
		let EmployeeModelToUse;
		switch (employee_type) {
			case "MasterCrew":
				EmployeeModelToUse = MasterCrewEmployeeModel;
				break;
			case "SeniorCrew":
				EmployeeModelToUse = SeniorCrewEmployeeModel;
				break;
			case "Intern":
				EmployeeModelToUse = InternModel;
				break;
			case "SpecialistTrainee":
				EmployeeModelToUse = SpecialistTraineeModel;
				break;
			case "LocalCrew":
				EmployeeModelToUse = LocalCrewModel;
				break;
			case "ForeignCrew":
				EmployeeModelToUse = ForeignCrewModel;
				break;
			case "DirectIntake":
				EmployeeModelToUse = DirectIntakeModel;
				break;
			default:
				EmployeeModelToUse = EmployeeModel;
		}

		// Create new employee
		const newEmployee = new EmployeeModelToUse({
			...rest,
			employee_type,
			observationReports: observationReports, // Use validated reports
		});
		console.log(`Using model: ${EmployeeModelToUse.modelName}`);
		const savedEmployee = await newEmployee.save();
		await EmployeeModel.updateOverallScore(savedEmployee._id);
		res.status(201).json(savedEmployee);
	} catch (error: any) {
		if (error.name === "ValidationError") {
			res.status(400).json({ message: "Validation failed", errors: error.errors });
			return;
		}
		console.error("Error creating employee:", error);
		res.status(500).json({ message: "Error creating employee", error });
	}
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { employee_type, ...updateData } = req.body;

		// Select the appropriate model based on the employee_type
		let EmployeeModelToUse:
			| typeof EmployeeModel
			| typeof MasterCrewEmployeeModel
			| typeof SeniorCrewEmployeeModel
			| typeof InternModel
			| typeof SpecialistTraineeModel
			| typeof LocalCrewModel
			| typeof ForeignCrewModel
			| typeof DirectIntakeModel;

		switch (employee_type) {
			case "MasterCrewEmployee":
				EmployeeModelToUse = MasterCrewEmployeeModel;
				break;
			case "SeniorCrewEmployee":
				EmployeeModelToUse = SeniorCrewEmployeeModel;
				break;
			case "Intern":
				EmployeeModelToUse = InternModel;
				break;
			case "SpecialistTrainee":
				EmployeeModelToUse = SpecialistTraineeModel;
				break;
			case "LocalCrew":
				EmployeeModelToUse = LocalCrewModel;
				break;
			case "ForeignCrew":
				EmployeeModelToUse = ForeignCrewModel;
				break;
			default:
				EmployeeModelToUse = EmployeeModel;
		}

		// Explicit type assertion for the selected model
		const model = EmployeeModelToUse as typeof EmployeeModel;

		// Perform the update using the selected model
		const sanitizedId = id.replace(/^:/, "");
		const updatedEmployee = await model.findByIdAndUpdate(sanitizedId, updateData, { new: true });

		if (!updatedEmployee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}
		// Update overall grading score
		await EmployeeModel.updateOverallScore(updatedEmployee._id); // Update overall grading score

		res.status(200).json(updatedEmployee);
	} catch (error) {
		console.error("Error updating employee:", error);
		res.status(500).json({ message: "Error updating employee", error });
	}
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
		if (!deletedEmployee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}
		res.status(200).json({ message: "Employee deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting employee", error });
	}
};

// Get observation reports for an employee
export const getEmployeeObservations = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const employee = await EmployeeModel.findById(id);
		if (!employee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}
		res.status(200).json(employee.observationReports);
	} catch (error) {
		res.status(500).json({ message: "Error fetching observation reports", error });
	}
};

// Add an observation report for an employee
export const addEmployeeObservation = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const observationReport = req.body; // Expect the client to send a complete observation report object

		const employee = await EmployeeModel.findById(id);
		if (!employee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}

		// Push the observation report directly; Mongoose will validate against the schema
		employee.observationReports.push(observationReport);
		await employee.save();

		res.status(201).json(employee);
	} catch (error: any) {
		// Handle validation errors
		if (error.name === "ValidationError") {
			res.status(400).json({ message: "Validation failed", errors: error.errors });
		} else {
			res.status(500).json({ message: "Error adding observation report", error });
		}
	}
};

