import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  // Google Indexing API configuration
  const GOOGLE_INDEXING_API_KEY = process.env.GOOGLE_INDEXING_API_KEY
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  
  if (!GOOGLE_INDEXING_API_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return NextResponse.json({ error: 'Google API credentials not configured' }, { status: 500 })
  }

  try {
    // Generate JWT token for Google API
    const jwt = require('jsonwebtoken')
    const token = jwt.sign(
      {
        iss: GOOGLE_CLIENT_EMAIL,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
      GOOGLE_PRIVATE_KEY,
      { algorithm: 'RS256' }
    )

    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Submit URL to Google Indexing API
    const indexingResponse = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED',
      }),
    })

    const result = await indexingResponse.json()

    if (indexingResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        message: `Successfully submitted ${url} to Google for indexing`,
        result 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error?.message || 'Failed to submit to Google Indexing API',
        result 
      }, { status: indexingResponse.status })
    }

  } catch (error) {
    console.error('Error submitting to Google Indexing API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}