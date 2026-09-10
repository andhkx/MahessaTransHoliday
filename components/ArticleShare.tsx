"use client";

import { useState } from "react";
import { MessageCircle, Link2, Check } from "lucide-react";

export default function ArticleShare({
  url,
  text,
  labels,
}: {
  url: string;
  text: string;
  labels: { wa: string; x: string; fb: string; ig: string; copy: string; copied: string; share: string };
}) {
  const [copied, setCopied] = useState(false);
  const encUrl = encodeURIComponent(url);
  const encText = encodeURIComponent(text);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy link:", url);
    }
  };

  const btn =
    "flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-muted transition-all hover:border-accent hover:bg-accent hover:text-white";

  return (
    <span className="ml-auto flex items-center gap-2">
      <span className="hidden sm:inline text-xs font-bold text-muted">{labels.share}</span>
      <a
        href={`https://wa.me/?text=${encText}%20${encUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.wa}
        className={`${btn} hover:!border-[#25D366] hover:!bg-[#25D366]`}
      >
        <MessageCircle size={13} aria-hidden="true" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encText}&url=${encUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.x}
        className={btn}
      >
        <span className="text-[11px] font-extrabold">X</span>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.fb}
        className={`${btn} hover:!border-[#1877F2] hover:!bg-[#1877F2]`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      </a>
      <button type="button" onClick={doCopy} aria-label={labels.ig} className={`${btn} hover:!border-[#E4405F] hover:!bg-[#E4405F]`} title={labels.ig}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
      </button>
      <button
        type="button"
        onClick={doCopy}
        aria-label={labels.copy}
        className={`${btn} ${copied ? "!border-success !bg-success !text-white" : ""}`}
      >
        {copied ? <Check size={13} /> : <Link2 size={13} />}
      </button>
      {copied && <span className="text-[11px] font-bold text-success">{labels.copied}</span>}
    </span>
  );
}
