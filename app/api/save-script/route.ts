import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, contentType, duration, tone, targetAudience } = await request.json()

    if (!title || !content || !contentType || !duration || !tone) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("scripts")
      .insert({
        user_id: user.id,
        title,
        content,
        content_type: contentType,
        duration,
        tone,
        target_audience: targetAudience || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving script:", error)
      return Response.json(
        { error: "Failed to save script" },
        { status: 500 }
      )
    }

    return Response.json({ script: data })
  } catch (error) {
    console.error("Error saving script:", error)
    return Response.json(
      { error: "Failed to save script" },
      { status: 500 }
    )
  }
}
