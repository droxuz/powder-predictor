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

export async function GET(req: Request){
    const auth = req.headers.get("authorization");
    if( auth !== `Bearer ${process.env.VERCEL_CRON}`) {
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
        //Iterate rows
        //Per objects of row in rows in create a score and insert into powder_prediction_score
        
        

    
    } catch {
        //placeholder
        console.log('well well well');
    }
        

}