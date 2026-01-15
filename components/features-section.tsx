import {
  Sparkles,
  Clock,
  Sliders,
  FolderOpen,
  Download,
  Smartphone
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Generate complete, engaging scripts using advanced AI models trained on millions of successful content pieces.",
  },
  {
    icon: Clock,
    title: "Multiple Durations",
    description: "Create scripts for any length - from 30-second TikToks to hour-long podcast episodes.",
  },
  {
    icon: Sliders,
    title: "Customizable Tone",
    description: "Choose from professional, casual, humorous, inspirational, or educational tones to match your brand.",
  },
  {
    icon: FolderOpen,
    title: "Script Management",
    description: "Save, edit, and organize all your generated scripts in one convenient dashboard.",
  },
  {
    icon: Download,
    title: "Easy Export",
    description: "Copy to clipboard or download your scripts as text files for seamless workflow integration.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Create scripts anywhere - our platform works perfectly on desktop, tablet, and mobile devices.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Create
          </h2>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Powerful features designed to help content creators produce engaging scripts faster than ever.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
