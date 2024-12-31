/** @format */

import { Request, Response } from "express";
import { EmployeeModel } from "../models/Employee";

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
		const newEmployee = new EmployeeModel(req.body);
		const savedEmployee = await newEmployee.save();
		res.status(201).json(savedEmployee);
	} catch (error) {
		res.status(400).json({ message: "Error creating employee", error });
	}
};

// Update an employee
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedEmployee) {
			res.status(404).json({ message: "Employee not found" });
			return;
		}
		res.status(200).json(updatedEmployee);
	} catch (error) {
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
