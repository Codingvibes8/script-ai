"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Copy, Download, Trash2, ExternalLink, Plus, Video, Play, Mic, Instagram } from "lucide-react"

interface Script {
  id: string
  title: string
  content: string
  content_type: string
  tone: string
  duration: string
  created_at: string
}

interface ScriptsListProps {
  scripts: Script[]
}

const contentTypeIcons: Record<string, React.ElementType> = {
  youtube: Video,
  tiktok: Play,
  podcast: Mic,
  instagram: Instagram,
}

export function ScriptsList({ scripts: initialScripts }: ScriptsListProps) {
  const [scripts, setScripts] = useState(initialScripts)
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [scriptToDelete, setScriptToDelete] = useState<Script | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Script copied to clipboard",
    })
  }

  const handleDownload = (script: Script) => {
    const blob = new Blob([script.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${script.title.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded",
      description: "Script downloaded successfully",
    })
  }

  const handleDelete = async () => {
    if (!scriptToDelete) return

    const { error } = await supabase
      .from("scripts")
      .delete()
      .eq("id", scriptToDelete.id)

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete script",
      })
      return
    }

    setScripts(scripts.filter((s) => s.id !== scriptToDelete.id))
    setIsDeleteDialogOpen(false)
    setScriptToDelete(null)
    toast({
      title: "Deleted",
      description: "Script deleted successfully",
    })
    router.refresh()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (scripts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No scripts yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            Generate your first script to get started
          </p>
          <Link href="/generate">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Generate Script
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Scripts</CardTitle>
          <CardDescription>
            Manage and view all your generated scripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.map((script) => {
              const Icon = contentTypeIcons[script.content_type] || FileText
              return (
                <div
                  key={script.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{script.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {script.content_type}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {script.tone}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(script.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedScript(script)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(script.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(script)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setScriptToDelete(script)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* View Script Dialog */}
      <Dialog open={!!selectedScript} onOpenChange={() => setSelectedScript(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedScript?.title}</DialogTitle>
            <DialogDescription>
              {selectedScript?.content_type} - {selectedScript?.tone} - {selectedScript?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
              {selectedScript?.content}
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleCopy(selectedScript?.content || "")}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={() => selectedScript && handleDownload(selectedScript)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Script</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{scriptToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
