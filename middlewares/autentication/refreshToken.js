const whitelist = require("../../redis/whitelist");

module.exports = async (req, res, next) => {

   try{

      const { refreshToken } = req.body;

      if(!refreshToken){
         return res.status(404).json({ erro: "é necessário enviar um refresh token" });
      }

      // Recupera o id referente ao referesh token 
      const id = await whitelist.findValue(refreshToken);

      if(!id){
         return res.status(401).json({ erro: "refresh token inválido" });
      }

      // Invalida o refersh token caso ele exista
      await whitelist.deleteToken(refreshToken);

      next();


   }catch(error){

      if(refreshToken){

      }

      res.status(500).json(error);

   }

}