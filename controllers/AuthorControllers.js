const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

module.exports = {
    index : (req,res) => {
        models.Author.count().then((total) => {

            let page = req.query.page
            let per_page = 10
            let prev_page = parseInt(page) - 1
            let count_page = per_page * page
            let total_page = Math.ceil(total / per_page)
            let offset
            let next_page

            prev_page === 0 ? offset = 0 : offset = prev_page * per_page
            count_page > total ? next_page = null : next_page = parseInt(page) + 1

            models.Author.findAll({
              attributes: ['id','name'],
              offset : offset, limit : per_page
            }).then((author) => {
              res.status(200).json({
                  message: 'Success Read Author',
                  data: author,
                  paginate : { total, page, next_page, prev_page, total_page }
              });
            })
            .catch((err) => {
              res.status(500).json({
                  message: 'Fail Read Author!',
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
          });
        })
    },

    search : (req,res) => {
        const { query, page } = req.query

        models.Author.count({
          where: {
              [Op.or]: [
                {
                  name: {
                    [Op.like]: `%${query}%`
                  }
                }
              ]
          }
        }).then((total) => {

            let per_page = 10
            let prev_page = parseInt(page) - 1
            let count_page = per_page * page
            let total_page = Math.ceil(total / per_page)
            let offset
            let next_page

            prev_page === 0 ? offset = 0 : offset = prev_page * per_page
            count_page > total ? next_page = null : next_page = parseInt(page) + 1

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
              },
              offset : offset, limit : per_page
            }).then((author) => {
              res.status(200).json({
                  message: 'Success Read Author',
                  data: author,
                  paginate : { total, page, next_page, prev_page, total_page }
              });
            })
            .catch((err) => {
              res.status(500).json({
                  message: 'Fail Read Author!',
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
          });
        })

    }
}
