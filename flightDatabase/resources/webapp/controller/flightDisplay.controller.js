sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, ODataModel) {
	"use strict";

	return Controller.extend("gunter.flightDatabase.controller.flightDisplay", {
		onInit: function () {
			//var flightModel = this.getOwnerComponent().getModel("flightModel");
			//this.getView().setModel(flightModel, "flightModel");
		}
	});
});