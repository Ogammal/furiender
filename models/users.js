module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('User', {
      id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      username: { type: Sequelize.TEXT },
      email: { type: Sequelize.STRING, validate: { isEmail: true } },
      password: { type: Sequelize.STRING, allowNull: false },
      last_login: { type: Sequelize.DATE },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });

    // User.associate = function(models) {
      
    //   User.hasOne(models.FurinderProfile, {
    //     onDelete: "cascade"
    //   });
    // };
  
  
    return User;
  };