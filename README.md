# API concessionária

### Essa API foi desenvolvida a fins de estudo e aprendizado, ela conta com um CRUD de veículos, um CRUD de usuários, sistema de autenticação, sistema de envio de email e algumas outras funcionalidades

<h2 align="center"> 
	🚧 Em construção... 🚧
</h2>

### Features
	
- [X] CRUD de veículos
	-
- [X] Sistema de upload de imagens
	-
- [X] CRUD de usuários
	-
- [X] Sistema de envio de e-mail
	-
- [X] Sistema de login
	-
- [X] Sistema de logout
	-
- [X] Sistema de refresh token
	-	
- [X] Implementação de ORM
	-
- [X] CRUD de clientes
	-
- [X] CRUD de vendas
	-
- [X] Relacionamento de tabelas
	-
- [X] Paginação de dados
	-


### Rotas


|        Funcionalidade       |                            Descrição                            |         Endpoint              | metódo |   parâmetro opcional?  |
|:---------------------------:|:---------------------------------------------------------------:|:-----------------------------:|:------:|:----------------------:|
| adicionar um veículo        | adiciona um novo registro referente a um veículo                | /vehicles                     |  post  |      sem parâmetro     |
| editar um veículo           | edita um registro referente a um veículo                        | /vehicles/:id                 |  patch |           não          |
| deletar um veículo          | exclui um registro referente a um veículo                       | /vehicles/:id                 | delete |           não          |
| listar veiculos             | lista todos os veículos registrados                             | /vehicles/:status/:page       |   get  |           sim          |
| listar veículos por tipo    | lista todos os veículos registrados com um tipo específico      | /vehiclesByType/:type/:page   |   get  |           não          |
| listar veículos por modelo  | lista todos os veículos registrados com um modelo específico    | /vehiclesByModel/:model/:page |   get  |           não          |
| listar veículo por id       | lista um veículos especifico por id                             | /vehicle/:id                  |   get  |           não          |
| adicionar um usuário        | adiciona um novo registro referente a um usuário administrativo | /users                        |  post  |      sem parâmetro     |
| editar um usuário           | edita um registro referente a um usuário administrativo         | /users/:id                    |  patch |           não          |
| deletar um usuário          | exclui um registro referente a um usuário administrativo        | /users/:id                    | delete |           não          |
| listar os usuários por nome | lista todos os usuários administrativos registrados por nome    | /users/:page                  |   get  |      sem parâmetro     |
| listar os usuários          | lista todos os usuários administrativos registrados             | /users/:nome/:page            |   get  |           não          |
| listar usuário por id       | lista um usuário administrativo por id                          | /user/:id                     |   get  |           não          |
| verificar e-mail de usuário | define o e-mail do usuário como verificado                      | /verifyEmail/:token           |   get  |           não          |
| solicitar reset de senha    | envia um email para o usuário para redefinir a senha da conta   | /resetPassword                |   get  |      sem parâmetro     |
| reset de senha              | redefine a senha do usuário                                     | /changePassword/:token        |  patch |           não          |
| adicionar um cliente        | adiciona um novo registro referente um cliente                  | /clients                      |  post  |      sem parâmetro     |
| editar um cliente           | edita um registro referente a um cliente                        | /clients/:id                  |  patch |           não          |
| deletar um cliente          | exclui um registro referente a um cliente                       | /clients/:id                  | delete |           não          |
| lsitar os clientes          | lista todos os clientes registados                              | /clients/:page                |   get  |           sim          |
| lsitar os clientes por nome | lista todos os clientes registados por nome                     | /clients/:name/:page          |   get  |           sim          |
| listar cliente por id       | lista um cliente por id                                         | /client/:id                   |   get  |           não          |
| adicionar uma venda         | adiciona um novo registro referente a uma venda                 | /sales                        |  post  |      sem parâmetro     |
| editar uma venda            | edita um registro referente a uma venda                         | /sales/:id                    |  patch |           não          |
| deletar uma venda           | exclui um registro referente a uma venda                        | /sales/:id                    | delete |           não          |
| listar todas as vendas      | lista todas as vendas registradas                               | /sales/:page                  |   get  |      sem parâmetro     |
| listar uma venda por id     | lista uma venda por id                                          | /sale/:id                     |   get  |           não          |
| login de um usuário         | faz o login de um usuário administrativo                        | /login                        |  post  |      sem parâmetro     |
| logout de um usuário        | faz o logout de um usuário administrativo                       | /logout                       | delete |      sem parâmetro     |
| gerar refresh token         | gera um refresh token referente a um token de um usuário logado | /refreshToken                 |  post  |      sem parâmetro     |
---

### OBS: Todas os endpoints de listagem de dados dvem receber o parâmetro de paginação (page), caso contrário ese irá listar apenas os cinco primeiros registros

---

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/CaioVinicius7/api-concessionaria.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd api-concessionaria

# Instale as dependências
$ npm install

# Rode as migrations
$ npx prisma migrate deploy

# Rode as seeds
$ npx prisma db seed

# Execute a aplicação
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/pt-br/)
- [moment.js](https://momentjs.com/)
- [express-validator](https://express-validator.github.io/docs/)
- [multer](https://github.com/expressjs/multer)
- [jwt](https://github.com/auth0/node-jsonwebtoken#reademe)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [nodemailer](https://nodemailer.com/about/)
- [redis](https://www.npmjs.com/package/redis)
- [prisma](https://www.prisma.io/)

### Autor
---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62827681?s=400&u=f0b18831e6690a901f956d637933b9ee2dca3104&v=4" width="100px;" alt=""/>
 <br>
 <h2><b>Caio Vinícius</b></h2></a>

<h4> Feito com muito carinho e dedicação :) </h4>

<br>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)