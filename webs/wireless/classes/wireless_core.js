var wirelessCore = function(instance) {
	this.instance = instance || "";
	this.aps = [];
	this.wds_list = [];
	this.maximumWdsLimit = 0;
	this.wds_list_new = [];
	this.meshExist = __DEF_WirelessMeshMaxCount > 0;
	this.meshEnabled = false;
	this.wpsExist = true;
	this.freqs = {};
	this.operationModes = [];
	this.configSettings = {};
	this.ap_scan = {};
	this.ap_scan.ap_list = [];
	this.pollableSecurityModes = {};
	this.wpaAuthanticationTypes = [];
	this.clientNameCanBeGet = true;
	this.isPowerManageable = true;
	this.wpsPin = "";
	this.requiresReboot = false;
	
	this.parseWpsRoleQuery = function() {
		this.wpsRole = top.xmlResponseObject[this.instance]["wps_role"] == "enrollee" ? "enrollee" : "registrar";
	}

	this.parseWpsPinQuery = function() {
		this.wpsPin = top.xmlResponseObject[this.instance]["wps_pin"];
	};
	
	this.parseLanSettingsQuery = function() {
		try{
		if(top.xmlResponseObject["dhcps-0"]["iface"] == "lan-0") {
			this.clientNameCanBeGet = true;
		} else {
			this.clientNameCanBeGet = false;
		}
		}catch(ex)
		{
			this.clientNameCanBeGet = false;
		}
	};
	
	this.parseWpsStatusQuery = function() {
		this.configSettings.wpsStatus = top.xmlResponseObject[this.instance]["wps_status"];
	};

	this.parseAirTouchQuery = function() {
		this.configSettings.airTouch = top.xmlResponseObject[this.instance]["wps_enabled"] == "1";
	};

	this.parseApAclListQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseAclList();
		}
		if(this.aps[0])
			this.configSettings.aclList = this.aps[0].acl_list;
	};

	this.parseApAclModeQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseAclMode();
		}
		if(this.aps[0])
			this.configSettings.aclMode = this.aps[0].acl_mode;
	};
	this.parseApSecModeQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseSecMode();
		}
	};

	this.parseApStaListQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseStaListQuery();
		}
	};

	this.parseAPListQuery = function() {
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless_ap.inst" + i]) {
			if(i < __DEF_WirelessSSIDMaxCount)
				this.aps.push(new wirelessCoreAP(top.xmlResponseObject["devmgr-0"]["wireless_ap.inst" + i]));
			i++;
		}
	};

	this.parseCapabilitiesQuery = function() {
		var index = 1;
		while(top.xmlResponseObject[this.instance]["type<index>.code".replace("<index>", index)]) {
			var wpaAuthanticationTypesCodeKey = "type<index>.code".replace("<index>", index);
			this.wpaAuthanticationTypes.push({
				"code" : top.xmlResponseObject[this.instance][wpaAuthanticationTypesCodeKey],
				"value" : top.xmlResponseObject[this.instance][wpaAuthanticationTypesCodeKey] == "0" ? "personal" : "enterprise",
				"ml" : top.xmlResponseObject[this.instance][wpaAuthanticationTypesCodeKey] == "0" ? "__ML_personal" : "__ML_enterprise"
			});
			index++;
		}
		index = 1;
		while(top.xmlResponseObject[this.instance]["freq<index>.freq".replace("<index>", index)]) {
			var freqKey = "freq<index>.freq".replace("<index>", index);
			var freqTextKey = "freq<index>.freqValue".replace("<index>", index);
			var freqDefaultChannelKey = "freq<index>.defaultChannel".replace("<index>", index);
			var freqChannelKey = "freq<index>.channels".replace("<index>", index);
			var freqDefaultModeKey = "freq<index>.defaultMode".replace("<index>", index);
			var freqModesKey = "freq<index>.modes".replace("<index>", index);
			var freqModeValuesKey = "freq<index>.modeValues".replace("<index>", index);
			var freqDefaultChannelBwKey = "freq<index>.defaultChanbw".replace("<index>", index);
			var freqtxpowersKey = "freq<index>.txpower".replace("<index>", index);
			var freqtxpowerValuesKey = "freq<index>.txpowerValues".replace("<index>", index);

			var tempObject = {};
			tempObject.text = top.xmlResponseObject[this.instance][freqTextKey];
			tempObject.defaultChannel = top.xmlResponseObject[this.instance][freqDefaultChannelKey];
			tempObject.channels = [];
			tempObject.defaultMode = top.xmlResponseObject[this.instance][freqDefaultModeKey];
			tempObject.modes = {};
			tempObject.txpowers = [];

			var modeArray = top.xmlResponseObject[this.instance][freqModesKey].split("|");
			var modeValueArray = top.xmlResponseObject[this.instance][freqModeValuesKey].split("|");
			var defaultChannelBwArray = top.xmlResponseObject[this.instance][freqDefaultChannelBwKey].split("|");

			for(var i = 0; i < modeArray.length; i++) {
				tempObject.modes[modeValueArray[i]] = {
					text : modeArray[i],
					defaultChannelBw : defaultChannelBwArray[i]
				};
			}

			var channelArray = top.xmlResponseObject[this.instance][freqChannelKey].split("|");

			for(var i = 0; i < channelArray.length; i++) {
				tempObject.channels.push({
					text : channelArray[i],
					code : channelArray[i],
					dfs : (parseInt(channelArray[i]) <= __DEF_radar_last_channel && parseInt(channelArray[i]) >= __DEF_radar_first_channel)
				});
			}

			var txpowerArray = top.xmlResponseObject[this.instance][freqtxpowersKey].split("|");
			var txpowerValueArray = top.xmlResponseObject[this.instance][freqtxpowerValuesKey].split("|");

			for(var i = 0; i < txpowerArray.length; i++) {
				tempObject.txpowers.push({
					text : txpowerArray[i],
					code : txpowerValueArray[i]
				});
			}

			this.freqs[top.xmlResponseObject[this.instance][freqKey]] = tempObject;
			index++;
		}

		var securityModeIndex = 1;
		while(top.xmlResponseObject[this.instance]["securitymode<index>.freq".replace("<index>", securityModeIndex)]) {
			var securityModeFreqKey = "securitymode<index>.freq".replace("<index>", securityModeIndex);
			var securityModeModeKey = "securitymode<index>.mode".replace("<index>", securityModeIndex);
			var securityModeSecurityKey = "securitymode<index>.security".replace("<index>", securityModeIndex);
			this.freqs[top.xmlResponseObject[this.instance][securityModeFreqKey]].modes[top.xmlResponseObject[this.instance][securityModeModeKey]].securityModes = top.xmlResponseObject[this.instance][securityModeSecurityKey].split("|");
			var securityModes = top.xmlResponseObject[this.instance][securityModeSecurityKey].split("|");
			this.freqs[top.xmlResponseObject[this.instance][securityModeFreqKey]].modes[top.xmlResponseObject[this.instance][securityModeModeKey]].securityModes = securityModes;

			for(var secModeIndex = 0; secModeIndex < securityModes.length; secModeIndex++) {
				this.pollableSecurityModes[securityModes[secModeIndex]] = {};
			}
			securityModeIndex++;
		}

		var chanbwIndex = 1;
		while(top.xmlResponseObject[this.instance]["mode<index>.freq".replace("<index>", chanbwIndex)]) {
			var chanbwFreqKey = "mode<index>.freq".replace("<index>", chanbwIndex);
			var chanbwModeKey = "mode<index>.mode".replace("<index>", chanbwIndex);
			var chanbwBwCodeKey = "mode<index>.chanbwValues".replace("<index>", chanbwIndex);
			var chanbwBwTextKey = "mode<index>.chanbw".replace("<index>", chanbwIndex);

			var chanbwCodes = top.xmlResponseObject[this.instance][chanbwBwCodeKey].split("|");
			var chanbwTexts = top.xmlResponseObject[this.instance][chanbwBwTextKey].split("|");

			this.freqs[top.xmlResponseObject[this.instance][chanbwFreqKey]].modes[top.xmlResponseObject[this.instance][chanbwModeKey]].chanbws = {/*bwCodes[i]:{text: bwTexts[i]}*/};

			for(var i = 0; i < chanbwCodes.length; i++) {

				this.freqs[top.xmlResponseObject[this.instance][chanbwFreqKey]].modes[top.xmlResponseObject[this.instance][chanbwModeKey]].chanbws[chanbwCodes[i]] = {
					text : chanbwTexts[i]
				};
			}
			chanbwIndex++;
		}

		var operationModes = top.xmlResponseObject[this.instance]["op_mode_list"].split("|");

		for(var operationMode in operationModes) {
			this.operationModes.push({
				code : operationModes[operationMode],
				text : operationModes[operationMode]
			});
		}
	};

	this.parseChanbwQuery = function() {
		this.configSettings.chanbw = top.xmlResponseObject[this.instance]["chanbw"];
	};

	this.parseChannelQuery = function() {
		this.configSettings.channel = top.xmlResponseObject[this.instance]["channel"];
	};

	this.parseEnabledQuery = function() {
		this.configSettings.enabled = top.xmlResponseObject[this.instance]["enabled"] == "1";
	};

	this.parseFreqQuery = function() {
		this.configSettings.freq = top.xmlResponseObject[this.instance]["freq"];
	};

	this.parseOpModeQuery = function() {
		this.configSettings.opMode = top.xmlResponseObject[this.instance]["op_mode"];
	};

	this.parseStaSsidQuery = function() {
		this.configSettings.staSsid = top.xmlResponseObject[this.instance]["sta_ssid"];
		this.configSettings.staSsid_serialized = $("<div>").text(this.configSettings.staSsid).html().split(" ").join("&nbsp;");
	};

	this.parseStaSecurityModeQuery = function() {
		this.configSettings.staSecurityMode = top.xmlResponseObject[this.instance]["sta_sec_mode"];
	};

	this.parseStaWpaPasswordQuery = function() {
		this.configSettings.staWpaPassword = top.xmlResponseObject[this.instance]["sta_wpa_password"];
	};

	this.parseStaWepPasswordQuery = function() {
		this.configSettings.staWepPassword = top.xmlResponseObject[this.instance]["sta_wep_key1"];
	};

	this.parseStaStateQuery = function() {
		if(typeof top.xmlResponseObject[this.instance] === "undefined" || typeof top.xmlResponseObject[this.instance]["sta_state"] === "undefined") 
		{
			this.configSettings.staState = "connecting";
			return;
		}

		switch(top.xmlResponseObject[this.instance]["sta_state"]) {
			case "STA_CONNECTED":
				this.configSettings.staState = "connected";
				break;
			case "STA_CONNECTING":
				this.configSettings.staState = "connecting";
				break;
			case "STA_DOWN":
				switch(top.xmlResponseObject[this.instance]["sta_error_reason"]) {
					case "wrong_password":
						this.configSettings.staState = "disconnected_wrong_password";
						break;
					case "not_found":
						this.configSettings.staState = "disconnected_not_found";
						break;
					case "wrong_sec_type":
						this.configSettings.staState = "disconnected_wrong_sec_type";
						break;
					default:
				this.configSettings.staState = "disconnected";
				}
				break;				
			default:
				this.configSettings.staState = "";
				break;
		}
	};

	this.parseRebootRequiredQuery = function() {
		// this.requiresReboot = false;
	};

	this.parseStaConnectedApRssiQuery = function() {
		try {
			this.configSettings.staConnectedApRssi = parseInt(top.xmlResponseObject[this.instance]["AP.strength"]);
		} catch(err) {
			this.configSettings.staConnectedApRssi = 100;
		}
	};

	this.parseRatesQuery = function() {
		for(var freq in this.freqs) {
			for(var mode in this.freqs[freq].modes) {
				for(var chanbw in this.freqs[freq].modes[mode].chanbws) {
					this.freqs[freq].modes[mode].chanbws[chanbw].rates = {};
					this.freqs[freq].modes[mode].chanbws[chanbw].sortedRates = [];
					var chanbwRates = top.xmlResponseObject[this.instance]["rates." + mode + "_" + chanbw].split("|");
					var chanbwRateValues = top.xmlResponseObject[this.instance]["rateValues." + mode + "_" + chanbw].split("|");
					this.freqs[freq].modes[mode].chanbws[chanbw].rates["auto"] = {
						text : "Auto"
					};
					this.freqs[freq].modes[mode].chanbws[chanbw].sortedRates.push("auto");
					for(var i = 0; i < chanbwRates.length; i++) {
						this.freqs[freq].modes[mode].chanbws[chanbw].sortedRates.push(chanbwRates[i]);
						this.freqs[freq].modes[mode].chanbws[chanbw].rates[chanbwRates[i]] = {
							text : chanbwRateValues[i]
						};
					}
				}
			}
		}
	};

	this.parseSecurityValuesQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseWpaAuthType();
			this.aps[i].parseSecMode();
			this.aps[i].parseWepAuthType();
			this.aps[i].parseWepKeyType();
			this.aps[i].parseWepKeyIndex();
			this.aps[i].parseWepKey1();
			this.aps[i].parseWepKey2();
			this.aps[i].parseWepKey3();
			this.aps[i].parseWepKey4();
			this.aps[i].parseWpaRekeyInterval();
			this.aps[i].parseWpaRadiusAddr();
			this.aps[i].parseWpaRadiusPort();
			this.aps[i].parseWpaRadiusKey();
			this.aps[i].parseWpaRadiusEapReauthPeriod();
			this.aps[i].parseWpa2RsnPreauth();
			this.aps[i].parseWpaPassword();
		}
	};

	this.parseSSIDQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseSSID();
		}
	};

	this.parseSsidHiddenQuery = function() {

		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseSsidHidden();
		}
	};

	this.parseApEnabledQuery = function() {

		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseEnabled();
		}
	};

	this.parseIsolationQuery = function() {

		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseIsolation();
		}
	};

	this.parseRateQuery = function() {

		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseRate();
		}
	};

	this.parseTxmodeQuery = function() {
		this.configSettings.txmode = top.xmlResponseObject[this.instance]["txmode"];
	};

	this.parseTxpowerQuery = function() {
		this.configSettings.txpower = top.xmlResponseObject[this.instance]["txpower"];
	};

	this.parseWDSListQuery = function() {
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless_wds.inst" + i]) {
			this.wds_list.push(new wirelessWds(top.xmlResponseObject["devmgr-0"]["wireless_wds.inst" + i]));
			i++;
		}

		this.maximumWdsLimit = __DEF_WirelessMeshMaxCount;
	};

	this.parseWDSPropertiesQuery = function() {
		for(var i = 0; i < this.wds_list.length; i++) {
			this.wds_list[i].parseEnabled();
			this.wds_list[i].parseMac();
			if(this.wds_list[i].mac != "" && this.wds_list[i].enabled)
				this.meshEnabled = true;
		}
	};

	this.parseApScanStatusQuery = function() {
		if( typeof top.xmlResponseObject[this.instance] != "undefined") {
			this.ap_scan.status = "nope";
		}

		switch(top.xmlResponseObject[this.instance]["ap_scan_status"]) {
			case "NO_SCAN":
				this.ap_scan.status = "nope";
				break;
			case "SCAN_OK":
				this.ap_scan.status = "ok";
				break;
		}
	};

	this.parseApScanResultQuery = function(counter) {
		try {
			counter = counter || 0;
			counter++;
			while(top.xmlResponseObject[this.instance]["AP" + counter + ".mac"]) {
				var tempObj = {};
				tempObj.ssid = top.xmlResponseObject[this.instance]["AP" + counter + ".ssid"] || "";
				tempObj.ssid_serialized = tempObj.ssid.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				tempObj.mac = top.xmlResponseObject[this.instance]["AP" + counter + ".mac"];
				tempObj.channel = top.xmlResponseObject[this.instance]["AP" + counter + ".channel"];
				tempObj.protocol = top.xmlResponseObject[this.instance]["AP" + counter + ".protocol"];
				tempObj.security = top.xmlResponseObject[this.instance]["AP" + counter + ".security"].toLowerCase();
				tempObj.rssi = top.xmlResponseObject[this.instance]["AP" + counter + ".rssi"];
				this.ap_scan.ap_list.push(tempObj);
				counter++;
			}
			this.ap_scan.ap_requery = top.xmlResponseObject[this.instance]["ap_requery"];
		} catch(e) {
			this.ap_scan.ap_requery = "0";
		}
	};

	this.saveAclAdd = function(value) {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].setAclAdd(value);
		}
	};

	this.saveAclDelete = function(value) {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].setAclDelete(value);
		}
	};

	this.saveAclMode = function(value) {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].setAclMode(value);
		}
	};

	this.saveAirTouch = function(value) {
		value = value ? "1" : "0";
		globalModel.addSet({
			instance : this.instance,
			key : "wps_enabled",
			value : value
		});
	};

	this.saveChanbw = function(value) {
		if(__DEF_WirelessCoreRequiresRebootOnChanbwChanged && this.configSettings.chanbw != value){
			this.requiresReboot = true;
		}
		globalModel.addSet({
			instance : this.instance,
			key : "chanbw",
			value : value
		});
	};

	this.saveChannel = function(value) {
		if(__DEF_WirelessCoreRequiresRebootOnChannelChanged && this.configSettings.channel != value){
			this.requiresReboot = true;
		}
		globalModel.addSet({
			instance : this.instance,
			key : "channel",
			value : value
		});
	};

	this.saveEnabled = function(value) {
		value = value ? "1" : "0";
		globalModel.addSet({
			instance : this.instance,
			key : "enabled",
			value : value
		});
	};

	this.saveFreq = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "freq",
			value : value
		});
	};

	this.saveOpMode = function(value) {
		if(__DEF_WirelessCoreRequiresRebootOnOpModeChanged && this.configSettings.opMode != value){
			this.requiresReboot = true;
		}
		if (value == "ap") {
			global.setCookie({
				name : "ap_scan",
				value : "done",
				hours : -1
			});
		}
		globalModel.addSet({
			instance : this.instance,
			key : "op_mode",
			value : value
		});
	};

	this.saveStaSsid = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_ssid",
			value : value
		});
	};

	this.saveStaTxMode = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_txmode",
			value : value
		});
	};

	this.saveStaSecurityMode = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_sec_mode",
			value : value
		});
	};

	this.saveStaWepPassword = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_wep_key1",
			value : value
		});
	};

	this.saveStaWpaPassword = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_wpa_password",
			value : value
		});
	};

	this.saveStaWepPassword = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_wep_key1",
			value : value
		});
	};

	this.saveMode = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "txmode",
			value : value
		});
	};

	this.saveTxpower = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "txpower",
			value : value
		});
	};

	this.saveWDSPropertiesQuery = function() {
		for(var i = 0; i < this.wds_list.length; i++) {
			if(this.wds_list[i].instance != "") {
				if(this.wds_list[i].removed) {
					globalModel.addCommand({
						instance : "devmgr-0",
						key : "stop_inst",
						value : this.wds_list[i].instance
					});
				}
			}
		}
	};

	this.saveWDSPropertiesQuery2 = function() {
		for(var i = 0; i < this.wds_list.length; i++) {
			if(this.wds_list[i].instance != "") {
				if(this.wds_list[i].removed) {
					globalModel.addCommand({
						instance : "devmgr-0",
						key : "delete_inst",
						value : this.wds_list[i].instance
					});
				} else {
					globalModel.addSet({
						instance : this.wds_list[i].instance,
						key : "enabled",
						value : this.wds_list[i].enabled ? "1" : "0"
					});
				}
			} else if(!this.wds_list[i].removed) {
				this.wds_list_new.push({
					"mac" : this.wds_list[i].mac,
					"enabled" : this.wds_list[i].enabled
				});
			}
		}
		//globalModel.addCommand({instance: "cfgmgr-0", key: "save", value: ""});
	};

	this.saveWDSPropertiesQuery3 = function() {
		var returnValue = false;
		if(this.wds_list_new.length > 0) {
			globalModel.addCommand({
				instance : "devmgr-0",
				key : "create_inst",
				value : "wireless_wds"
			});
		} else {
			returnValue = true;
		}
		return returnValue;
	};

	this.saveWDSPropertiesQuery4 = function() {
		var newInstance = top.xmlResponseObject["devmgr-0"]["create_inst.wireless_wds"];
		globalModel.addSetForNewInstance({
			instance : newInstance,
			key : "enabled",
			value : this.wds_list_new[0].enabled ? "1" : "0"
		});
		globalModel.addSetForNewInstance({
			instance : newInstance,
			key : "mac",
			value : this.wds_list_new[0].mac
		});

		globalModel.addAfterSaveCommand({
			instance : "devmgr-0",
			key : "start_inst",
			value : newInstance,
			afterSave : true
		});

		this.wds_list_new.splice(0, 1);
	};
	
	this.sendWpsRoleQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "wps_role"
		});
	}

	this.sendWpsPinQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "wps_pin"
		});
	}
	
	this.sendLanSettingsQuery = function() {
		globalModel.addGet({
			instance : "dhcps-0",
			key : "settings"
		});
	}

	this.sendApply = function() {
		global.setCookie({
			name : "ap_scan",
			value : "-",
			hours : -1
		});
		globalModel.addAfterSaveCommand({
			instance : this.instance,
			key : "apply",
			afterSave : true
		});
	};

	this.sendAirTouchQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "wps_enabled"
		});
	};

	this.sendApAclListQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendAclList();
		}
	};

	this.sendApAclModeQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendAclMode();
		}
	};
	this.sendApSecModeQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendSecMode();
		}
	};

	this.sendApStaListQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendStaListQuery();
		}
	};

	this.sendCapabilitiesQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "freqs"
		});
		globalModel.addQuery({
			instance : this.instance,
			key : "securitymodes"
		});
		globalModel.addQuery({
			instance : this.instance,
			key : "chanbw"
		});
		globalModel.addQuery({
			instance : this.instance,
			key : "op_mode_list"
		});
		globalModel.addQuery({
			instance : this.instance,
			key : "wpaAuthanticationTypes"
		});
	};

	this.sendChanbwQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "chanbw"
		});
	};

	this.sendChannelQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "channel"
		});
	};

	this.sendEnabledQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "enabled"
		});
	};

	this.sendFreqQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "freq"
		});
	};

	this.sendOpModeQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "op_mode"
		});
	};

	this.sendStaSsidQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_ssid"
		});
	};

	this.sendStaSecurityModeQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_sec_mode"
		});
	};

	this.sendStaWepPasswordQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_wep_key1"
		});
	};

	this.sendStaStateQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "sta_state"
		});
		globalModel.addQuery({
			instance : this.instance,
			key : "sta_error_reason"
		});
	};

	this.sendStaConnectedApRssiQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "connected_ap_rssi"
		});
	};

	this.sendStaWpaPasswordQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_wpa_password"
		});
	};

	this.sendRatesQuery = function() {
		var tempObject = {};

		for(var freq in this.freqs) {
			for(var mode in this.freqs[freq].modes) {
				for(var chanbw in this.freqs[freq].modes[mode].chanbws) {
					tempObject[mode + "|" + chanbw] = "";
				}
			}
		}
		for(var qValue in tempObject) {
			globalModel.addQuery({
				instance : this.instance,
				key : "rates",
				value : qValue
			});
		}
	};

	this.sendSecurityValuesQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendWpaAuthType();
			this.aps[i].sendSecMode();
			this.aps[i].sendWepAuthType();
			this.aps[i].sendWepKeyType();
			this.aps[i].sendWepKeyIndex();
			this.aps[i].sendWepKey1();
			this.aps[i].sendWepKey2();
			this.aps[i].sendWepKey3();
			this.aps[i].sendWepKey4();
			this.aps[i].sendWpaRekeyInterval();
			this.aps[i].sendWpaRadiusAddr();
			this.aps[i].sendWpaRadiusPort();
			this.aps[i].sendWpaRadiusKey();
			this.aps[i].sendWpaRadiusEapReauthPeriod();
			this.aps[i].sendWpa2RsnPreauth();
			this.aps[i].sendWpaPassword();
		}
	};

	this.sendSSIDQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendSSID();
		}
	};

	this.sendSsidHiddenQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendSsidHidden();
		}
	};

	this.sendApEnabledQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendEnabled();
		}
	};

	this.sendIsolationQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendIsolation();
		}
	};

	this.sendRateQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendRate();
		}
	};

	this.sendStartApScanQuery = function() {
		globalModel.addCommand({
			instance : this.instance,
			key : "ap_scan"
		});
	};

	this.sendApScanResultQuery = function(counter) {
		counter = counter || 0;
		if(counter == 0)
			this.ap_scan.ap_list = [];
		globalModel.addQuery({
			instance : this.instance,
			key : "ap_list",
			value : counter
		});
	};

	this.sendApScanStatusQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "ap_scan_status"
		});
	};

	this.sendTxmodeQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "txmode"
		});
	};

	this.sendTxpowerQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "txpower"
		});
	};

	this.sendWDSPropertiesQuery = function() {
		for(var i = 0; i < this.wds_list.length; i++) {
			this.wds_list[i].sendEnabled();
			this.wds_list[i].sendMac();
		}
	};
	
	this.sendWpsPushButtonQuery = function() {
		globalModel.addCommand({
			instance : this.instance,
			key : "wps_pbc"
		});
	};
	
	this.sendWpsStatusQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "wps_status"
		});
	};

	this.setWpsConfigUuidUpdate = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "wps_config_uuid_update",
			value : value
		});
	};

	this.setWpsPinQuery = function(value) {
		globalModel.addCommand({
			instance : this.instance,
			key : "wps_pin",
			value : value
		});
	};

	this.setWpsRole = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "wps_role",
			value : value
		});
	};
};
