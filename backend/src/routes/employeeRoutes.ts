/** @format */

import { Router } from "express";
import multer from "multer";
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getEmployeeObservations, addEmployeeObservation } from "../controllers/employeeController";


const router = Router();

// Employee routes
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

// Observation report routes
router.get("/employees/:id/observations", getEmployeeObservations);
router.post("/employees/:id/observations", addEmployeeObservation);


export default router;
