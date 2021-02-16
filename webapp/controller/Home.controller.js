sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller, JSONModel, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Home", {

		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onItemSelected: function (oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");
			oProductDetailPanel.bindElement({ path: sPath });

		},
		onUpdate: function () {
			var productId = this.byId("productId").getValue();
			var productName = this.byId("productName").getValue();
			var quantityPerUnit = this.byId("quantityPerUnit").getValue();
			var unitPrice = this.byId("unitPrice").getValue();
			var unitsInStock = this.byId("unitInStock").getValue();
			var oData = { ProductId: productId, ProductName: productName, QuantityPerUnit: quantityPerUnit, UnitPrice: unitPrice, UnitsInStock: unitsInStock };
			this.getView().getModel().update("/Products(" + productId + ")", oData, { success: function () { }, error: function () { } });
		},
		onCopy: function () {
			var panel = this.byId("productCopyPanel");
			var productId = this.byId("productId").getValue() + 100;
			var productName = this.byId("productName").getValue();
			var quantityPerUnit = this.byId("quantityPerUnit").getValue();
			var unitPrice = this.byId("unitPrice").getValue();
			var unitsInStock = this.byId("unitInStock").getValue();
			// create an entry of the Products collection with the specified properties and values
			var oContext = this.getView().getModel().createEntry("/Products", { properties: { ProductID: productId, ProductName: productName, QuantityPerUnit: quantityPerUnit, UnitPrice: unitPrice, UnitsInStock: unitsInStock } });
			// binding against this entity
			panel.setBindingContext(oContext);
		},

		onSave: function () {
			this.getView().getModel().submitChanges( { success: function () { alert("success!")}, error: function () { } });
		}
	});
});