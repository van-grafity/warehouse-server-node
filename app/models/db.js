const { reject } = require('bcrypt/promises');
const mysql = require('mysql');
const dbConfig = require('../../config');
var config = mysql.createPool(dbConfig);

var db = {}

db.query = function (sql, params) {
  return new Promise((resolve, reject) => {
    try {
      config.getConnection(function (err, connection) {
        if (err) {
          reject(err);
          return;
        }
        connection.query(sql, params, function (error, results, fields) {
          console.log(`${ sql }=>${ params }`);
          connection.release();
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = db;