import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()
    
    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'URLs array is required' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pgelephant.com'
    const results = []

    // Submit each URL to Google Indexing API
    for (const url of urls) {
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
      
      try {
        const response = await fetch(`${baseUrl}/api/indexing/google?url=${encodeURIComponent(fullUrl)}`)
        const result = await response.json()
        
        results.push({
          url: fullUrl,
          success: result.success,
          message: result.message || result.error,
          timestamp: new Date().toISOString()
        })
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        results.push({
          url: fullUrl,
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date().toISOString()
        })
      }
    }

    // Per Google guidance, sitemaps ping is deprecated.
    // Rely on Search Console submission and accurate lastmod.

    const successCount = results.filter(r => r.success).length
    const totalCount = results.length

    return NextResponse.json({
      success: successCount > 0,
      message: `Successfully submitted ${successCount}/${totalCount} URLs for indexing`,
      results,
      sitemapPinged: false
    })

  } catch (error) {
    console.error('Error in bulk indexing:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}