const Login = require("../models/login");
class LoginController{

   // Faz login
   async login(req, res){
   
      const { body: data } = req;

      try{
         const response = await Login.login(data);

         if(!response){
            return res.status(401).json({ erro: "e-mail ou senha incorretos" });
         }

         return res.set(response.header),
                res.status(200).json(response.body);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Gera um refresh token
   async refreshToken(req, res){

      const token = req.headers.authorization.split(" ")[1];
      const { user } = req;

      try{
         const response = await Login.refresh(user, token, res);
         return res.set(response.header),
                res.status(200).json(response.body);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Faz logout
   async logout(req, res){

      const token = req.headers.authorization.split(" ")[1];
      
      try{
         const response = await Login.logout(token);
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

}

module.exports = new LoginController;