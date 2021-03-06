'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    cover: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    models.Book.belongsTo(models.Author,{
      foreignKey: 'author_id'
    })
  };
  return Book;
};
