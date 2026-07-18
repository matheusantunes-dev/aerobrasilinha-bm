import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../services/supabase'

export interface ChatMessage {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

export function useMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const sendMessage = async (name: string, email: string, message: string) => {
    const { error } = await supabase.from('chat_messages').insert([{ name, email, message }])
    if (error) return error.message

    const { error: fnError } = await supabase.functions.invoke('notify-message', {
      body: { name, email, message },
    })
    if (fnError) console.error('Email notification failed:', fnError)
    return null
  }

  const deleteMessage = async (id: number) => {
    const { error } = await supabase.from('chat_messages').delete().eq('id', id)
    if (!error) await fetchMessages()
    return error?.message ?? null
  }

  return { messages, loading, sendMessage, deleteMessage, refetch: fetchMessages }
}
