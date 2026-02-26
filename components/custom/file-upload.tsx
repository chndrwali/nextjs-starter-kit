"use client";

import { useState, useCallback } from "react";
import { FileText, X, Upload, Loader2, File } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/components/uploadthing";
import { cn } from "@/lib/utils";
import { appToast } from "./app-toast";

interface SingleFileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  className?: string;
}

export function SingleFileUpload({
  value,
  onChange,
  onRemove,
  disabled,
  className,
}: SingleFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Using "pdfUploader" endpoint which needs to be defined in uploadthing core
  // If not defined, we might need to fallback to "imageUploader" if it accepts all files,
  // or default to a generic "fileUploader" if available.
  // For now assuming "fileUploader" or we can try "imageUploader" if it is permissive,
  // but safest is likely a generic one. Let's assume a generic `pdfUploader` exists or we will need to add it.
  // Looking at common setups, standard endpoint is usually specific.
  // Let's use "pdfUploader" and if it fails user has to add it to core.ts
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        onChange(res[0].ufsUrl);
        appToast.success("File uploaded successfully");
      }
      setIsUploading(false);
    },
    onUploadError: (error: Error) => {
      appToast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        startUpload(acceptedFiles);
      }
    },
    [startUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: disabled || isUploading,
  });

  const handleRemove = async () => {
    if (!value || isDeleting) return;
    setIsDeleting(true);
    try {
      // Assuming same delete endpoint
      const res = await fetch("/api/uploadthing/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      onRemove();
      appToast.success("File deleted");
    } catch {
      appToast.error("Failed to delete file");
    } finally {
      setIsDeleting(false);
    }
  };

  if (value) {
    return (
      <div
        className={cn(
          "relative flex items-center p-4 border rounded-lg bg-muted/30 gap-4",
          className,
        )}
      >
        <div className="p-2 bg-primary/10 rounded-full">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate max-w-[200px]">
            {value.split("/").pop() || "Uploaded PDF"}
          </p>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            View PDF
          </a>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isDeleting || disabled}
          className={cn(
            "flex items-center justify-center size-8 rounded-full",
            "bg-destructive/10 text-destructive hover:bg-destructive/20",
            "transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <X className="size-4" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 border-dashed",
        "w-full py-8",
        "flex flex-col items-center justify-center gap-3",
        "transition-all duration-300 ease-out",
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-muted-foreground/25 bg-muted/20 hover:border-primary/50 hover:bg-muted/40",
        (disabled || isUploading) && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <>
          <Loader2 className="size-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">
            Uploading...
          </p>
        </>
      ) : (
        <>
          <div className="rounded-full bg-muted p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop PDF here" : "Upload PDF"}
            </p>
            <p className="text-xs text-muted-foreground">PDF only • Max 4MB</p>
          </div>
        </>
      )}
    </div>
  );
}
