/** @format */

import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

import mongoose from "mongoose";

mongoose
	.connect("mongodb://127.0.0.1:27017/hrm", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));
