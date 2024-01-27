"use client";

export default function CopyToClipboard({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
      }}
    >
      Copy URL
    </button>
  );
}
