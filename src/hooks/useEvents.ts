import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import type { Event } from '../types'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (!error && data) {
      setEvents(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const createEvent = async (event: Omit<Event, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('events').insert([event])
    if (!error) await fetchEvents()
    return error?.message ?? null
  }

  const updateEvent = async (id: number, event: Partial<Event>) => {
    const { error } = await supabase.from('events').update(event).eq('id', id)
    if (!error) await fetchEvents()
    return error?.message ?? null
  }

  const deleteEvent = async (id: number) => {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (!error) await fetchEvents()
    return error?.message ?? null
  }

  return { events, loading, createEvent, updateEvent, deleteEvent, refetch: fetchEvents }
}
