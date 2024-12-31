/** @format */

export interface IObservationReport {
	date: Date;
	observations: string;
	evaluator: string;
}

export interface IEmployee {
	_id: string;
	EN: string;
	name: string;
	contact: string;
	employee_type: string;
	training_outlet: string;
	outlet: string;
	probation_start_date: Date;
	probation_end_date: Date;
	remarks: string;
	current_employee: boolean;
	observationReports: IObservationReport[];
}
