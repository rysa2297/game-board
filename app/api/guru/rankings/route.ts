import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const rankings = await sql`
      SELECT 
        ROW_NUMBER() OVER (ORDER BY MAX(score) DESC, AVG(score) DESC) as rank,
        student_name,
        student_class,
        MAX(score) as highest_score,
        COUNT(*) as total_sessions,
        AVG(score) as average_score,
        MAX(created_at) as last_played,
        MAX(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as last_played_wib
      FROM game_sessions 
      WHERE completed = true
      GROUP BY student_name, student_class
      ORDER BY highest_score DESC, average_score DESC
    `

    return NextResponse.json(rankings)
  } catch (error) {
    console.error("Error fetching rankings:", error)
    return NextResponse.json({ error: "Failed to fetch rankings" }, { status: 500 })
  }
}
