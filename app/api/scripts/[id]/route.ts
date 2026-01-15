import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("scripts")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (error || !data) {
      return Response.json({ error: "Script not found" }, { status: 404 })
    }

    return Response.json({ script: data })
  } catch (error) {
    console.error("Error fetching script:", error)
    return Response.json(
      { error: "Failed to fetch script" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    const { data, error } = await supabase
      .from("scripts")
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to update script" }, { status: 500 })
    }

    return Response.json({ script: data })
  } catch (error) {
    console.error("Error updating script:", error)
    return Response.json(
      { error: "Failed to update script" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("scripts")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) {
      return Response.json({ error: "Failed to delete script" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting script:", error)
    return Response.json(
      { error: "Failed to delete script" },
      { status: 500 }
    )
  }
}
