import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import nodemailer from 'npm:nodemailer@6.9.16'

serve(async (req) => {
  try {
    const { name, email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: Deno.env.get('SMTP_HOST')!,
      port: Number(Deno.env.get('SMTP_PORT')!),
      secure: false,
      auth: {
        user: Deno.env.get('SMTP_USER')!,
        pass: Deno.env.get('SMTP_PASS')!,
      },
    })

    const text = `Nova mensagem do site Aerobrasilinha\n\nNome: ${name}\nEmail: ${email || 'não informado'}\nMensagem: ${message}`

    await transporter.sendMail({
      from: Deno.env.get('SMTP_USER')!,
      to: ['matheusantunesreis6@gmail.com', 'aerobrasilinha@gmail.com'],
      subject: `Nova mensagem do site - ${name}`,
      text,
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
