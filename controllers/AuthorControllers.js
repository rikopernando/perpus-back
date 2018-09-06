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
                  errors : err
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
              errors : err
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
                  errors : err
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Author!',
              errors : err
          });
        })

    },

    create : (req,res) => {
      const { name } = req.body
      req.assert('name','Nama harus diisi').notEmpty() 
      const errors = req.validationErrors()
      if(!errors){
          models.Author.count({
            where: {name : name}
          })
          .then((total) => {
              if(total === 0){
                  models.Author.create({
                    name : name        
                  })
                  .then((author) => {
                    res.status(200).json({
                      message : 'Success Create Author',
                      data : author
                    })
                  })
                  .catch((err) => {
                    res.status(500).json({
                      message : 'Fail Create Author',
                      errors : [{msg:'Fail Create Author'}]
                    })
                  })
              }else{
                res.status(500).json({
                  message : 'Fail Create Author',
                  errors : [{msg:'Author sudah ada'}]
                })
              }
          })
          .catch((err) => {
            res.status(500).json({
               message : 'Fail Create Author',
               errors : [{msg:'Fail Create Author'}]
            })
          })
      }else{
        res.status(500).json({
          message : 'Fail Create Author',
          errors : errors
        })
      }
    },

		find : (req,res) => {
			models.Author.findOne({
        attributes: ['id','name'],
        where : { id : req.params.id } 
      })
      .then((author) => {
        res.status(200).json({
          message : 'Success Find Author',
          data : author
        })
      })
      .catch((err) => {
        res.status(500).json({
          message : 'Fail Find Author',
          errors : err
        })
      })
		},

    update : (req,res) => {
      const { name } = req.body
      models.Author.findOne({ where : { id : req.params.id }}).then((author) => {
          author.update({ name : name }).then((authors) => {
            res.status(200).json({
              message : 'Success Update Author',
              data : authors
            })
          })
          .catch((err) => {
            res.status(500).json({
              message : 'Fail Update Author',
              errors : err
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          message : 'Fail Update Author',
          errors : err
        })
      })
    },

    destroy : (req,res) => {
      models.Author.findOne({ where : { id : req.params.id }}).then((author) => {
          author.destroy().then((authors) => {
            res.status(200).json({
              message : 'Success Delete Author',
            })
          })
          .catch((err) => {
            res.status(500).json({
              message : 'Fail Delete Author',
              errors : err
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          message : 'Fail Delete Author',
          errors : err
        })
      })
    }
}
