"use strict";
const db = require('../controller/db');

module.exports = class User {

    getPet(id) {
        return new Promise(function(resolve, reject) {
            var query = db.query("SELECT * FROM pet WHERE id = ?", id, function(error, result, fields) {
                console.log(result);
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
            console.log(query.sql);
        })      
    }

    getPets(user_id) {
        return new Promise(function(resolve, reject) {
            var query = db.query("SELECT * FROM pet WHERE owner_id = ?", user_id, function(error, result, fields) {
                if (error) {
                    reject(new Error(error));
                } else {
                resolve(result);
                }
            });
            console.log(query.sql);
        });
        
    }
};