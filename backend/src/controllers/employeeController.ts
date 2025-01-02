/** @format */

import { Request, Response } from "express";
import { EmployeeModel, MasterCrewEmployeeModel, SeniorCrewEmployeeModel, InternModel, SpecialistTraineeModel } from "../models/Employee";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
	try {
		const employees = await EmployeeModel.find();
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
		const { employee_type, ...rest } = req.body;
		console.log("Request body:", req.body);
		// Select the correct discriminator model based on employee_type
		let EmployeeModelToUse;
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
			case "Contractor":
				EmployeeModelToUse = SpecialistTraineeModel;
				break;
			default:
				EmployeeModelToUse = EmployeeModel; // Fallback to base employee
		}

		// Create and save the employee using the selected model
		const newEmployee = new EmployeeModelToUse({ employee_type, ...rest });
		const savedEmployee = await newEmployee.save();

		res.status(201).json(savedEmployee);
	} catch (error) {
		console.error("Error creating employee:", error);
		res.status(400).json({ message: "Error creating employee", error });
	}
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { employee_type, ...updateData } = req.body;

		// Select the appropriate model based on the employee_type
		let EmployeeModelToUse: typeof EmployeeModel | typeof MasterCrewEmployeeModel | typeof SeniorCrewEmployeeModel | typeof InternModel | typeof SpecialistTraineeModel;

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
			case "Contractor":
				EmployeeModelToUse = SpecialistTraineeModel;
				break;
			default:
				EmployeeModelToUse = EmployeeModel;
		}

		// Explicit type assertion for the selected model
		const model = EmployeeModelToUse as typeof EmployeeModel;

		// Perform the update using the selected model
		const updatedEmployee = await model.findByIdAndUpdate(id, updateData, { new: true });

		if (!updatedEmployee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}

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
		const { date, observations, evaluator } = req.body;

		const employee = await EmployeeModel.findById(id);
		if (!employee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}

		employee.observationReports.push({ date, observations, evaluator });
		await employee.save();
		res.status(201).json(employee);
	} catch (error) {
		res.status(400).json({ message: "Error adding observation report", error });
	}
};
