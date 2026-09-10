"use client";

import { useState } from "react";
import { MessageCircle, Link2, Check, Facebook, Instagram } from "lucide-react";

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
        <Facebook size={12} aria-hidden="true" />
      </a>
      <button type="button" onClick={doCopy} aria-label={labels.ig} className={`${btn} hover:!border-[#E4405F] hover:!bg-[#E4405F]`} title={labels.ig}>
        <Instagram size={12} aria-hidden="true" />
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
