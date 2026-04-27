import {sql} from "@/db-connection/db";
import { calculatePowderScore } from "@/db-connection/powder-score-calculator";

export const dynamic = "force-dynamic";

type weatherRow = {
    hill_id: number;
    timestamp: string;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    rain: number | null;
    snowfall: number | null;
    snow_depth: number | null;
};

type DbWeatherRow = {
    hill_id: number | string;
    timestamp: string;
    temperature_2m: number | string | null;
    wind_speed_10m: number | string | null;
    wind_gusts_10m: number | string | null;
    rain: number | string | null;
    snowfall: number | string | null;
    snow_depth: number | string | null;
};

type PowderScoreRow = {
    hill_id: number;
    timestamp: string;
    powder_score: number;
};

async function upsertPowderScores(rows: PowderScoreRow[]) {
    if (rows.length === 0) return;

    const hillIds = rows.map((row) => row.hill_id);
    const timestamps = rows.map((row) => row.timestamp);
    const powderScores = rows.map((row) => row.powder_score);

    await sql`
        INSERT INTO powder_prediction_score (hill_id, timestamp, powder_score)
        SELECT
            input.hill_id,
            input.timestamp,
            input.powder_score
        FROM unnest(
            ${hillIds}::int[],
            ${timestamps}::timestamp[],
            ${powderScores}::double precision[]
        ) AS input(
            hill_id,
            timestamp,
            powder_score
        )
        ON CONFLICT(hill_id, timestamp)
        DO UPDATE SET
            powder_score = EXCLUDED.powder_score
    `;
}

export async function GET(req: Request){
    const auth = req.headers.get("authorization");
    if( auth !== `Bearer ${process.env.SECRET_KEY_CRON}`) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }
    try {
        const rows = await sql`
        SELECT
            hill_id,
            timestamp,
            temperature_2m,
            wind_speed_10m,
            wind_gusts_10m,
            snowfall,
            rain,
            snow_depth
        FROM hill_conditions
        WHERE timestamp >= date_trunc('hour', timezone('America/Toronto', now()))
        ORDER BY hill_id, timestamp`;
        
        const conditions: weatherRow[] = (rows as DbWeatherRow[]).map((row) => ({
            hill_id: Number(row.hill_id),
            timestamp: row.timestamp,
            temperature_2m: row.temperature_2m === null ? null : Number(row.temperature_2m),
            wind_speed_10m: row.wind_speed_10m === null ? null : Number(row.wind_speed_10m),
            wind_gusts_10m: row.wind_gusts_10m === null ? null : Number(row.wind_gusts_10m),
            snowfall: row.snowfall === null ? null : Number(row.snowfall),
            rain: row.rain === null ? null : Number(row.rain),
            snow_depth: row.snow_depth === null ? null : Number(row.snow_depth),
        }));

        const powderScoreRows: PowderScoreRow[] = conditions.map((row) => ({
            hill_id: row.hill_id,
            timestamp: row.timestamp,
            powder_score: calculatePowderScore(row),
        }));

        await upsertPowderScores(powderScoreRows);
        return Response.json({
            success: true,
            message: "Success to calculate and insert scores"
        });
    
    } catch (error){
        console.error("Error", error);
        return Response.json({
            success: false,
            message: "Score calculation failed",
            },
            {status: 500}
        );
    }
        

}
