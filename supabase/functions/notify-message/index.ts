import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import nodemailer from 'npm:nodemailer@6.9.16'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Deno.env.get('SMTP_USER')!,
        pass: Deno.env.get('SMTP_PASS')!,
      },
    })

    const html = `
      <h2>Nova mensagem do site Aerobrasilinha</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;background:#1a1a1a;color:#fff"><strong>Nome</strong></td><td style="padding:8px;background:#1a1a1a;color:#fff">${name}</td></tr>
        <tr><td style="padding:8px"><strong>Email</strong></td><td style="padding:8px">${email || 'não informado'}</td></tr>
        <tr><td style="padding:8px;background:#1a1a1a;color:#fff"><strong>Data</strong></td><td style="padding:8px;background:#1a1a1a;color:#fff">${new Date().toLocaleString('pt-BR')}</td></tr>
      </table>
      <h3>Mensagem:</h3>
      <p style="padding:16px;background:#f5f5f5;border-radius:8px">${message}</p>
      <hr>
      <p style="font-size:12px;color:#999">Enviado pelo ChatBot do site Aerobrasilinha</p>
    `

    await transporter.sendMail({
      from: `"Aerobrasilinha Chat" <${Deno.env.get('SMTP_USER')!}>`,
      to: ['matheusantunesreis6@gmail.com', 'aerobrasilinha@gmail.com', 'sinesioantunesdesouza90@gmail.com'],
      subject: `Nova mensagem - ${name}`,
      text: `Nova mensagem do site\n\nNome: ${name}\nEmail: ${email || 'não informado'}\n\nMensagem:\n${message}`,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
