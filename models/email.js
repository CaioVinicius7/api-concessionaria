const nodemailer = require("nodemailer");

const user = process.env.USER_EMAIL;
const pass = process.env.PASS_EMAIL;
const smtp = process.env.SMTP_EMAIL;
const port = process.env.PORT_EMAIL;

// Classe para configuração envio de email
class Email{

   async sendEmail(){

      // console.log(process.env.NODE_ENV);

      if(process.env.NODE_ENV === "production"){

         // Cria o transportador com as credenciais
         const transporter = nodemailer.createTransport({
            host: smtp,
            port: port,
            secure: false,
            auth: {
               user,
               pass
            }
         });

         await transporter.sendMail(this);

      }else{

         // Cria um conta de teste para o envio de email
         const testAccount = await nodemailer.createTestAccount();
      
         // Cria o transportador de teste
         const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            auth: testAccount
         });
   
         const emailInfo = await transporter.sendMail(this);
         const testEmail = nodemailer.getTestMessageUrl(emailInfo);
      
         console.log(`E-mail de teste: ${testEmail}`);

      }

   }

}

// Classe para envio de email de verificação
class VerificationEmail extends Email{

   // Construtor da classe
   constructor(userData, url){

      super();
      this.from = `Caio vinícius < ${user} >`;
      this.to = userData.email;
      this.subject = "Bem vindo ao nosso sistema!";
      this.text = `Olá ${userData.fullName.split(" ")[0]}, sua conta acabou de ser criada em nosso sistema! desejamos nossas boas vindas! 
                   Verifique seu e-mail aqui: ${url}`;
      this.html = `<p> Olá ${userData.fullName.split(" ")[0]}, sua conta acabou de ser criada em nosso sistema! desejamos nossas boas vindas! </p>
                   <p> Verifique seu e-mail aqui: <a href="${url}" > ${url} </a> </p>`; 

   }

}
   


module.exports = { VerificationEmail };