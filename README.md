# E-commerce API

API de e-commerce com integração de pagamentos usando Stripe.

## 🚀 Funcionalidades

- Autenticação de usuários
- Gerenciamento de produtos
- Carrinho de compras
- Integração com Stripe para pagamentos


## 🛠️ Tecnologias

- Node.js
- Express
- PostgreSQL
- JWT usando cookies para autenticação
- Stripe (para pagamentos)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- Conta no Stripe

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git](https://github.com/Jcfmneto/API-E-commerce
cd seu-repositorio
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Execute as migrações do banco de dados
```bash
npm run migrate
```

5. Inicie o servidor
```bash
npm start
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=seu_jwt_secret

# Stripe
STRIPE_SECRET_KEY=sua_chave_secreta_stripe

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📦 Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controller/     # Controladores da aplicação
├── models/         # Modelos e acesso ao banco de dados
├── routes/         # Rotas da API
├── services/       # Serviços da aplicação
├── workers/        # Workers para processamento assíncrono
└── app.js          # Arquivo principal da aplicação
```

## 🔍 Endpoints da API

### Usuários
- `POST /users/register` - Registro de usuário
- `POST /users/login` - Login de usuário
- `POST /users/logout` -Logout de usuário

### Produtos
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Obtém um produto específico
- `POST /products` - Cria um novo produto
- `PUT /products/:id` - Atualiza um produto
- `DELETE /products/:id` - Remove um produto

### Carrinho
- `GET /cart/:userId` - Obtém itens do carrinho
- `POST /cart/:userId` - Adiciona item ao carrinho
- `PUT /cart/:userId` - Atualiza quantidade no carrinho
- `DELETE /cart/:userId` - Remove item do carrinho

### Pagamentos
- `POST /checkout/:userId` - Inicia processo de checkout

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request



## ✨ Autores

* Julio César * 
