var wirelessSettingsController = {
	activeManagerIndex : 0,
	activeManagerIndex1 : 0,
	scanStatusIntervalId : [],

	documentReady : function() {
		globalModel.setUiPasswordReturnPage(window.location.href);
		this.isFirstCall = global.isFirstCall("wirelessSettingsController.documentReady");

		global.parseURI();
		if (global.queryStringData["managerIndex"] != undefined && this.isFirstCall) {
			wirelessSettingsController.activeManagerIndex = global.queryStringData["managerIndex"];
			wirelessSettingsController.activeManagerIndex1 = global.queryStringData["managerIndex"];
		}

		wirelessSettingsView.documentReady();
		wirelessSettingsController.sendFirstQuery();
	},

	eventHandler : function(args) {
		var index = 0;
		if (args.index != undefined)
			index = args.index;
		else if (args.instance_index != undefined)
			index = args.instance_index;
		else
			index = wirelessSettingsController.activeManagerIndex;
		var ap_index = args.ap_index || 0;

		switch(args.id) {
			case "wirelessSettingsController.firstQueryFinished":
				wirelessSettingsController.sendSecondQuery();
				break;
			case "wirelessSettingsController.secondQueryFinished":
				wirelessSettingsController.sendThirdQuery();
				break;
			case "wirelessSettingsController.thirdQueryFinished":
				if (wirelessSettingsView.mode == "homepage") {
					wirelessSettingsController.sendTurnToBridgeModeStatusQuery(wirelessSettingsController.activeManagerIndex1);
				} else {
					wirelessSettingsController.allQueriesFinished();
				}
				break;
			case "wirelessSettingsController.freq_changed":
				wirelessSettingsView.managerTab.setOptions.mode(index);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.mode_changed",
					index : index
				});
				wirelessSettingsView.managerTab.setOptions.channel(index);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.channel_changed",
					index : index
				});
				wirelessSettingsView.managerTab.setOptions.txpower(index);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.txpower_changed",
					index : index
				});
				wirelessSettingsView.setIntroTextByActiveManager(index);
				break;
			case "wirelessSettingsController.mode_changed":
				wirelessSettingsView.managerTab.setOptions.chanbw(index);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.chanbw_changed",
					index : index
				});
				wirelessSettingsView.managerTab.setOptions.rate(index);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.rate_changed",
					index : index
				});
				break;
			case "wirelessSettingsController.chanbw_changed":
				wirelessSettingsView.managerTab.setOptions.rate(index);
				break;
			case "wirelessSettingsController.secMode_changed":
				wirelessSettingsView.managerTab.set.password(index, ap_index);
				break;
			case "wirelessSettingsController.operationMode_changed":
				wirelessSettingsView.changeViewByOpMode(index);
				wirelessSettingsView.checkCookieToScan(index);
				break;
			case "saveClicked":
				wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].beSaved = true;
				wirelessSettingsController.save();
				break;
			case "saved":
				if (wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].requiresReboot)
					global.reboot();
				wirelessSettingsController.activeManagerIndex1 = wirelessSettingsController.activeManagerIndex;
				if (args.reloadPage) {
					if (wirelessSettingsView.mode != "standard") {
						top.location = "/main.html";
					} else {
						page.documentReady();
					}
				}
				break;
			case "wirelessSettingsController.apScanQuerySent":
				wirelessSettingsController.scanStatusIntervalId[index] = setInterval("wirelessSettingsController.sendApScanStatusQuery(" + index + ")", "3000");
				break;
			case "wirelessSettingsController.apScanStatusQuerySent":
				wirelessSettingsModel.instances[index].parseApScanStatusQuery(wirelessSettingsModel.instances[index].ap_scan.ap_list.length);
				if (wirelessSettingsModel.instances[index].ap_scan.status == "ok") {
					clearInterval(wirelessSettingsController.scanStatusIntervalId[index]);
					wirelessSettingsController.sendApScanResultQuery(index, 0);
				}
				break;
			case "wirelessSettingsController.apScanResultQuerySent":
				wirelessSettingsModel.instances[index].parseApScanResultQuery(wirelessSettingsModel.instances[index].ap_scan.ap_list.length);
				if (wirelessSettingsModel.instances[index].ap_scan.ap_requery != "0") {
					wirelessSettingsController.sendApScanResultQuery(index, wirelessSettingsModel.instances[index].ap_scan.ap_list.length);
				} else {
					wirelessSettingsView.buildApTable(index);
					$("#" + (index == 0 ? "div_please_wait_for_process" : "div_please_wait_for_process_" + index)).hide();
				}
				$("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).removeAttr("disabled");
				break;
			case "parseRebootRequiredQuery":
				wirelessSettingsModel.instances[index].parseRebootRequiredQuery();
				break;
			case "getStaConnectionStatusSent":
				wirelessSettingsController.checkStaConnectionStatus(index);
				break;
			case "wirelessSettingsController.parseStaSsidQuery":
				wirelessSettingsModel.instances[index].parseStaSsidQuery();
				wirelessSettingsModel.instances[index].parseStaSecurityModeQuery();
				wirelessSettingsModel.instances[index].parseStaConnectedApRssiQuery();
				break;
			case "checkTurnToBridgeModeStatus":
				wirelessSettingsController.checkTurnToBridgeModeStatus(index, 20000);
				break;
			case "reviewTurnToBridgeModeStatus":
				wirelessSettingsModel.instances[index].parseStaStateQuery();
				wirelessSettingsModel.instances[index].parseStaSsidQuery();
				wirelessSettingsModel.instances[index].parseStaConnectedApRssiQuery();
				switch(wirelessSettingsModel.instances[index].configSettings.staState) {
					case "connecting":
						wirelessSettingsController.checkTurnToBridgeModeStatus(index);
						break;
					default:
						clearTimeout(wirelessSettingsView.showWirelessConnectionRefreshTimeout);
						wirelessSettingsController.showSetupCompleteScreen(index);
						break;
				}
				break;
			case "cancelClicked":
				top.location = "/main.html";
				break;
			case "advancedSetupClicked":
				top.location = "/main.html";
				break;
			case "parseStaConnectedApRssiQuery":
				var instance = wirelessSettingsModel.instances[index];
				instance.parseStaConnectedApRssiQuery();
				if (instance.configSettings.staState == "connected") {
					if (instance.configSettings.staConnectedApRssi > 8) {
						wirelessSettingsView.showRepeatingIsOkScreen(index);
					} else {
						wirelessSettingsView.showRepeatingButWeakSignalScreen();
					}
				} else if (instance.configSettings.staState == "disconnected_wrong_password") {
					wirelessSettingsView.showNotRepeatingWrongPasswordScreen(index);
				} else if (instance.configSettings.staState == "disconnected_wrong_sec_type") {
					wirelessSettingsView.showNotRepeatingWrongSecurityTypeScreen(index);
				} else {
					wirelessSettingsView.showNotRepeatingScreen(index);
				}
				break;
		}
	},

	showSetupCompleteScreen : function(index) {
		wirelessSettingsModel.instances[index].sendStaConnectedApRssiQuery();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "parseStaConnectedApRssiQuery",
			index : index
		});
		globalModel.sendAjax();
	},

	checkTurnToBridgeModeStatus : function(index, delay) {
		_index = index;
		if (delay == undefined) {
			delay = 5000;
		}

		window.x = $.proxy(wirelessSettingsController.sendTurnToBridgeModeStatusQuery, wirelessSettingsController, index);
		setTimeout(window.x, delay);
	},

	sendTurnToBridgeModeStatusQuery : function(index) {
		wirelessSettingsModel.instances[index].sendStaStateQuery();
		wirelessSettingsModel.instances[index].sendStaSsidQuery();
		wirelessSettingsModel.instances[index].sendStaConnectedApRssiQuery();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "reviewTurnToBridgeModeStatus",
			index : index
		});
		globalModel.sendAjax({
			"retryCount" : 30,
			"retryDelay" : 4000
		});
	},

	getApLists : function() {
		wirelessSettingsModel.sendAPListQuery();
	},

	getApConfigSettings : function() {
		wirelessSettingsModel.sendSsidQuery();
		wirelessSettingsModel.sendSsidHiddenQuery();
		wirelessSettingsModel.sendApEnabledQuery();
		wirelessSettingsModel.sendIsolationQuery();
		wirelessSettingsModel.sendRateQuery();
		wirelessSettingsModel.sendApAclModeQuery();
	},

	getConfigSettings : function() {
		wirelessSettingsModel.sendAirTouchQuery();
		wirelessSettingsModel.sendChanbwQuery();
		wirelessSettingsModel.sendChannelQuery();
		wirelessSettingsModel.sendFreqQuery();
		wirelessSettingsModel.sendTxmodeQuery();
		wirelessSettingsModel.sendTxpowerQuery();
		wirelessSettingsModel.sendOpModeQuery();
	},

	getRates : function() {
		wirelessSettingsModel.sendRatesQuery();
	},

	getSecurityValues : function() {
		wirelessSettingsModel.sendSecurityValuesQuery();
	},

	getWirelessCapabilities : function() {
		wirelessSettingsModel.sendCapabilitiesQuery();
	},

	getWirelessInstances : function() {
		wirelessSettingsModel.sendInstListQuery();
	},

	getWpsPins : function() {
		wirelessSettingsModel.sendWpsPinQuery();
	},

	sendFirstQuery : function() {
		wirelessSettingsController.getWirelessInstances();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.firstQueryFinished"
		});
		globalModel.sendAjax();
	},

	sendSecondQuery : function() {
		wirelessSettingsController.getConfigSettings();
		wirelessSettingsController.getWirelessCapabilities();
		wirelessSettingsController.getApLists();
		wirelessSettingsController.getWpsPins();
		wirelessSettingsModel.sendIsDefaultQuery();
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsController.getStaConnectionStatus(i);
			wirelessSettingsModel.instances[i].sendStaSsidQuery();
			wirelessSettingsModel.instances[i].sendStaSecurityModeQuery();
			wirelessSettingsModel.instances[i].sendStaConnectedApRssiQuery();
			globalModel.addEvent({
				eventHandler : "wirelessSettingsController",
				id : "wirelessSettingsController.parseStaSsidQuery",
				index : i
			});
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.secondQueryFinished"
		});
		globalModel.sendAjax();
	},

	sendThirdQuery : function() {
		wirelessSettingsController.getRates();
		wirelessSettingsController.getApConfigSettings();
		wirelessSettingsController.getSecurityValues();

		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.thirdQueryFinished"
		});
		globalModel.sendAjax();
	},

	allQueriesFinished : function() {
		wirelessSettingsView.instances = wirelessSettingsModel.instances.slice();
		wirelessSettingsView.addManagerTabs();
		wirelessSettingsView.addFooter();
		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			wirelessSettingsView.managerTab.set.freq(i, wirelessSettingsView.instances[i].configSettings.freq);
			wirelessSettingsView.managerTab.set.channel(i, wirelessSettingsView.instances[i].configSettings.channel);
			wirelessSettingsView.managerTab.set.mode(i, wirelessSettingsView.instances[i].configSettings.txmode);
			wirelessSettingsView.managerTab.set.txpower(i, wirelessSettingsView.instances[i].configSettings.txpower);
			wirelessSettingsView.managerTab.set.airTouch(i, wirelessSettingsView.instances[i].configSettings.airTouch);
			wirelessSettingsView.managerTab.set.wpsPin(i, wirelessSettingsView.instances[i].wpsPin);
			wirelessSettingsView.managerTab.set.chanbw(i, wirelessSettingsView.instances[i].configSettings.chanbw);
			wirelessSettingsView.managerTab.set.opMode(i, wirelessSettingsView.instances[i].configSettings.opMode);

			wirelessSettingsView.managerTab.setApRows(i);
		}

		wirelessSettingsView.createTabControls(wirelessSettingsController.activeManagerIndex1);

		globalView.addButtonClass();

		globalView.showPage();
	},

	save : function() {
		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			if (wirelessSettingsView.instances[i].beSaved) {

				for (var j = 0; j < wirelessSettingsView.instances[i].aps.length; j++) {
					var tempApObject = wirelessSettingsView.managerTab.getApValues(i, j);
					var selectedMode = wirelessSettingsView.instances[i].freqs[wirelessSettingsView.managerTab.get.freq(i)].modes[wirelessSettingsView.managerTab.get.mode(i)];
					var isAllowed = false

					for (var k = 0; k < selectedMode.securityModes.length; k++) {
						if (tempApObject.sec_mode == selectedMode.securityModes[k]) {
							isAllowed = true;
						}
					}

					if (!isAllowed) {
						var security_mode_names = {
							"off" : __ML_wireless_security_mode_no_encryption,
							"wpa_both" : __ML_both,
							"wpa" : "WPA",
							"wpa2" : "WPA2",
							"wep" : "WEP"
						};
						alert(__ML_wireless_certification_validation_mode_security_msg.replace("@mode@", selectedMode.text).replace("@security@", security_mode_names[tempApObject.sec_mode]));
						return;
					}

					if (j == 0 && wirelessSettingsView.managerTab.get.airTouch(i)) {
						if (tempApObject.sec_mode == "wep") {
							alert(__ML_wireless_certification_validation_msg1);
							return;
						}
						if (globalWireless.isWpa(tempApObject.sec_mode) && wirelessSettingsView.instances[i].aps[j].wpa_auth_type == "enterprise") {
							alert(__ML_wireless_certification_validation_msg2);
							return;
						}

						if (j == 0)// Main SSID
						{
							if (tempApObject.sec_mode == "off") {
								alert(__ML_wireless_WPS_warning_no_security);
							} else if (tempApObject.sec_mode == "wpa") {
								if (confirm(__ML_wireless_WPS_warning_wpa_only)) {
									wirelessSettingsView.managerTab.set.airTouch(i, false);
								} else {
									return;
								}
							}

							if (tempApObject.ssid_hidden) {
								if (confirm(__ML_wireless_WPS_warning_hidden_ssid)) {
									wirelessSettingsView.managerTab.set.airTouch(i, false);
								} else {
									return;
								}
							}
						}
					}

					var selectedChannel = {};
					var channels = wirelessSettingsView.instances[i].freqs[wirelessSettingsView.managerTab.get.freq(i)].channels;
					for (var k = 0; k < channels.length; k++) {
						if (channels[k].code == wirelessSettingsView.managerTab.get.channel(i))
							selectedChannel = channels[k];
					}
					if ((wirelessSettingsView.instances[i].meshEnabled || wirelessSettingsView.managerTab.get.airTouch(i)) && selectedChannel.dfs) {
						alert(__ML_wireless_settings_radar_channel_warning);
						return;
					}

					if (tempApObject.ssid.length > 32) {
						alert(__ML_invalidSSIDMaxLength);
						return;
					}

					//var regex = new RegExp(/^(([0-9A-Za-z!"#$%'()*+,./:;=?@^_`{|}~\\\[\]-]{1,32}))$/);
					var regex = new RegExp(/^(?!\x20)[\x20-\x7f]{0,31}[\x21-\x7f]$/);

					if (!regex.test(tempApObject.ssid)) {
						if (wirelessSettingsView.instances.length > 1) {
							alert((i + 1) + ". " + __ML_invalidSSID);
						} else {
							alert(__ML_invalidSSID);
						}
						return;
					}

					if (globalWireless.isWpa(tempApObject.sec_mode)) {
						if (wirelessSettingsView.instances[i].aps[j].wpa_auth_type == "enterprise") {
							regex = new RegExp("^(?!\x20)[\x20-\x7f]{7,63}[\x21-\x7f]$");
							if (!regex.test(tempApObject.wpa_radius_key)) {
								alert(__ML_wireless_invalid_wpa_secret_alert.replace(/#invalid_value#/g, tempApObject.wpa_radius_key));
								return;
							}
						} else {
							regex = new RegExp(/^(((?!\x20)[\x20-\x7f]{7,62}[\x21-\x7f])|([a-fA-F0-9]{8,64}))$/);
							if (!regex.test(tempApObject.wpa_password)) {

								if (window.__ML_sky_wireless_settings_wpa_password_error_message) {
									alert(__ML_sky_wireless_settings_wpa_password_error_message);
								} else {
									alert(__ML_wireless_invalid_wpa_password_alert.replace(/#invalid_value#/g, tempApObject.wpa_password));
								}
								return;
							}
						}

					} else if (tempApObject.sec_mode == "wep") {
						regex = new RegExp("^([0-9a-fA-F]{10}|[\\s\\S]{5}|[0-9a-fA-F]{26}|[\\s\\S]{13})$");
						if (tempApObject.wep_key1 != undefined && !regex.test(tempApObject.wep_key1)) {
							alert( message = __ML_wizard_wireless_password + " " + __ML_Regex_Msg + " (5-10-13-26 " + __ML_characters + ") " + tempApObject.wep_key1 + " " + __ML_Regex_wrong);
							return;
						}
						if (tempApObject.wep_key2 != undefined && !regex.test(tempApObject.wep_key2)) {
							alert( message = __ML_wizard_wireless_password + " " + __ML_Regex_Msg + " (5-10-13-26 " + __ML_characters + ") " + tempApObject.wep_key2 + " " + __ML_Regex_wrong);
							return;
						}
						if (tempApObject.wep_key3 != undefined && !regex.test(tempApObject.wep_key3)) {
							alert( message = __ML_wizard_wireless_password + " " + __ML_Regex_Msg + " (5-10-13-26 " + __ML_characters + ") " + tempApObject.wep_key3 + " " + __ML_Regex_wrong);
							return;
						}
						if (tempApObject.wep_key4 != undefined && !regex.test(tempApObject.wep_key4)) {
							alert( message = __ML_wizard_wireless_password + " " + __ML_Regex_Msg + " (5-10-13-26 " + __ML_characters + ") " + tempApObject.wep_key4 + " " + __ML_Regex_wrong);
							return;
						}
					}

				}
			}
		}

		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			if (wirelessSettingsView.instances[i].beSaved) {
				if (wirelessSettingsView.managerTab.get.airTouch(i) && wirelessSettingsView.instances[i].configSettings.aclMode != "off") {
					if (confirm(__ML_mac_filtering_will_be_disabled_if_wps_is_enabled_confirm)) {
						wirelessSettingsView.instances[i].saveAclMode("off");
					} else {
						return;
					}
				}
			}
		}

		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			if (wirelessSettingsView.instances[i].beSaved && wirelessSettingsView.instances[i].configSettings.opMode != wirelessSettingsView.managerTab.get.opMode(i)) {
				if (!confirm(__ML_wireless_need_to_configure_wireless_warning)) {
					return;
				}
			}
		}

		globalView.disablePage();
		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			if (wirelessSettingsView.instances[i].beSaved) {
				wirelessSettingsView.instances[i].saveChanbw(wirelessSettingsView.managerTab.get.chanbw(i));
				wirelessSettingsView.instances[i].saveChannel(wirelessSettingsView.managerTab.get.channel(i));
				wirelessSettingsView.instances[i].saveFreq(wirelessSettingsView.managerTab.get.freq(i));
				wirelessSettingsView.instances[i].saveMode(wirelessSettingsView.managerTab.get.mode(i));
				wirelessSettingsView.instances[i].saveTxpower(wirelessSettingsView.managerTab.get.txpower(i));
				wirelessSettingsView.instances[i].saveAirTouch(wirelessSettingsView.managerTab.get.airTouch(i));
				wirelessSettingsView.instances[i].saveOpMode(wirelessSettingsView.managerTab.get.opMode(i));
				for (var j = 0; j < wirelessSettingsView.instances[i].aps.length; j++) {
					var tempApObject = wirelessSettingsView.managerTab.getApValues(i, j);
					wirelessSettingsView.instances[i].aps[j].setSsid(tempApObject.ssid);
					wirelessSettingsView.instances[i].aps[j].setSecMode(tempApObject.sec_mode);
					wirelessSettingsView.instances[i].aps[j].setSsidHidden(tempApObject.ssid_hidden);
					wirelessSettingsView.instances[i].aps[j].setEnabled(tempApObject.enabled);
					wirelessSettingsView.instances[i].aps[j].setIsolation(tempApObject.isolation);
					wirelessSettingsView.instances[i].aps[j].setRate(tempApObject.rate);
					if (tempApObject.wep_key1)
						wirelessSettingsView.instances[i].aps[j].setWepKey1(tempApObject.wep_key1);
					if (tempApObject.wep_key2)
						wirelessSettingsView.instances[i].aps[j].setWepKey2(tempApObject.wep_key2);
					if (tempApObject.wep_key3)
						wirelessSettingsView.instances[i].aps[j].setWepKey3(tempApObject.wep_key3);
					if (tempApObject.wep_key4)
						wirelessSettingsView.instances[i].aps[j].setWepKey4(tempApObject.wep_key4);
					if (tempApObject.wpa_radius_key)
						wirelessSettingsView.instances[i].aps[j].setWpaRadiusKey(tempApObject.wpa_radius_key);
					if (tempApObject.wpa_password)
						wirelessSettingsView.instances[i].aps[j].setWpaPassword(tempApObject.wpa_password);
				}
				wirelessSettingsView.instances[i].setWpsConfigUuidUpdate("");
				wirelessSettingsView.instances[i].setWpsRole("registrar");
			}
		}

		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			if (wirelessSettingsView.instances[i].beSaved) {
				wirelessSettingsView.instances[i].sendApply();
				wirelessSettingsView.instances[i].beSaved = false;
				globalModel.addEvent({
					eventHandler : "wirelessSettingsController",
					id : "parseRebootRequiredQuery",
					index : i
				});
			}
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "saved",
			reloadPage : true
		});
		globalModel.sendAjax();
	},

	sendApScanQuery : function(index) {
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).html("");
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).hide();
		$("#apTableManualDiv").hide();
		$(".showIfScanOk").hide();
		$("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).attr("disabled", true);
		$("#" + (index == 0 ? "div_please_wait_for_process" : "div_please_wait_for_process_" + index)).show();
		global.setCookie({
			name : "ap_scan",
			value : "done",
			hours : 1
		});
		$("#managerSelectorUl li").attr("disabled", true);
		wirelessSettingsController.getStaConnectionStatus(index);
		wirelessSettingsModel.instances[index].sendStartApScanQuery();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.apScanQuerySent",
			index : index
		});
		globalModel.sendAjax();
	},

	sendApScanStatusQuery : function(index) {
		wirelessSettingsModel.instances[index].sendApScanStatusQuery();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.apScanStatusQuerySent",
			index : index
		});
		globalModel.sendAjax();
	},

	sendApScanResultQuery : function(index, counter) {
		wirelessSettingsModel.instances[index].sendApScanResultQuery(counter);
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "wirelessSettingsController.apScanResultQuerySent",
			index : index
		});
		globalModel.sendAjax();
	},

	turnToBridgeMode : function(index, apObj) {
		globalView.disablePage();
		beginXML();

		addSet("wireless_core-0", "op_mode", "sta");
		wirelessSettingsModel.instances[index].saveOpMode("sta");
		wirelessSettingsModel.instances[index].saveStaSsid(apObj.ssid);
		wirelessSettingsModel.instances[index].saveStaSecurityMode(apObj.security);

		if (globalWireless.isWpa(apObj.security)) {
			wirelessSettingsModel.instances[index].saveStaWpaPassword(apObj.security);
		} else if (apObj.security == "wep") {
			wirelessSettingsModel.instances[index].saveStaWepPassword(apObj.security);
		}

		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			wirelessSettingsView.instances[index].sendApply();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "saved"
		});
		globalModel.sendAjax();
	},

	getStaConnectionStatus : function(index) {
		wirelessSettingsModel.instances[index].sendStaStateQuery();
		wirelessSettingsModel.instances[index].sendStaConnectedApRssiQuery();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "getStaConnectionStatusSent",
			index : index
		});
	},

	checkStaConnectionStatus : function(index) {
		var instance = wirelessSettingsModel.instances[index]
		instance.parseStaStateQuery();
		instance.parseStaConnectedApRssiQuery();

		if (instance.configSettings.staState == "disconnected") {
			global.setCookie({
				name : "ap_scan",
				value : "done",
				hours : -1
			});
		}
	}
};
