clearTimeout(errorTimer);

function BridgeSetupController() {
    this.models = {
        "wirelessCore" : new WirelessCore()
    };

    this.views = {
        "waitingForApScanView" : new WaitingForApScanView(),
        "apListView" : new ApListView(),
        "apScanFinishedView" : new ApScanFinishedView(),
        "apScanFinishedButCouldNotFindAnyNetworkView" : new ApScanFinishedButCouldNotFindAnyNetworkView(),
        "connectingToApView" : new ConnectingToApView(),
        "connectedView" : new ConnectedView(),
        "notConnectedView" : new NotConnectedView(),
        "wrongPasswordView" : new WrongPasswordView()
    };

    this.dialogs = {
        "connectToApDialog" : new ConnectToApDialog()
    };

    $(this.dialogs.connectToApDialog).bind("connectClicked", $.proxy(this.connect, this));

    $(this.views.apListView).bind("rescanClicked", $.proxy(this.getApList, this, true));
    $(this.views.apListView).bind("apClicked", $.proxy(this.apSelected, this));

    $(this.views.apScanFinishedButCouldNotFindAnyNetworkView).bind("rescanClicked", $.proxy(this.getApList, this, true));
    $(this.views.apScanFinishedView).bind("nextClicked", $.proxy(this.showApListView, this));
    $(this.views.apScanFinishedView).bind("advancedSetupClicked", $.proxy(this.showAdvancedSetup, this));

    $(this.views.notConnectedView).bind("startOverClicked", $.proxy(this.showApListView, this));

    $(this.views.wrongPasswordView).bind("connectClicked", $.proxy(this.connect, this));
    $(this.views.wrongPasswordView).bind("backClicked", $.proxy(this.showApListView, this));

    this.getApList();
}

BridgeSetupController.prototype.showAdvancedSetup = function(event) {
    top.location.href = "/main.html?redirect=homepage.html";
};
BridgeSetupController.prototype.apSelected = function(event, index) {
    this.dialogs.connectToApDialog.open(this.models.wirelessCore.apScanList()[index]);
};
BridgeSetupController.prototype.connect = function(event, ssid, password) {
    var self = this;
    $.ajax({
        url : __DEF_conn_medium_url,
        dataType : "json",
        async : false,
        success : function(data) {
            if (data.conn_medium.type == "wireless") {
                self.reConnectToWirelessTimeout = setTimeout(function() {
                    $("body").reConnectToWirelessView({
                        ssid : ssid
                    }).on("nextClicked", function() {
						self.bridgeSetupFailedTimeout = setTimeout(function() {
							if ($("body").data("reConnectToWirelessView")) {
								$("body").reConnectToWirelessView("destroy");
							}
							$("body").bridgeSetupFailed();
						}, 60000);
                        $("body").html(self.views.connectingToApView.render(ssid, self.models.wirelessCore.ap(0).ssid()));
                    });
                }, 60000);
            }
        }
    });
    var apListItem = this.models.wirelessCore.getApScanListItemBySsid(ssid);
    apListItem.password(password);
    if (!this.models.wirelessCore.validateBridgeSetup(apListItem)) {
        return false;
    }

    $("body").html(this.views.connectingToApView.render(ssid, this.models.wirelessCore.ap(0).ssid()));

    this.models.wirelessCore.setBridgeSetup(apListItem, $.proxy(this.bridgeSetupFinished, this, apListItem));
};
BridgeSetupController.prototype.getApList = function(forceReScan) {
    $("body").html(this.views.waitingForApScanView.render());
    function resume() {
        this.models.wirelessCore.startApScan($.proxy(this.showApScanFinishedView, this), forceReScan);
    }


    this.models.wirelessCore.load($.proxy(resume, this));
};
BridgeSetupController.prototype.bridgeSetupFinished = function(apListItem) {
    if ($("body").data("reConnectToWirelessView")) {
        $("body").reConnectToWirelessView("destroy");
    }
    if ($("body").data("bridgeSetupFailed")) {
        $("body").bridgeSetupFailed("destroy");
    }
    clearTimeout(this.reConnectToWirelessTimeout);
    clearTimeout(this.bridgeSetupFailedTimeout);

    switch(this.models.wirelessCore.staState()) {
        case WirelessStaState.CONNECTED:
            $("body").html(this.views.connectedView.render(apListItem.ssid()));
            break;
        case WirelessStaState.WRONG_PASSWORD:
            $("body").html(this.views.wrongPasswordView.render(apListItem.ssid()));
            this.views.wrongPasswordView.focus();
            break;
        case WirelessStaState.WRONG_SEC_MODE:
            break;
        case WirelessStaState.STA_NOT_FOUND:
        case WirelessStaState.DISCONNECTED:
        default:
            $("body").html(this.views.notConnectedView.render(apListItem.ssid()));
    }
};
BridgeSetupController.prototype.showApScanFinishedView = function() {
    if (this.models.wirelessCore.apScanList().length == 0) {
        $("body").html(this.views.apScanFinishedButCouldNotFindAnyNetworkView.render());
        this.views.apScanFinishedButCouldNotFindAnyNetworkView.animate();
    } else {
        $("body").html(this.views.apScanFinishedView.render());
    }
};
BridgeSetupController.prototype.showApListView = function() {
    $("body").html(this.views.apListView.render(this.models.wirelessCore.apScanList()));
};

var bridgeSetupController;
$(document).ready(function() {
    bridgeSetupController = new BridgeSetupController();
});
