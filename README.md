# 💰 Cripto App

Aplicação React que consome a API do CoinGecko para listar, pesquisar e visualizar detalhes das principais criptomoedas do mercado. Tudo em tempo real, com paginação, formatação e responsividade!

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-gif-here.gif" width="100%" alt="Prévia do app">
</div>

---

## 🚀 Funcionalidades

- 📊 Listagem das 100 maiores criptomoedas
- 🔍 Busca por nome ou símbolo
- 🔄 Paginação com carregamento incremental
- 💸 Preço, volume e market cap formatados
- 📈 Detalhes individuais das moedas
- ⚙️ Integração com a API pública do [CoinGecko](https://www.coingecko.com/)

---

## 🧪 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ecalazans/cripto-app.git

# Acesse o diretório
cd cripto-app

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

O app vai rodar em http://localhost:5173

## 🖼️ Preview
<div align="center"> <img src="https://user-images.githubusercontent.com/your-screenshot-here.png" width="80%" alt="Prévia da aplicação" /> </div>

## ⚠️ Limite da API
 A API do CoinGecko possui limite de requisições por minuto e por página. Ao tentar acessar páginas além do permitido, a aplicação retorna uma mensagem amigável ao usuário. 😉
