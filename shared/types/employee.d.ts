/** @format */

export interface IObservationReport {
	week_start_date: Date;
	training_centre: string;
	overall_score: number;

	// Appearance
	aprons_sop: number | null;
	grooming: number | null;
	facial_exp: number | null;
	app_remarks: string;

	// Equipment
	handling_knowledge: number | null;
	eq_knowledge: number | null; // Management, maintenance checks
	location_knowledge: number | null;
	accounting: number | null;
	eq_remarks: string;

	// Daily ops
	product_knowledge: number | null;
	outlet_knowledge: number | null;
	opening_readiness: number | null;
	float_and_front: number | null;
	cleanliness: number | null;
	pest_control_awareness: number | null;
	pos_closing: number | null;
	eq_washing: number | null;
	safe_storage: number | null;
	applicances: number | null;
	floor_cleanliness: number | null;
	daily_ops_remarks: string;

	// Batter mixing/cooking
	mixing_sop: number | null;
	cooking_quality: number | null;
	cooking_remarks: string;

	// Final Product Quality
	skin_quality: number | null;
	filling_consistency: number | null;
	foreign_object_check: number | null;
	cut_size: number | null;
	rejected_handling: number | null;
	final_product_remarks: string;

	// Communication
	team_conversation: number | null;
	cust_conversation: number | null;
	listening_skills: number | null;
	broadcasting: number | null;
	instruction_understanding: number | null;
	communication_remarks: string;

	// Teamwork
	team_efficiency: number | null;
	rotation_confidence: number | null;
	camaraderie: number | null;
	assist_initiative: number | null;
	teamwork_remarks: string;

	// Customer Service
	politeness: number | null;
	service: number | null;
	upsell: number | null;
	empathy: number | null;
	customer_service_remarks: string;

	// Problem Solving
	calmness: number | null;
	solving_effectiveness: number | null;
	reporting: number | null;
	problem_solving_remarks: string;

	// Industry Knowledge
	food_safety: number | null;
	safe_workplace: number | null;
	pest_control: number | null;
	industry_knowledge_remarks: string;

	// Initiative and Attitude
	willingness_to_cover: number | null;
	willingness_to_do_more: number | null;
	work_independantly: number | null;
	attitude_remarks: string;

	// KPI Awareness
	cust_satisfaction: number | null;
	inventory: number | null;
	sales: number | null;
	individual: number | null;
	team: number | null;
	kpi_awareness_remarks: string;

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
	extended_probation: boolean;
	status: string;
	transit_date: Date;
	remarks: string;
	training_form: string;
	forteen_hours_shift: Date;
	verbal_and_practical: Date;
	certificate: string;
	hourly_rate: number;
	pass_type: string;
	overall_grading_score: number;
	observationReports: IObservationReport[];
}