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
app.use("/api/employees", employeeRoutes);

export default app;
