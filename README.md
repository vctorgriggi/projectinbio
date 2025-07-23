# 🌐 ProjectInBio

Plataforma de links públicos para desenvolvedores compartilharem seus projetos como portfólio. Suporta autenticação, pagamentos, notificações por e-mail e analytics de visitas — tudo isso com uma experiência visual personalizada.

## 🚀 Funcionalidades

- Criação de páginas públicas com projetos e redes sociais
- Autenticação via Google (NextAuth)
- Pagamentos com Stripe (mensal e vitalício)
- Notificações por e-mail via Resend
- Analytics de visitas e cliques
- Dashboard privado para gerenciamento dos links

## 📺 Demonstração

Confira o projeto em produção:  
🔗 [https://projectinbio.com](https://projectinbio.com)

## 🛠️ Tecnologias Utilizadas

**Frontend & UI**

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

**APIs & Integrações**

- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [Resend](https://resend.com/)
- [Google Analytics](https://analytics.google.com/)

**Backend & Infraestrutura**

- [Firebase (Firestore + Storage)](https://firebase.google.com/)

## 📦 Instalação

```bash
git clone https://github.com/vctorgriggi/projectinbio.git
cd projectinbio
npm install
```

## 🔐 Variáveis de Ambiente

Este projeto requer algumas variáveis de ambiente para funcionar corretamente. Você pode usar o arquivo `.env.example` incluído no repositório como referência:

```bash
cp .env.example .env
```

Depois, preencha os valores conforme necessário para:

- Firebase (auth, banco e storage)
- Autenticação com Google (OAuth via NextAuth)
- Stripe (pagamentos e webhooks)
- Google Analytics
- Resend (envio de e-mails)
- NextAuth (segurança e domínio base)

## ▶️ Executando o Projeto

```bash
npm run dev
```

Abra em: [http://localhost:3000](http://localhost:3000)

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.
