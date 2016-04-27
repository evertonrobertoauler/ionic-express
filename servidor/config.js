/* Sqlite 3 */
module.exports = {
  auth: {
    secret: 'j8xX6Me5uz9RP9VaBiMA15lC17JtVR5j2S976eoyCZQ0DIQ41n8'
  },
  db: {
    dialect: 'sqlite',
    logging: console.log.bind(console),
    storage: 'playlist.sqlite'
  }
};

/* Postgresql */
// module.exports = {
//     auth: {
//         secret: 'j8xX6Me5uz9RP9VaBiMA15lC17JtVR5j2S976eoyCZQ0DIQ41n8'
//     },
//     db: {
//         dialect: 'postgres',
//         host: 'localhost',
//         database: 'playlist',
//         username: 'playlist',
//         password: 'password',
//         logging: false
//     }
// };
