/** @format */

import { Router } from "express";
import Employee from "../models/Employee";

const router = Router();

// Create Employee
router.post("/", async (req, res) => {
	try {
		const newEmployee = new Employee(req.body);
		const savedEmployee = await newEmployee.save();
		res.status(201).json(savedEmployee);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get All Employees
router.get("/", async (req, res) => {
	try {
		const employees = await Employee.find();
		res.json(employees);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) return res.status(404).json({ message: "Employee not found" });
		res.json(employee);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Update Employee
router.put("/:id", async (req, res) => {
	try {
		const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
		res.json(updatedEmployee);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Delete Employee
router.delete("/:id", async (req, res) => {
	try {
		const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
		if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
		res.json(deletedEmployee);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;

// Add Observation Report
router.post("/:id/observations", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee not found" });
  
      employee.observationReports.push(req.body);
      await employee.save();
      res.status(201).json(employee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get Observation Reports for an Employee
  router.get("/:id/observations", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee not found" });
  
      res.json(employee.observationReports);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  