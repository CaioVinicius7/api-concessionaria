class Tabelas{

   init(conexao){

      this.conexao = conexao;
      this.tabelasVeiculos();

   }

   // Cria a tabela de atendimentos
   tabelasVeiculos(){

      const sql = "CREATE TABLE IF NOT EXISTS veiculos (idVeiculo int NOT NULL AUTO_INCREMENT, tipo varchar(25) NOT NULL, modelo varchar(50) NOT NULL, ano int NOT NULL, preco float NOT NULL, precoTabela float NOT NULL, procedencia varchar(30) NOT NULL, porte varchar(15) NOT NULL, lugares int NOT NULL, portas int, cambio varchar(10) NOT NULL, marchas int NOT NULL, mediaConsumo float NOT NULL, descricao text NOT NULL, observacao text, status varchar(10) NOT NULL, PRIMARY KEY(idVeiculo))";

      this.conexao.query(sql, (erro) => {

         if(erro){
            console.log(`Ocorreu um erro ao criar as tabelas: ${erro}`);
         }else{
            console.log(`Tabela de veículos criada com sucesso!`);
         }

      });

   }

}

module.exports = new Tabelas;