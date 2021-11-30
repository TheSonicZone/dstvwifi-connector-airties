function WirelessAp(inst) {
	this.data = {
		"inst" : inst,
		"ssid" : ""
	};
}

WirelessAp.prototype.inst = function() {
	return this.data.inst;
};

WirelessAp.prototype.ssid = function(value) {
	if (value != undefined) {
		this.data.ssid = value;
	}
	return this.data.ssid;
};

WirelessAp.prototype.load = function(callbackFn) {
	function parse() {
		this.ssid(webapp.getValue(this.inst(), "ssid"));
		callbackFn();
	}

	var webapp = new Webapp();
	webapp.add("command", "cfgmgr-0", "begin_transaction", this.inst());
	webapp.add("get", this.inst(), "ssid");
	webapp.add("command", "cfgmgr-0", "end_transaction", this.inst());
	webapp.sendAjax($.proxy(parse, this, webapp));
};

function WirelessCore() {
	this.data = {
		"inst" : "wireless_core-0",
		"apScan" : {
			"state" : WirelessApScanState.NOT_STARTED,
			"list" : []
		},
		"staState" : "",
		"sta_ssid" : "",
		"sta_sec_mode" : "",
		"sta_txmode" : "",
		"aps" : []
	};
}

WirelessCore.prototype.staSsid = function(value) {
	if (value != undefined) {
		this.data.sta_ssid = value;
	}

	return this.data.sta_ssid;
};

WirelessCore.prototype.staTxMode = function() {
	if (value != undefined) {
		this.data.sta_txmode = value;
	}

	return this.data.sta_txmode;
};

WirelessCore.prototype.staSecMode = function() {
	if (value != undefined) {
		this.data.sta_sec_mode = value;
	}

	return this.data.sta_sec_mode;
};

WirelessCore.prototype.aps = function(value) {
	if (value != undefined) {
		this.data.aps = value;
	}
	return this.data.aps;
};

if (Array.prototype.filter == undefined) {
	Array.prototype.filter = function (filterFn) {
		return $.grep(this, filterFn);
	}
}

WirelessCore.prototype.ap = function(p) {
	if (isNaN(p)) {
		return this.aps().filter(function(element) {
		return element.inst() == p;
		})[0];
	} else {
		return this.aps()[p];
	}
};

WirelessCore.prototype.load = function(callbackFn) {
	this.aps([]);
	this.aps().push(new WirelessAp("wireless_ap-0"));
	this.ap("wireless_ap-0").load(callbackFn);
};

WirelessCore.prototype.staState = function(value) {
	if (value != undefined) {
		this.data.staState = value;
	}
	return this.data.staState;
};

WirelessCore.prototype.validateGatewayConnectionSetup = function(apListItem) {
	switch(apListItem.security()) {
		case "wpa":
		case "wpa2":
		case "wpa_both":
			if (!new RegExp("^(?!\x20)[\x20-\x7f]{7,63}[\x21-\x7f]$").test(apListItem.password())) {
				alert(__ML_wireless_operating_mode_password_error_wpa);
				return false;
			}
			break;
		case "wep":
			if (!new RegExp("^(([0-9A-Fa-f]{10})|([\\s\\S]{5})|([0-9A-Fa-f]{26})|([\\s\\S]{13})|([0-9A-Za-z]{58})([0-9A-Fa-f]{24}))$").test(apListItem.password())) {
				alert(__ML_wireless_operating_mode_password_error_web);
				return false;
			}
			break;

	}

	return true;

};

WirelessCore.prototype.validateRepeaterSetup = function(apListItem) {
	if (!this.validateGatewayConnectionSetup(apListItem)) {
		return false;
	}
	return true;
};

WirelessCore.prototype.validateBridgeSetup = function(apListItem) {
	if (!this.validateGatewayConnectionSetup(apListItem)) {
		return false;
	}
	return true;
};

WirelessCore.prototype.setGatewayConnectionSetup = function(apListItem, callbackFn) {
	if (__DEF_change_wpa_both_to_wpa2_on_sta_or_repeater_mode && apListItem.security() == "wpa_both") {
		apListItem.security("wpa2");
	}

	var webapp = new Webapp();
	webapp.add("command", "cfgmgr-0", "begin_transaction", this.inst());
	webapp.add("set", this.inst(), "op_mode", apListItem.mode());
	webapp.add("set", this.inst(), "sta_ssid", apListItem.ssid());
	webapp.add("set", this.inst(), "sta_sec_mode", apListItem.security());
	webapp.add("set", this.inst(), "sta_txmode", apListItem.protocol());
	switch(apListItem.security()) {
		case "wpa":
		case "wpa2":
		case "wpa_both":
			webapp.add("set", this.inst(), "sta_wpa_password", apListItem.password());
			break;
		case "wep":
			webapp.add("set", this.inst(), "sta_wep_key1", apListItem.password());
			break;

	}
	webapp.add("command", "cfgmgr-0", "commit", this.inst());
	webapp.add("command", "cfgmgr-0", "end_transaction", this.inst());
	webapp.add("command", "cfgmgr-0", "save");
	webapp.add("command", this.inst(), "apply");

	var checkBridgeConnectionState = $.proxy(this.checkBridgeConnectionState, this, callbackFn);
	webapp.sendAjax(function() {
		setTimeout(checkBridgeConnectionState, 30000);
	});
};

WirelessCore.prototype.checkBridgeConnectionState = function(callbackFn) {
	function sendQuery() {
		var webapp = new Webapp();
		webapp.retryCount(30);
		webapp.retryDelay(5000);
		webapp.add("query", this.inst(), "sta_state");
		webapp.add("query", this.inst(), "sta_error_reason");
		webapp.sendAjax($.proxy(parseQuery, this, webapp));
	}

	function parseQuery(webapp) {
		switch(webapp.getValue(this.inst(), "sta_state")) {
			case "STA_CONNECTED":
				this.staState(WirelessStaState.CONNECTED);
				break;
			case "":
			case "STA_CONNECTING":
				this.staState(WirelessStaState.CONNECTING);
				break;
			case "STA_DOWN":
				switch(webapp.getValue(this.inst(), "sta_error_reason")) {
					case "wrong_password":
						this.staState(WirelessStaState.WRONG_PASSWORD);
						break;
					case "not_found":
						this.staState(WirelessStaState.STA_NOT_FOUND);
						break;
					case "wrong_sec_type":
						this.staState(WirelessStaState.WRONG_SEC_MODE);
						break;
					default:
						this.staState(WirelessStaState.DISCONNECTED);
				}
				break;
		}

		if (this.staState() == WirelessStaState.CONNECTING) {
			setTimeout($.proxy(sendQuery, this), 5000);
		} else {
			callbackFn();
		}
	}


	sendQuery.call(this);
};

WirelessCore.prototype.setRepeaterSetup = function(apListItem, callbackFn) {

	if (!this.validateRepeaterSetup(apListItem)) {
		return false;
	}

	apListItem.mode("repeater");

	this.setGatewayConnectionSetup(apListItem, callbackFn);
};

WirelessCore.prototype.setBridgeSetup = function(apListItem, callbackFn) {

	if (!this.validateBridgeSetup(apListItem)) {
		return false;
	}

	apListItem.mode("sta");

	this.setGatewayConnectionSetup(apListItem, callbackFn);
};

WirelessCore.prototype.inst = function() {
	return this.data.inst;
};

WirelessCore.prototype.apScanState = function(val) {
	if (val != undefined) {
		this.data.apScan.state = val;
	}

	return this.data.apScan.state;
};

WirelessCore.prototype.apScanList = function(val) {
	if (val != undefined) {
		this.data.apScan.list = val;
	}
	return this.data.apScan.list;
};

WirelessCore.prototype.getApScanListItemBySsid = function(ssid) {
	try {
		return this.apScanList().filter(function(element) {
		return element.ssid() == ssid;
		})[0];
	} catch(e) {
		return new ApListItem();
	}

};

WirelessCore.prototype.startApScan = function(callbackFn, forceReScan) {
	var webapp = new Webapp();
	webapp.add("command", this.inst(), "ap_scan");
	webapp.sendAjax($.proxy(this.checkApScanState, this, callbackFn));
};

WirelessCore.prototype.checkApScanState = function(callbackFn) {
	function parseApScanState(webapp) {
		switch(webapp.getValue(this.inst(), "ap_scan_status")) {
			case "NO_SCAN":
				this.apScanState(WirelessApScanState.RUNNING);
				break;
			case "SCAN_OK":
				this.apScanState(WirelessApScanState.FINISHED);
				break;
		}

		if (this.apScanState() == WirelessApScanState.FINISHED) {
			this.loadApList(callbackFn);
		} else {
			var proxyFn = $.proxy(this.checkApScanState, this, callbackFn);
			setTimeout(proxyFn, 1000);
		}
	}

	var webapp = new Webapp();
	webapp.add("query", this.inst(), "ap_scan_status");

	webapp.sendAjax($.proxy(parseApScanState, this, webapp));
};

WirelessCore.prototype.loadApList = function(callbackFn) {
	this.apScanList([]);
	var tempApList = [];
	var counter = 0;

	function sendApListQuery(counter) {
		var webapp = new Webapp();
		webapp.add("query", this.inst(), "ap_list", counter);
		webapp.sendAjax($.proxy(parseApList, this, counter, webapp));
	}

	function parseApList(counter, webapp) {

		while (webapp.getValue(this.inst(), "AP" + (++counter) + ".mac") != "") {
			if (webapp.getValue(this.inst(), "AP" + counter + ".ssid") != "") {
				var apListItem = new ApListItem();
				apListItem.ssid(webapp.getValue(this.inst(), "AP" + counter + ".ssid"));
				apListItem.mac(webapp.getValue(this.inst(), "AP" + counter + ".mac"));
				apListItem.channel(webapp.getValue(this.inst(), "AP" + counter + ".channel"));
				apListItem.protocol(webapp.getValue(this.inst(), "AP" + counter + ".protocol"));
				apListItem.security(webapp.getValue(this.inst(), "AP" + counter + ".security").toLowerCase());
				apListItem.rssi(webapp.getValue(this.inst(), "AP" + counter + ".rssi"));
				tempApList.push(apListItem);
			}
		}

		if (webapp.getValue(this.inst(), "ap_requery") == "1") {
			sendApListQuery.call(this, --counter);
		} else {
			tempApList = $.grep(tempApList, function(element) {
				return $.grep(tempApList, function(e) {
					return e.ssid() == element.ssid() && e.rssi() < element.rssi();
				}).length == 0;
			});
			
			tempApList.sort(function(a,b){return a.rssi() == b.rssi() ? 0 : a.rssi() < b.rssi() ? -1 : 1})

			this.apScanList(tempApList);
			callbackFn();
		}
	}


	sendApListQuery.call(this, 0);
};
