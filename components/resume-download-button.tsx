"use client"

"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ResumeDownloadButton() {
  const handleOpenPdf = () => {
    window.open("/api/resume-pdf", "_blank")
  }

  return (
    <Button onClick={handleOpenPdf}>
      <Download className="mr-2 h-4 w-4" />
      Open PDF
    </Button>
  )
}
