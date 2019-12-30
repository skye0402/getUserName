/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";
var express = require("express");

module.exports = function () {
	var app = express.Router();

	//Hello Router
	app.get("/", function (req, res) {
		res.send("Hello World Node.js");
	});

	app.get("/dbsel", function (req, res) {
		var dbClient = req.db;
		dbClient.prepare("SELECT SESSION_CONTEXT('APPLICATIONUSER') \"APPLICATION_USER\" FROM \"DUMMY\";",
			function (err, statement) {
				statement.exec([],
					function (err, results) {
						if (err) {
							res.type("text/plain").status(500).send("ERROR: " + err);
						} else {
							var result = JSON.stringify({
								Objects: results
							});
							res.type("application/json").status(200).send(result);
						}
					});
			});
	});
	return app;
};