import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { ScriptGenerator } from "@/components/script-generator"

export default async function GeneratePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader email={user.email || ""} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Generate Script</h1>
          <p className="text-muted-foreground">
            Create engaging scripts for your content using AI
          </p>
        </div>

        <ScriptGenerator />
      </main>
    </div>
  )
}
