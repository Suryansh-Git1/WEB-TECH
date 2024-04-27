const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const { Console } = require('console');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.set('views', path.join('views'));
// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sql1234',
  database: 'digichef'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
console.log("Connection:"+connection);
app.get("/",(req,res)=>{
  res.render('index');
  });
  app.get("/index",(req,res)=>{
    res.render('index');
    });
  app.get("/about",(req,res)=>{
          res.render('about');
          });
          app.get("/login",(req,res)=>{
            res.render('login');
            });
            app.get("/price",(req,res)=>{
                res.render('price');
                });
                app.get("/recipe",(req,res)=>{
                    res.render('recipe');
                    });
  
app.post('/submit', (req, res) => {
  const uname = req.body['username'];
  const password = req.body['password'];
  const querry = 'SELECT password FROM credential WHERE username = ?';
  connection.query(querry, [uname],function (err, results) {

    if (results.length > 0) {
      results.forEach((row) => {
      const pass= (`${row.password}`);
    if (password === pass){
        res.redirect('index');
      }
    else{
      res.render('login');
    }
      });
    } 
});
});
app.listen(port, () => {
  console.log('Server running on port 3000');
});