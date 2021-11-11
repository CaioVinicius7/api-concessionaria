const { promisify } = require("util");

module.exports = (list) => {

   const setAsync = promisify(list.set).bind(list);
   const existsAsync = promisify(list.exists).bind(list);
   const getAsync = promisify(list.get).bind(list);
   const delAsync = promisify(list.del).bind(list);

   return {
      
      // Adiciona tokens a lista
      async addToken(key, value, expireDate){
         await setAsync(key, value);
         list.expireat(key, expireDate);
      },
      // Recupera o valor de um token
      async findValue(key){
         return await getAsync(key);
      },
      // Verifica se o token está na lista
      async containsToken(key){
         const result = await existsAsync(key);
         return result === 1;
      },
      async deleteToken(key){
         const result = await delAsync(key);
         return result;
      }

   };

};