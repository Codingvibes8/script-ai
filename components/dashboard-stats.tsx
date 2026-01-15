import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Clock, Sparkles } from "lucide-react"

interface DashboardStatsProps {
  totalScripts: number
  scriptsThisMonth: number
  scriptsLimit: number
  plan: string
}

export function DashboardStats({ totalScripts, scriptsThisMonth, scriptsLimit, plan }: DashboardStatsProps) {
  const remaining = scriptsLimit === -1 ? "Unlimited" : scriptsLimit - scriptsThisMonth

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scripts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalScripts}</div>
          <p className="text-xs text-muted-foreground">
            All time generated scripts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scriptsThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            Scripts generated this billing cycle
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{remaining}</div>
          <p className="text-xs text-muted-foreground">
            Scripts available this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{plan}</div>
          <p className="text-xs text-muted-foreground">
            {scriptsLimit === -1 ? "Unlimited" : `${scriptsLimit} scripts/month`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
