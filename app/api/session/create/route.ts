import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { user_id, guru_id } = await request.json()

    const { data: session, error } = await supabase
      .from("sessions")
      .insert([
        {
          user_id,
          guru_id,
          skor: 0,
          total_jawaban: 0,
          total_benar: 0,
          current_position: 0,
          is_completed: false,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
