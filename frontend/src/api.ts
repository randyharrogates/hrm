/** @format */

import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api/employees",
});

export default api;

export const getEmployeeById = async (id: string) => {
	const response = await api.get(`/${id}`);
	return response.data;
};

export const createEmployee = async (employee: any) => {
	const response = await api.post("/", employee);
	return response.data;
};

export const updateEmployee = async (id: string, updatedEmployee: any) => {
	const response = await api.put(`/${id}`, updatedEmployee);
	return response.data;
};

export const deleteEmployee = async (id: string) => {
	await api.delete(`/${id}`);
};
