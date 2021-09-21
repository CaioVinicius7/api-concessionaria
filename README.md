# API concessionária

### Essa API foi desenvolvida a fins de estudo e aprendizado, ela conta com um CRUD completo e alguams outras funcionalidades

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
- [ ] Sistema de logout
	-

### Rotas

|       Funcionalidade       |                            Descrição                            |           Endpoint           | metódo | parâmetro opcional? |
|:--------------------------:|:---------------------------------------------------------------:|:----------------------------:|:------:|:-------------------:|
| adicionar um veículo       | adiciona um novo registro referente a um veículo                | /addVehicle                  |  post  |    sem parâmetro    |
| editar um veículo          | edita um registro referente a um veículo                        | /editVehicle/id              |  patch |         não         |
| deletar um veículo         | exclui um registro referente a um veículo                       | /deleteVehicle/id            | delete |         não         |
| vender veiculo             | edita o status de um veículo para vendido                       | /sellVehicle/id              |  patch |         não         |
| listar veiculos            | lista todos os veículos registrados                             | /listVehicles/status         |   get  |         sim         |
| listar veículos por tipo   | lista todos os veículos registrados com um tipo específico      | /listVehilesByType/type      |   get  |         não         |
| listar veículos por modelo | lista todos os veículos registrados com um modelo específico    | /listVehiclesByModel/model   |   get  |         não         |
| listar veículo por id      | lista um veículos especifico por id                             | /listVehicle/id              |   get  |         não         |
| adicionar um usuário       | adiciona um novo registro referente a um usuário administrativo | /addUser                     |  post  |    sem parâmetro    |
| editar um usuário          | edita um registro referente a um usuário administrativo         | /editUser/id                 |  patch |         não         |
| deletar um usuário         | exclui um registro referente a um usuário administrativo        | /deleteUser/id               | delete |         não         |
| listar todos os usuários   | lista todos os usuários administrativos registrados             | /listUsers/user              |   get  |         sim         |
| listar usuário por id      | lista um usuário administrativo por id                          | /listUser/id                 |   get  |         não         |
| login de um usuário        | faz o login de um usuário administrativo                        | /login                       |  post  |    sem parâmetro    |

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
- [mysql](https://github.com/mysqljs/mysql)
- [jwt](https://github.com/auth0/node-jsonwebtoken#reademe)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [nodemailer](https://nodemailer.com/about/)
- [redis](https://www.npmjs.com/package/redis)

### Autor
---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://scontent.fguj3-1.fna.fbcdn.net/v/t1.6435-9/142052074_3709793379112018_4012923653098423199_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=M6BAMRIcOXMAX82huD8&_nc_ht=scontent.fguj3-1.fna&oh=0320f7a4e1ed79a4938fce6918fcf9f3&oe=61421F3E" width="100px;" alt=""/>
 <br />
 <h2><b>Caio Vinícius</b></h2></a>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)