import { sql } from "@/db-connection/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request){
    const auth = req.headers.get("authorization");
    if( auth !== `Bearer ${process.env.VERCEL_CRON}`) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }
  try {
    console.log("Cleanup cutoff:", new Date());

    await sql`BEGIN`;

    await sql`
      DELETE FROM hill_conditions
      WHERE timestamp < date_trunc('hour', timezone('America/Toronto', now()))
    `;

    await sql`
      DELETE FROM powder_prediction_score
      WHERE timestamp < date_trunc('hour', timezone('America/Toronto', now()))
    `;

    await sql`COMMIT`;

    return Response.json({
      success: true,
      message: "Old forecast hours removed"
    });

  } catch (error: any) {
    await sql`ROLLBACK`;
    console.error("Cleanup failed:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Cleanup failed"
      },
      { status: 500 }
    );
  }
}