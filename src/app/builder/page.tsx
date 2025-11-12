"use client"
import { ResumeForm } from '@/components/ResumeForm'
import { ResumeView } from '@/components/ResumeView'
import { Resume, ResumeSchema } from '@/lib/schema'
import { storage } from '@/lib/storage'

async function download(path: string, data: Resume, filename: string) {
  const res = await fetch(path, { method: 'POST', body: JSON.stringify(data) })
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function BuilderPage() {
  const initial = storage.get<Resume>('resume-builder:data')

  const handleExport = async (fmt: 'pdf' | 'docx', data: Resume) => {
    const parsed = ResumeSchema.safeParse(data)
    if (!parsed.success) {
      alert('Please complete required fields before exporting')
      return
    }
    await download(`/api/export/${fmt}`, parsed.data, `resume.${fmt}`)
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-6 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Builder</h1>
        <ResumeForm initial={initial} onChange={() => {}} />
        <div className="no-print mt-4 flex gap-3">
          <button
            onClick={async () => {
              const data = storage.get<Resume>('resume-builder:data')
              if (data) await handleExport('pdf', data)
            }}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Download PDF
          </button>
          <button
            onClick={async () => {
              const data = storage.get<Resume>('resume-builder:data')
              if (data) await handleExport('docx', data)
            }}
            className="rounded border px-4 py-2"
          >
            Download DOCX
          </button>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Preview</h2>
        {initial ? (
          <ResumeView data={initial} />
        ) : (
          <p className="text-gray-600">Fill the form to see live preview.</p>
        )}
      </section>
    </main>
  )
}
