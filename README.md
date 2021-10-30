# 📧 SendEmail
> API para enviar emails a Gmail con Node.js + librería Nodemailer

## 💻 Uso:
### 🔐 Datos de la cuenta:
- 🙊 Para enviar emails desde tu correo debes proporcionar el email y su contraseña
- 💢 En caso de tener segundo factor de autenticación puedes crear una clave de aplicación en tu Gmail (  https://myaccount.google.com/apppasswords ) la envías como contraseña

### 📃 Datos a enviar (body) :
- El primer email es TU correo (remitente)
- La contraseña o la clave generada
- El destinatario simplemente envias su correo
- En content va la información que deseas mostrar en el correo

```json

{
    "email":        "________@gmail.com",
    "password":     "_____",
    "addressee":    "_____",
	"subjectContent": "_____",
    "content": {
        "title": "____",
        "name":     "____",
        "lastName": "____",
        "age":     "____",
        "email":    "____"
    }
}

```
> Estos datos son temporales, la API se adaptará para poder enviar más campos 

## 💛 Ejemplo JavaScript
```javascript

fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "email":        "________@gmail.com",
        "password":     "_____",
        "addressee":    "_____",
        "subjectContent": "_____",
        "content": {
            "title": "____",
            "name":     "____",
            "lastName": "____",
            "age":     "____",
            "email":    "____"
        }
    })
}).then((res) => res.json() ).then((data) => console.log(data));

```