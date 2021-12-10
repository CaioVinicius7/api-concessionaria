# Rotas

## Essa é a documentação de todas as rotas da API, nela você poderá ver todos os detalhes de cada uma, como o body, método e algumas observações a respeito de cada.

<br>

 ## ___OBS:___ Para utilizar todas as rotas com exceção de:
 - /login
	-
 - /verifyEmail/:token
   -
 -	/resetPassword
	-
 -	/changePassword/:token
	-
 - /vehicle/:id
	-
 - /vehicles/:status/:page
	-
 - /vehiclesByType/:type/:page
	-
 - /vehiclesByModel/:model/:page
	-
 ## o usuário deverá fazer login no sistema pela rota ``` /login ``` e utilizar o token recebido em ```header > authorization```. esse token deverá ser passado como um ```bearer token``` ao fazer cada requisição para todas as demais rotas. 
---

## Acesso rápido:
 - [Autenticação](#auth)  
	-
 - [Veículos](#vehicles)
	-
 - [Usuários](#users)
	-
 - [Clientes](#clients)
	-
 - [Vendas](#sales)
	-

<div id="auth"></div>	

<br>

# Autenticação

## /login - POST

<br>

#### Faz o login no sistema, gerando um token de acesso e assim possibilitando o usuário a ter acesso ao gerenciamento dos dados. 

<br>

## Exemplo:

```
   http://localhost:3000/login
```

### BODY (JSON)

```json
{
	"email": "usuario@gmail.com",       - STRING (EIMAIL)
	"password": "senhaSuperSecreta_123" - STRING  
}
```
---

<br>

## /refreshToken - POST

<br>

#### Gera um novo token utilizando o refresh token que o usuário recebeu ao fazer login, assim possibilitando que o usuário continue logado sem a necessidade de fazer login novamente após o tempo de expiração do token. 

<br>

## Exemplo:

```
   http://localhost:3000/refreshToken
```

### BODY (JSON)

```json
{
	"refreshToken": "1354e6a2b155a5dc7b039c023af7bc3e00b61d00de346584" - STRING 
}
```

---

<br>

## /logout - DELETE

<br>

#### Faz o logout de um usuário invalidando o seu token, assim o desconectando do sistema. 

<br>

## Exemplo:

```
   http://localhost:3000/logout
```

### BODY (JSON)

```json
{
	"refreshToken": "1354e6a2b155a5dc7b039c023af7bc3e00b61d00de346584" - STRING 
}
```

---
<div id="vehicles"></div>	

<br>

# Veículos

## /vehicles - POST 

<br>

#### Adiciona um novo registro referente a um veículo.

<br>

## Exemplo:

```
   http://localhost:3000/vehicles
```

### BODY (JSON)

```json
{
	"img": "https://i.imgur.com/HGJaWYO.jpeg",      - STRING
	"type": "carro",                                - STRING
	"model": "uno",                                 - STRING
	"manufacturer": "fiat",                         - STRING
	"year": 2006,                                   - NUMBER (INT)  
	"price": "10000",                               - STRING
	"listPrice": "11500",                           - STRING
	"procedence": "nacional",                       - STRING
	"size": "compacto",                             - STRING
	"places": 5,                                    - NUMBER (INT)
	"ports": 4,                                     - NUMBER (INT) - OPCIONAL
	"exchange": "manual",                           - STRING
	"marches": 5,                                   - NUMBER (INT)
	"urbanConsume": 11.6,                           - NUMBER (FLOAT)
	"roadConsume": 13.2,                            - NUMBER (FLOAT)
	"description": "essa é a descrição do veículo", - STRING
	"observation": "essa observação é aleatória"    - STRING - OPCIONAL
}
```

### OBS: O campo img não precisa ser necessáriamente uma url, ele também pode receber uma imagem (PNG, JPG e JPEG) atráves do multipart form.

<br>

---

<br>

## /vehicles/:id - PATCH 

<br>

#### Edita o registro referente a um veículo.

<br>

## Exemplo:

```
   http://localhost:3000/vehicle/1
```

### OBS: é obrigatório passar o id.

<br>

### BODY (JSON)

```json
{
	"img": "https://i.imgur.com/HGJaWYO.jpeg",      - STRING
	"type": "carro",                                - STRING
	"model": "uno",                                 - STRING
	"manufacturer": "fiat",                         - STRING
	"year": 2006,                                   - NUMBER (INT)  
	"price": "10000",                               - STRING
	"listPrice": "11500",                           - STRING
	"procedence": "nacional",                       - STRING
	"size": "compacto",                             - STRING
	"places": 5,                                    - NUMBER (INT)
	"ports": 4,                                     - NUMBER (INT) - OPCIONAL
	"exchange": "manual",                           - STRING
	"marches": 5,                                   - NUMBER (INT)
	"urbanConsume": 11.6,                           - NUMBER (FLOAT)
	"roadConsume": 13.2,                            - NUMBER (FLOAT)
	"description": "essa é a descrição do veículo", - STRING
	"observation": "essa observação é aleatória"    - STRING - OPCIONAL
}
```

### OBS: O campo img não precisa ser necessáriamente uma url, ele também pode receber uma imagem (PNG, JPG e JPEG) atráves do multipart form.

<br>

---

<br>

## /vehicles/:id - DELETE 

<br>

#### Exclui o registro referente a um veículo.

<br>

## Exemplo:

```
   http://localhost:3000/vehicles/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /vehicle/:id - GET 

<br>

#### Lista o registro referente a um veículo por id.

<br>

## Exemplo:

```
   http://localhost:3000/vehicle/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /vehicles/:status/:page - GET 

<br>

#### Lista todos os veículos de acordo com o status, devemos utilizar o parâmetro status para filtrar a listagem. o paramêtro status pode receber dois valores:
- __venda__: para listar os veículos à venda
- __vendido__: para listar os veículos que já foram vendidos  
#### e o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros. 

<br>

## Exemplo:

```
   http://localhost:3000/vehicles/venda/2
```

### OBS: é obrigatório passar os dois parâmetros.

<br>

---

<br>

## /vehiclesByType/:type/:page - GET 

<br>

#### Lista todos os veículos do tipo escolhido (carro, moto, etc...), devemos utilizar o parâmetro type para filtrar a listagem, passando o tipo de veículo que queremos buscar. e o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros. 

<br>

## Exemplo:

```
   http://localhost:3000/vehiclesByType/carro/2
```

### OBS: é obrigatório passar os dois parâmetros.

<br>

---

<br>

## /vehiclesByModel/:model/:page - GET 

<br>

#### Lista todos os veículos do model escolhido (uno, camaro, etc...), devemos utilizar o parâmetro model para filtrar a listagem, passando o modelo de veículo que queremos buscar. e o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros. 

<br>

## Exemplo:

```
   http://localhost:3000/vehiclesByModel/uno/2
```

### OBS: é obrigatório passar os dois parâmetros.

---
<div id="users"></div>	

<br>

# Usuários

## /users - POST 

<br>

#### Adiciona um novo registro referente a um usuário administrativo.

<br>

## Exemplo:

```
   http://localhost:3000/users
```

### BODY (JSON)

```json
{
	"fullName": "Novo usuário",                  - STRING
	"email": "usuario@gmail.com",                - STRING (E-MAIL)
	"password": "senha_super_secreta_123",       - STRING 
	"confirmPassword": "senha_super_secreta_123" - STRING
}
```

<br>

---

<br>

## /users/:id - PATCH 

<br>

#### Edita o registro referente a um usuário administrativo.

<br>

## Exemplo:

```
   http://localhost:3000/users/1
```

### OBS: é obrigatório passar o id.

<br>

### BODY (JSON)

```json
{
	"fullName": "Novo usuário",                  - STRING
	"email": "usuario@gmail.com",                - STRING (E-MAIL)
	"password": "senha_super_secreta_123"        - STRING 
}
```

<br>

---

<br>

## /users/:id - DELETE 

<br>

#### Exclui o registro referente a um usuário administrativo.

<br>

## Exemplo:

```
   http://localhost:3000/users/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /user/:id - GET 

<br>

#### Lista o registro referente a um usuário administrativo por id.

<br>

## Exemplo:

```
   http://localhost:3000/users/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /users/:page - GET 

<br>

#### Lista todos os usuários administrativos, devemos utilizar o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros.

<br>

## Exemplo:

```
   http://localhost:3000/users/2
```

### OBS: é obrigatório passar os dois parâmetros.

<br>

---

<br>

## /users/:user/:page - GET 

<br>

#### Lista todos os usuários administrativos por nome, devemos utilizar o parâmetro user para passar o nome de usuário que desejamos buscar 
#### e o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros.

<br>

## Exemplo:

```
   http://localhost:3000/users/caio/1
```

### OBS: é obrigatório passar os dois parâmetros.

<br>

---

<br>

## /verifyEmail/:token - GET 

<br>

#### Essa rota é acessada ao usuário clicar no link que irá receber no e-mail, esse link fica válido por 72 horas e quando acessado ele pega o token (parâmetro) e o utiliza para verificar o e-mail do usuário; 

<br>

## Exemplo:

```
   http://localhost:3000/verifyEmail/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### OBS: é obrigatório passar o token, porém somente o usuário terá o acesso a esse token, pois será enviado para ele a url concatenada com o token.

---

<br>

## /resetPassword - POST

<br>

#### Faz disparar um envio de e-mail para o e-mail do usuário, enviando assim uma url para que ele possa acessar e mudar sua senha.

<br>

## Exemplo:

```
   http://localhost:3000/resetPassword
```

### BODY (JSON)

```json
{
	"email": "usuario@gmail.com" - STRING (E-MAIL)
}
```

---

<br>

## /changePassword/:token - PATCH

<br>

#### Altera a senha de um usuário

<br>

## Exemplo:

```
   http://localhost:3000/changePassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### OBS: é obrigatório passar o token, porém somente o usuário terá o acesso a esse token, pois será enviado para ele a url concatenada com o token.

<br>

### BODY (JSON)

```json
{
	"password": "senhaBolada-123" - STRING
}
```

---
<div id="clients"></div>	

<br> 

# Clientes

## /clients - POST 

<br>

#### Adiciona um novo registro referente a um cliente.

<br>

## Exemplo:

```
   http://localhost:3000/clients
```

### BODY (JSON)

```json
{
	"fullName": "novo cliente",          - STRING
	"email": "cliente@gmail.com",        - STRING (E-MAIL)
	"phone": "(12) 94002-8922",          - STRING (N. DE CELULAR)
	"cpf": "111.111.111-11",			    - STRING (CPF)
	"adress": "algum endereço aleatório" - STRING
}
```

<br>

---

<br>

## /clients/:id - PATCH 

<br>

#### Edita o registro referente a um cliente.

<br>

## Exemplo:

```
   http://localhost:3000/clients/1
```

### OBS: é obrigatório passar o id.

<br>

### BODY (JSON)

```json
{
	"fullName": "novo cliente",          - STRING
	"email": "cliente@gmail.com",        - STRING (E-MAIL)
	"phone": "(12) 94002-8922",          - STRING (N. DE CELULAR)
	"cpf": "111.111.111-11",             - STRING (CPF)
	"adress": "algum endereço aleatório" - STRING
}
```

<br>

---

<br>

## /clients/:id - DELETE 

<br>

#### Exclui o registro referente a um cliente.

<br>

## Exemplo:

```
   http://localhost:3000/clients/1
```

### OBS: é obrigatório passar o id.

---

<br>

## /client/:id - GET 

<br>

#### Lista o registro referente a um cliente por id.

<br>

## Exemplo:

```
   http://localhost:3000/client/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /clients/:page - GET 

<br>

#### Lista todos os clientes, devemos utilizar o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros.

<br>

## Exemplo:

```
   http://localhost:3000/clients/2
```

### OBS: é obrigatório passar os dois parâmetros.

<br>

---

<br>

## /clients/:name/:page - GET 

<br>

#### Lista todos os clientes por nome, devemos utilizar o parâmetro user para passar o nome de usuário que desejamos buscar 
#### e o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros.

<br>

## Exemplo:

```
   http://localhost:3000/clients/jonas/1
```

### OBS: é obrigatório passar os dois parâmetros.

---
<div id="sales"></div>	

<br>

# Vendas

## /sales - POST 

<br>

#### Adiciona um novo registro referente a uma venda, assim deixando o status do veículo como vendido e relacionando essa venda a um cliente.

<br>

## Exemplo:

```
   http://localhost:3000/sales
```

### BODY (JSON)

```json
{
	"sellValue": "10.000", - STRING
	"idClient": 1,         - STRING (ID DO VEÍCULO VENDIDO)
	"idVehicle": 1         - STRING (ID DO CLIENTE QUE REALIZOU A COMPRA)
}
```

<br>

---

<br>

## /sales/:id - PATCH 

<br>

#### Edita o registro referente a uma venda.

<br>

## Exemplo:

```
   http://localhost:3000/sales/1
```

### OBS: é obrigatório passar o id.

<br>

### BODY (JSON)

```json
{
	"sellValue": "10.000", - STRING
	"idClient": 1,         - STRING (ID DO VEÍCULO VENDIDO)
	"idVehicle": 1         - STRING (ID DO CLIENTE QUE REALIZOU A COMPRA)
}
```

<br>

---

<br>

## /sales/:id - DELETE 

<br>

#### Exclui o registro referente a uma venda, assim deixando o status do veículo como a venda novamente e retirando o relacionamendo do usuário com a venda.

<br>

## Exemplo:

```
   http://localhost:3000/sales/1
```

### OBS: é obrigatório passar o id.

---

<br>

## /sale/:id - GET 

<br>

#### Lista o registro referente a uma venda por id.

<br>

## Exemplo:

```
   http://localhost:3000/sale/1
```
### OBS: é obrigatório passar o id.

<br>

---

<br>

## /sales/:page - GET 

<br>

#### Lista todas as vendas, devemos utilizar o parâmetro page para escolher a página, cada página recebe lista uma determinada quantia de registros.

<br>

## Exemplo:

```
   http://localhost:3000/sales/2
```

### OBS: é obrigatório passar os dois parâmetros.

---