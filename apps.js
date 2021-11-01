const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3800;
const fs = require('fs');

app.use(express.static('Public'));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

var users = require("./data/user.json")

//router
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

//read data
app.get('/api/v1/user', (req, res) => {
    res.status(200).json(users)
})
//get data
app.get('/api/v1/user/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.send("NO DATA FOUND")
    }
})

//login validation
app.post("/login", (req, res) => {
            const { username, password }  = req.body
            for(var user of users){
                if(user.username === username && user.password === password) {
                    return res.redirect('/games');
            }
        };
    })

//register 
app.post('/register', (req,res) => {
    const {username, password} = req.body
    //get id 
    const id = users[users.length -1].id + 1
    const register = {
        id, username, password
    }
    users.push(register)
    console.log(users)
    
    fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 1), "utf8");
    res.redirect('/login')
})

app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`)
})

