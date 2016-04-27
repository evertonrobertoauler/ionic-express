var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: config.db.logging,
  storage: config.db.storage
});

var Users = sequelize.define('users', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.TEXT, allowNull: false},
  email: {type: Sequelize.TEXT, unique: true, allowNull: false, validate: {isEmail: true}},
  password: {
    type: Sequelize.TEXT, allowNull: false, validate: {notEmpty: true}, set: function (val) {
      var auth = require('./auth');
      this.setDataValue('password', auth.encryptPassword(val));
    }
  }
}, {
  freezeTableName: true
});

var Playlists = sequelize.define('playlists', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: Sequelize.TEXT, allowNull: false},
  user: {type: Sequelize.INTEGER, allowNull: false, references: {model: Users, key: 'id'}}
}, {
  freezeTableName: true
});

module.exports = {
  sequelize: sequelize,
  Users: Users,
  Playlists: Playlists
};
