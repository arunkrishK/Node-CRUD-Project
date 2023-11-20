const express = require("express");
const exphbs =require("express-handlebars");
const bodyparser =require("body-parser");
const mysql=require("mysql");

require('dotenv').config();

const app=express();
const port =process.env.PORT || 5000;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//static files
app.use(express.static("public"));


//Template Engine
const handlebars =exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");





const router = require("./server/routes/student");
app.use('/', router);


//MYSQL
// const conn= mysql.createPool({
//     connectionLimit:10,
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password: process.env.DB_PASS || '', // Set to an empty string if no password or omit it
//     database: process.env.DB_NAME

// });

// conn.getConnection((err, connection)=>{
//     if (err) throw err; // not connected!
// });

//Listen Port
app.listen(port,()=>{console.log(`Server started on ${port}`)});