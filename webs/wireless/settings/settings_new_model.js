var wirelessSettingsModel = {
	eventHandler : function(args) {
		switch(args.id) {
			case "wirelessSettingsModel.parseWpsPinQuery":
				wirelessSettingsModel.parseWpsPinQuery();
				break;
			case "wirelessSettingsModel.parseAirTouchQuery":
				wirelessSettingsModel.parseAirTouchQuery();
				break;
			case "wirelessSettingsModel.parseAPListQuery":
				wirelessSettingsModel.parseAPListQuery();
				break;
			case "wirelessSettingsModel.parseCapabilitiesQuery":
				wirelessSettingsModel.parseCapabilitiesQuery();
				break;
			case "wirelessSettingsModel.parseChanbwQuery":
				wirelessSettingsModel.parseChanbwQuery();
				break;
			case "wirelessSettingsModel.parseChannelQuery":
				wirelessSettingsModel.parseChannelQuery();
				break;
			case "wirelessSettingsModel.parseFreqQuery":
				wirelessSettingsModel.parseFreqQuery();
				break;
			case "wirelessSettingsModel.parseOpModeQuery":
				wirelessSettingsModel.parseOpModeQuery();
				break;
			case "wirelessSettingsModel.parseInstListQuery":
				wirelessSettingsModel.parseInstListQuery();
				break;
			case "wirelessSettingsModel.parseRatesQuery":
				wirelessSettingsModel.parseRatesQuery();
				break;
			case "wirelessSettingsModel.parseSecurityValuesQuery":
				wirelessSettingsModel.parseSecurityValuesQuery();
				break;
			case "wirelessSettingsModel.parseSsidQuery":
				wirelessSettingsModel.parseSsidQuery();
				break;
			case "wirelessSettingsModel.parseSsidHiddenQuery":
				wirelessSettingsModel.parseSsidHiddenQuery();
				break;
			case "wirelessSettingsModel.parseApEnabledQuery":
				wirelessSettingsModel.parseApEnabledQuery();
				break;
			case "wirelessSettingsModel.parseIsolationQuery":
				wirelessSettingsModel.parseIsolationQuery();
				break;
			case "wirelessSettingsModel.parseRateQuery":
				wirelessSettingsModel.parseRateQuery();
				break;
			case "wirelessSettingsModel.parseTxmodeQuery":
				wirelessSettingsModel.parseTxmodeQuery();
				break;
			case "wirelessSettingsModel.parseTxpowerQuery":
				wirelessSettingsModel.parseTxpowerQuery();
				break;
			case "wirelessSettingsModel.parseApAclModeQuery":
				wirelessSettingsModel.parseApAclModeQuery();
				break;
			case "wirelessSettingsModel.parseIsDefaultQuery":
				wirelessSettingsModel.parseIsDefaultQuery();
				break;
			case "wirelessSettingsModel.parseStaConnectedApRssiQuery":
				wirelessSettingsModel.parseStaConnectedApRssiQuery();
				break;
		}
	},

	instances : [],
	
	parseStaConnectedApRssiQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseStaConnectedApRssiQuery();
		}
	},

	parseApAclModeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseApAclModeQuery();
		}
	},

	parseWpsPinQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseWpsPinQuery();
		}
	},

	parseAirTouchQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseAirTouchQuery();
		}
	},

	parseAPListQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseAPListQuery();
		}
	},

	parseCapabilitiesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseCapabilitiesQuery();
		}
	},

	parseChanbwQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseChanbwQuery();
		}
	},

	parseChannelQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseChannelQuery();
		}
	},

	parseFreqQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseFreqQuery();
		}
	},

	parseOpModeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseOpModeQuery();
		}
	},

	parseInstListQuery : function() {
		wirelessSettingsModel.instances = [];
		if (top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"])
			wirelessSettingsModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while (top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]) {
			wirelessSettingsModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},

	parseRatesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			if (wirelessSettingsModel.instances[i].parseRatesQuery)
				wirelessSettingsModel.instances[i].parseRatesQuery();
		}
	},

	parseSecurityValuesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseSecurityValuesQuery();
		}
	},

	parseSsidQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseSSIDQuery();
		}
	},

	parseSsidHiddenQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseSsidHiddenQuery();
		}
	},

	parseApEnabledQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseApEnabledQuery();
		}
	},

	parseIsolationQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseIsolationQuery();
		}
	},

	parseRateQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseRateQuery();
		}
	},

	parseTxmodeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseTxmodeQuery();
		}
	},

	parseTxpowerQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].parseTxpowerQuery();
		}
	},

	parseIsDefaultQuery : function() {
		$.each(wirelessSettingsModel.instances, function(index, instance) {
			instance.configSettings.isDefault = top.xmlResponseObject["cfgmgr-0"]["isdefault"] == "true";
		})
	},
	
	sendStaConnectedApRssiQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendStaConnectedApRssiQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseStaConnectedApRssiQuery"
		});
	},

	sendApAclModeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendApAclModeQuery();
		}

		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseApAclModeQuery"
		});
	},

	sendWpsPinQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendWpsPinQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseWpsPinQuery"
		});
	},

	sendAirTouchQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseAirTouchQuery"
		});
	},

	sendAPListQuery : function() {
		globalModel.addQuery({
			instance : "devmgr-0",
			key : "inst_list",
			value : "wireless_ap"
		});
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseAPListQuery"
		});
	},

	sendCapabilitiesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendCapabilitiesQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseCapabilitiesQuery"
		});
	},

	sendChanbwQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendChanbwQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseChanbwQuery"
		});
	},

	sendChannelQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendChannelQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseChannelQuery"
		});
	},

	sendFreqQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseFreqQuery"
		});
	},

	sendOpModeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseOpModeQuery"
		});
	},

	sendInstListQuery : function() {
		globalModel.addQuery({
			instance : "devmgr-0",
			key : "inst_list",
			value : "wireless_core"
		});
		globalModel.addQuery({
			instance : "devmgr-0",
			key : "inst_list",
			value : "wireless"
		});
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseInstListQuery"
		});
	},

	sendRatesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			if (wirelessSettingsModel.instances[i].sendRatesQuery)
				wirelessSettingsModel.instances[i].sendRatesQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseRatesQuery"
		});
	},

	sendSecurityValuesQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendSecurityValuesQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseSecurityValuesQuery"
		});
	},

	sendSsidQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendSSIDQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseSsidQuery"
		});
	},

	sendSsidHiddenQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendSsidHiddenQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseSsidHiddenQuery"
		});
	},

	sendApEnabledQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendApEnabledQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseApEnabledQuery"
		});
	},

	sendIsolationQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendIsolationQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseIsolationQuery"
		});
	},

	sendRateQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendRateQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseRateQuery"
		});
	},

	sendTxmodeQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendTxmodeQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseTxmodeQuery"
		});
	},

	sendTxpowerQuery : function() {
		for (var i = 0; i < wirelessSettingsModel.instances.length; i++) {
			wirelessSettingsModel.instances[i].sendTxpowerQuery();
		}
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseTxpowerQuery"
		});
	},

	sendIsDefaultQuery : function() {
		globalModel.addQuery({
			instance : "cfgmgr-0",
			key : "isdefault"
		});
		globalModel.addEvent({
			eventHandler : "wirelessSettingsModel",
			id : "wirelessSettingsModel.parseIsDefaultQuery"
		});
	}
};

