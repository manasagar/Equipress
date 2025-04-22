"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-2">
      {!file ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="mb-2 text-center text-sm font-medium">Drag and drop your image here</div>
          <div className="mb-4 text-center text-xs text-muted-foreground">PNG, JPG or GIF, up to 10MB</div>
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" className="cursor-pointer" tabIndex={-1}>
              Browse Files
            </Button>
            <input id="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg border">
          <img
            src={preview || "/placeholder.svg?height=200&width=400"}
            alt="Preview"
            className="h-[200px] w-full object-cover"
          />
          <Button variant="destructive" size="icon" className="absolute right-2 top-2" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
          <div className="p-2 text-xs text-muted-foreground">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </div>
        </div>
      )}
    </div>
  )
}
