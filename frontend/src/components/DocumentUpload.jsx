import { UploadCloud, FileText } from 'lucide-react'

export default function DocumentUpload() {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upload document</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-100">Drop files to extract insights</h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          <UploadCloud className="h-5 w-5" />
          Upload file
        </button>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-sky-400">
          <FileText className="h-8 w-8" />
        </div>
        <p className="mt-6 text-base leading-7">
          Drag and drop your PDF, DOCX, or TXT files here, or click Upload to select from your device.
        </p>
        <p className="mt-3 text-sm text-slate-500">Supports multiple documents, language-aware parsing, and instant summaries.</p>
      </div>
    </section>
  )
}
