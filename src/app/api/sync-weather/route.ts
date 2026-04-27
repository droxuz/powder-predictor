import { sql } from "@/db-connection/db";
import { cleanWeatherData } from "@/db-connection/clean-weather";

export const dynamic = "force-dynamic";

type Hill = {
    id: number;
    latitude: number;
    longitude: number;
};

type HillRow = {
    id: number | string;
    latitude: number | string;
    longitude: number | string;
};

async function upsertHillConditions(rows: ReturnType<typeof cleanWeatherData>) {
    if (rows.length === 0) return;

    const hillIds = rows.map((row) => row.hill_id);
    const timestamps = rows.map((row) => row.timestamp);
    const temperatures = rows.map((row) => row.temperature_2m);
    const windSpeeds = rows.map((row) => row.wind_speed_10m);
    const windGusts = rows.map((row) => row.wind_gusts_10m);
    const rain = rows.map((row) => row.rain);
    const snowfall = rows.map((row) => row.snowfall);
    const snowDepth = rows.map((row) => row.snow_depth);

    await sql`
        INSERT INTO hill_conditions (
            hill_id,
            timestamp,
            temperature_2m,
            wind_speed_10m,
            wind_gusts_10m,
            rain,
            snowfall,
            snow_depth
        )
        SELECT
            input.hill_id,
            input.timestamp,
            input.temperature_2m,
            input.wind_speed_10m,
            input.wind_gusts_10m,
            input.rain,
            input.snowfall,
            input.snow_depth
        FROM unnest(
            ${hillIds}::int[],
            ${timestamps}::timestamp[],
            ${temperatures}::double precision[],
            ${windSpeeds}::double precision[],
            ${windGusts}::double precision[],
            ${rain}::double precision[],
            ${snowfall}::double precision[],
            ${snowDepth}::double precision[]
        ) AS input(
            hill_id,
            timestamp,
            temperature_2m,
            wind_speed_10m,
            wind_gusts_10m,
            rain,
            snowfall,
            snow_depth
        )
        ON CONFLICT (hill_id, timestamp)
        DO UPDATE SET
            temperature_2m = EXCLUDED.temperature_2m,
            wind_speed_10m = EXCLUDED.wind_speed_10m,
            wind_gusts_10m = EXCLUDED.wind_gusts_10m,
            rain = EXCLUDED.rain,
            snowfall = EXCLUDED.snowfall,
            snow_depth = EXCLUDED.snow_depth
    `;
}

export async function GET(req: Request){
    const auth = req.headers.get("authorization");
    if( auth !== `Bearer ${process.env.SECRET_KEY_CRON}`) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }
    try {
        const rows = await sql`
        SELECT id, latitude, longitude
        FROM hills
        ORDER BY id
    `;

    const hills: Hill[] = (rows as HillRow[]).map((row) => ({
        id: Number(row.id),
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
    }));

    for (const hill of hills) {
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${hill.latitude}` +
            `&longitude=${hill.longitude}` +
            `&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,snowfall,rain,snow_depth` +
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

        await upsertHillConditions(cleanedRows);
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
