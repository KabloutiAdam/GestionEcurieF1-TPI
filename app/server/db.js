
const sqlite3 = require("sqlite3").verbose();




const db = new sqlite3.Database("dbFiles/gestion.db");


db.run("PRAGMA foreign_keys = ON;");

module.exports = db;
