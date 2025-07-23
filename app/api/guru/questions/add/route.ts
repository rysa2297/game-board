import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, question, option_a, option_b, option_c, option_d, correct_answer, time_limit, created_by } = body

    const { data: newQuestion, error } = await supabase
      .from("questions")
      .insert([
        {
          category,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          time_limit,
          created_by,
          verified: true,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ question: newQuestion })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
