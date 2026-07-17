# GUIA DO ADMIN - Aerobrasilinha

## 🔑 Primeiro Acesso ao Supabase Auth

1. Acesse: https://supabase.com/dashboard/project/aloqvzxsdhphfbkpwctw/auth/users
2. Clique em **"Add user"**
3. Cadastre: **aerobrasilinha@gmail.com** + sua senha
4. Pronto! Agora você consegue logar no /admin

## 🌐 Acessar o Painel Admin

1. Abra o site
2. Vá em **/admin** (ex: https://seusite.vercel.app/admin)
3. Faça login com email e senha cadastrados
4. No dashboard você pode:
   - **Criar Evento** — novo evento com descrição, data, local, imagem
   - **Gerenciar Eventos** — editar ou excluir eventos existentes
   - **Gerenciar Galeria** — adicionar fotos, editar legendas, excluir

## 📺 Adicionar Vídeos do YouTube

1. Abra `src/data/videos.ts`
2. Substitua os `SEU_VIDEO_ID_AQUI` pelos IDs reais
3. Salve e faça deploy

Exemplo de link: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
O ID é: `dQw4w9WgXcQ`

## 📸 Sobre as Fotos da Galeria

As fotos da pasta `public/images/galeria/` são **estáticas** (ficam no código).
Pelo painel admin você pode fazer upload de novas fotos que vão para o Supabase Storage.

## 🚀 Deploy

O site está configurado para rodar localmente com `npm run dev`
Para publicar, recomendo Vercel (grátis e conecta com GitHub).
