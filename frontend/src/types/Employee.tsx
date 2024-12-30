/** @format */

import { IEmployee } from "@shared/types/employee";

export interface IFullTimeEmployee extends IEmployee {
	annual_salary: number;
	healthcare_plan: string;
}

export interface IPartTimeEmployee extends IEmployee {
	hourly_rate: number;
	contract_end_date: Date;
}

export interface IIntern extends IEmployee {
	mentor: string;
	duration_in_months: number;
}

export interface IContractor extends IEmployee {
	contract_agency: string;
	contract_end_date: Date;
}

// A union type to represent all possible employee types
export type EmployeeTypes = IFullTimeEmployee | IPartTimeEmployee | IIntern | IContractor;
