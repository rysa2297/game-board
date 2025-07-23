import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guru_id = searchParams.get("guru_id")

    const { data: students, error } = await supabase
      .from("sessions")
      .select(`
        id,
        skor,
        total_jawaban,
        total_benar,
        waktu_mulai,
        waktu_selesai,
        is_completed,
        users!inner (
          nama,
          kelas
        )
      `)
      .eq("guru_id", guru_id)
      .order("skor", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Transform the data to flatten the nested structure
    const transformedStudents =
      students?.map((session) => ({
        id: session.id,
        nama: session.users.nama,
        kelas: session.users.kelas,
        skor: session.skor,
        total_jawaban: session.total_jawaban,
        total_benar: session.total_benar,
        waktu_mulai: session.waktu_mulai,
        waktu_selesai: session.waktu_selesai,
        is_completed: session.is_completed,
      })) || []

    return NextResponse.json({ students: transformedStudents })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
