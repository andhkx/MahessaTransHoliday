"use client";

import Script from "next/script";

export default function GoogleTranslate() {
  return (
    <>
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (!window.google || !window.google.translate) return;
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'id',
                  includedLanguages: 'en,id',
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                },
                'google_translate_element'
              );
            }
          `,
        }}
      />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
