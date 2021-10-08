# API concessionária

### Essa API foi desenvolvida a fins de estudo e aprendizado, ela conta com um CRUD de veículos, um CRUD de usuários, sistema de autenticação, sistema de envio de email e algumas outras funcionalidades

<h2 align="center"> 
	🚧 Em construção... 🚧
</h2>

### Features
	
- [x] Cadastro de veículos
	-
- [x] Cadastro de imagem associada a cada veículo
	-
- [x] Listagem de veículos
	-
- [x] Listagem de veículos por id
	-
- [x] Listagem de veículos por tipo
	-
- [x] Listagem de veículos por modelo
	-
- [x] Edição de veículos
	-
- [x] Exclusão de veículos
	-
- [x] Cadastro de usuários
	-
- [x] Listagem de usuários 
	-
- [x] Edição de usuários 
	-
- [x] Exclusão de Usuários
	-
- [X] Sistema de login
	-
- [X] Sistema de logout
	-
- [X] Sistema de refresh token
	-

### Rotas

|       Funcionalidade       |                            Descrição                            |           Endpoint           | metódo | parâmetro opcional? |
|:--------------------------:|:---------------------------------------------------------------:|:----------------------------:|:------:|:-------------------:|
| adicionar um veículo       | adiciona um novo registro referente a um veículo                | /adicionarVeiculo            |  post  |    sem parâmetro    |
| editar um veículo          | edita um registro referente a um veículo                        | /editarVeiculo/id            |  patch |         não         |
| deletar um veículo         | exclui um registro referente a um veículo                       | /excluirVeiculos/id          | delete |         não         |
| vender veiculo             | edita o status de um veículo para vendido                       | /veiculoVendido/id           |  patch |         não         |
| listar veiculos            | lista todos os veículos registrados                             | /listarVeiculos/status       |   get  |         sim         |
| listar veículos por tipo   | lista todos os veículos registrados com um tipo específico      | /listarVeiculo/tipo          |   get  |         não         |
| listar veículos por modelo | lista todos os veículos registrados com um modelo específico    | /listarVeiculosModelo/modelo |   get  |         não         |
| listar veículo por id      | lista um veículos especifico por id                             | /listarVeiculo/id            |   get  |         não         |
| adicionar um usuário       | adiciona um novo registro referente a um usuário administrativo | /adicionarUsuario            |  post  |    sem parâmetro    |
| editar um usuário          | edita um registro referente a um usuário administrativo         | /editarUsuario/id            |  patch |         não         |
| deletar um usuário         | exclui um registro referente a um usuário administrativo        | /excluirUsuario/id           | delete |         não         |
| listar todos os usuários   | lista todos os usuários administrativos registrados             | /listarUsuarios/usuario      |   get  |         sim         |
| listar usuário por id      | lista um usuário administrativo por id                          | /listarUsuario/id            |   get  |         não         |
| login de um usuário        | faz o login de um usuário administrativo                        | /login                       |  post  |    sem parâmetro    |
| logout de um usuário       | faz o logout de um usuário administrativo                       | /logout                      | delete |    sem parâmetro    |
| gerar refresh token        | gera um refresh token referente a um token de um usuário logado | /refreshToken                |  post  |    sem parâmetro    |

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
- [consign](https://github.com/jarradseers/consign)
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
 <br />
 <h2><b>Caio Vinícius</b></h2></a>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)