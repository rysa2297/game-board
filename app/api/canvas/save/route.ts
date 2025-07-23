import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { session_id, question_id, image_data } = await request.json()

    // In a real implementation, you'd upload the image to Supabase Storage
    // For now, we'll just store the base64 data
    const { data, error } = await supabase
      .from("canvas_exports")
      .insert([
        {
          session_id,
          soal_id: question_id,
          image_url: image_data,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ canvas_export: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
