'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
    gaId?: string
}

// Default Google Analytics ID
const DEFAULT_GA_ID = 'G-ED3JM2F0VS'

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    // Use provided ID, environment variable, or default ID
    const analyticsId = gaId || process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID

    // Only load if GA ID is available
    if (!analyticsId) {
        return null
    }

    return (
        <>
            {/* Google tag (gtag.js) */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}');
          `,
                }}
            />
        </>
    )
}

