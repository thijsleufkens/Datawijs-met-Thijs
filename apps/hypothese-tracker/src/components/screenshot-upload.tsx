"use client";

import { useCallback, useState, useRef } from "react";

interface Props {
  filenames: string[];
  onChange: (filenames: string[]) => void;
}

export default function ScreenshotUpload({ filenames, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      setUploading(true);
      const formData = new FormData();
      for (const file of Array.from(files)) {
        formData.append("files", file);
      }
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        onChange([...filenames, ...data.filenames]);
      } finally {
        setUploading(false);
      }
    },
    [filenames, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        upload(e.dataTransfer.files);
      }
    },
    [upload]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      const files: File[] = [];
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        e.preventDefault();
        upload(files);
      }
    },
    [upload]
  );

  const removeFile = (index: number) => {
    onChange(filenames.filter((_, i) => i !== index));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
      tabIndex={0}
      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-muted transition-colors focus:outline-none focus:border-accent"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && upload(e.target.files)}
      />

      {uploading ? (
        <p className="text-sm text-muted">Uploaden...</p>
      ) : filenames.length === 0 ? (
        <div>
          <p className="text-sm text-muted">
            Sleep screenshots hierheen, plak vanuit klembord (Ctrl+V), of klik
            om te selecteren
          </p>
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap justify-center" onClick={(e) => e.stopPropagation()}>
          {filenames.map((f, i) => (
            <div key={f} className="relative group">
              <img
                src={`/api/upload/${f}`}
                alt={`Screenshot ${i + 1}`}
                className="h-24 rounded border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-danger text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
          <div
            className="h-24 w-24 rounded border-2 border-dashed border-border flex items-center justify-center text-muted hover:border-muted transition-colors cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <span className="text-2xl">+</span>
          </div>
        </div>
      )}
    </div>
  );
}
