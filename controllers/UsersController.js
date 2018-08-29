const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

exports.register = (req,res) => {
    const { name, email, password, confirm_password } = req.body
      if(password === confirm_password) {
        models.User.create({
          name : name,
          email : email,
          role : 'member',
          password : bcrypt.hashSync(password,10)
        })
        .then((users) => {
          res.status(200).json({
            message : 'Registrasi Berhasil',
            data : users
          })
        })
        .catch((err) => {
          res.status(200).json({
            message : 'Registrasi Gagal!',
            data : err
          })
        })
      }else{
       res.status(403).json({
          message : 'Password tidak cocok!',
       })
      }
}

exports.login = (req,res) => {
    const { email, password } = req.body

    models.User.findOne({
       where: {
         email: email
       }
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
              message: 'Password Salah!',
            })
          }

       }else{
            res.status(403).json({
              message: 'Email Salah!',
            })
       }
    })

}
