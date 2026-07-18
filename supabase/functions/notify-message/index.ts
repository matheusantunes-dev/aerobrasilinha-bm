import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts'

serve(async (req) => {
  try {
    const { name, email, message } = await req.json()

    const client = new SmtpClient()

    await client.connect({
      hostname: Deno.env.get('SMTP_HOST')!,
      port: Number(Deno.env.get('SMTP_PORT')!),
      username: Deno.env.get('SMTP_USER')!,
      password: Deno.env.get('SMTP_PASS')!,
      tls: true,
    })

    const text = `Nova mensagem do site Aerobrasilinha\n\nNome: ${name}\nEmail: ${email || 'não informado'}\nMensagem: ${message}`

    await client.send({
      from: Deno.env.get('SMTP_USER')!,
      to: [
        'matheusantunesreis6@gmail.com',
        'aerobrasilinha@gmail.com',
      ],
      subject: `Nova mensagem do site - ${name}`,
      content: text,
    })

    await client.close()

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
