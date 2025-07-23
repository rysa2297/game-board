import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      studentName,
      studentClass,
      questionText,
      difficulty,
      canvasData,
      equation1,
      equation2,
      solutionX,
      solutionY,
    } = await request.json()

    // Get Jakarta timezone timestamp
    const jakartaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    const jakartaTimestamp = new Date(jakartaTime)

    // Save to spldv_submissions table
    await sql`
      INSERT INTO spldv_submissions (
        session_id, 
        student_name, 
        student_class, 
        equation_1, 
        equation_2, 
        solution_x, 
        solution_y, 
        photo_data, 
        is_completed,
        created_at_wib
      ) VALUES (
        ${sessionId}, 
        ${studentName}, 
        ${studentClass}, 
        ${equation1}, 
        ${equation2}, 
        ${solutionX}, 
        ${solutionY}, 
        ${canvasData}, 
        true,
        ${jakartaTimestamp.toISOString()}
      )
    `

    // Update game session with SPLDV data
    await sql`
      UPDATE game_sessions 
      SET 
        spldv_equation_1 = ${equation1},
        spldv_equation_2 = ${equation2},
        spldv_solution_x = ${solutionX},
        spldv_solution_y = ${solutionY},
        photo_submission = ${canvasData},
        submission_timestamp = ${jakartaTimestamp.toISOString()}
      WHERE id = ${sessionId}
    `

    return NextResponse.json({
      success: true,
      message: "SPLDV submission saved successfully",
      timestamp: jakartaTimestamp.toISOString(),
    })
  } catch (error) {
    console.error("Error saving SPLDV submission:", error)
    return NextResponse.json({ error: "Failed to save SPLDV submission" }, { status: 500 })
  }
}
