/*eslint no-console: 0*/
"use strict";

var http = require("http");
var port = process.env.PORT || 3000;
var xsenv = require("@sap/xsenv");
var server = require("http").createServer();

global.__base = __dirname + "/";
var init = require(global.__base + "utils/initialize");

//Initialize Express App for XSA UAA and HDBEXT Middleware
var app = init.initExpress();

//Setup Routes
var router = require("./router")(app, server);

//Start the Server
server.on("request", app);

server.listen(port, function() {
	console.info("HTTP Server: " + server.address().port);
});

//Simple Database Select - In-line Callbacks
//Example1 handler
app.get("/example1", function(req, res) {
var client = req.db;
client.prepare(
	"select SESSION_USER from \"DUMMY\" ",
	function(err, statement) {
		if (err) {			
			res.type("text/plain").status(500).send("ERROR: " + err.toString());	return;	}
	statement.exec([],
		function(err, results) {
			if (err) {			
				res.type("text/plain").status(500).send("ERROR: " + err.toString());	return;						

		} else {							
			var result = JSON.stringify({ Objects: results});					
			res.type("application/json").status(200).send(result);
		}
		});
	});
});
