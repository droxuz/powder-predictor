import { sql } from "@/db-connection/db";

export const dynamic = "force-dynamic";

type LiftRisk = "Low" | "Moderate" | "High" | null;

type HourlySlot = {
    hour: number;
    timestamp: string;
    powder_score: number | null;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    snowfall: number | null;
    rain: number | null;
    snow_depth: number | null;
};

type HillDetail = {
    id: number;
    name: string;
    location: string | null;
    latitude: number;
    longitude: number;
    description: string | null;
    open_time: string | null;
    close_time: string | null;
    lift_risk: LiftRisk;
    avg_powder_score: number | null;
    max_powder_score: number | null;
    daily_snowfall: number | null;
    daily_rain: number | null;
    min_temp: number | null;
    max_temp: number | null;
    max_wind: number | null;
    hourly: HourlySlot[];
};

function formatTime(value: unknown): string | null {
    if (!value) return null;
    const time = String(value);
    return time.slice(0, 5);
}

function deriveLiftRisk(maxWind: number | null): LiftRisk {
    if (maxWind === null) return null;
    if (maxWind < 40) return "Low";
    if (maxWind < 65) return "Moderate";
    return "High";
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const hillId = Number(id);

    if (!Number.isInteger(hillId)) {
        return Response.json(
            { success: false, message: "Invalid hill ID" },
            { status: 400 }
        );
    }

    try {
        const hillRows = await sql`
      SELECT
        h.id,
        h.name,
        h.location,
        h.latitude,
        h.longitude,
        h.description,
        h.open_time,
        h.close_time,

        SUM(hc.snowfall) AS daily_snowfall,
        SUM(hc.rain) AS daily_rain,
        MIN(hc.temperature_2m) AS min_temp,
        MAX(hc.temperature_2m) AS max_temp,
        MAX(hc.wind_speed_10m) AS max_wind,

        MAX(ps.powder_score) AS max_powder_score,
        AVG(ps.powder_score) AS avg_powder_score

      FROM hills h

      LEFT JOIN hill_conditions hc
        ON hc.hill_id = h.id
       AND hc.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
       AND hc.timestamp < date_trunc('day', timezone('America/Toronto', now())) + interval '1 day'

      LEFT JOIN powder_prediction_score ps
        ON ps.hill_id = h.id
       AND ps.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
       AND ps.timestamp < date_trunc('day', timezone('America/Toronto', now())) + interval '1 day'

      WHERE h.id = ${hillId}

      GROUP BY
        h.id,
        h.name,
        h.location,
        h.latitude,
        h.longitude,
        h.description,
        h.open_time,
        h.close_time
    `;

        if (hillRows.length === 0) {
            return Response.json(
                { success: false, message: "Hill not found" },
                { status: 404 }
            );
        }

        const hourlyRows = await sql`
  SELECT
    date_part('hour', timezone('America/Toronto', hc.timestamp))::int AS hour,
    hc.timestamp,
    ps.powder_score,
    hc.temperature_2m,
    hc.wind_speed_10m,
    hc.wind_gusts_10m,
    hc.snowfall,
    hc.rain,
    hc.snow_depth
  FROM hill_conditions hc
  LEFT JOIN powder_prediction_score ps
    ON ps.hill_id = hc.hill_id
   AND ps.timestamp = hc.timestamp
  WHERE hc.hill_id = ${hillId}
    AND hc.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
    AND hc.timestamp < date_trunc('day', timezone('America/Toronto', now())) + interval '7 days'
  ORDER BY hc.timestamp ASC
`;

        const h: any = hillRows[0];

        const hourly: HourlySlot[] = hourlyRows.map((row: any) => ({
            hour: Number(row.hour),
            timestamp: row.timestamp,
            powder_score:
                row.powder_score === null ? null : Number(row.powder_score),
            temperature_2m:
                row.temperature_2m === null ? null : Number(row.temperature_2m),
            wind_speed_10m:
                row.wind_speed_10m === null ? null : Number(row.wind_speed_10m),
            wind_gusts_10m:
                row.wind_gusts_10m === null ? null : Number(row.wind_gusts_10m),
            snowfall: row.snowfall === null ? null : Number(row.snowfall),
            rain: row.rain === null ? null : Number(row.rain),
            snow_depth:
                row.snow_depth === null ? null : Number(row.snow_depth),
        }));

        const maxWind = h.max_wind === null ? null : Number(h.max_wind);

        const hill: HillDetail = {
            id: Number(h.id),
            name: h.name,
            location: h.location ?? null,
            latitude: Number(h.latitude),
            longitude: Number(h.longitude),
            description: h.description ?? null,
            open_time: formatTime(h.open_time),
            close_time: formatTime(h.close_time),
            lift_risk: deriveLiftRisk(maxWind),

            daily_snowfall:
                h.daily_snowfall === null ? null : Number(h.daily_snowfall),
            daily_rain:
                h.daily_rain === null ? null : Number(h.daily_rain),
            min_temp: h.min_temp === null ? null : Number(h.min_temp),
            max_temp: h.max_temp === null ? null : Number(h.max_temp),
            max_wind: maxWind,
            avg_powder_score:
                h.avg_powder_score === null ? null : Number(h.avg_powder_score),
            max_powder_score:
                h.max_powder_score === null ? null : Number(h.max_powder_score),
            hourly,
        };

        return Response.json({
            success: true,
            data: hill,
        });
    } catch (error: any) {
        console.error("Failed to fetch hill detail:", error);

        return Response.json(
            {
                success: false,
                message: error?.message || "Failed to fetch hill detail",
            },
            { status: 500 }
        );
    }
}