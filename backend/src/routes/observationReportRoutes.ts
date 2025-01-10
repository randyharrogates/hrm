/** @format */

import { uploadObservationReports } from "../controllers/observationReportController";
import { Router } from "express";
import multer from "multer";

const router = Router();
// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Multer configuration for file uploads
router.post(
	"/employees/observation-reports/upload",
	upload.array("files"), // Allow multiple files to be uploaded
	uploadObservationReports
);

export default router;
