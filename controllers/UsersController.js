const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

exports.login = (req,res) => {
    const { email, password } = req.body

    models.Users.findOne({
       email: email
    }).then((user) => {
       if(user){
          const checkPassword = bcrypt.compareSync(password, user.password)
          if(checkPassword){
            const token = jwt.sign({ user: {
              id: user.id,
              name: user.name,
              email: user.email
            }},'secret')
            res.status(200).json({
              message: 'Login Berhasil',
              data: { token, role: user.role }
            })
          }else{
            res.status(403).json({
              message: 'Login Gagal',
            })
          }

       }else{
            res.status(403).json({
              message: 'Login Gagal',
            })
       }
    })

}
