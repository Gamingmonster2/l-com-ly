import { useEffect, useRef, useState } from "react"
import type { Language } from "@/data/translations"
import { widgetCopy } from "@/data/widget-copy"
import { getChatPollUrl, getWhatsapp, getWorkerUrl } from "@/lib/site-config"
import {
  MAX_MESSAGE,
  POLL_MS,
  getOrCreateSession,
  isAgentMessage,
  lastMessageId,
  mergeMessages,
  normalizeMessage,
  readLog,
  writeLog,
  type ChatMessage,
} from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, X, ExternalLink } from "lucide-react"

export function ChatWidget({ lang }: { lang: Language }) {
  const copy = widgetCopy[lang].chat
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => readLog())
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState("")

  const sessionRef = useRef(getOrCreateSession())
  const messagesRef = useRef<ChatMessage[]>(messages)
  const sendingRef = useRef(false)
  const logRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const whatsapp = getWhatsapp()

  useEffect(() => {
    messagesRef.current = messages
    writeLog(messages)
  }, [messages])

  useEffect(() => {
    if (open && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [messages, notice, open])

  async function poll() {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return
    }
    try {
      const cursor = lastMessageId(messagesRef.current)
      const res = await fetch(getChatPollUrl(sessionRef.current, cursor), {
        headers: { Accept: "application/json" },
      })
      if (!res.ok) return
      const data = await res.json()
      if (data && Array.isArray(data.messages) && data.messages.length) {
        const merged = mergeMessages(messagesRef.current, data.messages)
        messagesRef.current = merged
        setMessages(merged)
      }
    } catch {
      /* انقطاع مؤقت — نُعيد المحاولة في النبضة القادمة */
    }
  }

  useEffect(() => {
    if (!open) return
    void poll()
    const timer = setInterval(() => void poll(), POLL_MS)
    return () => clearInterval(timer)
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function messageError(error: string): string {
    if (error.includes("طويلة")) return copy.errorLong
    if (error.includes("قصيرة")) return copy.errorShort
    return copy.errorEmpty
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (sendingRef.current) return

    const check = normalizeMessage(draft)
    if (!check.ok) {
      setNotice(messageError(check.error))
      return
    }

    if (!getWorkerUrl()) {
      setNotice(copy.notConfigured)
      return
    }

    sendingRef.current = true
    setSending(true)
    setDraft("")
    setNotice(copy.sending)

    try {
      const res = await fetch(getWorkerUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project",
          session: sessionRef.current,
          message: check.text,
          package: copy.package,
        }),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok || !data || data.success === false) {
        setNotice(whatsapp ? copy.sendFailedWa : copy.sendFailed)
        return
      }

      if (typeof data.messageId === "number") {
        const merged = mergeMessages(messagesRef.current, [
          { id: data.messageId, role: "customer", content: check.text },
        ])
        messagesRef.current = merged
        setMessages(merged)
      }

      setNotice(
        data.mode === "shadow"
          ? copy.receivedShadow
          : data.mode === "faq"
            ? ""
            : copy.receivedLive
      )
      await poll()
      // في وضع الأسئلة الشائعة الرد جاهز فوراً — لا داعي لسطر الانتظار
      if (data.mode === "faq") setNotice("")
    } catch {
      setNotice(whatsapp ? copy.networkFailedWa : copy.networkFailed)
    } finally {
      sendingRef.current = false
      setSending(false)
      inputRef.current?.focus()
    }
  }

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(copy.waText)}`
    : ""

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3"
    >
      {open && (
        <div
          role="dialog"
          aria-label={copy.title}
          className="w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 bg-foreground px-4 py-3 text-background">
            <div>
              <p className="text-sm font-bold">{copy.title}</p>
              <p className="text-[11px] text-background/70">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="text-lg leading-none text-background/80 transition-colors hover:text-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="h-72 space-y-2 overflow-y-auto bg-muted/30 p-3"
          >
            {messages.length === 0 && !notice && (
              <p className="py-1 text-center text-[11px] text-muted-foreground">
                {copy.welcome}
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  isAgentMessage(message.role)
                    ? "me-auto w-fit max-w-[85%] rounded-lg rounded-bl-sm border border-border bg-card px-3 py-2 text-sm text-foreground"
                    : "ms-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-foreground px-3 py-2 text-sm text-background"
                }
              >
                {message.content}
              </div>
            ))}
            {notice && (
              <p className="py-1 text-center text-[11px] text-muted-foreground">
                {notice}
              </p>
            )}
          </div>

          <form
            ref={formRef}
            onSubmit={(event) => void handleSubmit(event)}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <textarea
              ref={inputRef}
              rows={1}
              maxLength={MAX_MESSAGE}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  formRef.current?.requestSubmit()
                }
              }}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              className="max-h-24 flex-1 resize-none rounded-lg border border-input bg-background/70 p-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              type="submit"
              size="icon"
              disabled={sending}
              aria-label={copy.send}
              className="h-10 w-10 shrink-0 rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.waLabel}
          title={copy.waLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform hover:scale-105"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value)
          if (!open) inputRef.current?.focus()
        }}
        aria-label={copy.toggle}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
