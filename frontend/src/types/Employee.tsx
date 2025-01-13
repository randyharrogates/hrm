/** @format */

import { IEmployee, IObservationReport } from "@shared/types/employee";

// Extendable Employee Types for Frontend (Sync with Backend Models)
export interface IMasterCrew extends IEmployee {
	master_crew_remarks: string;
}

export interface ISeniorCrew extends IEmployee {
	senior_crew_remarks: string;
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
}

export interface ILocalCrew extends IEmployee {
	local_crew_remarks: string;
}

export interface IForeignCrew extends IEmployee {
	foreign_crew_remarks: string;
}

export interface IDirectIntake extends IEmployee {
	direct_intake_remarks: string;
}

// A union type to represent all possible employee types
export type EmployeeTypes = IMasterCrew | ISeniorCrew | IIntern | ISpecialistTrainee | ILocalCrew | IForeignCrew | IDirectIntake;

// Re-export ObservationReport for reuse in the frontend
export type ObservationReport = IObservationReport;
