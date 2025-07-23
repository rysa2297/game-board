import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, role, kelas, sekolah, password, guru_id } = body

    if (role === "guru") {
      // Check if guru already exists
      const { data: existingGuru } = await supabase
        .from("users")
        .select("*")
        .eq("nama", nama)
        .eq("sekolah", sekolah)
        .eq("role", "guru")
        .single()

      if (existingGuru) {
        return NextResponse.json({ user: existingGuru })
      }

      // Create new guru
      const { data: newGuru, error } = await supabase
        .from("users")
        .insert([
          {
            nama,
            sekolah,
            password,
            role: "guru",
          },
        ])
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ user: newGuru })
    } else {
      // Create new siswa
      const { data: newSiswa, error } = await supabase
        .from("users")
        .insert([
          {
            nama,
            kelas,
            role: "siswa",
            guru_id,
          },
        ])
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ user: newSiswa })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
