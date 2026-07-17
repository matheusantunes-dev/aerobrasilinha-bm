// Script para popular a galeria com imagens locais no Supabase Storage
// Uso: node scripts/seed-gallery.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_KEY no .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const imagesDir = join(__dirname, '..', 'public', 'images', 'galeria')
const files = readdirSync(imagesDir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))

const captions = {
  'foto-tirada.png': 'Registro do campo',
  'foto-tirada-pista.png': 'Nossa pista de voo',
  'fot-tirada-pista-atual.png': 'Pista atual em construção',
  'foto-tirada-rádio-flysky.png': 'Rádio FlySky em ação',
  'foto-tirada-stick.png': 'Hora de pilotar',
  'foto-tirada-telemaster.png': 'Telemaster Amarelo',
  'foto-tirada-tucano.png': 'Tucano na pista',
  'foto-tirada-tucano-no-chão.png': 'Tucano no chão',
  'foto-tirada-tucano-voando.png': 'Tucano voando',
  'foto-tirada-zagi.png': 'Zagi em voo',
}

function sanitizeFilename(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function seed() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const sanitized = sanitizeFilename(file)
    const filePath = join(imagesDir, file)
    const buffer = readFileSync(filePath)

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`seed/${sanitized}`, buffer, {
        contentType: `image/${file.endsWith('.png') ? 'png' : 'jpeg'}`,
        upsert: true,
      })

    if (error) {
      console.error(`Erro ao fazer upload de ${file}:`, error.message)
      continue
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    const { error: dbError } = await supabase
      .from('gallery')
      .insert({
        image_url: publicUrl,
        caption: captions[file] || file.replace(/\.(png|jpg|jpeg)$/i, '').replace(/-/g, ' '),
        sort_order: i,
      })

    if (dbError) {
      console.error(`Erro ao inserir ${file} no banco:`, dbError.message)
    } else {
      console.log(`✓ ${file} — OK`)
    }
  }

  console.log('\nSeed concluído!')
}

seed()
