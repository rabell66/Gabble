'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    body: DataTypes.TEXT
  }, 
  {}
  );
    message.associate = function(models) {
    message.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
    // post.hasMany(models.comment, { as: "comments", foreignKey: "postid" });
  };
  return message;
};