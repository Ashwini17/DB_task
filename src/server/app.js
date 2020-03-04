
const mysql = require('mysql');
module.exports = function (type, cb) {
  //create connection
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbdata',
  });

  //connect
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('mysql connected');
  });

  const query = 'select sum(betrag) as total from task where fk_belegtype=' + type;
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    return cb(results);
  });

  db.end()

}
const transform = data => {

  const res = {};

  data.forEach(journey => {
    if (res[journey.reisedatum]) {
      if (res[journey.reisedatum][journey.fk_belegtype]) {
        res[journey.reisedatum][journey.fk_belegtype] += journey.betrag;
      } else {
        res[journey.reisedatum][journey.fk_belegtype] = journey.betrag;
      }
    } else {
      res[journey.reisedatum] = {
        [journey.fk_belegtype]: journey.betrag,
      }
    }
  });

  return res;
}
