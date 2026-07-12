"use client";

import "./AiChatbot.css";
import { useCallback, useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Siapa Mohammad Bayu Rizki?",
  "Apa keahlian utama Bayu?",
  "Proyek apa yang paling menarik di portofolio ini?",
  "Apa latar belakang pendidikan Bayu?",
  "Tech stack apa yang Bayu kuasai?",
  "Apa saja publikasi ilmiah Bayu?",
  "Bagaimana cara menghubungi Bayu?",
  "Apakah Bayu tersedia untuk freelance atau kolaborasi?",
  "Apa pengalaman Bayu di bidang Business Analysis?",
  "Tools visualisasi data apa yang Bayu gunakan?",
  "Proyek machine learning apa yang pernah Bayu kerjakan?",
  "Apa keahlian UX Research Bayu?",
];

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  // Initial greeting when first opened
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          id: generateId(),
          role: "assistant",
          content:
            "Halo! 👋 Saya adalah AI assistant Bayu Rizki. Pilih salah satu pertanyaan di bawah untuk mengenal Bayu lebih lanjut.",
        },
      ]);
    }
  }, [open, hasGreeted]);

  const askQuestion = useCallback(async (question: string) => {
    if (loading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json() as { answer?: string; error?: string };

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.answer ?? data.error ?? "Maaf, tidak ada jawaban.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Maaf, terjadi gangguan koneksi. Silakan coba lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const reset = () => {
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        content:
          "Percakapan direset. 👋 Pilih pertanyaan di bawah untuk memulai lagi.",
      },
    ]);
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Floating Bubble Button */}
      <button
        type="button"
        aria-label={open ? "Tutup AI Chatbot" : "Tanya AI tentang Bayu"}
        aria-expanded={open}
        onClick={toggleOpen}
        className="chatbot-bubble"
        title={open ? "Tutup chatbot" : "Tanya AI tentang Bayu Rizki"}
      >
        {open ? (
          /* Close icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Spark / AI icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a.75.75 0 0 1 .743.648l.007.102v2.5a.75.75 0 0 1-1.493.102L11.25 5.25v-2.5A.75.75 0 0 1 12 2ZM12 17.5a.75.75 0 0 1 .743.648l.007.102v2.5a.75.75 0 0 1-1.493.102L11.25 20.25v-2.5A.75.75 0 0 1 12 17.5ZM4.399 4.399a.75.75 0 0 1 1.06 0l1.768 1.767a.75.75 0 0 1-1.06 1.061L4.4 5.46a.75.75 0 0 1 0-1.06ZM16.773 16.773a.75.75 0 0 1 1.06 0l1.768 1.767a.75.75 0 1 1-1.06 1.06l-1.768-1.767a.75.75 0 0 1 0-1.06ZM2 12a.75.75 0 0 1 .648-.743L2.75 11.25h2.5a.75.75 0 0 1 .102 1.493l-.102.007h-2.5A.75.75 0 0 1 2 12ZM17.5 12a.75.75 0 0 1 .648-.743l.102-.007h2.5a.75.75 0 0 1 .102 1.493l-.102.007h-2.5A.75.75 0 0 1 17.5 12ZM7.227 16.773a.75.75 0 0 1 0 1.06L5.46 19.6a.75.75 0 0 1-1.06-1.06l1.767-1.768a.75.75 0 0 1 1.06 0ZM19.601 4.399a.75.75 0 0 1 0 1.06L17.834 7.227a.75.75 0 0 1-1.061-1.06l1.768-1.768a.75.75 0 0 1 1.06 0Z" />
          </svg>
        )}

        {/* Ping indicator when closed */}
        {!open && (
          <span className="chatbot-bubble__ping" aria-hidden="true" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="AI Chatbot — Tanya tentang Bayu Rizki"
          aria-modal="false"
          className="chatbot-panel"
        >
          {/* Header */}
          <div className="chatbot-panel__header">
            <div className="chatbot-panel__header-info">
              <span className="chatbot-panel__status-dot" aria-hidden="true" />
              <div>
                <p className="chatbot-panel__name">Bayu&apos;s AI</p>
                <p className="chatbot-panel__subtitle">Ask me anything about Bayu</p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="chatbot-panel__reset"
              title="Reset percakapan"
              aria-label="Reset percakapan"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-panel__messages" aria-live="polite" aria-label="Percakapan chatbot">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message chatbot-message--${message.role}`}
              >
                {message.role === "assistant" && (
                  <span className="chatbot-message__avatar" aria-hidden="true">B</span>
                )}
                <div className="chatbot-message__bubble">
                  {message.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chatbot-message chatbot-message--assistant" aria-label="AI sedang mengetik">
                <span className="chatbot-message__avatar" aria-hidden="true">B</span>
                <div className="chatbot-typing">
                  <span className="chatbot-typing__dot" />
                  <span className="chatbot-typing__dot" />
                  <span className="chatbot-typing__dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Questions List */}
          <div className="chatbot-panel__questions-wrapper" aria-label="Pertanyaan yang tersedia">
            <p className="chatbot-panel__questions-label">Pilih pertanyaan</p>
            <div className="chatbot-panel__questions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => { void askQuestion(question); }}
                  disabled={loading}
                  className="chatbot-question-chip"
                  aria-label={`Tanya: ${question}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
