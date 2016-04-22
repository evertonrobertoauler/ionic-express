var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: config.db.logging,
  storage: config.db.storage
});

var Playlists = sequelize.define('playlists', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  title: Sequelize.TEXT
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

module.exports = {
  Playlists: Playlists
};
