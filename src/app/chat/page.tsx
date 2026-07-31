"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import AIErrorState from "@/components/ai/AIErrorState";
import AIHeader from "@/components/ai/AIHeader";
import ChatWindow from "@/components/ai/ChatWindow";

import {
  clearChatHistory,
  getChatHistory,
  sendChatMessage,
} from "@/features/ai/services/ai.service";

import type {
  AIChatMessage,
  AIChatResponse,
} from "@/features/ai/types";

export default function ChatPage() {
  const [messages, setMessages] =
    useState<AIChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [clearing, setClearing] =
    useState(false);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadChatHistory() {
    try {
      setInitialLoading(true);
      setError("");

      const response =
        await getChatHistory();

      setMessages(response.items);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your chat history."
      );
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    void loadChatHistory();
  }, []);

  async function handleSend(
    question: string
  ) {
    const userMessage: AIChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
      created_at: new Date().toISOString(),
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response: AIChatResponse =
        await sendChatMessage({
          question,
        });

      const assistantMessage: AIChatMessage =
        response.message ?? {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
          created_at: new Date().toISOString(),
        };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (err) {
      setMessages((current) =>
        current.filter(
          (item) =>
            item.id !== userMessage.id
        )
      );

      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to send your message."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    try {
      setClearing(true);

      await clearChatHistory();

      setMessages([]);

      toast.success(
        "Chat history cleared."
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to clear chat history."
      );
    } finally {
      setClearing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <AIHeader
          badge="AI Relocation Chat"
          title="Ask your relocation questions"
          description="Get guidance about housing, localities, transport, expenses, roommates, safety, and the process of moving to a new city."
          icon={
            <MessageCircleMore className="h-7 w-7" />
          }
        />

        <section className="mt-8">
          {initialLoading ? (
            <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-[#205C46]/20 blur-3xl" />

              <div className="relative text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                  <MessageCircleMore className="h-10 w-10 text-[#F0C86A]" />

                  <Loader2 className="absolute -right-3 -top-3 h-8 w-8 animate-spin rounded-full bg-[#10271F] p-1.5 text-[#F0C86A]" />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Loading Conversation
                </p>

                <h2 className="mt-3 text-2xl font-bold text-[#FBFAF7]">
                  Preparing Your Chat
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#9EAEA7]">
                  Retrieving your previous relocation conversation...
                </p>

                <div className="mt-7 flex items-center justify-center gap-2">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.3s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.15s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F]" />
                </div>
              </div>
            </div>
          ) : error ? (
            <AIErrorState
              title="Unable to load chat"
              message={error}
              onRetry={loadChatHistory}
              retrying={initialLoading}
            />
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-3 rounded-[22px] border border-[#205C46]/35 bg-[#0D211B] px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#FBFAF7]">
                    AI Conversation Ready
                  </p>

                  <p className="mt-1 text-xs text-[#9EAEA7]">
                    Ask questions naturally and receive personalised relocation guidance.
                  </p>
                </div>
              </div>

              <ChatWindow
                messages={messages}
                loading={loading}
                clearing={clearing}
                onSend={handleSend}
                onClear={handleClear}
              />
            </div>
          )}
        </section>
      </section>
    </main>
  );
}