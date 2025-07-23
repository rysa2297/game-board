import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { session_id, rating1, rating2, rating3, rating4, rating5, feedback_text } = await request.json()

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          session_id,
          rating1,
          rating2,
          rating3,
          rating4,
          rating5,
          feedback_text,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ feedback: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
