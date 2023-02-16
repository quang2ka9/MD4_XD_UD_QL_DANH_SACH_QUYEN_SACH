const mysql = require('mysql');
const express = require('express');
const bodeParser = require('body-parser');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'book_manager',
    charset: 'utf8_general_ci',
});

connection.connect(function (err){
    if(err){
        throw err.stack;
    }else {
        console.log('connect database successfully')
    }
});

app.get('/books/create', (req, res)=>{
    res.render('create')
})

app.post("/books/create", (req, res)=>{
const {name, price, status, author} = req.body;
console.log(req.body)
    const sqlInsert = 'insert into books(name, price, status, author) values ?'
    const value = [
        [name, price, status, author]
    ];
connection.query(sqlInsert, [value], function (err, result){
    if (err) throw err;
    res.end('success')
});
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render("index", {books: result});
    });
})


app.listen(PORT, ()=>{
    console.log("Server running on port: + PORT");
});