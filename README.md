# Movie notes API explorer

A API de anotações de filmes é um projeto desenvolvido no Explorer, com o objetivo de aprimorar e consolidar meus conhecimentos em desenvolvimento backend. Essa aplicação proporciona uma plataforma para os usuários registrarem suas anotações sobre filmes.

## Funcionalidades

[Api reference](./API_RERFENCE.md)

## Tecnologias

- [Knex](https://knexjs.org)
- [Express](https://expressjs.com)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [sqlite](https://www.sqlite.org/index.html)

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.

## Como Usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/rcnald/movie-notes-api.git
   # or
   gh repo clone rcnald/movie-notes-api
   ```
2. Instalar suas dependências
   
    ```
    npm install
    ```
3. Iniciar o banco de dados
    ```
    npm run migrate
    ```
4. Crie um arquivo .env.local na raiz do projeto como mostra no arquivo .env.example. 
	```
	PORT=3333
	```
5. Iniciar a API
    ```
    npm run dev
    ```
    Logo após isso o projeto será iniciado na porta que fora designado no .env.local ( como no exemplo acima : 3333).