import {sql} from "@/db-connection/db";

export const dynamic = "force-dynamic";

type weatherRow = {
    hill_id: number;
    timestamp: string;
    temperature_2m: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    rain: number;
    snowfall: number;
};

export async function GET(){
    
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

    
    } catch {
        //placeholder
        console.log('well well well');
    }
        

}