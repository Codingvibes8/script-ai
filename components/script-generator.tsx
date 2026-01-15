"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Sparkles, Copy, Download, Save, RefreshCw } from "lucide-react"

const contentTypes = [
  { value: "youtube", label: "YouTube Video" },
  { value: "tiktok", label: "TikTok Short" },
  { value: "podcast", label: "Podcast Episode" },
  { value: "instagram", label: "Instagram Reel" },
]

const durations = [
  { value: "30-seconds", label: "30 Seconds" },
  { value: "1-minute", label: "1 Minute" },
  { value: "3-minutes", label: "3 Minutes" },
  { value: "5-minutes", label: "5 Minutes" },
  { value: "10-minutes", label: "10 Minutes" },
  { value: "15-minutes", label: "15 Minutes" },
  { value: "30-minutes", label: "30 Minutes" },
  { value: "60-minutes", label: "60+ Minutes" },
]

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
]

export function ScriptGenerator() {
  const [title, setTitle] = useState("")
  const [contentType, setContentType] = useState("")
  const [duration, setDuration] = useState("")
  const [tone, setTone] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [generatedScript, setGeneratedScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleGenerate = async () => {
    if (!title || !contentType || !duration || !tone) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedScript("")

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          contentType,
          duration,
          tone,
          targetAudience,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate script")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No response body")
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setGeneratedScript((prev) => prev + chunk)
      }

      toast({
        title: "Script generated",
        description: "Your script has been generated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate script",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedScript) return

    setIsSaving(true)

    try {
      const response = await fetch("/api/save-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: generatedScript,
          contentType,
          duration,
          tone,
          targetAudience,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save script")
      }

      toast({
        title: "Script saved",
        description: "Your script has been saved to your dashboard.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save script",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedScript)
    toast({
      title: "Copied",
      description: "Script copied to clipboard",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded",
      description: "Script downloaded successfully",
    })
  }

  const handleReset = () => {
    setTitle("")
    setContentType("")
    setDuration("")
    setTone("")
    setTargetAudience("")
    setGeneratedScript("")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Script Parameters</CardTitle>
          <CardDescription>
            Configure your script settings and let AI do the magic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title / Topic *</Label>
            <Input
              id="title"
              placeholder="e.g., 10 Tips for Better Productivity"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type *</Label>
            <Select value={contentType} onValueChange={setContentType} disabled={isGenerating}>
              <SelectTrigger id="contentType">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Select value={duration} onValueChange={setDuration} disabled={isGenerating}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone *</Label>
            <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
            <Textarea
              id="targetAudience"
              placeholder="e.g., Young professionals aged 25-35 interested in self-improvement"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={isGenerating}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Script
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={isGenerating}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Script</CardTitle>
          <CardDescription>
            Your AI-generated script will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[400px] rounded-lg border bg-muted/50 p-4">
            {generatedScript ? (
              <pre className="whitespace-pre-wrap text-sm">{generatedScript}</pre>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                {isGenerating ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating your script...
                  </div>
                ) : (
                  "Your generated script will appear here"
                )}
              </div>
            )}
          </div>

          {generatedScript && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Script
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
