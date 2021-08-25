const multer = require("multer");

const storage = multer.diskStorage({
   // Define o diretorio no qual a imagem será salva
   destination: (req, file, cb) => {
      cb(null, "./uploads");
   },
   // Define o diretorio no qual a imagem será salva
   filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
   }
});

// Verifica se a extensão do aquivo é permitida (PNG ou JPG/JPEG)
const filter = (req, file, cb) => {

   // Extensões permitidas para o arquivo em mimetype
   const extensoesPermitidas = ["image/png", "image/jpg", "image/jpeg"];

   // Se a extensão for alguma extensão permitida ele retorna o mimetype salvo no array
   const extensaoPermitida = extensoesPermitidas.find((extensaoAceita) => {
      return extensaoAceita === file.mimetype;
   });

   if(extensaoPermitida){
      return cb(null, true);
   }
   
   return cb(null, false);

};

// Define o tamanho maximo da imagem que pode ser enviada
const maxSize = {
   fileSize: 1024 * 1024 * 4
};

// Recebe as configurações para salvar uma imagem
const upload = multer({ 
   storage: storage,
   fileFilter: filter,
   limits: maxSize
});


module.exports =  { upload };