const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3800;
const fs = require('fs');
const { Usergame, usergamebiodata } = require('./models');
const users = require('./data/user.json');

app.use(express.static('Public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))


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

// CREATE
app.get('/users/create', (req, res) => {
    res.render('user_create');
  });
  app.post('/users/create', (req, res) => {
    const { email, username, password, name } = req.body;
  
    Usergame.create({ email, username, password }).then((newUser) => {
      usergamebiodata.create({
        name,
        user_id: newUser.id,
      });
      res.status(201).catch((error) => {
        res.status(422).json("Can't create user", error);
      });
    });
  });
  
  // READ
  app.get('/users', (req, res) => {
    Usergame.findAll({
      include: usergamebiodata,
    })
      .then((data) => {
        res.render('user', { data });
      })
      .catch((error) => {
        console.log('oopps! something wrong', error);
      });
  });
  
  // UPDATE
  app.get('/users/update/:id', (req, res) => {
    Usergame.findOne({
      where: { id: req.params.id },
      include: usergamebiodata,
    }).then((user) => {
      res.render('user_update', { user });
    });
  });
  app.post('/users/update/:id', (req, res) => {
    const { email, username, password, name } = req.body;
  
    Usergame.update(
      { email, username, password },
      { where: { id: req.params.id }, returning: true }
    )
      .then((user) => {
        Usergame.findOne({
          where: { id: req.params.id },
          include: usergamebiodata,
        }).then((user1) => {
          usergamebiodata.update(
            {
              name,
            },
            { where: { id: user1.usergamebiodatum.id } }
          );
          res.status(201);
        });
      })
      .catch((error) => {
        res.status(400).json("Can't update user", error);
      });
  });
  
  // DELETE
  app.get('/users/delete/:id', (req, res) => {
    Usergame.destroy({ where: { id: req.params.id }, returning: true }).then(
      (_) => {
        res.redirect('/user');
      }
    );
  });


app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`)
})

