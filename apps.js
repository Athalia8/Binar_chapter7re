const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3800;
const fs = require('fs');
const methodOverride = require ("method-override");
const users = require('./data/user.json');

app.use(express.static('Public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      return method;
    }
  })
);

app.use(router);

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

app.get("/Partials/user", (req,res) => {
  res.render("partials/user");
});
app.get()
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

//get all data

app.get("/user", (req, res)=> {
  Usergame.findAll({include: Userbiodata}).then((a)=> res.render ("app", {a}))
  .catch((error) => res.status(404).json ("something when wrong, check again"));
});

//post
app.post("/newuser", (req, res) => {
  Usergame.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      approved: req.body.approved,
  })
  .then((a) => res.status(200).json("user berhasil dibuat"))
  .catch((err) => res.status(400).json("Tidak berhasil membuat akun"));
});

app.post("/bio", (req, res) => {
  Usergame.create({
    nama: req.body.email,
    user_id: req.body.user_id,
  })
  .then((a) => res.status(200).json("user berhasil dibuat"))
  .catch((err) => res.status(400).json("Tidak berhasil membuat akun"));
});

app.post("/gamehistory", (req, res) => {
  Usergame.create({
      score: req.body.score,
  })
  .then((a) => res.status(200).json("status berhasil dibuat"))
  .catch((err) => res.status(400).json("status gagal"));
});
//put
app.put("/user/:id", (req, res) => {
  Usergame.update({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    approved: req.body.approved,
  },
  {
      where:{ id: req.params.id},
  })
  .then((a) => res.status(201).json("berhasil update"))
  .catch((err) => res.status(400).json("can't update"));
});

app.put("/bio", (req, res) => {
  Usergame.update({
    nama: req.body.email,
    user_id: req.body.user_id,
  },
  {
    where:{ id: req.params.id},
  })
  .then((a) => res.status(200).json("bio berhasil di update"))
  .catch((err) => res.status(400).json("bio can't update"));
});

app.put("/gamehistory", (req, res) => {
  Usergame.update({
      score: req.body.score,
  },
  {
    where:{ id: req.params.id},
  })
  .then((a) => res.status(200).json("status berhasil diupdate"))
  .catch((err) => res.status(400).json("status gagal diupdate"));

//Delete
app.get('/users/delete/:id', (req, res) => {
  UserGame.destroy({ where: { id: req.params.id }, returning: true }).then(
    (_) => {
      res.redirect('/users');
    });
});

app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`)
})