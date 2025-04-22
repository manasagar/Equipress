"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, Image, Film, File } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface IPFSUploaderProps {
  onUploadComplete?: (cid: string, file: File) => void
  acceptedFileTypes?: string
  maxSizeMB?: number
}

export function IPFSUploader({
  onUploadComplete,
  acceptedFileTypes = "image/*,video/*,application/pdf",
  maxSizeMB = 50,
}: IPFSUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ipfsHash, setIpfsHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const getFileIcon = () => {
    if (!file) return <Upload className="h-8 w-8" />

    if (file.type.startsWith("image/")) return <Image className="h-8 w-8" />
    if (file.type.startsWith("video/")) return <Film className="h-8 w-8" />
    if (file.type.includes("pdf")) return <FileText className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)

    if (!selectedFile) return

    if (selectedFile.size > maxSizeBytes) {
      setError(`File size exceeds the maximum limit of ${maxSizeMB}MB`)
      return
    }

    setFile(selectedFile)
    setIpfsHash(null)

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const uploadToIPFS = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 300)

    try {
      // This is a mock implementation - in a real app, you would use a service like Pinata or Web3.Storage
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock IPFS hash
      const mockCID = "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setIpfsHash(mockCID)

      if (onUploadComplete) {
        onUploadComplete(mockCID, file)
      }
    } catch (err) {
      setError("Failed to upload to IPFS. Please try again.")
      console.error(err)
    } finally {
      clearInterval(interval)
      setUploading(false)
      setProgress(100)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setIpfsHash(null)
    setError(null)
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="mb-2 text-center text-sm font-medium">Drag and drop your file here</div>
          <div className="mb-4 text-center text-xs text-muted-foreground">
            Supports images, videos, PDFs and other documents up to {maxSizeMB}MB
          </div>
          <label htmlFor="ipfs-upload">
            <Button variant="outline" size="sm" className="cursor-pointer" tabIndex={-1}>
              Browse Files
            </Button>
            <input
              id="ipfs-upload"
              type="file"
              accept={acceptedFileTypes}
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="rounded-lg border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2">{getFileIcon()}</div>
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {preview && (
              <div className="mt-4 overflow-hidden rounded-md">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="h-[200px] w-full object-cover" />
              </div>
            )}

            {error && <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            {uploading && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading to IPFS...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 w-full" />
              </div>
            )}

            {ipfsHash && (
              <div className="mt-4 rounded-md bg-primary/10 p-3">
                <div className="text-sm font-medium">Successfully uploaded to IPFS</div>
                <div className="mt-1 text-xs font-mono text-muted-foreground">CID: {ipfsHash}</div>
              </div>
            )}

            {!uploading && !ipfsHash && (
              <div className="mt-4">
                <Button onClick={uploadToIPFS} disabled={!!error} className="w-full">
                  Upload to IPFS
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
