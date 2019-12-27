/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
module.exports = {
	initExpress: function () {
		var xsenv = require("@sap/xsenv");
		var xsHDBConn = require("@sap/hdbext");
		var xssec = require("@sap/xssec");
		//logging
		var logging = require("@sap/logging");
		
		var passport = require("passport");
		var express = require("express");

		var appContext = logging.createAppContext();

		//Initialize Express App for XS UAA and HDBEXT Middleware
		var app = express();
		passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
			uaa: {
				tag: "xsuaa"
			}
		}).uaa));
		app.use(logging.middleware({appContext: appContext, logNetwork: true}));
		app.use(passport.initialize());
		var hanaOptions = xsenv.getServices({
			hana: {
				tag: "hana"
			}
		});
		app.use(
			passport.authenticate("JWT", {
				session: false
			}),
			xsHDBConn.middleware(hanaOptions.hana)
		);
		return app;
	}
};