import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Get total unique students
    const [studentsResult] = await sql`
      SELECT COUNT(DISTINCT CONCAT(student_name, '-', student_class)) as total_students
      FROM game_sessions
    `

    // Get total sessions
    const [sessionsResult] = await sql`
      SELECT COUNT(*) as total_sessions
      FROM game_sessions
    `

    // Get average score
    const [scoreResult] = await sql`
      SELECT AVG(score) as average_score
      FROM game_sessions
      WHERE completed = true
    `

    // Get total questions
    const [questionsResult] = await sql`
      SELECT COUNT(*) as total_questions
      FROM questions
    `

    // Get total SPLDV submissions
    const [spldvResult] = await sql`
      SELECT COUNT(*) as total_spldv_submissions
      FROM spldv_submissions
    `

    return NextResponse.json({
      totalStudents: Number.parseInt(studentsResult.total_students) || 0,
      totalSessions: Number.parseInt(sessionsResult.total_sessions) || 0,
      averageScore: Number.parseFloat(scoreResult.average_score) || 0,
      totalQuestions: Number.parseInt(questionsResult.total_questions) || 0,
      totalSPLDVSubmissions: Number.parseInt(spldvResult.total_spldv_submissions) || 0,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
