import { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import DocumentUpload from './DocumentUpload'
import { sendMessage } from '../services/api'

const initialMessages = [
  {
    role: 'assistant',
    text: 'Welcome! Upload a document or type a question to start your multilingual AI workflow.',
  },
]

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!inputValue.trim()) {
      return
    }

    const userMessage = {
      role: 'user',
      text: inputValue.trim(),
    }

    setMessages((current) => [...current, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      const data = await sendMessage(userMessage.text)
      const assistantText = data?.answer || 'No response received from the backend.'

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: assistantText,
        },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: 'Unable to connect to the backend. Please ensure the FastAPI server is running at http://localhost:8000.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 overflow-hidden bg-slate-950 text-slate-100">
      <div className="h-full overflow-y-auto px-6 py-8 lg:px-10">
        <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Chat assistant</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-50">Ask anything about your content</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-950/90 px-4 py-2 text-sm text-slate-400">
              <MessageSquare className="h-4 w-4 text-sky-400" />
              Real-time translation-ready
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-3xl border px-5 py-4 ${
                  message.role === 'assistant'
                    ? 'border-slate-800 bg-slate-950/90 text-slate-100'
                    : 'border-sky-500/30 bg-sky-500/10 text-slate-950'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">
                  {message.role === 'assistant' ? 'Assistant' : 'You'}
                </p>
                <p className="text-base leading-7">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <DocumentUpload />
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <label className="sr-only" htmlFor="message-input">
              Message
            </label>
            <input
              id="message-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask a question, request a summary, or translate text..."
              className="min-h-[60px] flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-[60px] items-center justify-center rounded-3xl bg-sky-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
