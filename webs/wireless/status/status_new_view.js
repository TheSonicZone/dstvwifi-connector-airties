var wirelessStatusView =
{
	managerStatus:
	{
		addRow:
		{
			activateWirelessNetwork: function(index)
			{
				var instance = wirelessStatusView.instances[index];

				var getId = wirelessStatusView.managerStatus.getId;
				getId.instance_index = index;

				var selectedFreq = instance.configSettings.freq;
				var selectedFreqName = instance.freqs[selectedFreq].text;

				instance.networkEnabledControlId = getId.networkEnabledControlId();

				//activateWirelessNetworkSpanTemplate = '<span ml="__ML_wireless_network_lan"></span> <instance_index> <span id="<id>" ml="__ML_wireless_network_enabled"></span>'.replace("<instance_index>", (index+1)).replace("<id>", getId.networkEnabledLabelId());
				activateWirelessNetworkSpanTemplate = '<span ml="__ML_wireless_network_lan"></span> <instance_index> <span id="<id>" ml="__ML_wireless_network_enabled"></span>'.replace("<instance_index>", (wirelessStatusView.instances.length > 1 ? (index+1) : "") + " (" + selectedFreqName + ")").replace("<id>", getId.networkEnabledLabelId());

				activateWirelessNetworkControlTemplate = '<input type="checkbox" id="<id>" />'.replace("<id>", instance.networkEnabledControlId);

				$("#managerStatusDiv_" + index).append("<div>" + activateWirelessNetworkSpanTemplate + "" + activateWirelessNetworkControlTemplate + "</div>");
				
				if (__DEF_wirelessStatusHideEnableDisableControl) {
					$("#" + instance.networkEnabledControlId).hide();
				}
			},

			band: function(index)
			{
				var instance = wirelessStatusView.instances[index];

				var selectedFreq = instance.configSettings.freq;
				var selectedFreqName = instance.freqs[selectedFreq].text;

				bandSpanTemplate = '<span id="__ML_wireless_network_band_'+index+'" ml="__ML_wireless_network_band" class="large"></span>';
				bandSpanValueTemplate = '<span id="managerStatusBandSpan_' + index + '" class="large">' + selectedFreqName + '</span>';

				$("#managerStatusDiv_" + index).append("<div>" + bandSpanTemplate + " " + bandSpanValueTemplate + "</div>");
			},

			connectedClients: function(index)
			{
				var instance = wirelessStatusView.instances[index];
				var getId = wirelessStatusView.managerStatus.getId;
				getId.instance_index = index;

				var connectedClientsDiv = $('<div class="connectedClients"></div>');

				connectedClientsSpanTemplate = '<div><span id="__ML_connected_clients_'+index+'" ml="__ML_connected_clients"></span></div>';

				$(connectedClientsDiv).append(connectedClientsSpanTemplate);

				var apsTable = $("<table class='wirelessStatusApsTable globalBorder'></table>").appendTo(connectedClientsDiv);

				$("#managerStatusDiv_" + index).append(connectedClientsDiv);

				for(var i=0; i<instance.aps.length; i++)
				{
					getId.ap_index = i;

					var ssidSpanTemplate = '<span id="<id>">SSID</span>';
					var ssidSpanValueTemplate = '<span id="<id>"><text></span>'.replace("<text>", instance.aps[i].ssid_serialized);

					var securitySpanTemplate = '<span id="<id>" ml="__ML_ssid_security"></span>';
					var securitySpanValueTemplate = '<span id="<id>"><text></span>'.replace("<text>", globalWireless.securityType(instance.aps[i].sec_mode));

					var statusSpanTemplate = '<span id="<id>" ml="__ML_ssid_status"></span>';
					var statusSpanValueTemplate = '<span id="<id>" ml="<text>"></span>'.replace("<text>", instance.aps[i].enabled ? "__ML_ssid_active" : "__ML_ssid_passive");

					var className = (i % 2 == 0) ? "colored" : "";

					var row = $("<tr></tr>").appendTo(apsTable);
					var cell = $('<td colspan="3"></td>').appendTo(row);
					var apsWithConnectedClientsTable = $("<table class='" + className + "'></table>").appendTo(cell);
					row = $("<tr></tr>").appendTo(apsWithConnectedClientsTable);

					$("<td class='ssid'></td>").append(ssidSpanTemplate.replace("<id>", getId.ssidLabelId()) + ": " + ssidSpanValueTemplate.replace("<id>", getId.ssidValueId())).appendTo(row);
					$("<td class='security'></td>").append(securitySpanTemplate.replace("<id>", getId.securityLabelId()) + ": " + securitySpanValueTemplate.replace("<id>", getId.securityValueId())).appendTo(row);
					$("<td class='status'></td>").append(statusSpanTemplate.replace("<id>", getId.statusLabelId()) + ": " + statusSpanValueTemplate.replace("<id>", getId.statusValueId())).appendTo(row);

					if(instance.aps[i].stations.length > 0)
					{
						row = $("<tr></tr>").appendTo(apsWithConnectedClientsTable);
						var cell = $('<td colspan="3"></td>').appendTo(row);
						var connectedClientsTable = $("<table class='wirelessStatusApsStationsTable'></table>").appendTo(cell);
					}

					for(var j=0; j<instance.aps[i].stations.length; j++)
					{
						var macAddrSpanTemplate = '<span id="<id>" ml="__ML_mac_address_lower_case"></span>'
																					.replace(
																							"<id>", getId.macAddrLabelId(j)
																							);

						var macAddrSpanValueTemplate = '<span id="<id>"><text></span>'
																					.replace(
																							"<id>", getId.macAddrValueId(j)
																							)
																					.replace(
																								"<text>", instance.aps[i].stations[j].sta_mac
																							);

						var nameSpanTemplate = '<span id="<id>" ml="__ML_lan_dhcp_client_name"></span>'
																					.replace(
																							"<id>", getId.nameLabelId(j)
																							);

						var nameSpanValueTemplate = '<span id="<id>"><text></span>'
																					.replace(
																							"<id>", getId.nameValueId(j)
																							)
																					.replace(
																							"<text>", instance.aps[i].stations[j].name
																							);

						var rateSpanTemplate = '<span id="<id>" ml="__ML_wireless_rate"></span>'
																					.replace(
																							"<id>", getId.rateLabelId(j)
																							);

						var rateSpanValueTemplate = '<span id="<id>"><text></span>'
																					.replace(
																							"<id>", getId.rateValueId(j)
																							)
																					.replace(
																							"<text>", instance.aps[i].stations[j].rate
																							);

						var rssiImgValueTemplate = globalWireless.rssiStatusUsingPercentage(instance.aps[i].stations[j].rssi);

						row = $("<tr></tr>").appendTo(connectedClientsTable);
						$("<td class='mac'></td>").append(macAddrSpanTemplate + ": " + macAddrSpanValueTemplate).appendTo(row);
						
						if(wirelessStatusView.instances[index].clientNameCanBeGet)
						{
							$("<td class='name'></td>").append(nameSpanTemplate + ": " + nameSpanValueTemplate).appendTo(row);
						}
						if(instance.aps[i].stations[j].rate != 0)
						{
							$("<td class='rate'></td>").append(rateSpanTemplate + ": " + rateSpanValueTemplate).appendTo(row);
						}
						$("<td class='rssi'></td>").append(rssiImgValueTemplate).appendTo(row);
					}
				}
			}
		},

		addStatusDiv: function(index)
		{
			var getId = wirelessStatusView.managerStatus.getId;
			getId.instance_index = index;

			wirelessStatusView.managerStatus.managerStatusId = "managerStatusDiv_" + index;

			wirelessStatusView.managerStatus.managerStatus = $("<div id='" + wirelessStatusView.managerStatus.managerStatusId + "' class='center'></div>").appendTo("#contentDiv");

			if(__DEF_WirelessStatusHideDisableControl != 1)
				wirelessStatusView.managerStatus.addRow.activateWirelessNetwork(index);

			if(__DEF_WirelessStatusHideBandInfo != 1)
				wirelessStatusView.managerStatus.addRow.band(index);

			if(wirelessStatusView.instances[index].configSettings.opMode == "ap") {
				wirelessStatusView.managerStatus.addRow.connectedClients(index);
			}

			$("#" + getId.networkEnabledControlId()).attr('checked', wirelessStatusView.instances[index].configSettings.enabled);
		},

		get: {
			enabled: function(index)
			{
				return $("#" + wirelessStatusView.instances[index].networkEnabledControlId).is(":checked");
			}
		},

		getId: {
			instance_index: 0,
			ap_index: 0,
			networkEnabledControlId: function()
			{
				if(this.instance_index > 0)
				{
					return "__V_wireless_network_enabled_«instance_index»".replace("«instance_index»", this.instance_index);
				}
				else
				{
					return "__V_wireless_network_enabled";
				}
			},
			networkEnabledLabelId: function()
			{
				if(this.instance_index > 0)
				{
					return "__ML_wireless_network_enabled_«instance_index»".replace("«instance_index»", this.instance_index);
				}
				else
				{
					return "__ML_wireless_network_enabled";
				}
			},
			ssidValueId: function()
			{
				if(this.instance_index > 0)
				{
					return "ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "ssid_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			ssidLabelId: function()
			{
				if(this.instance_index > 0)
				{
					return "ssid_label_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "ssid_label_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			securityValueId: function()
			{
				if(this.instance_index > 0)
				{
					return "security_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "security_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			securityLabelId: function()
			{
				if(this.instance_index > 0)
				{
					return "security_label_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "security_label_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			statusValueId: function()
			{
				if(this.instance_index > 0)
				{
					return "status_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "status_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			statusLabelId: function()
			{
				if(this.instance_index > 0)
				{
					return "status_label_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
				}
				else
				{
					return "status_label_«ap_index»".replace("«ap_index»", this.ap_index);
				}
			},
			macAddrLabelId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "__ML_mac_address_lower_case_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "__ML_mac_address_lower_case_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			macAddrValueId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "client_mac_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "client_mac_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			nameLabelId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "__ML_lan_dhcp_client_name_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "__ML_lan_dhcp_client_name_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			nameValueId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "client_name_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "client_name_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			rateLabelId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "__ML_wireless_rate_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "__ML_wireless_rate_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			rateValueId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "client_rate_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "client_rate_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			rssiLabelId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "__ML_wireless_signal_level_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "__ML_wireless_signal_level_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			},
			rssiValueId: function(client_index)
			{
				if(this.instance_index > 0)
				{
					return "client_rssi_«instance_index»_«ap_index»_«client_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
				else
				{
					return "client_rssi_«ap_index»_«client_index»".replace("«ap_index»", this.ap_index).replace("«client_index»", client_index);
				}
			}
		}
	},

	documentReady: function()
	{
		$("#contentDiv").html("");
		wirelessStatusView.addHedaerDiv();
		wirelessStatusView.addCommentDiv();
	},

	addHedaerDiv: function()
	{
		$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
		$("#headerDiv").append("<span id='__ML_wireless_network' ml='__ML_wireless_network'></span>");
	},

	addCommentDiv: function()
	{
		$("#contentDiv").append("<div class='marginCenter'></div>");
		$("#commentDiv").html("");
		$("#commentDiv").append("<span id='__ML_wireless_status_intro' ml='__ML_wireless_status_intro'></span>");
	},

	addFooter: function()
	{
		var footer = $("<div class='footer'></div>");
		footer.append("<input type='button' id='__ML_save' ml='__ML_save' onclick='global.raiseEvent({eventHandler: \"wirelessStatusController\", id: \"saveClicked\"});'/>");
		footer.append('<input type="button" id="__ML_cancel" ml="__ML_cancel" onclick="global.raiseEvent({eventHandler: \'wirelessStatusController\', id: \'reloadPage\'});" />');
		footer.appendTo("#contentDiv");
		
		if (__DEF_wirelessStatusHideEnableDisableControl) {
			$("#__ML_save").hide();
			$("#__ML_cancel").hide();
		}
	}
}
