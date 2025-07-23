import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { session_id, score_change } = await request.json()

    // Get current score
    const { data: currentSession } = await supabase.from("sessions").select("skor").eq("id", session_id).single()

    const newScore = Math.max(0, (currentSession?.skor || 0) + score_change)

    const { data, error } = await supabase
      .from("sessions")
      .update({ skor: newScore })
      .eq("id", session_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ new_score: newScore })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
