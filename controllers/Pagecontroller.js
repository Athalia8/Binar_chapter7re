const { User, Userbiodata, Usergame, sequelize, } = require("../models");
const userbiodata = require("../models/userbiodata");
const usergame = require("../models/usergame");

module.exports = {
    home: (req, res) => {
        res.render("home");
    },

    getFormCreate: (req, res) => {
        res.render("form_create");
    },

    getAllData: (req, res) => {
        User.findAll().then((a) => {
            res.status(200).render("users", {a});
        });
    },

    getUserById: (req, res) => {
        User.findOne({
            model: User,
            where: { id: req.params.id },
            include: [{ model: Userbiodata }, { model: Usergame}],
        }).then((a) => {
            res.status(200).render("user",{a});
        });
    },

    getUpdateById: (req, res) => {
        User.findOne ({
            model: User,
            where: { id: req.params.id },
            include:[{model: userbiodata}, {model: Usesrgame}],
        }).then((a) => {
            res.status(200).render("form_update", {a});
        });

    createData: async (req, res) => {
            const userTransaction = await sequelize.transaction();

            try {
                var reUser = await User.create(
                    {
                        username: req.body.username,
                        password: req.body.password,
                    },
                    {
                        transaction: userTransaction,
                    }
                );
                await userbiodata.create(
                    {
                        userId: resUser.dataValues.id,
                        fullname: req.body.fullname,
                        gender: req.body.gender,
                        address: req.body.address,
                    },
                    {
                        transaction: userTransaction,
                    }
                );
                await usergame.create(
                    {
                        UserId: 
                    }
                )
            }
        }
    }
}