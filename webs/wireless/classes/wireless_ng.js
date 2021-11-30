var wirelessNg = function(instance) {
	this.instance = instance || "";
	this.apPrefixes = [];
	this.wdsPrefixes = [];
	this.aps = [];
	this.wds_list = [];
	this.maximumWdsLimit = 0;
	this.meshExist = false;
	this.meshEnabled = false;
	this.wpsExist = false;
	this.capabilities = {};
	this.freqs = {};
	this.operationModes = [];
	this.configSettings = {};
	this.ap_scan = {};
	this.ap_scan.ap_list = [];
	this.pollableSecurityModes = {};
	this.wpaAuthanticationTypes = [];
	this.clientNameCanBeGet = true;
	this.isPowerManageable = false;
	this.wpsPin = "";
	
	
	this.parseWpsRoleQuery = function() {
		this.wpsRole = top.xmlResponseObject[this.instance]["wps_role"] == "enrollee" ? "enrollee" : "registrar";
	}
	
	this.parseWpsPinQuery = function() {
		this.wpsPin = top.xmlResponseObject[this.instance]["wps_pin"];
	}
	
	this.parseLanSettingsQuery = function() {
		try{
		if(top.xmlResponseObject["dhcps-0"]["iface"] == "lan-0") {
			this.clientNameCanBeGet = true;
		} else {
			this.clientNameCanBeGet = false;
		}
		}
		catch(ex)
		{
			this.clientNameCanBeGet = false;
		}
	}

	this.parseAirTouchQuery = function() {
		this.configSettings.airTouch = top.xmlResponseObject[this.instance]["wps_enabled"] == 1;
	};

	this.parseApAclListQuery = function() {
		var index = 1;
		this.configSettings.aclList = [];
		while(top.xmlResponseObject[this.instance]["station<index>.acl_mac".replace("<index>", index)]) {
			var staAclMacKey = "station<index>.acl_mac".replace("<index>", index);

			this.configSettings.aclList.push({
				"acl_mac" : top.xmlResponseObject[this.instance][staAclMacKey]
			});
			index++;
		}
	};

	this.parseApAclModeQuery = function() {
		this.configSettings.aclMode = top.xmlResponseObject[this.instance]["acl_mode"];
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
		for(var i in this.apPrefixes) {
			this.aps.push(new wirelessNgAP(this.instance, this.apPrefixes[i]));
		}
	};

	this.parseCapabilitiesQuery = function() {
		this.capabilities = jQuery.parseJSON(top.xmlResponseObject[this.instance]["wireless_capabilities"]);

		this.wpaAuthanticationTypes = [];
		for(var i = 0; i < this.capabilities.wpaAuthanticationTypes.length; i++) {
			var code = this.capabilities.wpaAuthanticationTypes[i].code;
			var value = code == "0" ? "personal" : "enterprise";
			var ml = code == "0" ? "__ML_personal" : "__ML_enterprise";
			this.wpaAuthanticationTypes.push({
				"code" : code,
				"value" : value,
				"ml" : ml
			});
		}

		for(var i in this.capabilities.apPrefix) {
			this.apPrefixes.push(this.capabilities.apPrefix[i]);
		}

		for(var i in this.capabilities.wdsPrefix) {
			this.wdsPrefixes.push(this.capabilities.wdsPrefix[i]);
			this.meshExist = true;
		}

		for(var i in this.capabilities.band) {
			this.freqs[i] = {
				text : this.capabilities.band[i].text,
				defaultMode : this.capabilities.band[i].defaultMode,
				modes : {},
				defaultChannel : this.capabilities.band[i].defaultChannel,
				channels : [],
				txpowers : []
			};
			for(var j in this.capabilities.band[i].modes) {
				this.freqs[i].modes[j] = {
					text : this.capabilities.band[i].modes[j].text,
					securityModes : [],
					defaultChannelBw : this.capabilities.band[i].modes[j].defaultChannelBw,
					chanbws : {}
				};

				for(var k in this.capabilities.band[i].modes[j].securityModes) {
					this.freqs[i].modes[j].securityModes.push(k);
					this.pollableSecurityModes[k] = {};
				}

				for(var k in this.capabilities.band[i].modes[j].chanbws) {
					this.freqs[i].modes[j].chanbws[k] = {
						text : this.capabilities.band[i].modes[j].chanbws[k].text,
						rates : {
							auto : {
								text : "Auto"
							}
						},
						sortedRates : ["auto"]
					};

					for(var l in this.capabilities.band[i].modes[j].chanbws[k].rates) {
						this.freqs[i].modes[j].chanbws[k].sortedRates.push(this.capabilities.band[i].modes[j].chanbws[k].rates[l]);
						this.freqs[i].modes[j].chanbws[k].rates[this.capabilities.band[i].modes[j].chanbws[k].rates[l]] = {
							text : this.capabilities.band[i].modes[j].chanbws[k].rates[l] + " Mb/s"
						};
					}
				}
			}

			for(var j in this.capabilities.band[i].channels) {
				if(j.toLowerCase() == "auto") {
					this.freqs[i].channels.unshift({
						code : j,
						text : j,
						dfs : false
					});
				} else {
					this.freqs[i].channels.push({
						code : j,
						text : j,
						dfs : this.capabilities.band[i].channels[j].dfs != "0"
					});
				}
			}

			for(var j in this.capabilities.band[i].txpowers) {
				this.freqs[i].txpowers.push({
					code : j,
					text : this.capabilities.band[i].txpowers[j].text
				});
			}
		}

		for(var operationMode in this.capabilities.operationModes) {
			this.operationModes.push({
				code : this.capabilities.operationModes[operationMode],
				text : this.capabilities.operationModes[operationMode]
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
		this.configSettings.freq = top.xmlResponseObject[this.instance]["band"];
	};

	this.parseOpModeQuery = function() {
		this.configSettings.opMode = top.xmlResponseObject[this.instance]["opmode"];
	};

	this.parseStaSsidQuery = function() {
		this.configSettings.staSsid = top.xmlResponseObject[this.instance]["sta_ssid"];
		this.configSettings.staSsid_serialized = $("<div>").text(this.configSettings.staSsid).html().split(" ").join("&nbsp;");
	};

	this.parseStaSecurityModeQuery = function() {
		this.configSettings.staSecurityMode = top.xmlResponseObject[this.instance]["sta_security_mode"];
	};

	this.parseStaWepPasswordQuery = function() {
		this.configSettings.staWepKey = top.xmlResponseObject[this.instance]["sta_wep_key0"];
	};

	this.parseStaWpaPasswordQuery = function() {
		this.configSettings.staWpaPassword = top.xmlResponseObject[this.instance]["sta_wpa_password"];
	};

	this.parseStaStateQuery = function() {
		if(typeof top.xmlResponseObject[this.instance]["radiostate"] === "undefined") 
		{
			this.configSettings.staState = "";
			return;
		}

		switch(top.xmlResponseObject[this.instance]["radiostate"]) {
			case "WL_RADIO_UP":
				this.configSettings.staState = "connected";
				break;
			case "WL_RADIO_CONNECTING":
				this.configSettings.staState = "connecting";
				break;
			default:
				this.configSettings.staState = "";
				break;
		}
	};

	this.parseRebootRequiredQuery = function() {
		this.requiresReboot = top.xmlResponseObject[this.instance]["reboot_required"] == "1";
	};

	this.parseStaConnectedApRssiQuery = function() {
		this.configSettings.staConnectedApRssi = top.xmlResponseObject[this.instance]["connected_ap_rssi"];
	};

	this.parseSecurityValuesQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].parseWpaAuthType();
			this.aps[i].parseSecMode();
			this.aps[i].parseWepAuthType();
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
		this.maximumWdsLimit = this.wdsPrefixes.length;
	};

	this.parseWDSPropertiesQuery = function() {
		var i = 0;
		while(top.xmlResponseObject[this.instance]["wds<index>_mac".replace("<index>", i)]) {
			this.wds_list.push({
				instance : this.instance
			});
			this.wds_list[i].enabled = top.xmlResponseObject[this.instance]["wds<index>_enabled".replace("<index>", i)];
			this.wds_list[i].mac = top.xmlResponseObject[this.instance]["wds<index>_mac".replace("<index>", i)].toUpperCase();
			this.wds_list[i].removed = false;

			if(this.wds_list[i].mac != "" && this.wds_list[i].enabled == "1")
				this.meshEnabled = true;
			i++;
		}
	};

	this.parseApScanStatusQuery = function() {
		if( typeof top.xmlResponseObject[this.instance] != "undefined") {
			this.ap_scan.status = "nope";
		}

		switch(top.xmlResponseObject[this.instance]["scan_status"]) {
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
			while(top.xmlResponseObject[this.instance]["AP" + counter + ".mac"]) {
				var tempObj = {};
				tempObj.ssid = top.xmlResponseObject[this.instance]["AP" + counter + ".ssid"];
				tempObj.ssid = tempObj.ssid.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				tempObj.mac = top.xmlResponseObject[this.instance]["AP" + counter + ".mac"];
				tempObj.channel = top.xmlResponseObject[this.instance]["AP" + counter + ".channel"];
				tempObj.protocol = top.xmlResponseObject[this.instance]["AP" + counter + ".protocol"];
				tempObj.security = top.xmlResponseObject[this.instance]["AP" + counter + ".security"];
				tempObj.rssi = top.xmlResponseObject[this.instance]["AP" + counter + ".rssi"];
				this.ap_scan.ap_list.push(tempObj);
				counter++;
			}
		} catch(e) {

		}
		this.ap_scan.ap_requery = 0;
	};

	this.saveAclAdd = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "acl_add",
			value : value
		});
	};

	this.saveAclDelete = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "acl_delete",
			value : value
		});
	};

	this.saveAclMode = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "acl_mode",
			value : value
		});
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
		globalModel.addSet({
			instance : this.instance,
			key : "chanbw",
			value : value
		});
	};

	this.saveChannel = function(value) {
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
			key : "band",
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

	this.saveOpMode = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "opmode",
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
			key : "sta_security_mode",
			value : value
		});
	};

	this.saveStaWepPassword = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "sta_wep_key0",
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

	this.saveWDSPropertiesQuery = function() {
		for(var i = 0; i < this.wds_list.length; i++) {
			if(this.wds_list[i].instance != "") {
				if(this.wds_list[i].removed) {
					globalModel.addSet({
						instance : this.instance,
						key : "wds<index>_enabled".replace("<index>", i),
						value : "0"
					});
					globalModel.addSet({
						instance : this.instance,
						key : "wds<index>_mac".replace("<index>", i),
						value : ""
					});
				} else {
					globalModel.addSet({
						instance : this.instance,
						key : "<wds_prefix>_enabled".replace("<wds_prefix>", this.wdsPrefixes[i]),
						value : this.wds_list[i].enabled
					});
				}
			} else if(!this.wds_list[i].removed) {
				globalModel.addSet({
					instance : this.instance,
					key : "<wds_prefix>_enabled".replace("<wds_prefix>", this.wdsPrefixes[i]),
					value : this.wds_list[i].enabled
				});
				globalModel.addSet({
					instance : this.instance,
					key : "<wds_prefix>_mac".replace("<wds_prefix>", this.wdsPrefixes[i]),
					value : this.wds_list[i].mac
				});
			}
		}
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

	this.sendStaStateQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "radiostate"
		});
	};

	this.sendStaConnectedApRssiQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "connected_ap_rssi"
		});
	};

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
		globalModel.addAfterSaveQuery({
			instance : this.instance,
			key : "reboot_required",
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
		globalModel.addGet({
			instance : this.instance,
			key : "acl_list"
		});
	};

	this.sendApAclModeQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "acl_mode"
		});
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
			key : "wireless_capabilities"
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
			key : "band"
		});
	};

	this.sendOpModeQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "opmode"
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
			key : "sta_security_mode"
		});
	};

	this.sendStaWepPasswordQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_wep_key0"
		});
	};

	this.sendStaWpaPasswordQuery = function() {
		globalModel.addGet({
			instance : this.instance,
			key : "sta_wpa_password"
		});
	};

	this.sendSecurityValuesQuery = function() {
		for(var i = 0; i < this.aps.length; i++) {
			this.aps[i].sendWpaAuthType();
			this.aps[i].sendSecMode();
			this.aps[i].sendWepAuthType();
			// this.aps[i].sendWepKeyType();
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
			key : "scan_start"
		});
	};

	this.sendApScanResultQuery = function(counter) {
		//counter wireless_core-0 için geçerli, burada tanımlanmazsa fonksiyon çalışmıyor...
		globalModel.addQuery({
			instance : this.instance,
			key : "scan_results"
		});
	};

	this.sendApScanStatusQuery = function() {
		globalModel.addQuery({
			instance : this.instance,
			key : "scan_status"
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
			globalModel.addGet({
				instance : this.instance,
				key : "wds<index>_enabled".replace("<index>", i)
			});
			globalModel.addGet({
				instance : this.instance,
				key : "wds<index>_mac".replace("<index>", i)
			});
		}
	};

	this.setWpsConfigUuidUpdate = function(value) {
		// globalModel.addSet({instance: this.instance, key: "wps_config_uuid_update", value: value}); ??????????
	};

	this.setWpsRole = function(value) {
		globalModel.addSet({
			instance : this.instance,
			key : "wps_role",
			value : value
		});
	};
};
