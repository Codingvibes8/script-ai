import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { ScriptsList } from "@/components/scripts-list"
import { UsageCard } from "@/components/usage-card"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch scripts
  const { data: scripts } = await supabase
    .from("scripts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single()

  const totalScripts = scripts?.length || 0
  const scriptsThisMonth = subscription?.scripts_used || 0
  const scriptsLimit = subscription?.scripts_limit || 5
  const plan = subscription?.plan || "free"

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader email={user.email || ""} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your script generation activity.
          </p>
        </div>

        <div className="space-y-8">
          <DashboardStats
            totalScripts={totalScripts}
            scriptsThisMonth={scriptsThisMonth}
            scriptsLimit={scriptsLimit}
            plan={plan}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScriptsList scripts={scripts || []} />
            </div>
            <div>
              <UsageCard
                scriptsUsed={scriptsThisMonth}
                scriptsLimit={scriptsLimit}
                plan={plan}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
