import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const guru_id = searchParams.get("guru_id")

    let query = supabase.from("questions").select("*").eq("category", category).eq("verified", true)

    // Include both default questions (created_by is null) and guru's custom questions
    if (guru_id) {
      query = query.or(`created_by.is.null,created_by.eq.${guru_id}`)
    } else {
      query = query.is("created_by", null)
    }

    const { data: questions, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "No questions found" }, { status: 404 })
    }

    // Select random question
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

    return NextResponse.json({ question: randomQuestion })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
