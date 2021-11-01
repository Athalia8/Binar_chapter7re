const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3800;

app.use(express.static('Public'));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

//router
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/game', (req, res) => {
    const name = req.query.name || 'PLAYER 1'
    res.render('games', {
        name
    })
    res.render('game');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

//api 
//read all data 
app.get('/api/v1/user', (req, res) => {
    res.status(200).json(users)
})

//api get data by id
app.get('/api/v1/user/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.send("NO DATA FOUND")
    }
})

//post data
app.post('/api/v1/user/posts', (req, res) => {
    const {
        username,
        password
    } = req.body
    //Get last of ID
    const id = users[users.length - 1].id + 1
    const user = {
        id,
        username,
        password
    }
    users.push(user)
    console.log(users)

    users = JSON.stringify(users); // use for parsing const into json file 
    fs.writeFileSync("./data/user.json", users, "utf8"); // use for saving the json file.

    res.status(201).json(users)
})

//put data (digunakan untuk rubah data atau insert jika blm pernah ada)
app.put('/api/v1/user/:id', (req, res) => {
    let user = users.filter(i => i.id == req.params.id)
    //"username":"tiko","password":1234,"fullname":"tiko tiko","email":"tiko.pb@gmail.com"

    const params = {
        username: req.body.username,
        password: req.body.password
    }
    user = {
        ...user,
        ...params
    }
    //update 
    users = users.map(i => i.id == user.id ? user : i)
    res.status(200).json(user)
})

//delete data 
app.delete('/api/v1/post/:id', (req, res) => {
    users = users.filter(i => i.id != req.params.id)
    res.status(200).json({
        message: `post dengan id ${req.params.id} berhasil dihapus`
    })
});

//login validation
app.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body
    for (var i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            res.redirect(`/games?name=${users[i].username}`) // if user and password match than redirect into games area 
        }
    }
    // if not found then please study about alert! render
    res.render('login')
});

//register 
app.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body
    //get id 
    const id = users[users.length - 1].id + 1
    const register = {
        username,
        password
    }
    users.push(register)
    console.log(users)

    users = JSON.stringify(users); // use for parsing into json file 
    fs.writeFileSync("./data/user.json", users, "utf8"); // use for saving the json file.
    res.render('register')
})


app.listen(PORT, () => console.log(`The server has started at http://localhost:${PORT}`));