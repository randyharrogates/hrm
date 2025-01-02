/** @format */

import { IEmployee, IObservationReport } from "@shared/types/employee";

// Extendable Employee Types for Frontend (Sync with Backend Models)
export interface IMasterCrew extends IEmployee {
	master_crew_remarks: string;
}

export interface ISeniorCrew extends IEmployee {
	senior_crew_remarks: string;
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	certificate: string;
	hourly_rate: number; // Synced with backend
	contract_end_date: Date; // Synced with backend
}

export interface IIntern extends IEmployee {
	mentor: string;
	intern_start_date: Date;
	intern_end_date: Date;
	intern_remarks: string;
	duration_in_months: number; // Synced with backend
}

export interface ISpecialistTrainee extends IEmployee {
	specialist_trainee_remarks: string;
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
}

// A union type to represent all possible employee types
export type EmployeeTypes = IMasterCrew | ISeniorCrew | IIntern | ISpecialistTrainee;

// Re-export ObservationReport for reuse in the frontend
export type ObservationReport = IObservationReport;
