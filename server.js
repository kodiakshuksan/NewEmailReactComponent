const express = require('express');
 bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express()



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.get('/', () => {
  res.send('Welcome to my Form')
})

app.post('/api/form', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail' ,
        port:456,
        auth:{
            user:'wildbirdiedog@gmail.com',
            pass:'Moon444!!!'
        }
    });

let mailOptions={
    from:data.email,
    to:`Message from ${data.name}`,
    html:`
    
    <h3>Information</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Lastname: ${data.lastname}</li>
    <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    
    
    `

};

smtpTransport.sendMail(mailOptions, (error,response)=>{
    if (error){
        res.send(error)
    }
    else {
        res.send('success')
    }
    


})

smtpTransport.close();

})

const PORT = process.env.PORT||3001

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})