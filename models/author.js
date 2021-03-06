'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
   models.Author.hasMany(models.Book, { foreignKey : 'author_id', sourceKey : 'id'}) 
  };
  return Author;
};
