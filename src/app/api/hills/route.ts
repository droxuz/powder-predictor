import { sql } from "@/db-connection/db";

export const dynamic = "force-dynamic";

type hillOverview = {
    id: number;
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    description: string;
}

export async function GET(){
    try{
        const rows = await sql`
        SELECT id, name, location, latitude, longitude, description
        FROM hills
        ORDER BY name
        `;
        const hills: hillOverview[] = rows.map((row:any )=>({
            id: Number(row.id),
            name: row.name,
            location: row.location,
            latitude: Number(row.latitude),
            longitude: Number(row.longitude),
            description: row.description
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