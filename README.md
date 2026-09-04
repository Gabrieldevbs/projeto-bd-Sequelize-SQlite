# Sistema de Empréstimo de Livros

API REST para empréstimo de livros entre estudantes. O projeto está sendo
desenvolvido inicialmente como um MVP, com foco no cadastro de usuários,
cadastro de livros e controle básico de solicitações e empréstimos.

## Funcionalidades atuais

- Cadastro de usuários.
- Login com senha criptografada usando bcrypt.
- Autenticação com token JWT.
- Cadastro, consulta, edição e remoção de livros.
- Busca de livros por título ou autor.
- Solicitação de empréstimo.
- Aprovação ou recusa de solicitações pelo proprietário.
- Criação automática de empréstimo após aprovação.
- Listagem dos empréstimos do usuário.
- Registro de devolução do livro.
- Controle de disponibilidade do livro.

## Tecnologias

- Node.js
- Express
- Sequelize
- SQLite
- bcrypt
- JSON Web Token (JWT)
- dotenv
- CORS
- Helmet

## Requisitos

- Node.js instalado.
- npm instalado.

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` copiando o exemplo existente.

No PowerShell:

```powershell
Copy-Item .env.example .env
```

No Prompt de Comando:

```cmd
copy .env.example .env
```

Depois, abra o arquivo `.env` e defina um segredo forte:

```env
JWT_SECRET=coloque_aqui_um_segredo_grande_e_aleatorio
DATABASE_FILE=./database.sqlite
PORT=3000
```

O arquivo `.env` não deve ser enviado para o Git. Ele já está incluído no
`.gitignore`.

## Executando a API

Modo de desenvolvimento, com reinício automático:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

A API ficará disponível, por padrão, em:

```text
http://localhost:3000
```

Ao iniciar, o Sequelize cria ou atualiza as tabelas dos models no arquivo
`database.sqlite`.

## Teste rápido

Para verificar se o servidor está funcionando:

```http
GET http://localhost:3000/teste
```

Resposta esperada:

```json
{
  "mensagem": "boas-vindas à API"
}
```

## Autenticação

As rotas protegidas exigem o cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

O token é obtido na rota de login e deve ser enviado em todas as operações
autenticadas.

## Rotas de autenticação

### Cadastrar usuário

```http
POST /auth/register
Content-Type: application/json
```

Corpo:

```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "senha": "123456",
  "curso": "Sistemas de Informação"
}
```

Campos obrigatórios: `nome`, `email` e `senha`.

Resposta: `201 Created`.

### Fazer login

```http
POST /auth/login
Content-Type: application/json
```

Corpo:

```json
{
  "email": "maria@example.com",
  "senha": "123456"
}
```

A resposta contém o usuário e o token:

```json
{
  "user": {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@example.com"
  },
  "token": "eyJ..."
}
```

## Rotas de livros

### Cadastrar livro

Requer autenticação.

```http
POST /books
Authorization: Bearer SEU_TOKEN
Content-Type: application/json
```

Corpo:

```json
{
  "titulo": "Livro de bancos de dados",
  "autor": "Autor do Livro",
  "editora": "Editora Exemplo",
  "isbn": "9780000000000",
  "categoria": "Tecnologia",
  "descricao": "Livro usado para estudos.",
  "imagemCapa": "https://exemplo.com/capa.jpg"
}
```

Os campos obrigatórios são `titulo` e `autor`. O livro é criado como
disponível.

### Listar livros

```http
GET /books
```

Para pesquisar por título ou autor:

```http
GET /books?q=bancos
```

### Consultar um livro

```http
GET /books/1
```

Substitua `1` pelo ID do livro.

### Editar livro

Requer autenticação do proprietário.

```http
PUT /books/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json
```

Corpo de exemplo:

```json
{
  "descricao": "Nova descrição",
  "disponivel": true
}
```

### Remover livro

Requer autenticação do proprietário.

```http
DELETE /books/1
Authorization: Bearer SEU_TOKEN
```

Resposta esperada: `204 No Content`.

## Rotas de solicitações

### Solicitar um livro

Requer autenticação. O usuário não pode solicitar o próprio livro.

```http
POST /books/1/requests
Authorization: Bearer TOKEN_DO_LEITOR
Content-Type: application/json
```

Corpo:

```json
{
  "mensagem": "Gostaria de pegar este livro emprestado."
}
```

Resposta: `201 Created`. A resposta contém o ID da solicitação, que será usado
para aprovar ou recusar o pedido.

### Listar solicitações de um livro

Requer autenticação do proprietário.

```http
GET /books/1/requests
Authorization: Bearer TOKEN_DO_PROPRIETARIO
```

### Aprovar ou recusar solicitação

Requer autenticação do proprietário. O ID usado na URL é o ID da solicitação,
não o ID do livro.

Aprovar:

```http
POST /requests/1/respond
Authorization: Bearer TOKEN_DO_PROPRIETARIO
Content-Type: application/json
```

```json
{
  "action": "approve"
}
```

Ao aprovar, a API cria um empréstimo com prazo inicial de sete dias e marca o
livro como indisponível.

Recusar:

```http
POST /requests/1/respond
Authorization: Bearer TOKEN_DO_PROPRIETARIO
Content-Type: application/json
```

```json
{
  "action": "reject"
}
```

Uma solicitação já processada não pode ser aprovada ou recusada novamente.

## Rotas de empréstimos

### Listar empréstimos

Requer autenticação. Retorna empréstimos em que o usuário é proprietário ou
leitor.

```http
GET /loans
Authorization: Bearer SEU_TOKEN
```

### Registrar devolução

Requer autenticação de um participante do empréstimo. O ID da URL é o ID do
empréstimo.

```http
POST /loans/1/return
Authorization: Bearer SEU_TOKEN
```

Não é necessário enviar corpo JSON.

Ao registrar a devolução:

- `dataDevolucao` recebe a data atual;
- o status do empréstimo muda para finalizado;
- o livro volta a ficar disponível.

## Fluxo completo de uso

1. Cadastre o estudante proprietário em `/auth/register`.
2. Faça login em `/auth/login` e copie o token.
3. Cadastre um livro usando `POST /books`.
4. Cadastre um segundo estudante e faça login com ele.
5. Solicite o livro usando `POST /books/:id/requests`.
6. Volte a usar o token do proprietário.
7. Consulte as solicitações em `GET /books/:id/requests`.
8. Aprove a solicitação em `POST /requests/:id/respond`.
9. Consulte o empréstimo em `GET /loans`.
10. Registre a devolução em `POST /loans/:id/return`.

## Status utilizados

Solicitações:

```text
0 - pendente
1 - aprovada
2 - recusada
```

Empréstimos:

```text
0 - ativo
1 - finalizado
```

## Estrutura principal

```text
.
├── server.js
├── package.json
├── .env.example
├── initial_migration.sql
└── src
    ├── app.js
    ├── db.js
    ├── models.js
    ├── auth_middleware.js
    ├── routes_auth.js
    ├── routes_books.js
    ├── routes_requests.js
    └── routes_loans.js
```

## Limitações atuais

Ainda não foram implementados:

- comentários nos livros;
- avaliações entre usuários;
- atualização automática de reputação;
- upload real de capas;
- notificações;
- chat;
- filtros avançados;
- validações avançadas;
- testes automatizados;
- controle de atraso.

Esses recursos podem ser adicionados em iterações futuras, depois que o fluxo
principal estiver estável.
