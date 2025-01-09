/** @format */

// types/express.d.ts
import * as Multer from "multer";

declare global {
	namespace Express {
		interface Request {
			files?: { [fieldname: string]: Multer.File[] } | Multer.File[]; // Matches the Multer declaration
		}
	}
}
