/** @format */

import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000; // Use environment variables if available

// MongoDB connection string (consider moving to an environment variable)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hrm";

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Connected to MongoDB using uri:", MONGO_URI);

		// Start the server only after the database connection is successful
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err);
		process.exit(1); // Exit process if DB connection fails
	});

// Graceful shutdown
process.on("SIGINT", async () => {
	console.log("\nGracefully shutting down...");
	try {
		await mongoose.disconnect();
		console.log("✅ MongoDB connection closed");
		process.exit(0);
	} catch (error) {
		console.error("❌ Error closing MongoDB connection:", error);
		process.exit(1);
	}
});
