const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const env = require('dotenv');
const PORT = process.env.PORT||3000;

const app = express()


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my Form')
})

app.post('/api/form', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port:456,
        auth:{
            user:'wildbirdiedog@gmail.com',
            pass: 'env'
        }
    });

    // app.get('/', function(req, res, next) {
    //     // Handle the get for this route
    //   });
      
    //   app.post('/', function(req, res, next) {
    //    // Handle the post for this route
    //   });

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


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})