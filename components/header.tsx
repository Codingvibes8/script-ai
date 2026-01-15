"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "pricing"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            return
          }
        }
      }

      // If at the top of the page, clear active section
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ScriptAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className={`text-sm font-medium transition-colors ${
              activeSection === "features"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className={`text-sm font-medium transition-colors ${
              activeSection === "pricing"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="sm:text-sm">Log in</Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="sm:text-sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
