import { sql } from "@/db-connection/db";

export const dynamic = "force-dynamic";

type hillOverview = {
    id: number;
    name: string;
    location: string | null;
    latitude: number;
    longitude: number;
    description: string;
    daily_snowfall: null | number;
    daily_rain: null | number;
    min_temp: null | number;
    max_temp: null | number;
    max_wind: null | number;
    max_powder_score: null | number;
    avg_powder_score: null | number;
    lift_risk: "Low" | "Moderate" | "High" | null;
    best_window: string | null;
    why_bullets: string[] | null;
    open_time: string | null;
    close_time: string | null;
}

function deriveLiftRisk(maxWind: number | null): "Low" | "Moderate" | "High" | null {
    if (maxWind === null) return null;
    if (maxWind < 40) return "Low";
    if (maxWind < 65) return "Moderate";
    return "High";
}

function deriveWhyBullets(hill: Omit<hillOverview, "lift_risk" | "best_window" | "why_bullets" | "open_time" | "close_time">): string[] {
    const reasons: string[] = [];
    const score = hill.avg_powder_score ?? 0;

    // If unskiable, lead with that and skip misleading weather detail
    if (score === 0) {
        reasons.push("Not skiable — insufficient snow base");
        if ((hill.daily_rain ?? 0) > 0)
            reasons.push(`${hill.daily_rain!.toFixed(1)} mm of rain detected`);
        if ((hill.max_temp ?? 0) > 5)
            reasons.push(`Warm temps up to ${hill.max_temp!.toFixed(1)} °C — snow melting`);
        return reasons.slice(0, 3);
    }

    // Snowfall
    if ((hill.daily_snowfall ?? 0) > 0)
        reasons.push(`${hill.daily_snowfall!.toFixed(1)} cm of fresh snowfall today`);
    else
        reasons.push("No new snowfall today");

    // Temperature
    if ((hill.max_temp ?? 0) < -3)
        reasons.push(`Temps staying below −3 °C — low melt risk`);
    else if ((hill.max_temp ?? 0) >= 0)
        reasons.push(`Temps near or above 0 °C — watch for soft snow`);

    // Rain
    if ((hill.daily_rain ?? 0) === 0)
        reasons.push("No rain detected");
    else
        reasons.push(`${hill.daily_rain!.toFixed(1)} mm of rain — possible icy patches`);

    // Wind — only mention if notable
    if ((hill.max_wind ?? 0) >= 65)
        reasons.push(`Strong gusts up to ${hill.max_wind} km/h — lift closures possible`);
    else if ((hill.max_wind ?? 0) >= 40)
        reasons.push(`Moderate wind up to ${hill.max_wind} km/h`);

    return reasons.slice(0, 3);
}

// Formats a DB time string like "09:00:00" → "9:00"
function formatTime(t: string): string {
    const [h, m] = t.split(":");
    return `${parseInt(h)}:${m}`;
}

export async function GET() {
    try {
        const rows = await sql`
        SELECT
            h.id,
            h.name,
            h.location,
            h.latitude,
            h.longitude,
            h.description,
            h.open_time,
            h.close_time,
            hc.daily_snowfall,
            hc.daily_rain,
            hc.min_temp,
            hc.max_temp,
            hc.max_wind,
            ps.max_powder_score,
            ps.avg_powder_score,
            bw.best_window_start

        FROM hills AS h

        LEFT JOIN LATERAL (
            SELECT
                SUM(hc.snowfall)        AS daily_snowfall,
                SUM(hc.rain)            AS daily_rain,
                MIN(hc.temperature_2m)  AS min_temp,
                MAX(hc.temperature_2m)  AS max_temp,
                MAX(hc.wind_speed_10m)  AS max_wind
            FROM hill_conditions AS hc
            WHERE hc.hill_id = h.id
            AND hc.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
            AND hc.timestamp <  date_trunc('day', timezone('America/Toronto', now())) + interval '1 day'
        ) hc ON true

        LEFT JOIN LATERAL (
            SELECT
                MAX(powder_score) AS max_powder_score,
                AVG(powder_score) AS avg_powder_score
            FROM powder_prediction_score AS ps
            WHERE ps.hill_id = h.id
            AND ps.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
            AND ps.timestamp <  date_trunc('day', timezone('America/Toronto', now())) + interval '1 day'
        ) ps ON true

        LEFT JOIN LATERAL (
            SELECT
                date_part('hour', timezone('America/Toronto', w1.timestamp))::int AS best_window_start
                FROM powder_prediction_score w1
                JOIN powder_prediction_score w2
                ON  w2.hill_id = w1.hill_id
                AND w2.timestamp = w1.timestamp + interval '1 hour'
                WHERE w1.hill_id = h.id
                AND date_part('hour', timezone('America/Toronto', w1.timestamp))
                BETWEEN date_part('hour', h.open_time)
                AND date_part('hour', h.close_time) - 2
                -- Only future or current hours
                AND w1.timestamp >= date_trunc('hour', now())
                AND w1.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
                AND w1.timestamp <  date_trunc('day', timezone('America/Toronto', now())) + interval '1 day'
                --ONLY IF GOOD CONDITIONS
                AND (w1.powder_score + w2.powder_score) / 2 >= 40
                ORDER BY (w1.powder_score + w2.powder_score) DESC
                LIMIT 1
            ) bw ON true
        ORDER BY max_powder_score DESC NULLS LAST, h.name;
        `;

        const hills: hillOverview[] = rows.map((row: any) => {
            const base = {
                id:               Number(row.id),
                name:             row.name,
                location:         row.location,
                latitude:         Number(row.latitude),
                longitude:        Number(row.longitude),
                description:      row.description ?? null,
                daily_snowfall:   row.daily_snowfall   === null ? null : Number(row.daily_snowfall),
                daily_rain:       row.daily_rain       === null ? null : Number(row.daily_rain),
                min_temp:         row.min_temp         === null ? null : Number(row.min_temp),
                max_temp:         row.max_temp         === null ? null : Number(row.max_temp),
                max_wind:         row.max_wind         === null ? null : Number(row.max_wind),
                avg_powder_score: row.avg_powder_score === null ? null : Number(row.avg_powder_score),
                max_powder_score: row.max_powder_score === null ? null : Number(row.max_powder_score),
                open_time:        row.open_time  ? formatTime(String(row.open_time))  : null,
                close_time:       row.close_time ? formatTime(String(row.close_time)) : null,
            };

            const windowStart: number | null = row.best_window_start === null ? null : Number(row.best_window_start);
            const best_window = windowStart !== null
                ? `${windowStart}:00 – ${windowStart + 2}:00`
                : null;

            return {
                ...base,
                lift_risk:   deriveLiftRisk(base.max_wind),
                best_window,
                why_bullets: deriveWhyBullets(base),
            };
        });

        return Response.json({ success: true, message: "Success", data: hills });

    } catch (error: any) {
        return Response.json({ success: false, message: "Failed to fetch hills: " + error }, { status: 500 });
    }
}