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

    // Also ping other search engines
    const searchEngines = [
      'https://www.google.com/ping?sitemap=',
      'https://www.bing.com/ping?sitemap=',
      'https://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap=',
    ]

    const sitemapUrl = `${baseUrl}/sitemap.xml`
    
    for (const engine of searchEngines) {
      try {
        await fetch(`${engine}${encodeURIComponent(sitemapUrl)}`, {
          method: 'GET'
        })
      } catch (error) {
        console.log(`Failed to ping search engine: ${engine}`, error)
      }
    }

    const successCount = results.filter(r => r.success).length
    const totalCount = results.length

    return NextResponse.json({
      success: successCount > 0,
      message: `Successfully submitted ${successCount}/${totalCount} URLs for indexing`,
      results,
      sitemapPinged: true
    })

  } catch (error) {
    console.error('Error in bulk indexing:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}