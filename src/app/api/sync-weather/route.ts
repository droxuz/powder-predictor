import { sql } from "@/db-connection/db";
import { cleanWeatherData } from "@/db-connection/clean-weather";

export const dynamic = "force-dynamic";

type Hill = {
    id: number;
    latitude: number;
    longitude: number;
};

export async function GET(req: Request){
    const auth = req.headers.get("authorization");
    if( auth !== `Bearer ${process.env.CRON_JOB}`) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }
    try {
        const rows = await sql`
        SELECT id, latitude, longitude
        FROM hills
        ORDER BY id
    `;

    const hills: Hill[] = rows.map((row: any) => ({
        id: Number(row.id),
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
    }));

    for (const hill of hills) {
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${hill.latitude}` +
            `&longitude=${hill.longitude}` +
            `&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,snowfall,rain` +
            `&forecast_days=7`+`&timezone=America%2FToronto`;

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(`Failed to fetch API data for hill ${hill.id}`);
            continue;
        }

        const data = await response.json();

        if (!data.hourly) {
            console.error(`No hourly data for hill ${hill.id}`);
            continue;
        }

        const cleanedRows = cleanWeatherData(hill.id, data.hourly);

        for (const row of cleanedRows) {
            await sql`
                INSERT INTO hill_conditions (
                hill_id,
                timestamp,
                temperature_2m,
                wind_speed_10m,
                wind_gusts_10m,
                rain,
                snowfall
            )
            VALUES (
                ${row.hill_id},
                ${row.timestamp},
                ${row.temperature_2m},
                ${row.wind_speed_10m},
                ${row.wind_gusts_10m},
                ${row.rain},
                ${row.snowfall}
            )
            ON CONFLICT (hill_id, timestamp)
            DO UPDATE SET
                temperature_2m = EXCLUDED.temperature_2m,
                wind_speed_10m = EXCLUDED.wind_speed_10m,
                wind_gusts_10m = EXCLUDED.wind_gusts_10m,
                rain = EXCLUDED.rain,
                snowfall = EXCLUDED.snowfall
            `;
        }
    }

    return Response.json({
        success: true,
        message: "Weather synced",
    });
    } catch (error) {
    console.error("Syncing weather failed:", error);

    return Response.json(
        {
            success: false,
            message: "Weather failed to sync",
        },
        { status: 500 }
    );
  }
}


