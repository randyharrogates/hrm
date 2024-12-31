/** @format */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", employeeRoutes);

// Error handling middleware for undefined routes
app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found" });
});

export default app;
