type OpenMeteoHourly = {
  time?: string[];
  temperature_2m?: number[];
  wind_speed_10m?: number[];
  wind_gusts_10m?: number[];
  snowfall?: number[];
  rain?: number[];
};

export type CleanConditionRow = {
  hill_id: number;
  timestamp: string;
  temperature: number | null;
  wind_speed_10m: number | null;
  wind_gusts_10m: number | null;
  snowfall: number | null;
  rain: number | null;
};

function safeNum(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function cleanWeatherData(hill_id: number, hourly: OpenMeteoHourly): CleanConditionRow[] {
  const times = hourly.time ?? [];

  return times.map((timestamp, i) => ({
    hill_id,
    timestamp,
    temperature: safeNum(hourly.temperature_2m?.[i]),
    wind_speed_10m: safeNum(hourly.wind_speed_10m?.[i]),
    wind_gusts_10m: safeNum(hourly.wind_gusts_10m?.[i]),
    snowfall: safeNum(hourly.snowfall?.[i]),
    rain: safeNum(hourly.rain?.[i]),
  }));
}