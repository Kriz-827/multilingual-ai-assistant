import { useRef, useState } from 'react'
import { UploadCloud, FileText } from 'lucide-react'
import { uploadDocument } from '../services/api'

export default function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  async function handleUpload() {
    if (!selectedFile) {
      setStatusMessage('Please select a document before uploading.')
      return
    }

    setUploading(true)
    setStatusMessage('Uploading document...')

    try {
      const response = await uploadDocument(selectedFile)
      setStatusMessage(`Uploaded ${response.filename} successfully! Chunks: ${response.chunks}`)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      setStatusMessage('Failed to upload document. Ensure the backend is running at http://localhost:8000.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upload document</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-100">Drop files to extract insights</h2>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          <UploadCloud className="h-5 w-5" />
          Select file
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          setSelectedFile(file || null)
          setStatusMessage('')
        }}
      />

      <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-sky-400">
          <FileText className="h-8 w-8" />
        </div>
        <p className="mt-6 text-base leading-7">
          Drag and drop your PDF, DOCX, or TXT files here, or click Select file to choose from your device.
        </p>
        <p className="mt-3 text-sm text-slate-500">Supports language-aware processing and instant indexing.</p>

        {selectedFile ? (
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-4 text-left text-slate-100">
            <p className="font-semibold">Selected file:</p>
            <p className="mt-2 text-sm">{selectedFile.name}</p>
            <p className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="mt-6 inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>

        {statusMessage ? (
          <p className="mt-4 text-sm text-slate-300">{statusMessage}</p>
        ) : null}
      </div>
    </section>
  )
}
