const { promisify } = require("util");

module.exports = (list) => {

   const setAsync = promisify(list.set).bind(list);
   const existsAsync = promisify(list.exists).bind(list);
   const getAsync = promisify(list.get).bind(list);
   const delAsync = promisify(list.del).bind(list);

   return {
      
      async addToken(key, value, expireDate){
         await setAsync(key, value);
         list.expireat(key, expireDate);
      },
      async findValue(key){
         return await getAsync(key);
      },
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