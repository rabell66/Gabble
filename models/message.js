'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    body:{ 
      type: DataTypes.TEXT}
  }, 
  {}
  );
    message.associate = function(models) {
    message.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
    message.hasMany(models.like , { as: "likes", foreignKey: "messageid" });
  };
  return message;
};