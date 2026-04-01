type WeatherRow = {
    hill_id: number;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    rain: number | null;
    snowfall: number | null;
};

export function calculatePowderScore(row: WeatherRow): number {
    let score = 50;

    const temp = row.temperature_2m ?? 0;
    const wind = row.wind_speed_10m ?? 0;
    const gust = row.wind_gusts_10m ?? 0;
    const snow = row.snowfall ?? 0;
    const rain = row.rain ?? 0;

    // Temperature
    if (temp > 5) score -= 40;
    else if (temp > 2) score -= 25;
    else if (temp >= 0) score -= 15;
    else if (temp >= -3) score += 10;
    else if (temp >= -8) score += 20;
    else if (temp >= -15) score += 8;
    else score -= 8;

    // Snowfall
    if (snow > 0 && snow <= 1) score += 5;
    else if (snow > 1 && snow < 2) score += 8;
    else if (snow >= 2 && snow < 5) score += 12;
    else if (snow >= 5) score += 20;

    // Snow quality
    if (snow > 0) {
        if (temp > 0) score -= 12;
        else if (temp > -3) score -= 5;
        else if (temp <= -3 && temp > -10) score += 12;
        else if (temp >= -15 && temp <= -10 && wind <= 24) score += 16;
        else if (temp >= -15 && temp <= -10 && wind > 24) score += 10;
        else if (temp < -15 && temp >= -20 && wind <= 24) score += 12;
        else if (temp < -15 && temp >= -20 && wind > 24) score += 6;
        else if (temp < -20 && wind <= 24) score += 8;
        else if (temp < -20 && wind > 24) score += 2;
    }

    // Rain / freezing rain
    if (rain > 0) {
        if (temp <= 0) {
            score -= 30;
            if (snow > 0) score -= 10;
        } else {
            if (rain < 0.25) score -= 10;
            else if (rain < 0.5) score -= 14;
            else if (rain < 1) score -= 18;
            else score -= 20;
        }
    }

    // Wind speed
    if (wind >= 45) score -= 12;
    else if (wind >= 35) score -= 10;
    else if (wind >= 25) score -= 8;
    else if (wind >= 15) score -= 5;

    // Wind gusts
    if (gust >= 55) score -= 10;
    else if (gust >= 40) score -= 6;
    else if (gust >= 25) score -= 4;

    return Math.max(0, Math.min(100, score));
}