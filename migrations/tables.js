class Tables{

   init(con){

      this.con = con;
      this.vehiclesTable();
      this.usersTable();

   }

   // Cria a tabela de veículos
   vehiclesTable(){

      const sql = "CREATE TABLE IF NOT EXISTS vehicles (idVehicle int NOT NULL AUTO_INCREMENT, type varchar(25) NOT NULL, model varchar(70) NOT NULL, manufacturer varchar(50) NOT NULL, year int NOT NULL, price float NOT NULL, listPrice float NOT NULL, procedence varchar(30) NOT NULL, size varchar(15) NOT NULL, places int NOT NULL, ports int, exchange varchar(20) NOT NULL, marches int NOT NULL, urbanConsume float NOT NULL, roadConsume float NOT NULL, description text NOT NULL, observation text, status varchar(10) NOT NULL, registerDate datetime NOT NULL, sellDate date, img varchar(255) NOT NULL, PRIMARY KEY(idVehicle))";

      this.con.query(sql, (error) => {

         if(error){
            console.log(`Ocorreu um erro ao criar a tabela de veículos: ${error}`);
         }else{
            console.log(`Tabela de veículos criada com sucesso!`);
         }

      });
      
   }

   
   // Tabela de usuários
   usersTable(){
      
      const sql = "CREATE TABLE IF NOT EXISTS users (idUser int NOT NULL AUTO_INCREMENT, fullName varchar(100) NOT NULL, email varchar(80) NOT NULL UNIQUE, password varchar(60) NOT NULL, registerDate datetime NOT NULL, lastLogin dateTime NOT NULL, verifiedEmail varchar(3) NOT NULL, PRIMARY KEY(idUser))";

      this.con.query(sql, (error) => {

         if(error){
            console.log(`Ocorreu um erro ao criar a tabela de usuários: ${error}`);
         }else{
            console.log(`Tabela de usuários criada com sucesso!`);
         }

      });

   }

}

module.exports = new Tables;