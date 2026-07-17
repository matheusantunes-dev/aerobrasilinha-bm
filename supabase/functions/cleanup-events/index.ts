import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (_req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const cutoff = yesterday.toISOString().split('T')[0]

    const { data: expired, error: fetchError } = await supabase
      .from('events')
      .select('id, image_url')
      .lt('date', cutoff)

    if (fetchError) {
      throw fetchError
    }

    if (!expired || expired.length === 0) {
      return new Response(JSON.stringify({ deleted: 0 }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const ids = expired.map(e => e.id)

    const imagesToDelete = expired
      .map(e => e.image_url)
      .filter(Boolean)
      .map(url => {
        const parts = url.split('/')
        return parts.slice(parts.indexOf('images') + 1).join('/')
      })

    if (imagesToDelete.length > 0) {
      await supabase.storage.from('images').remove(imagesToDelete)
    }

    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .in('id', ids)

    if (deleteError) {
      throw deleteError
    }

    return new Response(JSON.stringify({ deleted: ids.length }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
