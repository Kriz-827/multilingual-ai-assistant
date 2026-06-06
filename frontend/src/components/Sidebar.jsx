import { BookOpen, Cpu, Sparkles } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-80 flex-col gap-8 p-8 bg-slate-900/90 border-r border-slate-800 text-slate-100">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Multilingual AI</p>
          <h1 className="text-3xl font-semibold tracking-tight">Assistant Hub</h1>
        </div>
        <p className="text-sm text-slate-400 leading-6">
          A smart workspace for conversational AI, document upload, and fast insights across languages.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl bg-slate-950/95 p-5 border border-slate-800 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between gap-4 text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Your workspace</p>
              <p className="mt-2 font-semibold text-lg">English + Spanish</p>
            </div>
            <Sparkles className="h-6 w-6 text-sky-400" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-slate-950/95 p-5 border border-slate-800">
            <div className="flex items-start gap-4">
              <BookOpen className="h-6 w-6 text-sky-400 mt-1" />
              <div>
                <p className="text-sm text-slate-400">Documents processed</p>
                <p className="mt-2 text-2xl font-semibold">12</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/95 p-5 border border-slate-800">
            <div className="flex items-start gap-4">
              <Cpu className="h-6 w-6 text-emerald-400 mt-1" />
              <div>
                <p className="text-sm text-slate-400">Active model</p>
                <p className="mt-2 text-2xl font-semibold">GPT-4.1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto rounded-3xl bg-slate-950/95 p-5 border border-slate-800">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick tips</p>
        <ul className="mt-4 space-y-3 text-slate-300 text-sm leading-6">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-400" />
            Upload a file or ask a question to begin.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Switch languages instantly with a simple prompt.
          </li>
        </ul>
      </div>
    </aside>
  )
}
