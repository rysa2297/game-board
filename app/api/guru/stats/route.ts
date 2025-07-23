import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guru_id = searchParams.get("guru_id")

    // Get total students
    const { count: total_students } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("guru_id", guru_id)
      .eq("role", "siswa")

    // Get total sessions
    const { count: total_sessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("guru_id", guru_id)

    // Get completed sessions
    const { count: completed_sessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("guru_id", guru_id)
      .eq("is_completed", true)

    // Get average score
    const { data: sessions } = await supabase
      .from("sessions")
      .select("skor")
      .eq("guru_id", guru_id)
      .eq("is_completed", true)

    const avg_score =
      sessions && sessions.length > 0 ? sessions.reduce((acc, session) => acc + session.skor, 0) / sessions.length : 0

    // Get total questions created by this guru
    const { count: total_questions } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .or(`created_by.eq.${guru_id},created_by.is.null`)

    const stats = {
      total_students: total_students || 0,
      total_sessions: total_sessions || 0,
      completed_sessions: completed_sessions || 0,
      avg_score: avg_score || 0,
      total_questions: total_questions || 0,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
