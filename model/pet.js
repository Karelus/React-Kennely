"use strict";
const db = require('../controller/db');

module.exports = class Pet {

    constructor(pet) {
        this.pet = pet;
    }

    save() {
        var query = db.query("INSERT INTO pet SET ?", this.pet, function(error, result) {
            if (error) throw error;
            console.log("1 record insterted, ID: ", result.insertId);
        });
        console.log(query.sql);
    }

    update(id) {
        let sql = "UPDATE pet SET ? WHERE id = ?";

        var query = db.query(sql, [this.pet, id], function(error, result) {
            if (error) throw error;
            console.log(result.affectedRows + " record(s) updated");
        });
        console.log(query.sql);
    }

    delete(id) {
        var query = db.query("DELETE FROM pet WHERE id = ?", id, function(error, result) {
            if (error) throw error;
            console.log("Number of records deleted: " + result.affectedRows);
        });
        console.log(query.sql);
    }

};