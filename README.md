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
- [ ] Sistema de login
	-

### Rotas

|       Funcionalidade       |                           Descrição                           |           Endpoint           | metódo | parâmetro opcional? |
|:--------------------------:|:-------------------------------------------------------------:|:----------------------------:|:------:|:-------------------:|
| adicionar um veículo       | adiciona um novo registro referente a um veículo              | /adicionarVeiculo            |  post  |         não         |
| editar um veículo          | edita o registro referente a um veículo                       | /editarVeiculo/id            |  patch |         não         |
| deletar um veículo         | exclui o registro referente a um veículo                      | /excluirVeiculos/id          | delete |         não         |
| vender veiculo             | edita o status de um veículo para vendido                     | /veiculoVendido/id           |  patch |         não         |
| listar veiculos            | lista todos os veículos registrados                           | /listarVeiculos/status       |   get  |         sim         |
| listar veículos por tipo   | lista todos os veículos registrados com um tipo específico    | /listarVeiculo/tipo          |   get  |         não         |
| listar veículos por modelo | lista todos os veículos registrados com um modelo específico  | /listarVeiculosModelo/modelo |   get  |         não         |
| listar veículo por id      | lista um veículos especifico por id                           | /listarVeiculo/id            |   get  |         não         |

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
- [body-parser](https://github.com/expressjs/body-parser)
- [express-validator](https://express-validator.github.io/docs/)
- [multer](https://github.com/expressjs/multer)
- [mysql](https://github.com/mysqljs/mysql)

### Autor
---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://scontent.fguj3-1.fna.fbcdn.net/v/t1.6435-9/142052074_3709793379112018_4012923653098423199_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=M6BAMRIcOXMAX82huD8&_nc_ht=scontent.fguj3-1.fna&oh=0320f7a4e1ed79a4938fce6918fcf9f3&oe=61421F3E" width="100px;" alt=""/>
 <br />
 <h2><b>Caio Vinícius</b></h2></a>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)