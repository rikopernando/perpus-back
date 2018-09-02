const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

module.exports = {
    index : (req,res) => {
        models.Author.findAll({
          attributes: ['id','name'] 
        }).then((author) => {
          res.status(200).json({
              message: 'Success Read Author',
              data: author
          });
        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
          });
        })
    },

    search : (req,res) => {
        const { query } = req.query
        models.Author.findAll({
          attributes: ['id','name'],
          where: {
							[Op.or]: [
								{
									name: {
										[Op.like]: `%${query}%`
									}
								}
							]
          }
        }).then((author) => {
          res.status(200).json({
              message: 'Success Read Author',
              data: author
          });
        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
          });
        })
    }
}
