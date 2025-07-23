import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guru_id = searchParams.get("guru_id")

    const { data: leaderboard, error } = await supabase
      .from("sessions")
      .select(`
        id,
        skor,
        total_jawaban,
        total_benar,
        waktu_mulai,
        waktu_selesai,
        users!inner (
          nama,
          kelas
        ),
        guru:guru_id (
          nama
        )
      `)
      .eq("guru_id", guru_id)
      .eq("is_completed", true)
      .order("skor", { ascending: false })
      .limit(10)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Transform the data to flatten the nested structure
    const transformedLeaderboard =
      leaderboard?.map((entry) => ({
        id: entry.id,
        nama: entry.users.nama,
        kelas: entry.users.kelas,
        skor: entry.skor,
        total_jawaban: entry.total_jawaban,
        total_benar: entry.total_benar,
        waktu_mulai: entry.waktu_mulai,
        waktu_selesai: entry.waktu_selesai,
        guru_nama: entry.guru?.nama || "",
      })) || []

    return NextResponse.json({ leaderboard: transformedLeaderboard })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
