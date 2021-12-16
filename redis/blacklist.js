const redis = require("redis");
const blacklist = redis.createClient({ prefix: "blacklist: " });
const listManipulator = require("./listManipulator");
const blacklistManipulator = listManipulator(blacklist);

const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

function tokenHashGeneration(token){
   return createHash("sha256", token).update(token).digest("hex");
}

module.exports = {
   
      async addToken(token){
         const decodeToken =  jwt.decode(token);
         const expireDate = decodeToken.exp;
         const tokenHash = tokenHashGeneration(token);
         await blacklistManipulator.addToken(tokenHash, "", expireDate);
      },
      async containsToken(token){
         const tokenHash = tokenHashGeneration(token);
         return blacklistManipulator.containsToken(tokenHash);
      }

};