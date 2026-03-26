type weatherRow = {
    hill_id: number;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    rain: number | null;
    snowfall: number | null;
};
export function calculatrPowderScore(row: weatherRow): number {
    let score = 50;

    const temp = row.temperature_2m ?? 0;
    const wind = row.wind_speed_10m ?? 0;
    const gust = row.wind_gusts_10m ?? 0;
    const snow = row.snowfall ?? 0;
    const rain = row.rain ?? 0;

    if (snow > 0 && snow < 2) score += 8;
    if (snow >= 2 && snow <5) score += 12;
    if (snow >= 5) score += 16;

    // Rain penalty
    if (rain > 0) score -= 20;
    if (rain >= 0.5) score -= 15;
    if (rain >= 1) score -= 15;

    // Temperature adjustment
    if (temp <= -10) score += 6;
    else if (temp <= -5) score += 8;
    else if (temp <= -2) score += 6;
    else if (temp <= 0) score += 2;
    else if (temp > 0) score -= 10;

    if (temp > 2) score -= 10;
    if (temp > 5) score -= 15;

    if (wind >= 15) score -= 5;
    if (wind >= 25) score -= 8;
    if (wind >= 35) score -= 10;
    if (wind >= 45) score -= 12;

    if (gust >= 25) score -= 4;
    if (gust >= 40) score -= 6;
    if (gust >= 55) score -= 10;

    if (rain > 0 && temp > 0) {
        score -= 15;
    }

    if (snow > 0 && temp <= 0) {
        score += 8;
    }

    return Math.max(0, Math.min(100, score));
 
}