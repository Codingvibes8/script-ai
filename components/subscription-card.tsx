import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, Calendar } from "lucide-react"

interface SubscriptionCardProps {
  plan: string
  scriptsUsed: number
  scriptsLimit: number
  billingCycleEnd: string
  status: string
}

const planFeatures: Record<string, string[]> = {
  free: [
    "5 scripts per month",
    "All content types",
    "Basic customization",
    "Copy to clipboard",
    "Email support",
  ],
  pro: [
    "50 scripts per month",
    "All content types",
    "Advanced customization",
    "Download as file",
    "Priority support",
    "Script history",
  ],
  enterprise: [
    "Unlimited scripts",
    "All content types",
    "Full customization",
    "API access",
    "Team collaboration",
    "Dedicated support",
    "Custom integrations",
  ],
}

const planPrices: Record<string, string> = {
  free: "$0",
  pro: "$19",
  enterprise: "$49",
}

export function SubscriptionCard({
  plan,
  scriptsUsed,
  scriptsLimit,
  billingCycleEnd,
  status,
}: SubscriptionCardProps) {
  const isUnlimited = scriptsLimit === -1
  const percentage = isUnlimited ? 0 : (scriptsUsed / scriptsLimit) * 100
  const features = planFeatures[plan] || planFeatures.free

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="capitalize">{plan} Plan</CardTitle>
            <CardDescription>
              {planPrices[plan]}/month
            </CardDescription>
          </div>
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Scripts Used</span>
            <span className="font-medium">
              {scriptsUsed} / {isUnlimited ? "Unlimited" : scriptsLimit}
            </span>
          </div>
          {!isUnlimited && (
            <Progress value={percentage} className="h-2" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Billing cycle ends: {formatDate(billingCycleEnd)}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Plan Features</h4>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
