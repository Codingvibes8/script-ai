import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UsageCardProps {
  scriptsUsed: number
  scriptsLimit: number
  plan: string
}

export function UsageCard({ scriptsUsed, scriptsLimit, plan }: UsageCardProps) {
  const isUnlimited = scriptsLimit === -1
  const percentage = isUnlimited ? 0 : (scriptsUsed / scriptsLimit) * 100
  const remaining = isUnlimited ? "Unlimited" : scriptsLimit - scriptsUsed

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage This Month</CardTitle>
        <CardDescription>
          Your script generation usage for the current billing period
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold">{remaining}</p>
          </div>
          {plan !== "enterprise" && (
            <Link href="/subscription">
              <Button variant="outline">Upgrade Plan</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
