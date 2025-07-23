import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { session_id, is_correct } = await request.json()

    // Get current stats
    const { data: currentSession } = await supabase
      .from("sessions")
      .select("total_jawaban, total_benar")
      .eq("id", session_id)
      .single()

    const newTotalJawaban = (currentSession?.total_jawaban || 0) + 1
    const newTotalBenar = (currentSession?.total_benar || 0) + (is_correct ? 1 : 0)

    const { data, error } = await supabase
      .from("sessions")
      .update({
        total_jawaban: newTotalJawaban,
        total_benar: newTotalBenar,
      })
      .eq("id", session_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ session: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
