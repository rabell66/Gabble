'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user',  {
       name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      displayname: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull:true
   } },
  {}
  );

   user.associate = function(models) {
    user.hasMany(models.message, { as: "message", foreignKey: "authorid" });
    // user.hasMany(models.comment, { as: "comments", foreignKey: "authorid" });
  };

  return user;
};