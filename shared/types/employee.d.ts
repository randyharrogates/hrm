/** @format */

export interface IObservationReport {
	week_start_date: Date;
	training_centre: string;

	// Appearance
	aprons_sop: number;
	grooming: number;
	facial_exp: number;
	appearance_score: number;
	app_remarks: string;

	// Equipment
	handling_knowledge: number;
	location_knowledge: number;
	accounting: number;
	eq_knowledge: number;
	eq_score: number;
	eq_remarks: string;

	// Daily ops
	product_knowledge: number;
	outlet_knowledge: number;
	opening_readiness: number;
	float_and_front: number;
	cleanliness: number;
	pest_control_awareness: number;
	pos_closing: number;
	eq_washing: number;
	safe_storage: number;
	applicances: number;
	floor_cleanliness: number;
	daily_ops_score: number;
	daily_ops_remarks: string;

	// Batter mixing/cooking
	mixing_sop: number;
	cooking_quality: number;
	cooking_remarks: string;
	cooking_score: number;

	// Final Product Quality
	skin_quality: number;
	filling_consistency: number;
	foreign_object_check: number;
	cut_size: number;
	rejected_handling: number;
	final_product_score: number;
	final_product_remarks: string;

	// Communication
	team_conversation: number;
	cust_conversation: number;
	listening_skills: number;
	broadcasting: number;
	instruction_understanding: number;
	communication_score: number;
	communication_remarks: string;

	// Teamwork
	team_efficiency: number;
	rotation_confidence: number;
	camaraderie: number;
	assist_initiative: number;
	teamwork_score: number;
	teamwork_remarks: string;

	// Customer Service
	politeness: number;
	service: number;
	upsell: number;
	empathy: number;
	customer_service_score: number;
	customer_service_remarks: string;

	// Problem Solving
	calmness: number;
	solving_effectiveness: number;
	reporting: number;
	problem_solving_score: number;
	problem_solving_remarks: string;

	// Industry Knowledge
	food_safety: number;
	safe_workplace: number;
	pest_control: number;
	industry_knowledge_score: number;
	industry_knowledge_remarks: string;

	// Initiative and Attitude
	willingness_to_cover: number;
	willingness_to_do_more: number;
	work_independantly: number;
	attitude_score: number;
	attitude_remarks: string;

	// KPI Awareness
	cust_satisfaction: number;
	inventory: number;
	sales: number;
	individual: number;
	team: number;
	kpi_awareness_score: number;
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
	remarks: string;
	current_employee: boolean;
	overall_grading_score: number;
	observationReports: IObservationReport[];
}

