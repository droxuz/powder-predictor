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
};

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
            rain
        FROM hill_conditions
        ORDER BY hill_id, timestamp`;
        
        const conditions: weatherRow[] = rows.map((row: any) => ({
            hill_id: Number(row.hill_id),
            timestamp: row.timestamp,
            temperature_2m: row.temperature_2m === null ? null : Number(row.temperature_2m),
            wind_speed_10m: row.wind_speed_10m === null ? null : Number(row.wind_speed_10m),
            wind_gusts_10m: row.wind_gusts_10m === null ? null : Number(row.wind_gusts_10m),
            snowfall: row.snowfall === null ? null : Number(row.snowfall),
            rain: row.rain === null ? null : Number(row.rain),
        }));
        for(const row of conditions){
            const powderScore = calculatePowderScore(row);
            await sql`
            INSERT INTO powder_prediction_score (hill_id, timestamp, powder_score) 
            VALUES(${row.hill_id}, ${row.timestamp}, ${powderScore})
            ON CONFLICT(hill_id, timestamp)
            DO UPDATE SET 
                powder_score = EXCLUDED.powder_score
            `;
        }
        return Response.json({
            success: true,
            message: "Success to calculate and insert scores"
        });
    
    } catch {
        console.error("Error");
        return Response.json({
            success: false,
            message: "Score calculation failed",
            },
            {status: 500}
        );
    }
        

}