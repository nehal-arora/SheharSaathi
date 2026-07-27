"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore } from "lucide-react";
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
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadChatHistory() {
    try {
      setInitialLoading(true);
      setError("");

      const response = await getChatHistory();

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

  async function handleSend(question: string) {
    const userMessage: AIChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
      created_at: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    try {
      const response: AIChatResponse = await sendChatMessage({
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
        current.filter((item) => item.id !== userMessage.id)
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
      toast.success("Chat history cleared.");
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
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <AIHeader
          badge="AI Relocation Chat"
          title="Ask your relocation questions"
          description="Get guidance about housing, localities, transport, expenses, roommates, safety, and the process of moving to a new city."
          icon={<MessageCircleMore className="h-7 w-7" />}
        />

        <div className="mt-8">
          {initialLoading ? (
            <div className="flex min-h-[520px] items-center justify-center rounded-3xl border border-gray-200 bg-white">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#EEF2E4] border-t-[#6B8E23]" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading your conversation...
                </p>
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
            <ChatWindow
              messages={messages}
              loading={loading}
              clearing={clearing}
              onSend={handleSend}
              onClear={handleClear}
            />
          )}
        </div>
      </div>
    </main>
  );
}