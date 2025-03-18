# C115 Client-Server Chatbot

## Sobre o Projeto

Este projeto implementa um sistema de chat (quiz) cliente-servidor, desenvolvido como parte da disciplina C115 - Conceitos e Tecnologias para Dispositivos Conectados. A aplicação permite comunicação em tempo real através de uma interface web.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Comunicação cliente-servidor**: Socket.IO

## Estrutura do Projeto

```
c115-client-server-chatbot/
│
├── public/             # Arquivos referentes ao client-side
│   ├── index.html      # Página principal da aplicação
│   └── styles.css      # Estilos da aplicação
├── .gitignore          # Arquivos e diretórios ignorados pelo Git
├── package-lock.json   # Registro de dependências exatas do npm
├── package.json        # Configurações e dependências do projeto
├── questions.json      # Dados de perguntas do quiz
├── README.md           # Documentação do projeto
└── server.js           # Implementação do server-side
```

## Como Usar

### Pré-requisitos

- Navegador web (Chrome, Firefox, Safari, Edge)
- Node.js instalado (para executar o servidor)

### Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/mathzpereira/c115-client-server-chatbot.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd c115-client-server-chatbot
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   node server.js
   ```

5. Acesse a aplicação em seu navegador:
   ```bash
   http://localhost:3000
   ```

## Autor

### Matheus Pereira - [GitHub](https://github.com/mathzpereira)
