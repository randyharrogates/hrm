/** @format */

import React, { useState } from "react";
import api from "../api";

const EmployeeSearch: React.FC = () => {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState(null);

	const handleSearch = async () => {
		const response = await api.get(`/${query}`);
		setResult(response.data);
	};

	return (
		<div>
			<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID" />
			<button onClick={handleSearch}>Search</button>
			{result && (
				<div>
					{result.name} - {result.position}
				</div>
			)}
		</div>
	);
};

export default EmployeeSearch;
