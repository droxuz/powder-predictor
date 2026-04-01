import { sql } from "@/db-connection/db";

export const dynamic = "force-dynamic";

type hillOverview = {
    id:number;
    name:string;
    location:string;
    latitude:number;
    longitude:number;
    description:string;
    daily_snowfall: null | number;
    daily_rain: null | number;
    min_temp: null | number;
    max_temp: null | number;
    max_wind: null | number;
    best_powder_score: null | number;
}


export async function GET(){
    try{
        const rows = await sql`
        SELECT
        h.id,
        h.name,
        h.location,
        h.latitude,
        h.longitude,
        h.description,
        hc.daily_snowfall,
        hc.daily_rain,
        hc.min_temp,
        hc.max_temp,
        hc.max_wind,
        ps.best_powder_score

        FROM hills AS h 
        LEFT JOIN LATERAL(
            SELECT
                SUM(hc.snowfall) AS daily_snowfall,
                SUM(hc.daily_rain) AS daily_rain,
                MIN(hc.temperature_2m) AS min_temp,
                MAX(hc.temperature_2m) AS max_temp,
                MAX(hc.wind_speed_10m) AS max_wind
            FROM hill_conditions AS hc 
            WHERE hill_id = h.id
            AND hc.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
            AND hc.timestamp < date_trunc('day', timezone('America/Toronto', now()))
        ) hc ON true

        LEFT JOIN LATERAL (
            SELECT 
                MAX(powder_score) AS max_powder_score
            FROM powder_prediction_score AS ps
            WHERE hill_id = h.id
            AND hc.timestamp >= date_trunc('day', timezone('America/Toronto', now()))
            AND hc.timestamp < date_trunc('day', timezone('America/Toronto', now()))
        ) ps ON true
        ORDER BY ps.best_powder_score DESC NULLS LAST, h.name;
        `;
        const hills: hillOverview[] = rows.map((row:any )=>({
            id: Number(row.id),
            name: row.name,
            location: row.location,
            latitude: Number(row.latitude),
            longitude: Number(row.longitude),
            description: row.description,
            daily_snowfall: row.daily_snowfall,
            daily_rain: row.daily_rain,
            min_temp: row.min_temp,
            max_temp: row.max_temp,
            max_wind: row.max_wind,
            best_powder_score: row.best_powder_score
        }));
        return Response.json({
            success: true,
            message: "Success to fetch hills overview",
            data: hills
        });
    }catch{
        return Response.json({
            success: false,
            message: "Failed to fetch hills"
        }, {status: 500});
    }

}