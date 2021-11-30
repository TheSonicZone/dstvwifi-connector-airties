var style = $("<style>").html(".noTitle .ui-dialog-titlebar {display:none}");
$("head").append(style);

var wirelessSettingsView = {
	managerTab : {
		managerTab : "",
		managerTabId : "",
		topTable : "",
		apTables : [],
		timeOutObj : "",

		addRow : {
			wpsPin : function(index) {
				if (__DEF_WirelessWpsSupport == "1") {
					var instance = wirelessSettingsView.instances[index];
					var mt = wirelessSettingsView.managerTab;

					instance.wpsPinControlId = mt.getId.wpsPinControlId(index);
					instance.wpsPinLabelId = mt.getId.wpsPinLabelId(index);

					var wpsPinSpanTemplate = "<span id='<id>' ml='__ML_WPS_PIN'></span>";
					var wpsPinControlTemplate = "<span id='<id>'></span>";

					var row = $("<tr></tr>");
					if (wirelessSettingsView.mode != "standard") {
						row.css("display", "none");
					}
					row.appendTo(wirelessSettingsView.managerTab.topTable);

					$("<td></td>").append(wpsPinSpanTemplate.replace("<id>", instance.wpsPinLabelId)).appendTo(row);

					var wpsPinCell = $("<td></td>").appendTo(row);

					wpsPinCell.append(wpsPinControlTemplate.replace("<id>", instance.wpsPinControlId));
				}
			},

			airTouch : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.airTouchControlId = mt.getId.airTouchControlId(index);
				instance.airTouchLabelId = mt.getId.airTouchLabelId(index);

				var airTouchSpanTemplate = "<span id='<id>' ml='__ML_touch_caption'></span>";
				var airTouchControlTemplate = "<input type='checkbox' id='<id>'/>";

				var row = $("<tr></tr>");

				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}

				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(airTouchSpanTemplate.replace("<id>", instance.airTouchLabelId)).appendTo(row);

				var airTouchCell = $("<td></td>").appendTo(row);

				airTouchCell.append(airTouchControlTemplate.replace("<id>", instance.airTouchControlId));
			},

			chanbw : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.chanbwControlId = mt.getId.chanbwControlId(index);
				instance.chanbwLabelId = mt.getId.chanbwLabelId(index);

				var chanbwSpanTemplate = "<span id='<id>' ml='__ML_bandwith'></span>";
				var chanbwComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.chanbw_changed\"});'></select>";

				var row = $("<tr></tr>");

				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}

				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(chanbwSpanTemplate.replace("<id>", instance.chanbwLabelId)).appendTo(row);

				var chanbwCell = $("<td></td>").appendTo(row);

				chanbwCell.append(chanbwComboTemplate.replace("<id>", instance.chanbwControlId).replace("<index>", index));
			},
			channel : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.channelControlId = mt.getId.channelControlId(index);
				instance.channelLabelId = mt.getId.channelLabelId(index);

				var channelSpanTemplate = "<span id='<id>' ml='__ML_freq_channel_caption'></span>";
				var channelComboTemplate = "<select id='<id>'></select>";

				var row = $("<tr></tr>");

				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}

				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(channelSpanTemplate.replace("<id>", instance.channelLabelId)).appendTo(row);

				var channelCell = $("<td></td>").appendTo(row);

				channelCell.append(channelComboTemplate.replace("<id>", instance.channelControlId));
			},
			firstSsid : function(index) {
				if (wirelessSettingsView.mode == "standard") {
					return;
				}

				var mt = wirelessSettingsView.managerTab;
				var at = wirelessSettingsView.managerTab.getId.apTable;
				at.ap_index = 0;

				var row = "<tr><td><span ml='__ML_wireless_network_name'></span> :</td><td><input id='first_" + at.getSsidTextboxId() + "' type='text' size='20' maxlength='32'></td></tr>";
				mt.topTable.append(row);
			},
			firstPassword : function(index) {
				if (wirelessSettingsView.mode == "standard") {
					return;
				}

				var mt = wirelessSettingsView.managerTab;
				var at = wirelessSettingsView.managerTab.getId.apTable;
				at.ap_index = 0;

				var row = "<tr><td><span ml='__ML_wizard_wireless_password'></span> :</td><td><input type='input' id='first_" + at.getPasswordTextboxId() + "' style='display:block; width:150px' class='regexValidate' disabled=''></td></tr>";
				mt.topTable.append(row);
			},
			firstSecMode : function(index) {
				if (wirelessSettingsView.mode == "standard") {
					return;
				}

				var mt = wirelessSettingsView.managerTab;
				var at = wirelessSettingsView.managerTab.getId.apTable;
				at.ap_index = 0;

				var row = "<tr><td><span ml='__ML_encryption'></span> :</td><td>"
				row += "	<select name='first_" + at.getSecurityModeComboId() + "' id='first_" + at.getSecurityModeComboId() + "' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.secMode_changed\", index: " + index + ", ap_index: 0});'>";
				row += "		<option value='off' selected='selected' ml='__ML_wireless_security_mode_no_encryption'></option>";
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wpa_both) {
					row += "	<option value='wpa_both' ml='__ML_both'></option>";
				}
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wpa) {
					row += "	<option value='wpa'>WPA</option>";
				}
				row += "		<option value='wpa2'>WPA2</option>";
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wep) {
					row += "	<option value='wep'>WEP</option>";
				}
				row += "	</select>";

				row += "</td></tr>";
				mt.topTable.append(row);
			},
			freq : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.freqSpanId = mt.getId.freqLabel(index);
				instance.freqControlId = mt.getId.freqControl(index);
				instance.freqSpanValueId = mt.getId.freqSpanValue(index);
				instance.freqComboOptionIdTemplate = mt.getTemplate.freqComboOptionId(index);

				var freqSpanTemplate = "<span id='<id>' ml='__ML_frequency'></span>";
				var freqComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.freq_changed\", index: <index>});'></select>";
				var freqComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var freqSpanValueTemplate = "<span id='<id>'><text></span>";

				var row = $("<tr></tr>");
				row.appendTo(mt.topTable);

				$("<td></td>").append(freqSpanTemplate.replace("<id>", instance.getFreqLabelId)).appendTo(row);

				var freqCell = $("<td></td>").appendTo(row);
				freqCell.append(global.replaceAll({
					text : freqComboTemplate.replace("<id>", instance.freqControlId),
					search : "<index>",
					replace : index.toString()
				}));

				var counter = 0;
				for (var freq in instance.freqs) {
					if (counter == 0)
						freqCell.append(freqSpanValueTemplate.replace("<id>", instance.freqSpanValueId).replace("<text>", instance.freqs[freq].text));
					var freqComboOptionId = instance.freqComboOptionIdTemplate.replace("<freq>", freq);
					$("#" + instance.freqControlId).append(freqComboOptionTemplate.replace("<value>", freq).replace("<id>", freqComboOptionId).replace("<text>", instance.freqs[freq].text));
					counter++;
				}

				if (counter > 1) {
					$("#" + wirelessSettingsView.instances[index].freqSpanValueId).hide();
				} else {
					$("#" + wirelessSettingsView.instances[index].freqControlId).hide();
				}
			},
			mode : function(index) {
				var modeSpanId = "span_mode";
				wirelessSettingsView.instances[index].modeControlId = wirelessSettingsView.managerTab.getId.modeControl(index);

				if (index > 0) {
					modeSpanId = "span_mode_<index>".replace("<index>", index);
				}

				var modeSpanTemplate = "<span id='<id>' ml='__ML_freq_mode_caption'></span>";
				var modeComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.mode_changed\", index: <index>});'></select>";

				var row = $("<tr></tr>");
				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}
				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(modeSpanTemplate.replace("<id>", modeSpanId)).appendTo(row);

				var modeCell = $("<td></td>").appendTo(row);

				modeCell.append(global.replaceAll({
					text : modeComboTemplate,
					search : "<index>",
					replace : index.toString()
				}).replace("<id>", wirelessSettingsView.instances[index].modeControlId));
			},

			rate : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.rateSpanId = mt.getId.rateLabelId(index);
				instance.rateControlId = mt.getId.rateControlId(index);

				var rateSpanTemplate = "<span id='<id>' ml='__ML_rates_caption'></span>";
				var rateComboTemplate = "<select id='<id>'></select>";

				var row = $("<tr></tr>");
				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}
				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(rateSpanTemplate.replace("<id>", instance.rateSpanId)).appendTo(row);

				var rateCell = $("<td></td>").appendTo(row);

				rateCell.append(rateComboTemplate.replace("<id>", instance.rateControlId));
			},

			txpower : function(index) {
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.txpowerSpanId = mt.getId.txpowerLabelId(index);
				instance.txpowerControlId = mt.getId.txpowerControlId(index);

				var txpowerSpanTemplate = "<span id='<id>' ml='__ML_freq_power_caption'></span>";
				var txpowerComboTemplate = "<select id='<id>'></select>";

				var row = $("<tr></tr>");
				if (wirelessSettingsView.mode != "standard") {
					row.css("display", "none");
				}
				row.appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(txpowerSpanTemplate.replace("<id>", instance.txpowerSpanId)).appendTo(row);

				var txpowerCell = $("<td></td>").appendTo(row);

				txpowerCell.append(txpowerComboTemplate.replace("<id>", instance.txpowerControlId));
			}
		},
		setOptions : {
			chanbw : function(index) {
				var chanbwComboOptionIdTemplate = "opt_chanbw_<chanbw>";
				var chanbwComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var chanbwComboId = "cmb_chanbw";

				if (index > 0) {
					chanbwComboOptionIdTemplate = "opt_chanbw_<index>_<chanbw>".replace("<index>", index);
					chanbwComboId = "cmb_chanbw_<index>".replace("<index>", index);
				}

				$("#" + chanbwComboId).html("");

				var selectedMode = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)].modes[wirelessSettingsView.managerTab.get.mode(index)];

				for (var chanbw in selectedMode.chanbws) {
					$("#" + chanbwComboId).append(chanbwComboOptionTemplate.replace("<value>", chanbw).replace("<id>", chanbwComboOptionIdTemplate.replace("<chanbw>", chanbw)).replace("<text>", selectedMode.chanbws[chanbw].text));
				}

				$("#" + chanbwComboId).val(selectedMode.defaultChannelBw);
			},

			channel : function(index) {
				var channelComboOptionIdTemplate = "opt_channel_<channel>";
				var channelComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var channelComboId = "cmb_channel";

				if (index > 0) {
					channelComboOptionIdTemplate = "opt_channel_<index>_<channel>".replace("<index>", index);
					channelComboId = "cmb_channel_<index>".replace("<index>", index);
				}

				$("#" + channelComboId).html("");
				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];
				for (var i = 0; i < selectedFreq.channels.length; i++) {
					$("#" + channelComboId).append(channelComboOptionTemplate.replace("<value>", selectedFreq.channels[i].code).replace("<id>", channelComboOptionIdTemplate.replace("<channel>", selectedFreq.channels[i].code)).replace("<text>", selectedFreq.channels[i].text));

					if (!isNaN(selectedFreq.channels[i].code)) {
						if (selectedFreq.minChannel == undefined || parseInt(selectedFreq.minChannel) > parseInt(selectedFreq.channels[i].code))
							selectedFreq.minChannel = selectedFreq.channels[i].code;
						if (selectedFreq.maxChannel == undefined || parseInt(selectedFreq.maxChannel) < parseInt(selectedFreq.channels[i].code))
							selectedFreq.maxChannel = selectedFreq.channels[i].code;
					}
				}

				$("#" + channelComboId).val(selectedFreq.defaultChannel);

			},
			mode : function(index) {
				var modeComboOptionIdTemplate = "opt_mode_<mode>";
				var modeComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";

				if (index > 0) {
					modeComboOptionIdTemplate = "opt_mode_<index>_<mode>".replace("<index>", index);
				}

				$("#" + wirelessSettingsView.instances[index].modeControlId).html("");

				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];

				for (var i in selectedFreq.modes) {
					$("#" + wirelessSettingsView.instances[index].modeControlId).append(modeComboOptionTemplate.replace("<value>", i).replace("<id>", modeComboOptionIdTemplate.replace("<mode>", i)).replace("<text>", selectedFreq.modes[i].text));
				}
				wirelessSettingsView.managerTab.set.mode(index, selectedFreq.defaultMode);
			},

			rate : function(index) {
				var chanbwComboId = "cmb_chanbw";
				var rateComboOptionIdTemplate = "opt_rate_<rate>";
				var rateComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var rateComboId = "cmb_rate";

				if (index > 0) {
					chanbwComboId = "cmb_chanbw_<index>".replace("<index>", index);
					rateComboOptionIdTemplate = "opt_rate_<index>_<rate>".replace("<index>", index);
					rateComboId = "cmb_rate_<index>".replace("<index>", index);
				}

				var chanbw = $("#" + chanbwComboId).val();

				$("#" + rateComboId).html("");
				var selectedChanbw = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)].modes[wirelessSettingsView.managerTab.get.mode(index)].chanbws[chanbw];
				for (var rate in selectedChanbw.sortedRates) {
					$("#" + rateComboId).append(rateComboOptionTemplate.replace("<value>", selectedChanbw.sortedRates[rate]).replace("<id>", rateComboOptionIdTemplate.replace("<rate>", selectedChanbw.sortedRates[rate])).replace("<text>", selectedChanbw.rates[selectedChanbw.sortedRates[rate]].text));
				}

				$("#" + rateComboId).hide().show();
			},

			txpower : function(index) {
				var txpowerComboOptionIdTemplate = "opt_txpower_<txpower>";
				var txpowerComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var txpowerComboId = "cmb_txpower";

				if (index > 0) {
					txpowerComboOptionIdTemplate = "opt_txpower_<index>_<txpower>".replace("<index>", index);
					txpowerComboId = "cmb_txpower_<index>".replace("<index>", index);
				}

				$("#" + txpowerComboId).html("");

				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];

				for (var i = 0; i < selectedFreq.txpowers.length; i++) {
					$("#" + txpowerComboId).append(txpowerComboOptionTemplate.replace("<value>", selectedFreq.txpowers[i].code).replace("<id>", txpowerComboOptionIdTemplate.replace("<txpower>", selectedFreq.txpowers[i].code)).replace("<text>", selectedFreq.txpowers[i].text));
				}
			}
		},

		getId : {
			wpsPinControlId : function(index) {
				if (index > 0) {
					return "wps_pin_<index>".replace("<index>", index);
				} else {
					return "wps_pin";
				}
			},

			wpsPinLabelId : function(index) {
				if (index > 0) {
					return "wps_pin_label_<index>".replace("<index>", index);
				} else {
					return "wps_pin_label";
				}
			},

			airTouchControlId : function(index) {
				if (index > 0) {
					return "cmb_touch_<index>".replace("<index>", index);
				} else {
					return "cmb_touch";
				}
			},

			airTouchLabelId : function(index) {
				if (index > 0) {
					return "span_airtouch_<index>".replace("<index>", index);
				} else {
					return "span_airtouch";
				}
			},

			chanbwControlId : function(index) {
				if (index > 0) {
					return "cmb_chanbw_<index>".replace("<index>", index);
				} else {
					return "cmb_chanbw";
				}
			},

			chanbwLabelId : function(index) {
				if (index > 0) {
					return "span_chanbw_<index>".replace("<index>", index);
				} else {
					return "span_chanbw";
				}
			},

			channelControlId : function(index) {
				if (index > 0) {
					return "cmb_channel_<index>".replace("<index>", index);
				} else {
					return "cmb_channel";
				}
			},

			channelLabelId : function(index) {
				if (index > 0) {
					return "span_channel_<index>".replace("<index>", index);
				} else {
					return "span_channel";
				}
			},

			freqSpanValue : function(index) {
				if (index > 0) {
					return "span_<index>_freqValue".replace("<index>", index);
				} else {
					return "span_freqValue";
				}
			},

			freqLabel : function(index) {
				if (index > 0) {
					return "span_freq_<index>".replace("<index>", index);
				} else {
					return "span_freq";
				}
			},

			freqControl : function(index) {
				if (index > 0) {
					return "cmb_freq_<index>".replace("<index>", index);
				} else {
					return "cmb_freq";
				}
			},

			modeControl : function(index) {
				if (index > 0) {
					return "cmb_mode_<index>".replace("<index>", index);
				} else {
					return "cmb_mode";
				}
			},

			rateControlId : function(index) {
				if (index > 0) {
					return "cmb_rate_<index>".replace("<index>", index);
				} else {
					return "cmb_rate";
				}
			},

			rateLabelId : function(index) {
				if (index > 0) {
					return "span_rate_<index>".replace("<index>", index);
				} else {
					return "span_rate";
				}
			},

			txpowerControlId : function(index) {
				if (index > 0) {
					return "cmb_txpower_<index>".replace("<index>", index);
				} else {
					return "cmb_txpower";
				}
			},

			txpowerLabelId : function(index) {
				if (index > 0) {
					return "span_txpower_<index>".replace("<index>", index);
				} else {
					return "span_txpower";
				}
			},

			apTable : {
				instance_index : 0,
				ap_index : 0,
				getEnabledDivId : function() {
					if (this.instance_index > 0) {
						return "div_cb_enabled_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "div_cb_enabled«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getEnabledCheckboxId : function() {
					if (this.instance_index > 0) {
						return "cb_enabled_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "cb_enabled_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getSsidTextboxId : function() {
					if (this.instance_index > 0) {
						return "txt_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "txt_ssid_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getHiddenDivId : function() {
					if (this.instance_index > 0) {
						return "div_cb_hidden_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "div_cb_hidden_ssid«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getHiddenCheckboxId : function() {
					if (this.instance_index > 0) {
						return "cb_hidden_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "cb_hidden_ssid_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getUserIsolationDivId : function() {
					if (this.instance_index > 0) {
						return "div_cb_user_isolation_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "div_cb_user_isolation«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getUserIsolationCheckboxId : function() {
					if (this.instance_index > 0) {
						return "cb_user_isolation_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "cb_user_isolation_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getSecurityModeComboId : function() {
					if (this.instance_index > 0) {
						return "sec_mode_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "sec_mode_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getPasswordTextboxId : function() {
					if (this.instance_index > 0) {
						return "app_sec_password_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					} else {
						return "app_sec_password_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				}
			}

		},

		getTemplate : {
			freqComboOptionId : function(index) {
				if (index > 0) {
					return "opt_freq_<index>_<freq>".replace("<index>", index);
				} else {
					return "opt_freq_<freq>";
				}
			}
		},

		set : {
			wpsPin : function(index, value) {
				return $("#" + wirelessSettingsView.instances[index].wpsPinControlId).html(value);
			},

			airTouch : function(index, value) {
				return $("#" + wirelessSettingsView.instances[index].airTouchControlId).attr("checked", value);
			},

			chanbw : function(index, value) {
				$("#" + wirelessSettingsView.instances[index].chanbwControlId).val(value);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.chanbw_changed",
					index : index
				});
			},

			channel : function(index, value) {
				$("#" + wirelessSettingsView.instances[index].channelControlId).val(value);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.channel_changed",
					index : index
				});
			},

			freq : function(index, value) {
				$("#" + wirelessSettingsView.instances[index].freqControlId).val(value);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.freq_changed",
					index : index
				});
			},

			mode : function(index, value) {
				$("#" + wirelessSettingsView.instances[index].modeControlId).val(value);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.mode_changed",
					index : index
				});
			},

			txpower : function(index, value) {
				$("#" + wirelessSettingsView.instances[index].txpowerControlId).val(value);
			},

			password : function(instance_index, ap_index) {
				var getId = wirelessSettingsView.managerTab.getId.apTable;
				getId.instance_index = instance_index;
				getId.ap_index = ap_index;

				var ap = wirelessSettingsView.instances[instance_index].aps[ap_index];
				var value = "";

				var disabled = false;

				switch($("#" + getId.getSecurityModeComboId()).val()) {
					case "off":
						disabled = true;
						break;
					case "wep":
						value = ap["wep_key" + ap.wep_key_index_for_functions];
						break;
					case "wpa":
					case "wpa2":
					case "wpa_both":
						if (ap.wpa_auth_type == "enterprise") {
							value = ap.wpa_radius_key;
						} else {
							value = ap.wpa_password;
						}
						break;
				}

				$("#" + getId.getPasswordTextboxId()).val(value).attr("disabled", disabled);

				if (wirelessSettingsView.mode != "standard" && ap_index == 0) {
					var value = "";
					var disabled = false;
					switch ($("#first_" + getId.getSecurityModeComboId()).val()) {
						case "off":
							disabled = true;
							break;
						case "wep":
							value = ap["wep_key" + ap.wep_key_index_for_functions];
							break;
						case "wpa":
						case "wpa2":
						case "wpa_both":
							if (ap.wpa_auth_type == "enterprise") {
								value = ap.wpa_radius_key;
							} else {
								value = ap.wpa_password;
							}
							break;
					}
					$("#first_" + getId.getPasswordTextboxId()).val(value).attr("disabled", disabled);
				}
			},

			opMode : function(index, value) {
				$("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).val(value);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.operationMode_changed",
					index : index
				});
			},

			mainSsidHidden : function(index, apIndex, value) {
				var getId = wirelessSettingsView.managerTab.getId.apTable;

				getId.instance_index = index;
				getId.ap_index = apIndex;

				$("#" + getId.getHiddenCheckboxId()).attr("checked", value);
			}
		},

		get : {
			airTouch : function(index) {
				return $("#" + wirelessSettingsView.instances[index].airTouchControlId).is(":checked");
			},

			chanbw : function(index) {
				return $("#" + wirelessSettingsView.instances[index].chanbwControlId).val();
			},

			channel : function(index) {
				return $("#" + wirelessSettingsView.instances[index].channelControlId).val();
			},

			freq : function(index) {
				return $("#" + wirelessSettingsView.instances[index].freqControlId).val();
			},

			mode : function(index) {
				return $("#" + wirelessSettingsView.instances[index].modeControlId).val();
			},

			txpower : function(index) {
				return $("#" + wirelessSettingsView.instances[index].txpowerControlId).val();
			},

			opMode : function(index) {
				return $("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).val();
			}
		},

		addApRows : function(index) {
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			getId.instance_index = index;

			for (var i = 0; i < wirelessSettingsView.instances[index].aps.length; i++) {
				getId.ap_index = i;
				var rowString = "";
				rowString += "<tr>";
				rowString += "	<td><div class='textCenter' id='" + getId.getEnabledDivId() + "'><input id='" + getId.getEnabledCheckboxId() + "' type='checkbox' " + (i == 0 ? "style='display: none; '" : "") + " checked='checked'></div></td>";
				rowString += "	<td><input id='" + getId.getSsidTextboxId() + "' type='text' size='20' maxlength='32'></td>";
				rowString += "	<td><div class='textCenter' id='" + getId.getHiddenDivId() + "'><input id='" + getId.getHiddenCheckboxId() + "' type='checkbox'></div></td>";
				rowString += "	<td><div class='textCenter' id='" + getId.getUserIsolationDivId() + "'><input id='" + getId.getUserIsolationCheckboxId() + "' type='checkbox'></div></td>";
				rowString += "	<td>";
				rowString += "		<select name='" + getId.getSecurityModeComboId() + "' id='" + getId.getSecurityModeComboId() + "' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.secMode_changed\", index: " + index + ", ap_index: " + i + "});'>";
				rowString += "			<option value='off' selected='selected' ml='__ML_wireless_security_mode_no_encryption'></option>";
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wpa_both) {
					rowString += "			<option value='wpa_both' ml='__ML_both'></option>";
				}
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wpa) {
					rowString += "			<option value='wpa'>WPA</option>";
				}
				rowString += "			<option value='wpa2'>WPA2</option>";
				if (wirelessSettingsView.instances[index].pollableSecurityModes.wep) {
					rowString += "			<option value='wep'>WEP</option>";
				}
				rowString += "		</select>";
				rowString += "	</td>";
				rowString += "	<td><input type='input' id='" + getId.getPasswordTextboxId() + "' style='display:block; width:150px' class='regexValidate' disabled=''></td>";
				rowString += "</tr>";
				wirelessSettingsView.managerTab.apTables[index].append(rowString);
			}
		},

		setApRows : function(index) {
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			var aps = wirelessSettingsView.instances[index].aps;

			getId.instance_index = index;
			getId.ap_index = 0;

			if (wirelessSettingsView.mode != "standard") {
				$("#first_" + getId.getSsidTextboxId()).val(aps[0].ssid);
				$("#first_" + getId.getSecurityModeComboId()).val(aps[0].sec_mode);
			}

			for (var i = 0; i < aps.length; i++) {
				getId.ap_index = i;
				$("#" + getId.getSsidTextboxId()).val(aps[i].ssid);
				$("#" + getId.getSecurityModeComboId()).val(aps[i].sec_mode);
				$("#" + getId.getHiddenCheckboxId()).attr("checked", aps[i].ssid_hidden);
				$("#" + getId.getEnabledCheckboxId()).attr("checked", aps[i].enabled);
				$("#" + getId.getUserIsolationCheckboxId()).attr("checked", aps[i].isolation);
				$("#" + wirelessSettingsView.instances[index].rateControlId).val(aps[i].rate);
				global.raiseEvent({
					eventHandler : "wirelessSettingsController",
					id : "wirelessSettingsController.secMode_changed",
					index : index,
					ap_index : i
				});
			}

		},

		getApValues : function(instance_index, ap_index) {
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			getId.instance_index = instance_index;
			getId.ap_index = ap_index;
			var tempObj = {};
			var password = "";
			var secModeControl;
			if (wirelessSettingsView.mode != "standard" && ap_index == 0) {
				tempObj.ssid = $("#first_" + getId.getSsidTextboxId()).val();
				tempObj.sec_mode = $("#first_" + getId.getSecurityModeComboId()).val();
				password = $("#first_" + getId.getPasswordTextboxId()).val();
				secModeControl = $("#first_" + getId.getSecurityModeComboId())
			} else {
				tempObj.ssid = $("#" + getId.getSsidTextboxId()).val();
				tempObj.sec_mode = $("#" + getId.getSecurityModeComboId()).val();
				password = $("#" + getId.getPasswordTextboxId()).val();
				secModeControl = $("#" + getId.getSecurityModeComboId());
			}
			tempObj.ssid_hidden = $("#" + getId.getHiddenCheckboxId()).is(":checked");
			tempObj.enabled = $("#" + getId.getEnabledCheckboxId()).is(":checked");
			tempObj.isolation = $("#" + getId.getUserIsolationCheckboxId()).is(":checked");
			tempObj.rate = $("#" + wirelessSettingsView.instances[instance_index].rateControlId).val();

			switch(secModeControl.val()) {
				case "wep":
					tempObj["wep_key" + wirelessSettingsView.instances[instance_index].aps[ap_index].wep_key_index_for_functions] = password;
					break;
				case "wpa":
				case "wpa2":
				case "wpa_both":
					if (wirelessSettingsView.instances[instance_index].aps[ap_index].wpa_auth_type == "enterprise") {
						tempObj.wpa_radius_key = password;
					} else {
						tempObj.wpa_password = password;
					}
					break;
			}

			return tempObj;
		},

		addTab : function(index) {
			wirelessSettingsView.managerTab.managerTabId = "tabs-" + index;

			wirelessSettingsView.managerTab.managerTab = $("<div id='" + wirelessSettingsView.managerTab.managerTabId + "'></div>").appendTo("#tabs");

			wirelessSettingsView.addOpModeDiv(index);

			var temp = "<div id='" + (index == 0 ? "div_please_wait_for_process" : "div_please_wait_for_process_" + index) + "' class='center'>";
			temp += "	<span id='" + (index == 0 ? "__ML_wireless_operating_mode_ap_searching_message" : "__ML_wireless_operating_mode_ap_searching_message_" + index) + "' ml='__ML_wireless_operating_mode_ap_searching_message' class='large'></span>";
			temp += "	<br /><img src='/images/ajax-loader3.gif' alt='Please wait.' border='0' />";
			temp += "</div>";
			temp += "<div class='wirelessSettingsApTableDiv'>";
			temp += "	<table id='" + (index == 0 ? "apTable" : "apTable_" + index) + "' class='marginCenter wirelessSettingsBridgeModeApTable globalBorder'>";
			temp += "		<tbody id='apRows'></tbody>";
			temp += "	</table>";
			temp += "</div>";
			temp += "	<div id='apTableManualDiv' class='marginCenter wirelessSettingsBridgeModeApTable'>";
			temp += "	<strong><a href='#manualConfiguration' onclick='wirelessSettingsView.showHideManualConfiguration();'><span id='__ML_wireless_operating_mode_manual_configuration' ml='__ML_wireless_operating_mode_manual_configuration'></span></a></strong>";
			temp += "	<a name='manualConfiguration'></a>";
			temp += "	<div id='apTableManualDivContent' style='display:none'>";
			temp += "		<div><span ml='__ML_wireless_settings_manual_connect_info'></span></div>";
			temp += "		<table id='apTableManual' class='marginCenter wirelessSettingsBridgeModeApTable globalBorder'>";
			temp += "			<thead>";
			temp += "				<tr>";
			temp += "					<th><span id='__ML_wireless_operating_mode_manual_ssid' ml='__ML_wireless_operating_mode_manual_ssid'></span></th>";
			temp += "					<th><span id='__ML_wireless_operating_mode_manual_security' ml='__ML_wireless_operating_mode_manual_security'></span></th>";
			temp += "					<th><span id='__ML_wireless_operating_mode_station_mode_ap_password' ml='__ML_wireless_operating_mode_station_mode_ap_password'></span></th>";
			temp += "				</tr>";
			temp += "			</thead>";
			temp += "			<tbody id='apRowsManual'>";
			temp += "				<tr>";
			temp += "					<td>";
			temp += "						<input id='__V_wireless_operating_mode_ap_ssid_manual' type='text' />";
			temp += "					</td>";
			temp += "					<td>";
			temp += "						<select id='cmb_security_mode_manual'  onchange='wirelessSettingsView.changeSecurityModeManual();'>";
			temp += "							<option value='wpa2'>WPA2</option>";
			temp += "							<option value='wpa_both'>WPA/WPA2</option>";
			temp += "							<option value='wep'>WEP</option>";
			temp += "							<option value='off' id='__ML_wireless_security_mode_no_encryption' ml='__ML_wireless_security_mode_no_encryption'></option>";
			temp += "						</select>";
			temp += "					</td>";
			temp += "					<td>";
			temp += "						<input id='__V_wireless_operating_mode_ap_password_manual' type='text' />";
			temp += "					</td>";
			temp += "				</tr>";
			temp += "				<tr>";
			temp += "					<td colspan='3' class='textRight'>";
			temp += "						<input id='btnBridgeManualConnectAp_" + index + "' type='button' value='" + globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect') + "' onclick='wirelessSettingsView.turnToBridgeMode(" + index + ");'/><input id='btnBridgeManualCancelAp_" + index + "' type='button' value='" + globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_cancel') + "' onclick='wirelessSettingsView.showHideManualConfiguration();' />";
			temp += "					</td>";
			temp += "				</tr>";
			temp += "			</tbody>";
			temp += "		</table>";

			if ($.grep(top.frames, function(frame) {
				return frame.name == "menuFrame"
			}).length == 0) {
				if (!wirelessSettingsView.instances[0].configSettings.isDefault) {
					temp += "	<div style='text-align: right;'>";
					temp += "		<input type='button' id='__ML_advanced_setup' ml='__ML_advance_setup' onclick='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"advancedSetupClicked\"});'/>";
					temp += "	</div>";
				}
			}
			temp += "	</div>";
			temp += "</div>";
			wirelessSettingsView.managerTab.managerTab.append("<div id='" + (index == 0 ? "stationDiv" : "stationDiv_" + index) + "'>" + temp + "</div>");

			wirelessSettingsView.managerTab.managerTab.append("<div id='" + (index == 0 ? "apDiv" : "apDiv_" + index) + "'></div>");

			wirelessSettingsView.addCommentDiv(index);

			wirelessSettingsView.managerTab.topTable = $("<table class='marginCenter wirelessSettingsTopTable globalBorder'></table>").appendTo("#" + (index == 0 ? "apDiv" : "apDiv_" + index));

			var instance = wirelessSettingsView.instances[index];
			var selectedFreq = instance.configSettings.freq;
			var selectedFreqName = instance.freqs[selectedFreq].text;

			if (wirelessSettingsView.instances.length <= 1)
				$("#managerSelectorUl").hide();
			else
				$("#managerSelectorUl").append("<li id='tab_" + index + "'><a href='#tabs-" + index + "'>" + globalView.getMultiLanguageText('__ML_wireless_network_lan') + " " + (index + 1) + " (" + selectedFreqName + ")</a></li>");

			if (wirelessSettingsView.mode != "standard") {
				wirelessSettingsView.managerTab.addRow.firstSsid(index);
			}

			wirelessSettingsView.managerTab.addRow.freq(index);

			if (wirelessSettingsView.mode != "standard") {
				wirelessSettingsView.managerTab.addRow.firstSecMode(index);
				wirelessSettingsView.managerTab.addRow.firstPassword(index);
			}

			wirelessSettingsView.managerTab.addRow.mode(index);
			wirelessSettingsView.managerTab.addRow.channel(index);

			if (wirelessSettingsView.instances[index].isPowerManageable)
				wirelessSettingsView.managerTab.addRow.txpower(index);

			wirelessSettingsView.managerTab.addRow.chanbw(index);
			wirelessSettingsView.managerTab.addRow.rate(index);
			wirelessSettingsView.managerTab.addRow.airTouch(index);
			wirelessSettingsView.managerTab.addRow.wpsPin(index);

			apTbl = $("<table class='marginCenter widthAuto globalBorder'><thead><tr><th><span id='span___ML_enabled' ml='__ML_enabled'></span></th><th><span id='span___ML_wireless_network_name' ml='__ML_wireless_network_name'></span></th><th><span id='span___ML_wireless_hide_ssid' ml='__ML_wireless_hide_ssid'></span></th><th><span id='span___ML_ssid_user_isolation' ml='__ML_ssid_user_isolation'></span></th><th><span id='span___ML_encryption' ml='__ML_encryption'></span></th><th><span id='span___ML_passphrase' ml='__ML_wizard_wireless_password'></span></th></tr></thead></table>")

			if (wirelessSettingsView.mode != "standard") {
				apTbl.css("display", "none");
			}
			wirelessSettingsView.managerTab.apTables[index] = apTbl.appendTo("#" + (index == 0 ? "apDiv" : "apDiv_" + index));
			global.raiseEvent({
				eventHandler : "wirelessSettingsController",
				id : "wirelessSettingsController.freq_changed",
				index : index
			});

			wirelessSettingsView.managerTab.addApRows(index);
		}
	},

	addManagerTabs : function(managerCount) {
		$(".managerTab").remove();
		$(".footer").remove();

		$("#contentDiv").append("<div id='tabs' class='wirelessSettingsTopDiv marginCenter'></div>");
		$("#tabs").append("<ul id='managerSelectorUl'></ul>");
		for (var i = 0; i < wirelessSettingsView.instances.length; i++) {
			wirelessSettingsView.managerTab.addTab(i);
		}
	},

	addCommentDiv : function(index) {
		if (index == 0) {
			$("#apDiv").append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv'></div>");
			$("#commentDiv").html("");
			$("#commentDiv").append("<span id='__ML_wireless_settings_intro' ml='__ML_wireless_settings_intro'></span>");
			$("#commentDiv").append("<span id='wireless_settings_intro2_freq_2400'></span>");
			$("#commentDiv").append("<span id='wireless_settings_intro2_freq_5000'></span>");
		} else {
			$("#apDiv_" + index).append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv_" + index + "'></div>");
			$("#commentDiv_" + index).html("");
			$("#commentDiv_" + index).append("<span id='__ML_wireless_settings_intro_" + index + "' ml='__ML_wireless_settings_intro'></span>");
			$("#commentDiv_" + index).append("<span id='wireless_settings_intro2_freq_2400_" + index + "'></span>");
			$("#commentDiv_" + index).append("<span id='wireless_settings_intro2_freq_5000_" + index + "'></span>");
		}

	},

	addOpModeDiv : function(index) {
		var opModeDiv = "";
		if (index == 0) {
			opModeDiv += "<div id='operatingModeDiv'>";
			opModeDiv += "		<div>";
			opModeDiv += "			<div class='textCenter'><span class='textCenter' id='__ML_wireless_operating_mode_description' ml='__ML_wireless_operating_mode_description'></span></div>";
			opModeDiv += "			<table class='marginCenter wirelessSettingsOpModeTable'>";
			opModeDiv += "				<tr>";
			opModeDiv += "					<td><span id='__ML_wireless_operating_mode' ml='__ML_wireless_operating_mode'></span></td>";
			opModeDiv += "					<td>";
			opModeDiv += "						<div id='div_operating_mode'>";
			opModeDiv += "							<span id='span_operating_modeValue'></span>";
			opModeDiv += "							<select id='cmb_operating_mode' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.operationMode_changed\", index: " + index + "});'></select>";
			opModeDiv += "						</div>";
			opModeDiv += "					</td>";
			opModeDiv += "				</tr>";
			opModeDiv += "			</table>";
			opModeDiv += "		</div>";
			opModeDiv += "		<div class='marginCenter globalHeaderInfoDiv'>";
//			opModeDiv += "			<div class='opmodeDescription repeater'><span id='__ML_wireless_operating_mode_repeater_description' ml='__ML_wireless_operating_mode_repeater_description'></span></div>";
//			opModeDiv += "			<br />";
			opModeDiv += "			<div class='opmodeDescription ap'><span id='__ML_wireless_operating_mode_access_point_description' ml='__ML_wireless_operating_mode_access_point_description'></span></div>";
			opModeDiv += "			<br />";
			opModeDiv += "			<div class='opmodeDescription sta'><span id='__ML_wireless_operating_mode_bridge_description' ml='__ML_wireless_operating_mode_bridge_description'></span></div>";
			opModeDiv += "		</div>";
			opModeDiv += "</div>";
			$("#" + wirelessSettingsView.managerTab.managerTabId).append(opModeDiv);

			for (var operationMode in wirelessSettingsView.instances[index].operationModes) {
				$("#cmb_operating_mode").append("<option value='" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' id='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' ml='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "'></option>");
			}

			if ($("#cmb_operating_mode option").length < 2)
				$("#operatingModeDiv").hide();
		} else {
			opModeDiv += "<div id='operatingModeDiv_" + index + "'>";
			opModeDiv += "		<div>";
			opModeDiv += "			<div class='textCenter'><span id='__ML_wireless_operating_mode_description_" + index + "' ml='__ML_wireless_operating_mode_description'></span></div>";
			opModeDiv += "			<table class='marginCenter'>";
			opModeDiv += "				<tr>";
			opModeDiv += "					<td><span id='__ML_wireless_operating_mode_" + index + "' ml='__ML_wireless_operating_mode'></span></td>";
			opModeDiv += "					<td>";
			opModeDiv += "						<div id='div_operating_mode_" + index + "'>";
			opModeDiv += "							<span id='span_operating_modeValue_" + index + "'></span>";
			opModeDiv += "							<select id='cmb_operating_mode_" + index + "' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.operationMode_changed\", index: " + index + "});'></select>";
			opModeDiv += "						</div>";
			opModeDiv += "					</td>";
			opModeDiv += "				</tr>";
			opModeDiv += "			</table>";
			opModeDiv += "		</div>";
			opModeDiv += "		<div class='marginCenter globalHeaderInfoDiv'>";
			opModeDiv += "			<div class='opmodeDescription ap'><span id='__ML_wireless_operating_mode_access_point_description_" + index + "' ml='__ML_wireless_operating_mode_access_point_description'></span></div>";
			opModeDiv += "		<br />";
			opModeDiv += "			<div class='opmodeDescription sta'><span id='__ML_wireless_operating_mode_bridge_description_" + index + "' ml='__ML_wireless_operating_mode_bridge_description'></span></div>";
//			opModeDiv += "		<br />";
//			opModeDiv += "		<div class='opmodeDescription repeater'><span id='__ML_wireless_operating_mode_repeater_description_'" + index + " ml='__ML_wireless_operating_mode_repeater_description'></span></div>";
			opModeDiv += "		</div>";
			opModeDiv += "</div>";
			$("#" + wirelessSettingsView.managerTab.managerTabId).append(opModeDiv);

			for (var operationMode in wirelessSettingsView.instances[index].operationModes) {
				$("#cmb_operating_mode_" + index).append("<option value='" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' id='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "_" + index + "' ml='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "'></option>");
			}
			if ($("#cmb_operating_mode_" + index + " option").length < 2)
				$("#operatingModeDiv_" + index).hide();
		}

		if (wirelessSettingsView.mode == "repeaterInstallation") {
			$("#operatingModeDiv" + (index > 0 ? "_" + index : "")).hide();
			var repeaterInstallationInfo = $("<div></div>").addClass("textCenter").append($("<p></p>").html(__ML_wireless_select_the_wireless_network_to_connect));
			$("#" + wirelessSettingsView.managerTab.managerTabId).append(repeaterInstallationInfo);
		}
	},

	addFooter : function() {
		$("#contentDiv").append("<div class='footer'><input type='button' id='__ML_save' ml='__ML_save' onclick='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"saveClicked\"});'/></div>");
		$(".footer").append("<input type='button' id='__ML_cancel' ml='__ML_cancel' onclick='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"cancelClicked\"});'/>");
	},

	addHedaerDiv : function() {
		$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
		switch(wirelessSettingsView.mode) {
			case "standard":
				wirelessSettingsView.headerText = __ML_wireless_setup;
				break;
			case "quicksetup":
				wirelessSettingsView.headerText = __ML_quick_setup_menu;
				break;
			case "homepage":
				wirelessSettingsView.headerText = __ML_homepage;
				break;
			case "repeaterInstallation":
				wirelessSettingsView.headerText = __ML_easy_installation;
				break;
		}

		$("#headerDiv").append("<span id='__ML_wireless_setup'>" + wirelessSettingsView.headerText + "</span>");
	},

	documentReady : function() {
		$("#contentDiv").html("");
		global.parseQueryString();
		wirelessSettingsView.mode = global.GETDATA["view"] != undefined ? global.GETDATA["view"] : "standard";
		this.addHedaerDiv();
	},

	createTabControls : function(activeManagerIndex) {
		var $tabs = $('#tabs').tabs();
		$tabs.tabs({
			selected : activeManagerIndex
		});

		$tabs.tabs({
			select : function(event, ui) {
				if (wirelessSettingsView.confirmAndSetActiveManagerTab(ui.index)) {
					if ($("#" + (wirelessSettingsController.activeManagerIndex == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + ui.index)).attr("disabled"))
						return;
					$("#contentDiv").css("zoom", 1);
					wirelessSettingsController.activeManagerIndex = ui.index;
					wirelessSettingsView.changeViewByOpMode(ui.index);
				} else {
					return false;
				}
			}
		});
	},

	confirmAndSetActiveManagerTab : function(index) {
		var changeTab = true;
		var changed = false;
		if (wirelessSettingsView.managerTab.get.freq(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.freq)
			changed = true;
		if (wirelessSettingsView.managerTab.get.channel(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.channel)
			changed = true;
		if (wirelessSettingsView.managerTab.get.mode(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txmode)
			changed = true;
		if (wirelessSettingsView.managerTab.get.txpower(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txpower)
			changed = true;
		if (wirelessSettingsView.managerTab.get.airTouch(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.airTouch)
			changed = true;
		if (wirelessSettingsView.managerTab.get.chanbw(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.chanbw)
			changed = true;
		if (wirelessSettingsView.managerTab.get.opMode(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.opMode)
			changed = true;

		var getId = wirelessSettingsView.managerTab.getId.apTable;
		var aps = wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].aps;

		getId.instance_index = wirelessSettingsController.activeManagerIndex;

		if (wirelessSettingsView.mode != "standard") {
			if ($("#first_" + getId.getSsidTextboxId()).val() != aps[0].ssid) {
				changed = true;
			}

			if ($("#first_" + getId.getSecurityModeComboId()).val() != aps[0].sec_mode) {
				changed = true;
			}
		}

		for (var i = 0; i < aps.length; i++) {
			getId.ap_index = i;
			if ($("#" + getId.getSsidTextboxId()).val() != aps[i].ssid)
				changed = true;
			if ($("#" + getId.getSecurityModeComboId()).val() != aps[i].sec_mode)
				changed = true;
			if ($("#" + getId.getHiddenCheckboxId()).is(":checked") != aps[i].ssid_hidden)
				changed = true;
			if ($("#" + getId.getEnabledCheckboxId()).is(":checked") != aps[i].enabled)
				changed = true;
			if ($("#" + getId.getUserIsolationCheckboxId()).is(":checked") != aps[i].isolation)
				changed = true;
			if ($("#" + wirelessSettingsView.instances[getId.instance_index].rateControlId).val() != aps[i].rate)
				changed = true
		}

		if (wirelessSettingsController.activeManagerIndex == index)
			return false;
		if ($("#" + (wirelessSettingsController.activeManagerIndex == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).attr("disabled"))
			return false;

		if (changed) {
			if (confirm(globalView.getMultiLanguageText("__ML_wireless_settings_tab_change_confirm_message"))) {
				wirelessSettingsView.managerTab.set.freq(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.freq);
				wirelessSettingsView.managerTab.set.channel(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.channel);
				wirelessSettingsView.managerTab.set.mode(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txmode);
				wirelessSettingsView.managerTab.set.txpower(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txpower);
				wirelessSettingsView.managerTab.set.airTouch(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.airTouch);
				wirelessSettingsView.managerTab.set.wpsPin(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].wpsPin);
				wirelessSettingsView.managerTab.set.chanbw(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.chanbw);
				wirelessSettingsView.managerTab.set.opMode(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.opMode);
				wirelessSettingsView.managerTab.setApRows(wirelessSettingsController.activeManagerIndex);
			} else {
				changeTab = false;
			}
		}

		return changeTab;
	},

	setIntroTextByActiveManager : function(index) {
		var selectedFreqValue = wirelessSettingsView.managerTab.get.freq(index);
		var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];
		if (index == 0) {
			switch(selectedFreqValue) {
				case "2400":
					$("#wireless_settings_intro2_freq_2400").html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_2400").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					$("#wireless_settings_intro2_freq_5000").hide();
					break;
				case "5000":
					$("#wireless_settings_intro2_freq_2400").hide();
					$("#wireless_settings_intro2_freq_5000").html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_5000").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					break;
				default:
					ui_debug_message("tanımsız frekans");
					break;
			}
		} else {
			switch(selectedFreqValue) {
				case "2400":
					$("#wireless_settings_intro2_freq_2400_" + index).html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_2400").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					$("#wireless_settings_intro2_freq_5000_" + index).hide();
					break;
				case "5000":
					$("#wireless_settings_intro2_freq_2400_" + index).hide();
					$("#wireless_settings_intro2_freq_5000_" + index).html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_5000").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					break;
			}
		}
	},

	changeViewByOpMode : function(index) {
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		var opModeDiv = $("#operatingModeDiv" + (index == 0 ? "" : "_" + index));

		switch (__DEF_wireless_settings_op_mode_desc_style) {
			case "selected":
				var parent = $(opModeDiv).find(".opmodeDescription." + selectedMode).parent();
				var beShown = $(opModeDiv).find(".opmodeDescription." + selectedMode).show();
				var beHidden = $(opModeDiv).find(".opmodeDescription:not(." + selectedMode + ")").hide();
				$(parent).empty().append(beShown).append(beHidden);
				break;
			case "none":
				$(opModeDiv).find(".opmodeDescription").remove();
				break;
		}

		switch(selectedMode) {
			case "ap":
				$(index == 0 ? "#stationDiv" : "#stationDiv_" + index).hide();
				$(index == 0 ? "#apDiv" : "#apDiv_" + index).show();
				$(".footer").show();
				break;
			case "sta":
				$(index == 0 ? "#stationDiv" : "#stationDiv_" + index).show();
				$(index == 0 ? "#apDiv" : "#apDiv_" + index).hide();
				$(".footer").hide();
				break;
			case "repeater":
				$(index == 0 ? "#stationDiv" : "#stationDiv_" + index).show();
				$(index == 0 ? "#apDiv" : "#apDiv_" + index).hide();
				$(".footer").hide();
				break;
			default:
		}

		index = wirelessSettingsController.activeManagerIndex;
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		switch(selectedMode) {
			case "ap":
				$(".footer").show();
				break;
			case "repeater":
				$(".footer").hide();
				break;
			case "sta":
				$(".footer").hide();
				break;
			default:
		}

	},

	checkCookieToScan : function(index) {
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		if (selectedMode != "sta" && selectedMode != "repeater")
			return;
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).hide();
		$("#apTableManualDiv").hide();
		$(".showIfScanOk").hide();
		if (global.getCookie({
			name : "ap_scan"
		}) == "") {
			wirelessSettingsController.sendApScanQuery(index);
		} else {
			wirelessSettingsController.sendApScanResultQuery(index, 0);
		}

	},

	buildApTable : function(index, ap_list) {
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).html("");
		var current_op_mode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		ap_list = wirelessSettingsModel.instances[index].ap_scan.ap_list;
		var ap_list_object = {};

		for (var i = 0; i < ap_list.length; i++) {
			if (ap_list_object[ap_list[i].ssid]) {
				if (parseInt(ap_list[i].rssi) > parseInt(ap_list_object[ap_list[i].ssid].rssi)) {
					ap_list_object[ap_list[i].ssid] = ap_list[i];
					ap_list_object[ap_list[i].ssid].index = i;
				}
			} else {
				ap_list_object[ap_list[i].ssid] = ap_list[i];
				ap_list_object[ap_list[i].ssid].index = i;
			}
		}

		var j = 0;

		var thead, tr, th, button;
		thead = $("<thead></thead>");
		tr = $("<tr></tr>");
		th = $("<th></th>");
		button = $("<input/>").attr("type", "button");

		if (wirelessSettingsView.mode == "repeaterInstallation") {
			th.css("text-align", "center");
			th.addClass("textRight").attr("colspan", "5");
			button.attr("id", "btnRefreshApList_" + index).attr("value", __ML_wireless_ap_list_refresh).attr("onclick", "wirelessSettingsController.sendApScanQuery(" + index + ")");
			th.append(button);
			tr.append(th);
			thead.append(tr);
		} else {
			var strong, span;
			strong = $("<strong></strong>");
			span = $("<span></span>");
			th.css("text-align", "left");
			span.attr("id", "__ML_wireless_operating_mode_select_ap_to_connect_to").attr("ml", "__ML_wireless_operating_mode_select_wlan_network_which_has_to_be_repeated").html(current_op_mode == "repeater" ? __ML_wireless_operating_mode_select_wlan_network_which_has_to_be_repeated : __ML_select_wlan_network);
			strong.append(span);
			th.append(strong);
			tr.append(th);
			th = $("<th></th>");
			th.addClass("textRight").attr("colspan", "4");
			button.attr("id", "btnRefreshApList_" + index).attr("value", globalView.getMultiLanguageText('__ML_wireless_operating_mode_refresh_ap_list')).attr("onclick", "wirelessSettingsController.sendApScanQuery(" + index + ")");
			th.append(button);
			tr.append(th);
			thead.append(tr);
		}

		var apRows = thead;

		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(apRows);

		if (wirelessSettingsView.instances[index].configSettings.staSsid != "") {
			var configuredAp = {};
			if (ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid]) {
				configuredAp = ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid];
				configuredAp.staState = wirelessSettingsView.instances[index].configSettings.staState;
				delete ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid];
			} else {
				configuredAp.ssid = wirelessSettingsView.instances[index].configSettings.staSsid;
				configuredAp.ssid_serialized = wirelessSettingsView.instances[index].configSettings.staSsid_serialized;
				configuredAp.staState = wirelessSettingsView.instances[index].configSettings.staState;
				configuredAp.security = wirelessSettingsView.instances[index].configSettings.staSecurityMode;
				configuredAp.rssi = wirelessSettingsView.instances[index].configSettings.staConnectedApRssi;
				configuredAp.index = ap_list.length;
				ap_list.push(configuredAp);
			}

			var tempTr = $("<tr></tr>");

			tempTr.attr((index == 0 ? "ap_table_row_ssid" : "ap_table_row_ssid_" + index), configuredAp.ssid).addClass("even apListApRow").click(function() {
				wirelessSettingsView.showConnectToSsidDialog(index, configuredAp.index, configuredAp.ssid_serialized, configuredAp.rssi, configuredAp.security);
			});

			var tempTd = $("<td></td>");
			var tempSpan = $("<span></span>").addClass("apListSsid").attr("id", "ssid" + j).html(configuredAp.ssid_serialized);

			tempTd.append(tempSpan);
			tempTr.append(tempTd);

			tempTd = $("<td></td>").addClass("status staConnectionStatus_" + configuredAp.staState).attr("id", "is_connected_" + j).attr("ssid", configuredAp.ssid);
			tempSpan = $("<span>")
			tempSpan.css("display", "inline-block");
			if (configuredAp.staState == "connected") {
				tempSpan.addClass("ui-icon ui-icon-check").css("background-image", "url(/style/jqueryui/images/ui-icons_49B749_256x240.png)");
			} else if (configuredAp.staState != "connecting") {
				tempSpan.addClass("ui-icon ui-icon-close").css("background-image", "url(/style/jqueryui/images/ui-icons_ED1C24_256x240.png)");
			}
			tempTd.append(tempSpan);

			tempTd.append(globalView.getMultiLanguageText("__ML_wireless_operating_mode_sta_" + configuredAp.staState));
			tempTr.append(tempTd);

			tempTd = $("<td></td>");
			tempSpan = $("<span></span>").attr("id", "rssi" + j).attr("imgssid", configuredAp.ssid).html(globalWireless.rssiStatus(configuredAp.rssi));

			tempTd.append(tempSpan);
			tempTr.append(tempTd);

			tempTd = $("<td></td>").addClass("status").html(globalWireless.rssiStatusMessage(configuredAp.rssi)).css("color", globalWireless.rssiStatusColor(configuredAp.rssi));
			tempTr.append(tempTd);

			tempTd = $("<td></td>");
			if (configuredAp.security != "off") {
				tempTd.append("<img src='/images/lock.png' border='0' />");
			}

			tempTr.append(tempTd);

			j++;
			$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(tempTr);
		}

		for (var ap in ap_list_object) {

			var tempTr = $("<tr></tr>");

			var ap_list_object_clone = JSON.parse(JSON.stringify(ap_list_object[ap]));

			var proxyFn = $.proxy(wirelessSettingsView.showConnectToSsidDialog, wirelessSettingsView, index, ap_list_object[ap].index, ap_list_object[ap].ssid_serialized, ap_list_object[ap].rssi, ap_list_object[ap].security);

			tempTr.attr((index == 0 ? "ap_table_row_ssid" : "ap_table_row_ssid_" + index), ap_list_object[ap].ssid).addClass("apListApRow " + ((j % 2) ? "odd" : "even")).click(proxyFn);

			var tempTd = $("<td></td>");
			var tempSpan = $("<span></span>").addClass("apListSsid").attr("id", "ssid" + j).html(ap_list_object[ap].ssid_serialized);

			tempTd.append(tempSpan);
			tempTr.append(tempTd);

			tempTd = $("<td></td>").addClass("status").attr("id", "is_connected_" + j).attr("ssid", ap_list_object[ap].ssid);
			tempTr.append(tempTd);

			tempTd = $("<td></td>");
			tempSpan = $("<span></span>").attr("id", "rssi" + j).attr("imgssid", ap_list_object[ap].ssid).html(globalWireless.rssiStatus(ap_list_object[ap].rssi));

			tempTd.append(tempSpan);
			tempTr.append(tempTd);

			tempTd = $("<td></td>");
			tempTr.append(tempTd);

			tempTd = $("<td></td>");
			if (ap_list_object[ap].security != "off") {
				tempTd.append("<img src='/images/lock.png' border='0' />");
			}

			tempTr.append(tempTd);
			j++;

			$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(tempTr);
		}
		tempTr = $("<tr></tr>").addClass("apListApRow " + ((j % 2) ? "odd" : "even")).click(function() {

		});

		$apTable = $("#" + (index == 0 ? "apTable" : "apTable_" + index)).show();

		$(".showIfScanOk").show();

		if (wirelessSettingsView.mode != "repeaterInstallation") {
			$("#apTableManualDiv").show();
		} else {
			if ($("#advancedSetupDiv").length == 0) {
				var $advancedSetupDiv = $("<div>").attr({
					"id" : "advancedSetupDiv",
				}).addClass("showIfScanOk").css({
					"text-align" : "right"
				});

				$advancedSetupDiv.append(__ML_wireless_repeater_setup_advanced_setup_p1);
				$advancedSetupDiv.append($("<a>").attr({
					"href" : "/main.html?redirect=homepage.html",
					"target" : "_top",
				}).css({
					"font-weight" : "bold",
				}).html(__ML_wireless_repeater_setup_advanced_setup_link));
				$advancedSetupDiv.append(__ML_wireless_repeater_setup_advanced_setup_p2);

				$apTable.parent().after($advancedSetupDiv);
			}

		}

		if ($("#notInTheList").length == 0) {
			var $notInTheListDiv = $("<div>").attr({
				"id" : "notInTheList",
			}).addClass("wirelessSettingsApTableDiv showIfScanOk").css({
				"padding-left" : "20px",
				"padding-top" : "20px"
			});

			$("<span>").css({
				"cursor" : "pointer",
			}).addClass("red").html(__ML_my_wireless_network_is_not_in_the_list).click(function() {
				if ($("#animationRow").length == 0) {
					$(this).after($("<div>").attr({
						"id" : "animationRow",
					}).append(__ML_wireless_location_of_the_device_is_bad_refresh).append(wirelessSettingsView.getRepeaterMakeItCloserAnimation().html()));

					$(this).attr("sliderInterval", setInterval(wirelessSettingsView.getRepeaterMakeItCloserAnimation().slide, 600));

					$("html, body").animate({
						scrollTop : $("#animationRow").offset().top,
					}, 800);

				} else {
					clearInterval($(this).attr("sliderInterval"));
					$("#animationRow").remove();
				}
			}).appendTo($notInTheListDiv);

			$apTable.parent().after($notInTheListDiv);
		}

		globalView.addButtonClass();
	},

	showConnectToSsidDialog : function(index, apIndex, ssid, rssi, security) {
		var div = $("<div>");

		var containerDiv = div.clone();

		var connectDialog = containerDiv.dialog({
			dialogClass : "noTitle",
			draggable : false,
			modal : true,
			resizable : false,
			width : "400px",
			autoOpen : false,
			autofocus : false,
			open : function() {
				if ($(".animationRow").length != 0) {
					clearInterval($(".animationRow").prev().attr("sliderInterval"));
					$(".animationRow").remove();
				}

				$("input").blur();
				$(this).attr("sliderInterval", setInterval(wirelessSettingsView.getRepeaterMakeItCloserAnimation().slide, 600));
			},
			close : function(event, ui) {
				clearInterval($(this).attr("sliderInterval"));
				$(this).dialog('destroy').remove();
			},
			buttons : [{
				text : globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect'),
				click : function() {
					if (wirelessSettingsView.createApObject(index, apIndex)) {
						$(this).dialog("close");
					}
				},
			}, {
				text : globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_cancel'),
				click : function() {
					$(this).dialog("close");
				}
			}]
		});

		var firstRowDiv = div.clone().css("padding-bottom", "50px");
		var secondRowDiv = div.clone().css("padding-bottom", "50px");

		var ssidDiv = div.clone().html(ssid).css({
			float : "left",
			width : "300px",
		});
		firstRowDiv.append(ssidDiv);

		var rssiDiv = div.clone().html(globalWireless.rssiStatus(rssi)).css({
			float : "left",
			"width" : "50px",
		});
		firstRowDiv.append(rssiDiv);

		if (security != "off") {
			var securityDiv = div.clone().html("<img src='/images/lock.png' border='0' />").css({
				float : "left",
			});
			firstRowDiv.append(securityDiv);
		}

		containerDiv.append(firstRowDiv);

		if (!globalWireless.rssiIsGood(rssi)) {
			secondRowDiv.append(wirelessSettingsView.getRepeaterMakeItCloserAnimation().html());
		}
		var rssiMessageDiv = div.clone().html(globalWireless.rssiStatusMessage(rssi)).css({
			clear : "both",
			color : globalWireless.rssiStatusColor(rssi),
		});
		secondRowDiv.append(rssiMessageDiv);
		
		var passwordDiv = div.clone();

		if (security != "off") {
			var passwordLabel = $("<span>").html(__ML_wireless_password + ": ");

			var passwordInput = $("<input>").attr({
				"id" : index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index,
				"type" : "password",
			});

			var showHidePasswordInput = $("<input>").attr("type", "checkbox").click(function() {
				var type = "text"
				if (passwordInput.prop("type") == "text") {
					type = "password";
				}
				passwordInput.prop("type", type);
			});
			passwordDiv.append(passwordLabel);
			passwordDiv.append(passwordInput);
			passwordDiv.append(showHidePasswordInput);
		}

		secondRowDiv.append(passwordDiv);
		
		containerDiv.append(secondRowDiv);
		globalView.addButtonClass();
		$(connectDialog).dialog("open");

		$(".ui-widget-overlay").click(function() {
			$(".ui-dialog-titlebar-close").trigger('click');
		});

	},

	getRepeaterMakeItCloserAnimation : function() {
		var style = $("<style>").html(".red-icons{background-image:url(/style/jqueryui/images/ui-icons_ED1C24_256x240.png) !important}");
		$("head").append(style);
		return {
			html : function() {
				var animationDiv = $("<div>").css("float", "left");
				var animationTable = $("<table>").appendTo(animationDiv);
				var animationTr = $("<tr>").appendTo(animationTable);

				$("<td>").append($("<img>").attr("src", "/images/modem.png")).appendTo(animationTr);

				var arrowsCell = $("<td>").appendTo(animationTr);

				for (var i = 0; i < 3; i++) {
					$("<span>").html("&nbsp;").addClass("red-icons ui-icon ui-icon-arrowthick-1-w").css({
						"display" : "inline-block",
						"opacity" : 0,
					}).appendTo(arrowsCell);
				}

				$("<td>").append($("<img>").attr("src", "/images/Device.png")).appendTo(animationTr);
				return animationDiv.wrapAll("<div>").parent().html()
			},
			slide : function() {
				var arrowCount = $(".ui-icon-arrowthick-1-w").length, opacity1, opacity_1_index = arrowCount, opacity_1_new_index;
				$(".ui-icon-arrowthick-1-w").each(function() {
					if ($(this).css("opacity") == 1) {
						opacity1 = this;
						opacity_1_index = $(".ui-icon-arrowthick-1-w").index(opacity1);
					}
				});

				opacity_1_index = opacity_1_index == 0 ? arrowCount : opacity_1_index;
				opacity_1_new_index = (opacity_1_index - 1);
				$(".ui-icon-arrowthick-1-w").css("opacity", 0);
				$($(".ui-icon-arrowthick-1-w")[opacity_1_new_index]).css("opacity", 1);
			}
		};
	},

	togglePasswordRow : function(e, index, id, securityType) {
		var promptId = index == 0 ? "password_prompt" : "password_prompt_" + index;
		if ($("#" + promptId).attr("index") == id) {
			$("#" + promptId).remove();
		} else {
			$("#" + promptId).remove();
			var attrClass = $(e).closest("tr").attr("class");
			var password_prompt_row = '';
			password_prompt_row += '<tr class="' + attrClass + '" id="' + promptId + '" index="' + id + '">';
			password_prompt_row += '	<td colspan="4" style="text-align:left;">';
			password_prompt_row += '		<table width="50%" style="text-align:left;">';
			if (securityType != "off") {
				var wireless_password_label = wirelessSettingsView.mode == "repeaterInstallation" ? __ML_wireless_password : __ML_wireless_operating_mode_sta_wlan_password;
				password_prompt_row += '	<tr class="' + attrClass + '">';
				password_prompt_row += '		<td><span>' + wireless_password_label + '</span>:<input id="' + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index) + '" type="text" name="pwd" /> </td>';
				password_prompt_row += '	</tr>';
			}
			password_prompt_row += '	  <tr class="' + attrClass + '">';
			password_prompt_row += '		<td><input id="btnBridgeConnectAp_' + index + '" type="button" value="' + globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect') + '" onclick="wirelessSettingsView.createApObject(' + index + ", " + id + ');" /><input id="btnBridgeCancelAp_' + index + '" type="button" value="' + globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_cancel') + '" onclick="wirelessSettingsView.togglePasswordRow(this, ' + index + ', id, \'' + securityType + '\');" /></td>';
			password_prompt_row += '	  </tr>';
			password_prompt_row += '	</table>';
			password_prompt_row += '  </td>';
			password_prompt_row += '</tr>';

			$(e).after(password_prompt_row);

			globalView.addButtonClass();
		}
	},

	createApObject : function(index, ap_id) {
		if (index == undefined && wirelessSettingsView.lastIndex != undefined) {
			index = wirelessSettingsView.lastIndex;
		}

		if (ap_id == undefined && wirelessSettingsView.lastApId != undefined) {
			ap_id = wirelessSettingsView.lastApId;
		}

		wirelessSettingsView.lastApId = ap_id;
		wirelessSettingsView.lastIndex = index;

		if (wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id].rssi < -75) {
			if (!confirm(__ML_wireless_op_mode_low_rssi_confirm_message)) {
				return;
			}
		}

		if ($("#" + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index)).length > 0) {
			wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id].password = $("#" + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index)).val();
		} else {
			wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id].password = "";
		}

		return wirelessSettingsView.turnToBridgeMode(index, ap_id);
	},

	retryToConnect : function(index) {
		if (index == undefined) {
			index = wirelessSettingsController.activeManagerIndex;
		}

		wirelessSettingsModel.instances[index].sendApply();
		globalModel.addEvent({
			eventHandler : "wirelessSettingsController",
			id : "checkTurnToBridgeModeStatus",
			index : index
		});

		globalModel.sendAjax();
	},

	showConnectingToAnotherDeviceView : function(options) {
		if (options == undefined) {
			options = {}
		}

		if (options.connectedByWireless == undefined) {
			options.connectedByWireless = false;
		}

		if (options.connectedByWireless) {
			wirelessSettingsView.showWirelessConnectionRefreshTimeout = setTimeout(function() {
				wirelessSettingsView.showWirelessConnectionRefresh();
			}, 60000);
		}

		var style = $("<style>").html(".blue{background-image:url(/style/jqueryui/images/ui-icons_1C75BC_256x240.png)} .none{background-image:none;}");
		$("head").append(style);

		function fn(index, factor) {
			index = index === undefined ? 0 : index;
			factor = factor === undefined ? 1 : factor;

			$(".ui-icon-connecting-bullet").css("opacity", 0);

			$($(".ui-icon-connecting-bullet")[index]).css("opacity", 1);
			$($(".ui-icon-connecting-bullet")[index - factor]).css("opacity", 0.5);
			$($(".ui-icon-connecting-bullet")[index - factor * 2]).css("opacity", 0.25);

			if (index == 0) {
				if (factor == -1) {
					factor = 1;
				}
			} else {
				if ($(".ui-icon-connecting-bullet").length == 0) {
					return;
				} else if (index % ($(".ui-icon-connecting-bullet").length - 1) == 0) {
					factor = -1;
				}
			}

			if (index % 3 == 0) {
				if ($("#repeater_image").attr("src") != "/images/Device_dark_grey.png") {
					$("#repeater_image").attr("src", "/images/Device_dark_grey.png");
				} else {
					$("#repeater_image").attr("src", "/images/Device_light_grey.png");
				}
			}

			index += factor;
			setTimeout(function() {
				fn(index, factor)
			}, 200);

		}

		function getAnimation() {
			var table = $("<table>").css({
				width : "auto",
				margin : "auto"
			}), tr = $("<tr>");
			function td(content) {
				return $("<td>").append(content);
			}


			tr.append(td(getOtherDeviceCell()));
			tr.append(td(getBulletCell()).css("white-space", "nowrap"));
			tr.append(td(getOurRepeaterCell()));
			table.append(tr);

			var $tr = $("<tr>");
			$tr.append($("<td>").html(__ML_wireless_repeater_wlan_name), $("<td>"), $("<td>").html(__ML_wireless_repeater_wlan_name));
			$tr.find("td").css("text-align", "center");
			table.append($tr);

			var $tr = $("<tr>");
			$tr.append($("<td>").html(wirelessSettingsView.lastSelectedSsidToRepeat), $("<td>"), $("<td>").html(wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].aps[0].ssid));
			$tr.find("td").css("text-align", "center");
			table.append($tr);

			return table;
		}

		function getBulletCell() {
			var tempDiv = $("<div>");
			tempDiv.append($("<div>").css("text-align", "center").html(__ML_wireless_operating_mode_sta_connecting));

			function getBullet() {
				return $("<span>").html("&nbsp;").addClass("blue ui-icon ui-icon-bullet ui-icon-connecting-bullet").css({
					"display" : "inline-block",
					"opacity" : "0"
				});
			}

			for (var i = 0; i < 10; i++) {
				tempDiv.append(getBullet());
			}

			return tempDiv.html();
		}

		function getOtherDeviceCell() {
			return $("<div>").append(getDeviceCell("/images/modem_circles.png")).html();
		}

		function getOurRepeaterCell() {
			return getDeviceCell("/images/Device_circles.png").attr("id", "repeater_image");
		}

		function getDeviceCell(imgPath) {
			return $("<img>").attr("src", imgPath);
		}

		var header = $("#headerDiv").wrapAll("<div>").parent().html();
		var footer = $(".footer").wrapAll("<div>").parent().html();
		$("#contentDiv").html("");
		$("#contentDiv").append(header);
		$("#contentDiv").append(getAnimation());
		$("#contentDiv").append(footer);
		fn();

	},
	turnToBridgeMode : function(index, ap_id) {
		var _this = this;
		var apObj;

		if (ap_id == undefined) {
			apObj = {};
			apObj.ssid = $("#__V_wireless_operating_mode_ap_ssid_manual").val();
			apObj.security = $("#cmb_security_mode_manual").val();
			apObj.password = $("#__V_wireless_operating_mode_ap_password_manual").val();
			apObj.protocol = wirelessSettingsView.managerTab.get.freq(wirelessSettingsController.activeManagerIndex) == "2400" ? "11bgn" : "11an"
		} else {
			apObj = wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id];
		}

		wirelessSettingsView.lastSelectedSsidToRepeat = apObj.ssid;

		apObj.opMode = wirelessSettingsView.managerTab.get.opMode(index);

		if (__DEF_change_wpa_both_to_wpa2_on_sta_or_repeater_mode && apObj.security == "wpa_both") {
			apObj.security = "wpa2";
		}

		if (wirelessSettingsView.validateApObjectForBridgeMode(apObj)) {

			wirelessSettingsView.showConnectingToAnotherDeviceView();

			clearTimeout(wirelessSettingsView.timeOutObj);
			var inst = wirelessSettingsModel.instances[index];
			inst.saveOpMode(apObj.opMode);
			inst.saveStaSsid(apObj.ssid);
			inst.saveStaSecurityMode(apObj.security);
			inst.saveStaTxMode(apObj.protocol);
			if (globalWireless.isWpa(apObj.security)) {
				inst.saveStaWpaPassword(apObj.password);
			} else if (apObj.security == "wep") {
				inst.saveStaWepPassword(apObj.password);
			}
			inst.sendApply();
			globalModel.addEvent({
				eventHandler : "wirelessSettingsController",
				id : "parseRebootRequiredQuery",
				index : index
			});
			globalModel.addEvent({
				eventHandler : "wirelessSettingsController",
				id : "saved"
			});
			globalModel.addEvent({
				eventHandler : "wirelessSettingsController",
				id : "checkTurnToBridgeModeStatus",
				index : index
			});

			globalModel.sendAjax();
		} else {
			return false;
		}

		return true;
	},

	validateApObjectForBridgeMode : function(apObj) {
		if (apObj.password != null) {
			switch(apObj.security) {
				case "wpa":
				case "wpa2":
				case "wpa_both":
					if (!global.regexpCheck(apObj.password, "^(?!\x20)[\x20-\x7f]{7,63}[\x21-\x7f]$")) {
						alert(globalView.getMultiLanguageText("__ML_wireless_operating_mode_password_error_wpa"));
						return false;
					}
					break;
				case "wep":
					if (!global.regexpCheck(apObj.password, "^(([0-9A-Fa-f]{10})|([\\s\\S]{5})|([0-9A-Fa-f]{26})|([\\s\\S]{13})|([0-9A-Za-z]{58})([0-9A-Fa-f]{24}))$")) {
						alert(globalView.getMultiLanguageText("__ML_wireless_operating_mode_password_error_web"));
						return false;
					}
					break;

			}

			if (apObj.ssid == "") {
				alert(__ML_wireless_operating_mode_manual_ssid + " " + __ML_Required_Field);
				return false;
			}

			if (apObj.ssid.length > 32) {
				alert(__ML_invalidSSIDMaxLength);
				return;
			}

			var regex = new RegExp(/^(?!\x20)[\x20-\x7f]{0,31}[\x21-\x7f]$/);

			if (!regex.test(apObj.ssid)) {
				alert(__ML_invalidSSID);
				return false;
			}
		}
		return true;
	},

	changeSecurityModeManual : function() {
		if ($("#cmb_security_mode_manual").val() == "off") {
			$("#__V_wireless_operating_mode_ap_password_manual").val("");
			$("#__V_wireless_operating_mode_ap_password_manual").attr("disabled", "disabled");
		} else {
			$("#__V_wireless_operating_mode_ap_password_manual").removeAttr("disabled");
		}
	},

	showHideManualConfiguration : function() {
		$("#apTableManualDivContent").toggle();
	},

	showRepeatingIsOkScreen : function(index) {
		$("#contentDiv").html("");

		wirelessSettingsView.addHedaerDiv();

		var style = $("<style>").html(".green-icons{background-image:url(/style/jqueryui/images/ui-icons_49B749_256x240.png) !important}");
		$("head").append(style);

		var resultTable = $("<table>").css({
			width : "auto",
			margin : "auto"
		});

		var imagesTr = $("<tr>").appendTo(resultTable);
		$("<td>").append($("<img>").attr("src", "/images/modem_circles.png")).appendTo(imagesTr);
		var centerTd = $("<td>").css("text-align", "center").appendTo(imagesTr);
		centerTd.append($("<div>").html(__ML_wireless_operating_mode_sta_congratulations_connected));
		centerTd.append($("<span>").addClass("green-icons ui-icon ui-icon-check").css("display", "inline-block"));
		$("<td>").append($("<img>").attr("src", "/images/Device_circles.png")).appendTo(imagesTr);

		var $tr = $("<tr>").appendTo(resultTable);
		$tr.append($("<td>").html(__ML_wireless_repeater_wlan_name), $("<td>"), $("<td>").html(__ML_wireless_repeater_wlan_name));
		$tr.find("td").css("text-align", "center");

		$tr = $("<tr>").appendTo(resultTable);
		$tr.append($("<td>").html(wirelessSettingsView.lastSelectedSsidToRepeat), $("<td>"), $("<td>").html(wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].aps[0].ssid));
		$tr.find("td").css("text-align", "center");

		var messageTr = $("<tr>").appendTo(resultTable);
		messageTr.append($("<td>").attr("colspan", 3).css({
			"text-align" : "center"
		}).html(__ML_wireless_operating_mode_sta_easy_setup_completed));

		var messageTr = $("<tr>").appendTo(resultTable);
		messageTr.append($("<td>").attr("colspan", 3).css({
			"text-align" : "center"
		}).append($("<a>").attr({
			"href" : "http://www.airties.com",
			"target" : "_blank",
		}).html(__ML_wireless_repeater_setup_click_here_for_connecting_internet).button()));

		$("#contentDiv").append(resultTable);

		return;
		globalView.disablePage();

		var pageHeader = $("<div></div>").prop("id", "headerDiv").addClass("textCenter title");

		if (wirelessSettingsView.mode == "homepage") {
			pageHeader.append('<span ml="__ML_homepage"></span>');
		} else {
			pageHeader.append('<span ml="__ML_wireless_repeater_setup_complete"></span>');
		}

		var body = $("<div></div>").addClass("marginCenter globalHeaderInfoDiv");
		body.append('<div><span ml="__ML_wireless_repeater_success_status"></span>: <span ml="__ML_wireless_operating_mode_sta_connected"></span></div>');
		body.append('<div><span ml="__ML_wireless_repeated_network"></span>: ' + wirelessSettingsModel.instances[wirelessSettingsController.activeManagerIndex].configSettings.staSsid_serialized + '</div>');
		if (wirelessSettingsView.mode == "homepage") {
			body.append('<div><input type="button" id="reconfigureButton" ml="__ML_wireless_connect_to_different_broad_band_router"/></div>');
		}

		$("#contentDiv").html("");
		$("#contentDiv").append(pageHeader).append(body);

		if (wirelessSettingsView.mode == "homepage") {
			$("#reconfigureButton").click(function() {
				window.location.href = window.location.pathname;
			});
		}

		globalView.addButtonClass();
		globalView.showPage();
	},

	showRepeatingButWeakSignalScreen : function() {
		globalView.disablePage();

		var pageHeader = $("<div></div>").prop("id", "headerDiv").addClass("textCenter title");

		if (wirelessSettingsView.mode == "homepage") {
			pageHeader.append('<span ml="__ML_homepage"></span>');
		} else {
			pageHeader.append('<span ml="__ML_wireless_repeater_move_to_closer"></span>');
		}

		var body = $("<div></div>").addClass("marginCenter globalHeaderInfoDiv");
		body.append('<div><span ml="__ML_wireless_repeater_success_status"></span>: <span ml="__ML_wireless_repeater_weak_signal"></span></div>');
		body.append('<div><span ml="__ML_wireless_repeated_network"></span>: ' + wirelessSettingsModel.instances[wirelessSettingsController.activeManagerIndex].configSettings.staSsid_serialized + '</div>');
		if (wirelessSettingsView.mode == "homepage") {
			body.append('<div><span ml="__ML_wireless_repeater_weak_signal_note"></span></div>');
			body.append('<div><input type="button" id="reconfigureButton" ml="__ML_wireless_connect_to_different_broad_band_router"/></div>');
		} else {
			body.append('<div><span ml="__ML_wireless_repeater_weak_signal_hint"></span></div>');
		}

		$("#contentDiv").html("");
		$("#contentDiv").append(pageHeader).append(body);
		globalView.addButtonClass();
		globalView.showPage();
	},

	showNotRepeatingWrongPasswordScreen : function(index) {
		var detailedMessage = __ML_wireless_repeater_setup_check_wireless_password_of_your_device_p1 + wirelessSettingsView.instances[index].configSettings.staSsid_serialized + __ML_wireless_repeater_setup_check_wireless_password_of_your_device_p2;
		wirelessSettingsView.showNotRepeatingSecurityErrorScreen({
			index : index,
			message : __ML_wireless_operating_mode_sta_wrong_password,
			detailedMessage : detailedMessage,
			includeSecurityTypeControl : false,
		});
	},

	showNotRepeatingWrongSecurityTypeScreen : function(index) {
		wirelessSettingsView.showNotRepeatingSecurityErrorScreen({
			index : index,
			message : __ML_wireless_operating_mode_sta_wrong_security_type,
			detailedMessage : "",
			includeSecurityTypeControl : true,
		});
	},

	showNotRepeatingSecurityErrorScreen : function(options) {
		globalView.disablePage();
		var passwordControlId = "";

		$("#contentDiv").html("");

		wirelessSettingsView.addHedaerDiv();

		var style = $("<style>").html(".red-icons{background-image:url(/style/jqueryui/images/ui-icons_ED1C24_256x240.png) !important}");
		$("head").append(style);

		var resultTable = $("<table>").css({
			width : "auto",
			margin : "auto"
		});
		$("#contentDiv").append(resultTable);

		var headerTr = $("<tr>").appendTo(resultTable);
		headerTr.append($("<td>").attr({
			colspan : "3",
		}).css({
			"text-align" : "center",
		}).append($("<input>").attr({
			type : "button",
			value : __ML_back,
		}).addButtonClass().click(function() {
			$("#contentDiv").prop('disabled', true);
			window.location.reload();
		})));

		var imagesTr = $("<tr>").appendTo(resultTable);
		$("<td>").append($("<img>").attr("src", "/images/modem_circles.png")).appendTo(imagesTr);
		var centerTd = $("<td>").css("text-align", "center").appendTo(imagesTr);
		centerTd.append($("<div>").html(options.message));
		centerTd.append($("<span>").addClass("red-icons ui-icon ui-icon-closethick").css("display", "inline-block"));
		$("<td>").append($("<img>").attr("src", "/images/Device_circles.png")).appendTo(imagesTr);

		$("<tr>").append($("<td>").attr({
			"colspan" : "3"
		}).html(options.detailedMessage)).appendTo(resultTable);

		var $securityForm = $("<table>").css({
			"width" : "auto",
		});
		resultTable.append($("<tr>").append($("<td>").attr("colspan", "3").css("text-align", "left").append($securityForm)));

		if (options.includeSecurityTypeControl) {
			var $tr = $("<tr>").appendTo($securityForm);

			var $td = $("<td>").appendTo($tr);
			$td.append($("<span>").append(__ML_wireless_operating_mode_manual_security + ": "));

			var $td = $("<td>").appendTo($tr);
			$td.append($("<select>").attr({
				"id" : "cmb_security_mode_manual",
			}).append($("<option>").val("wpa2").html("WPA2"), $("<option>").val("wpa").html("WPA"), $("<option>").val("wep").html("WEP"), $("<option>").attr("id", "__ML_wireless_security_mode_no_encryption").val("off").html(__ML_wireless_security_mode_no_encryption)));
		}

		if (options.includeSecurityTypeControl) {
			passwordControlId = "__V_wireless_operating_mode_ap_password_manual";
		} else {
			passwordControlId = options.index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + options.index;
		}

		var $tr = $("<tr>").appendTo($securityForm);
		var $td = $("<td>").appendTo($tr);

		$td.append($("<span>").append(__ML_wireless_password + ": "));

		var $td = $("<td>").appendTo($tr);
		var $passwordInput = $("<input>").attr({
			"id" : passwordControlId,
			"type" : "password",
		}).appendTo($td);
		var $showHidePasswordInput = $("<input>").attr("type", "checkbox").click(function() {
			var type = "text"
			if ($passwordInput.prop("type") == "text") {
				type = "password";
			}
			$passwordInput.prop("type", type);
		}).appendTo($td);
		globalView.showPage();

		/*).append($("<input>").attr("type", "checkbox").click(function() {
		 var id = options.index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + options.index;
		 passwordInput = $("#" + id);
		 var type = "text"
		 if (passwordInput.prop("type") == "text") {
		 type = "password";
		 }
		 passwordInput.prop("type", type);
		 })))).appendTo(resultTable);*/

		$("<tr>").append($("<td>").attr({
			colspan : "3",
		}).append($("<input>").attr({
			type : "button",
			value : globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect'),
		}).click(function() {
			wirelessSettingsView.createApObject(options.index);
		}).addButtonClass())).appendTo(resultTable);

		return;
		globalView.disablePage();

		var pageHeader = $("<div></div>").prop("id", "headerDiv").addClass("textCenter title");

		pageHeader.append('<span ml="__ML_homepage"></span>');

		var body = $("<div></div>").addClass("marginCenter globalHeaderInfoDiv");
		body.append('<div><span ml="__ML_wireless_repeater_success_status"></span>: <span ml="__ML_wireless_repeater_not_connected"></span></div>');
		body.append('<p><span ml="__ML_wireless_operating_mode_sta_disconnected_wrong_password"></span></p>');

		body.append('<div><input type="button" id="reconfigureButton" ml="__ML_wireless_connect_to_different_broad_band_router"/></div>');

		$("#contentDiv").html("");
		$("#contentDiv").append(pageHeader).append(body);

		$("#reconfigureButton").click(function() {
			window.location.href = window.location.pathname;
		});

		globalView.addButtonClass();
		globalView.showPage();
	},

	showNotRepeatingScreen : function(index) {

		if (index == undefined) {
			index = wirelessSettingsController.activeManagerIndex;
		}

		$("#contentDiv").html("");

		wirelessSettingsView.addHedaerDiv();

		var style = $("<style>").html(".red-icons{background-image:url(/style/jqueryui/images/ui-icons_ED1C24_256x240.png) !important}");
		$("head").append(style);

		var resultTable = $("<table>").css({
			width : "auto",
			margin : "auto"
		}).addClass("ssidCannotBeFoundView");

		var headerTr = $("<tr>").appendTo(resultTable);
		headerTr.append($("<td>").attr({
			colspan : "3",
		}).css({
			"text-align" : "center",
		}).append($("<input>").attr({
			type : "button",
			value : __ML_back,
		}).addButtonClass().click(function() {
			$("#contentDiv").prop('disabled', true);
			window.location.reload();
		})));

		var imagesTr = $("<tr>").appendTo(resultTable);

		$("<td>").append($("<img>").attr("src", "/images/modem_circles.png")).appendTo(imagesTr);

		var centerTd = $("<td>").css("text-align", "center").appendTo(imagesTr);

		centerTd.append($("<div>").html(__ML_wireless_operating_mode_sta_ssid_cannot_be_found_p1 + wirelessSettingsView.instances[index].configSettings.staSsid_serialized + __ML_wireless_operating_mode_sta_ssid_cannot_be_found_p2));

		centerTd.append($("<span>").addClass("red-icons ui-icon ui-icon-closethick").css("display", "inline-block"));

		$("<td>").append($("<img>").attr("src", "/images/Device_circles.png")).appendTo(imagesTr);

		$("<tr>").append($("<td>").attr("colspan", "3").html(__ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem1)).appendTo(resultTable);
		$("<tr>").append($("<td>").attr("colspan", "3").html(__ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem2)).appendTo(resultTable);
		$("<tr>").append($("<td>").attr("colspan", "3").html(wirelessSettingsView.getRepeaterMakeItCloserAnimation().html())).appendTo(resultTable);
		$(".ssidCannotBeFoundView").attr("sliderInterval", setInterval(wirelessSettingsView.getRepeaterMakeItCloserAnimation().slide, 600));
		$("<tr>").append($("<td>").attr("colspan", "3").append(__ML_wireless_location_of_the_device_may_bad_make_it_closer)).appendTo(resultTable);

		$("#contentDiv").append(resultTable);

		return;

		globalView.disablePage();

		var pageHeader = $("<div></div>").prop("id", "headerDiv").addClass("textCenter title");

		pageHeader.append('<span ml="__ML_homepage"></span>');

		var body = $("<div></div>").addClass("marginCenter globalHeaderInfoDiv");
		body.append('<div><span ml="__ML_wireless_repeater_success_status"></span>: <span ml="__ML_wireless_repeater_not_connected"></span></div>');
		body.append('<p><span ml="__ML_wireless_repeater_cannot_find_wireless_network"></span>: ' + wirelessSettingsModel.instances[wirelessSettingsController.activeManagerIndex].configSettings.staSsid_serialized + '</p>');
		body.append('<p><span ml="__ML_wireless_repeater_check_your_devices_note"></span></p>');
		body.append('<div><input type="button" id="reconfigureButton" ml="__ML_wireless_connect_to_different_broad_band_router"/></div>');

		$("#contentDiv").html("");
		$("#contentDiv").append(pageHeader).append(body);

		$("#reconfigureButton").click(function() {
			window.location.href = window.location.pathname;
		});

		globalView.addButtonClass();
		globalView.showPage();
	}
}
