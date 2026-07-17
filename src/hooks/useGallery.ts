import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import type { GalleryItem } from '../types'

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && data) {
      setItems(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const addItem = async (item: Omit<GalleryItem, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('gallery').insert([item])
    if (!error) await fetchGallery()
    return error?.message ?? null
  }

  const updateItem = async (id: number, data: Partial<GalleryItem>) => {
    const { error } = await supabase.from('gallery').update(data).eq('id', id)
    if (!error) await fetchGallery()
    return error?.message ?? null
  }

  const deleteItem = async (id: number) => {
    const { error } = await supabase.from('gallery').delete().eq('id', id)
    if (!error) await fetchGallery()
    return error?.message ?? null
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error || !data) return null

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return publicUrl
  }

  return { items, loading, addItem, updateItem, deleteItem, uploadImage, refetch: fetchGallery }
}
