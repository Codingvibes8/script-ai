import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Mic, Video, Instagram } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              New
            </span>
            AI-powered script generation for creators
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Create Engaging Scripts with{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Generate professional scripts for YouTube videos, TikTok shorts, podcasts,
            and Instagram reels in seconds. Say goodbye to writer&apos;s block forever.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Creating Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Video className="h-5 w-5" />
              <span className="text-sm">YouTube</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Play className="h-5 w-5" />
              <span className="text-sm">TikTok</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mic className="h-5 w-5" />
              <span className="text-sm">Podcasts</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Instagram className="h-5 w-5" />
              <span className="text-sm">Reels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
