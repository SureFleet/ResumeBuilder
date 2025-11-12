import React from 'react'
import { NextRequest } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { ResumeSchema, type Resume } from '@/lib/schema'
import { ResumePDF } from '@/components/ResumePDF'

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    
    // Handle avatar URL - convert relative paths to absolute URLs
    if (json.avatar) {
      if (json.avatar.startsWith('/')) {
        // Convert relative path to absolute URL
        const host = req.headers.get('host') || 'localhost:3000'
        const protocol = req.headers.get('x-forwarded-proto') || 'http'
        json.avatar = `${protocol}://${host}${json.avatar}`
      } else if (!json.avatar.startsWith('http')) {
        // Remove invalid avatar paths
        json.avatar = undefined
      }
    }
    
    const parsed = ResumeSchema.parse(json) as Resume

  const element = React.createElement(ResumePDF as any, { data: parsed }) as any
  const pdf = (await renderToBuffer(element as any)) as unknown as Uint8Array

  return new Response(pdf as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? 'Invalid data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
