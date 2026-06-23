"use client";

import { useState, useRef } from "react";
import { Upload, X, Copy, Check } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  folder: string;
  slug: string;
  prefix: string;
  onChange: (url: string) => void;
}

export function SingleImageUpload({ label, value, folder, slug, prefix, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("filename", `${slug}-${prefix}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-navy">{label}</label>
      <div className="mt-2">
        {value ? (
          <div className="relative inline-block">
            <img src={value} alt="" className="h-40 rounded-lg border border-[#E5E7EB] object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -end-2 -top-2 rounded-full bg-red-500 p-1 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={uploading}
            className="flex h-40 w-60 items-center justify-center rounded-lg border-2 border-dashed border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-steel hover:text-steel"
          >
            {uploading ? "..." : <Upload className="h-6 w-6" />}
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
          }}
        />
      </div>
    </div>
  );
}

interface GalleryUploadProps {
  label: string;
  images: string[];
  folder: string;
  slug: string;
  onChange: (urls: string[]) => void;
}

export function GalleryUpload({ label, images, folder, slug, onChange }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList) {
    setUploading(true);
    const newUrls: string[] = [];
    for (let i = 0; i < files.length && images.length + newUrls.length < 10; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("folder", folder);
      formData.append("filename", `${slug}-img-${images.length + newUrls.length + 1}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        newUrls.push(url);
      }
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
  }

  function copyUrl(url: string, index: number) {
    navigator.clipboard.writeText(url);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-navy">{label}</label>
      <div className="mt-2 flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={i} className="group relative">
            <img src={url} alt="" className="h-24 w-24 rounded-lg border border-[#E5E7EB] object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 rounded-b-lg bg-black/60 py-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" onClick={() => copyUrl(url, i)} className="text-white">
                {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="text-red-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {images.length < 10 && (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={uploading}
            className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-[#E5E7EB] text-[#6B7280] hover:border-steel hover:text-steel"
          >
            {uploading ? "..." : <Upload className="h-5 w-5" />}
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleUpload(e.target.files);
        }}
      />
    </div>
  );
}
