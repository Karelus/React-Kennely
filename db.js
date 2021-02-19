var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kennely_database"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "INSERT INTO pet (owner_id, animal, petname, color, avatar, food_storage) VALUES (1, 'dog', 'Rover', '#202020', 'dog1.svg', 1000)";
    var sql = "SELECT * FROM pet";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});