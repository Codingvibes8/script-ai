"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PricingPlansProps {
  currentPlan: string
}

const plans = [
  {
    name: "free",
    displayName: "Free",
    price: "$0",
    description: "Perfect for trying out ScriptAI",
    features: [
      "5 scripts per month",
      "All content types",
      "Basic customization",
      "Copy to clipboard",
      "Email support",
    ],
    limit: 5,
    popular: false,
  },
  {
    name: "pro",
    displayName: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious content creators",
    features: [
      "50 scripts per month",
      "All content types",
      "Advanced customization",
      "Download as file",
      "Priority support",
      "Script history",
    ],
    limit: 50,
    popular: true,
  },
  {
    name: "enterprise",
    displayName: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "Unlimited scripts",
      "All content types",
      "Full customization",
      "API access",
      "Team collaboration",
      "Dedicated support",
      "Custom integrations",
    ],
    limit: -1,
    popular: false,
  },
]

export function PricingPlans({ currentPlan }: PricingPlansProps) {
  const { toast } = useToast()

  const handleUpgrade = (planName: string) => {
    // In a real app, this would redirect to a payment flow
    toast({
      title: "Upgrade requested",
      description: `Contact support to upgrade to ${planName} plan. Payment integration coming soon.`,
    })
  }

  const handleDowngrade = (planName: string) => {
    toast({
      title: "Downgrade requested",
      description: `Contact support to downgrade to ${planName} plan.`,
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => {
        const isCurrent = plan.name === currentPlan
        const isUpgrade = plans.findIndex((p) => p.name === plan.name) > plans.findIndex((p) => p.name === currentPlan)
        const isDowngrade = plans.findIndex((p) => p.name === plan.name) < plans.findIndex((p) => p.name === currentPlan)

        return (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""} ${isCurrent ? "ring-2 ring-primary" : ""}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            {isCurrent && (
              <Badge variant="secondary" className="absolute -top-3 right-4">
                Current Plan
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {isCurrent ? (
                <Button className="w-full" disabled>
                  Current Plan
                </Button>
              ) : isUpgrade ? (
                <Button
                  className="w-full"
                  onClick={() => handleUpgrade(plan.displayName)}
                >
                  Upgrade to {plan.displayName}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleDowngrade(plan.displayName)}
                >
                  Downgrade to {plan.displayName}
                </Button>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
