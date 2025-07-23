import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const submissions = await sql`
      SELECT 
        id,
        student_name,
        student_class,
        equation_1,
        equation_2,
        solution_x,
        solution_y,
        photo_data,
        is_completed,
        created_at_wib
      FROM spldv_submissions
      ORDER BY created_at_wib DESC
    `

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error fetching SPLDV submissions:", error)
    return NextResponse.json({ error: "Failed to fetch SPLDV submissions" }, { status: 500 })
  }
}
