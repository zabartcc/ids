interface ParsedMetar {
	type: string;
	auto: boolean;
	station: string;
	time: {
		day: number;
		hour: number;
		minute: number;
		date: string;
	};
	wind: {
		direction: number;
		speedKt: number;
		speedMps: number;
		gust?: number;
		variableDirection: boolean;
		varion: number | null;
	};
	correction: boolean;
	nosig?: boolean;
	visibility?: {
		meters: number;
		feet: number;
		miles: number;
		kilometers: number;
	};
	temperature?: {
		celcius: number;
		fahrenheit: number;
	};
	dewpoint?: {
		celcius: number;
		fahrenheit: number;
	};
	altimeter: {
		inches: number,
		millibars: number;
	},
	clouds?: Array<
		{
			code: string;
			meaning: string;
			altitude: number;
			type: string | null;
			typeMeaning: string | null;
		}
	>;
	runwayVisualRange?: Array<
		{
			runway: string | null;
			min: number | null;
			minRange: string | null;
			max: number | null;
			maxRange: string | null;
			trend?: string | null;
		}
	>;
	weather?: Array<
		{
			codes: Array<string> | null;
			intensity: string | null;
			descriptor: string | null;
			precipitation: string | null;
			obscuration: string | null;
		}
	>;
	cavok: boolean;
	windshear?: Array<number>;
	verticalVisibility?: number | null;
	recentWeather?: Array<
		{
			code: string | null;
			meaning: string | null;
		}
	>;
	remarks: any;
}