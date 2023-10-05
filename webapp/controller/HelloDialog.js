sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment",
    "sao/ui/core/syncStyleClass"
], function(ManagedObject, Fragment, syncStyleClass) {
    "use strict"

    return ManagedObject.extend("sap.ui.walkthrough.controller.HelloDialog", {

        constructor: function(oView) {
            this._oView = oView
        },

        exit: function() {
            delete this._oView;
        },

        open: function() {
            var oView = this._oView;

            // create the dialog lazily
            if (!oView.byId("helloDialog")) {
                var oFragmentController = {
                    onCloseDialog: function() {
                        oView.byId("helloDialog").close();
                    }
                }

                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.HelloDialog",
                    controller: oFragmentController
                }).then(function(oDialog) {
                    // connect dialog to the root view of the component (models, lifecycle)
                    oView.addDependent(oDialog);
                    // forward compact/cozy style into dialog
                    syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog)
                    oDialog.open();
                })
            } else {
                oView.byId("helloDialog").open();
            }
        }
    });
});