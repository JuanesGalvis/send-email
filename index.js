var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
const cors = require('cors');
const port = process.env.PORT || 3005;

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || true) {
                   // Err, permitido?
            callback(null, true);
        } else {
            callback(new Error("No permitido"));
        }
    }
}
app.use(cors(options));

app.post('/send', (req, res) => {

    const { email, password, addressee, content, subjectContent } = req.body;

    const {
        name,
        id,
        email_user,
        phone,
        title,
        disability
    } = content;

   var transporter = nodemailer.createTransport({
       service: 'gmail',
       host: 'smtp.gmail.com',
       auth: {
           user: email,
           pass: password
       }
   })

   var mailOptions = {
       form: 'Remitente',
       to: addressee,
       subject: subjectContent,
       text: 'Email enviado desde Node',
       html: `
       <section style="width: 400px;
        text-align: center;
        padding: 20px 0px;
        box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);">
          <img width="100px" height="100px" src="https://i.postimg.cc/05VkCqYh/Mesa-de-trabajo-3.png" alt="Logo de la corporación Ofiartes  ">
          <h1 style="color: #FF6565;
        font-size: 40px;
        font-weight: 700;
        margin: 20px auto;">${title}</h1>
          <p style="  background-color: #414141;
        margin: 0 auto;
        color: white;
        width: 300px;
        padding: 10px 5px;
                    text-align: center;">
            <a style="color: white; text-decoration: none;">
                ${email_user}
            </a>
            </p>
          <ul style="width: 310px;">
              <li style="list-style: none;
        font-size: 18px;"><span>Nombre:</span> ${name}</li>
              <li style="list-style: none;
        font-size: 18px;"><span>Identificación:</span> ${id}</li>
              <li style="list-style: none;
        font-size: 18px;"><span>Teléfono:</span> ${phone}</li>
        ${ disability ? `
        <li style="list-style: none;
        font-size: 18px;"><span>Discapacitad@:</span> ${disability}</li>`: ''}
          </ul>
          <button style="background-color: #FF6565;
        color: white;
        width: 30%;
        padding: 10px 5px;
        text-align: center;
        border: 0;
        border-radius: 10px;">Botón</button>
      </section>
     `,
   }

   transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send("Error no se pudo enviar")
        } else {
            console.log("Email enviado correctamente");   
            res.status(200).jsonp(req.body)
        }
   })

});

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3005");
})