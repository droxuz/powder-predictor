//src/db-connection/db.ts

import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

type Hill = {
    id: number;
    latitude: number;
    longitude: number;
};

export async function GET() {
    try{
        const rows = await sql`SELECT id, latitude, longitude FROM hills`;
        //return new Response(JSON.stringify(rows), { status: 200 });
        
        const hills: Hill[] = rows.map((rows:any ) => ({
            id: rows.id,
            latitude: rows.latitude,
            longitude: rows.longitude
        }));
        
    }
    
    //Place holder error handling for now, will expand on this later
    catch (error) {
    console.error("Error fetching hills:", error);
    return new Response("Error fetching hills", { status: 500 });
    };
} 