interface Pireps {
	_id: string;
	reportTime: string;
	location: string;
	aircraft?: string;
	flightLevel?: string;
	skyCond?: string;
	turbulence?: string;
	icing?: string;
	vis?: string;
	temp?: string;
	wind?: string;
	raw: string;
	manual: boolean;
	urgent: boolean | string;
}