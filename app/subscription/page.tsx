import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { SubscriptionCard } from "@/components/subscription-card"
import { PricingPlans } from "@/components/pricing-plans"

export default async function SubscriptionPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single()

  const plan = subscription?.plan || "free"
  const scriptsUsed = subscription?.scripts_used || 0
  const scriptsLimit = subscription?.scripts_limit || 5
  const billingCycleEnd = subscription?.billing_cycle_end || new Date().toISOString()
  const status = subscription?.status || "active"

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader email={user.email || ""} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SubscriptionCard
                plan={plan}
                scriptsUsed={scriptsUsed}
                scriptsLimit={scriptsLimit}
                billingCycleEnd={billingCycleEnd}
                status={status}
              />
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-2">Need more scripts?</h2>
                <p className="text-muted-foreground mb-4">
                  Upgrade your plan to unlock more script generations and premium features.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
            <PricingPlans currentPlan={plan} />
          </div>
        </div>
      </main>
    </div>
  )
}
