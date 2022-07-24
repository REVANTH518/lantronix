const { Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    user_id: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: false
    },
    user_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: false
    },
    first_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
      primaryKey: false
    },
    last_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
      primaryKey: false
    },
    is_active: {
      type: Sequelize.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {tableName: 'users', timestamps: false})
}
