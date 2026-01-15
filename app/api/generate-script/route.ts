import { createClient } from "@/lib/supabase/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check subscription limits
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (subscription) {
      const isUnlimited = subscription.scripts_limit === -1
      if (!isUnlimited && subscription.scripts_used >= subscription.scripts_limit) {
        return Response.json(
          { error: "Script limit reached. Please upgrade your plan." },
          { status: 403 }
        )
      }
    }

    const { title, contentType, duration, tone, targetAudience } = await request.json()

    if (!title || !contentType || !duration || !tone) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const contentTypeLabels: Record<string, string> = {
      youtube: "YouTube video",
      tiktok: "TikTok short",
      podcast: "podcast episode",
      instagram: "Instagram Reel",
    }

    const prompt = `You are an expert content creator and scriptwriter. Generate a complete, engaging script for a ${contentTypeLabels[contentType] || contentType}.

Title/Topic: ${title}
Duration: ${duration}
Tone: ${tone}
${targetAudience ? `Target Audience: ${targetAudience}` : ""}

Requirements:
- Create a compelling hook in the first few seconds
- Structure the content with clear sections
- Include engaging transitions
- End with a strong call-to-action
- Match the specified tone throughout
- Optimize for the specified duration
- Include speaker directions in [brackets] where helpful

Generate the complete script now:`

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: 4000,
      temperature: 0.7,
    })

    // Update usage count
    if (subscription) {
      await supabase
        .from("subscriptions")
        .update({ scripts_used: subscription.scripts_used + 1 })
        .eq("user_id", user.id)
    }

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ""
          controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Error generating script:", error)
    return Response.json(
      { error: "Failed to generate script" },
      { status: 500 }
    )
  }
}
