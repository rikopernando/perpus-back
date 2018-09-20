const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

module.exports = {
    index : (req,res) => {
        models.Book.count().then((total) => {

            let page = req.query.page
            let per_page = 10
            let prev_page = parseInt(page) - 1
            let count_page = per_page * page
            let total_page = Math.ceil(total / per_page)
            let offset
            let next_page

            prev_page === 0 ? offset = 0 : offset = prev_page * per_page
            count_page > total ? next_page = null : next_page = parseInt(page) + 1

            models.Book.all({
              attributes: ['id','author_id','amount','cover','title'],
              offset : offset, limit : per_page,
              include : [
                {
                  model : models.Author,
                  attributes: ['name'],
                }
              ]
            }).then((book) => {
              let data = []
              book.forEach((books) => {
                data.push({
                  id : books.id,
                  title : books.title,
                  amount : books.amount,
                  author : books.Author.name
                })
              })
              res.status(200).json({
                  message: 'Success Read Book',
                  data: data,
                  paginate: { total, page, next_page, prev_page, total_page }
              });
            })
            .catch((err) => {
              res.status(500).json({
                  message: 'Fail Read Book!',
                  errors : err
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Book!',
              errors : err
          });
        })
    },

    search : (req,res) => {
        const { query, page } = req.query

        models.Book.count({
          where: {
              [Op.or]: [
                {
                  title: {
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

            models.Book.all({
              attributes: ['id','author_id','amount','cover','title'],
              where: {
                  [Op.or]: [
                    {
                      title: {
                        [Op.like]: `%${query}%`
                      }
                    }
                  ]
              },
              offset : offset, limit : per_page,
              include : [
                {
                  model : models.Author,
                  attributes: ['name'],
                }
              ]
            }).then((book) => {
              let data = []
              book.forEach((books) => {
                data.push({
                  id : books.id,
                  title : books.title,
                  amount : books.amount,
                  author : books.Author.name
                })
              })
              res.status(200).json({
                  message: 'Success Read Book',
                  data: data,
                  paginate : { total, page, next_page, prev_page, total_page }
              });
            })
            .catch((err) => {
              res.status(500).json({
                  message: 'Fail Read Book!',
                  errors : err
              });
            })

        })
        .catch((err) => {
          res.status(500).json({
              message: 'Fail Read Book!',
              errors : err
          });
        })

    },

    create : (req,res) => {

      req.assert('title','Judul harus diisi').notEmpty() 
      req.assert('author_id','Penulis harus diisi').notEmpty() 
      req.assert('amount','Jumlah harus diisi').notEmpty() 
      const errors = req.validationErrors()

      const { title, author_id, amount } = req.body
      const imageFile = req.files.cover

      if(!errors){

          models.sequelize.transaction().then((t) => {
            return models.Book.create({
              title : title,
              author_id : author_id,
              amount : amount,
              cover : imageFile.name
            },{transaction : t}).then((result) => {
              return result
            }).then(async (result) => {
                try {
                    const cover = `${new Date().toISOString()} - ${imageFile.name}`
                    imageFile.mv(`${__dirname}/../public/images/123${cover}`, (err) => {
                      if(err){
                        console.log(err)
                      }
                    })
                    t.commit()
                    res.status(200).json({
                       message : 'Success Create Books',
                       data : result,
                    })

                } catch (err) {
                  console.log(err)
                }
            })
            .catch((err) => {
              t.rollback()
              res.status(500).json({
                message : 'Fail Create Books',
                errors : err
              })
            })
          })

      }else{
        res.status(500).json({
          message : 'Fail Create Books',
          errors : errors
        })
      }

    }
}
