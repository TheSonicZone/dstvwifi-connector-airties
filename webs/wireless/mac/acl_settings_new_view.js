var wirelessMacView =
{
		managerTab:
		{
			managerTab: "",
			managerTabId: "",
			wirelessDiv: "",
			addRow:
			{
				staWarning: function(index)
				{
					var instance = wirelessMacView.instances[index];
					var mt = wirelessMacView.managerTab;
					var warningSpanTemplate = '<span id="__ML_wireless_operating_mode_bridge_mode_no_access_warning" ml="__ML_wireless_operating_mode_bridge_mode_no_access_warning"></span>';

					var div = $("<div class='textCenter'></div>").appendTo(mt.wirelessDiv);
					div.append(warningSpanTemplate);
				},
				repeaterWarning: function(index)
				{
					var instance = wirelessMacView.instances[index];
					var mt = wirelessMacView.managerTab;
					var warningSpanTemplate = '<span id="__ML_wireless_operating_mode_repeater_mode_no_access_warning" ml="__ML_wireless_operating_mode_repeater_mode_no_access_warning"></span>';

					var div = $("<div class='textCenter'></div>").appendTo(mt.wirelessDiv);
					div.append(warningSpanTemplate);
				},
				macFiltering: function(index)
				{
					var instance = wirelessMacView.instances[index];
					var mt = wirelessMacView.managerTab;

					instance.enableMacControlId = mt.getId.enableMacControlId(index);
					instance.enableMacLabelId = mt.getId.enableMacLabelId(index);

					var enableMacSpanTemplate = "<span id='<id>' ml='__ML_enable_mac_filtering'></span>";
					var enableMacControlTemplate = '<input type="checkbox" id="<id>" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'wirelessMacController.enableMac_changed\', index:<index>});" />';

					var div = $("<div class='textCenter'></div>").appendTo(mt.wirelessDiv);

					div.append(enableMacSpanTemplate.replace("<id>", instance.enableMacLabelId));
					div.append(enableMacControlTemplate.replace("<id>", instance.enableMacControlId).replace("<index>", index));
				},

				filterType: function(index)
				{
					var instance = wirelessMacView.instances[index];
					var mt = wirelessMacView.managerTab;

					instance.filterTypeAllowControlId = mt.getId.filterTypeAllowControlId(index);
					instance.filterTypeAllowLabelId = mt.getId.filterTypeAllowLabelId(index);

					instance.filterTypeDenyControlId = mt.getId.filterTypeDenyControlId(index);
					instance.filterTypeDenyLabelId = mt.getId.filterTypeDenyLabelId(index);

					instance.filterTypeAllowControlName = mt.getId.filterTypeAllowControlName(index);
					instance.filterTypeDenyControlName = mt.getId.filterTypeDenyControlName(index);

					var filterTypeAllowSpanTemplate = "<span id='<id>' ml='__ML_allow'></span>";
					var filterTypeDenySpanTemplate = "<span id='<id>' ml='__ML_deny'></span>";

					var filterTypeControlTemplate = "<input type='radio' name='<name>' id='<id>' value='<value>'/>";

					var div = $("<div></div>").appendTo(mt.wirelessDiv);
					var list = $("<table class='marginCenter widthAuto'></table>").appendTo(div);

					var filterTypeAllow = $("<tr></tr>").appendTo(list);

					$("<td></td>").append(filterTypeControlTemplate.replace("<id>", instance.filterTypeAllowControlId).replace("<name>", instance.filterTypeAllowControlName).replace("<value>", "allow")+""+filterTypeAllowSpanTemplate.replace("<id>", instance.filterTypeAllowLabelId)).appendTo(filterTypeAllow);

					var filterTypeDeny = $("<tr></tr>").appendTo(list);

					$("<td></td>").append(filterTypeControlTemplate.replace("<id>", instance.filterTypeDenyControlId).replace("<name>", instance.filterTypeDenyControlName).replace("<value>", "block")+""+filterTypeDenySpanTemplate.replace("<id>", instance.filterTypeDenyLabelId)).appendTo(filterTypeDeny);

				},

				macTable: function(index)
				{
					var instance = wirelessMacView.instances[index];
					var mt = wirelessMacView.managerTab;

					instance.newMacAddrControlId = mt.getId.newMacAddrControlId(index);
					instance.newMacAddrLabelId = mt.getId.newMacAddrLabelId(index);
					instance.clientListControlId = mt.getId.clientListControlId(index);
					instance.clientListLabelId = mt.getId.clientListLabelId(index);

					instance.existingMacAddrControlId = mt.getId.existingMacAddrControlId(index);
					instance.existingMacAddrLabelId = mt.getId.existingMacAddrLabelId(index);

					instance.newMacButtonId = mt.getId.newMacButtonId(index);
					instance.existingMacAddButtonId = mt.getId.existingMacAddButtonId(index);
					instance.existingMacRemoveButtonId = mt.getId.existingMacRemoveButtonId(index);

					var newMacAddrSpanTemplate = "<span id='<id>' ml='__ML_new_mac_address'></span>";
					var newMacAddrControlTemplate = "<input type='text' id='<id>' class='wirelessMacNewAddr' maxlength='17'/>";

					var clientListSpanTemplate = "<span id='<id>' ml='__ML_wireless_client_list'></span>";
					var clientListControlTemplate = "<select class='wirelessMacClientList' id='<id>' size='16'></select>";

					var existingMacAddrSpanTemplate = "<span id='<id>' ml='__ML_existing_clients'></span>";
					var existingMacAddrControlTemplate = "<select class='wirelessMacExistingMacAddr' id='<id>' size='12'></select>";

					var buttonAddNewTemplate = '<input type="button" id="<id>" ml="__V_add_button0" value="" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'wirelessMacController.addButtonNew_clicked\', index:<index>});" />';
					var buttonAddLanTemplate = '<input type="button" id="<id>" ml="__V_add_button0" value="" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'wirelessMacController.addButtonLan_clicked\', index:<index>});" />';

					var buttonRemoveTemplate = '<input type="button" id="<id>" ml="__V_remove_button0" value="" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'wirelessMacController.removeButton_clicked\', index:<index>});" />';

					var table = $("<table class='wirelessMacTable'></table>").appendTo(mt.wirelessDiv);
					var row = $("<tr></tr>").appendTo(table);

					$("<td class='macInputs'></td>").append(newMacAddrSpanTemplate.replace("<id>", instance.newMacAddrLabelId) + "<br />" + newMacAddrControlTemplate.replace("<id>", instance.newMacAddrControlId)).appendTo(row);
					$("<td class='buttons'></td>").append(buttonAddNewTemplate.replace("<id>", instance.newMacButtonId).replace("<index>", index)).appendTo(row);
					$("<td class='macInputs' rowspan='2'></td>").append(clientListSpanTemplate.replace("<id>", instance.clientListLabelId) + "<br />" + clientListControlTemplate.replace("<id>", instance.clientListControlId)).appendTo(row);

					row = $("<tr></tr>").appendTo(table);

					$("<td class='macInputs'></td>").append(existingMacAddrSpanTemplate.replace("<id>", instance.existingMacAddrLabelId) + "<br />" + existingMacAddrControlTemplate.replace("<id>", instance.existingMacAddrControlId)).appendTo(row);
					$("<td class='buttons'></td>").append(buttonAddLanTemplate.replace("<id>", instance.existingMacAddButtonId).replace("<index>", index) + "<br /><br />" + buttonRemoveTemplate.replace("<id>", instance.existingMacRemoveButtonId).replace("<index>", index)).appendTo(row);

				}
			},

			set: {
				macFiltering: function(index, value)
				{
					$("#" + wirelessMacView.instances[index].enableMacControlId).attr("checked", value);
					wirelessMacView.actions.enableMacFilteringChanged(index, value ? "on":"off");
				},

				filterType: function(index, value)
				{
					if(value == "allow")
					{
						$("#" + wirelessMacView.instances[index].filterTypeAllowControlId).attr("checked", true);

					}
					else if(value == "block")
					{
						$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).attr("checked", true);
					}
					else if(value == "off")
					{
						$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).attr("checked", true);
						$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).attr('disabled', 'disabled');
						$("#" + wirelessMacView.instances[index].filterTypeAllowControlId).attr('disabled', 'disabled');

						$("#" + wirelessMacView.instances[index].newMacAddrControlId).attr('disabled', 'disabled');

						$("#" + wirelessMacView.instances[index].newMacButtonId).attr('disabled', 'disabled');
						$("#" + wirelessMacView.instances[index].existingMacAddButtonId).attr('disabled', 'disabled');
						$("#" + wirelessMacView.instances[index].existingMacRemoveButtonId).attr('disabled', 'disabled');

					}
				},

				clientList: function(index, aclList)
				{
					var myOptions = {
							// value : text
					};

					$("#" + wirelessMacView.instances[index].clientListControlId).empty();

					for(var i=0; i<aclList.length; i++)
					{
							myOptions[aclList[i].acl_mac] = aclList[i].acl_mac;
					}

					$.each(myOptions, function(val, text) {
						$("#" + wirelessMacView.instances[index].clientListControlId).append(
					        $('<option></option>').val(val).html(text)
					    );
					});
				},

				existingList: function(index, aps)
				{
					var myOptions = {
							// value : text
					};

					for(var i=0; i<aps.length; i++)
					{
						for(var j=0; j<aps[i].stations.length; j++)
						{
							myOptions[aps[i].stations[j].sta_mac] = aps[i].stations[j].sta_mac;
						}
					}

					$.each(myOptions, function(val, text) {
						$("#" + wirelessMacView.instances[index].existingMacAddrControlId).append(
					        $('<option></option>').val(val).html(text)
					    );
					});
				}

			},

			get: {
				aclMode: function(index)
				{
					var aclMode = "";
					if($("#" + wirelessMacView.instances[index].enableMacControlId).is(":checked"))
					{
						if($("#" + wirelessMacView.instances[index].filterTypeDenyControlId).is(":checked"))
						{
							aclMode = $('input[name="' + wirelessMacView.instances[index].filterTypeDenyControlName + '"]:checked').val();
						}
						else if($("#" + wirelessMacView.instances[index].filterTypeAllowControlId).is(":checked"))
						{
							aclMode = $('input[name="' + wirelessMacView.instances[index].filterTypeAllowControlName + '"]:checked').val();
						}
					}
					else
					{
						aclMode = "off";
					}

					return aclMode;
				},

				macFiltering: function(index)
				{
					return $("#" + wirelessMacView.instances[index].enableMacControlId).is(":checked");
				}
			},

			getId: {
				enableMacControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_enable_mac_filtering_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_enable_mac_filtering";
					}
				},

				enableMacLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_enable_mac_filtering_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_enable_mac_filtering";
					}
				},

				filterTypeAllowControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_allow_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_allow";
					}
				},

				filterTypeAllowControlName: function(index)
				{
					if(index > 0)
					{
						return "filter_type_<index>".replace("<index>", index);
					}
					else
					{
						return "filter_type";
					}
				},

				filterTypeAllowLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_allow_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_allow";
					}
				},

				filterTypeDenyControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_deny_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_deny";
					}
				},

				filterTypeDenyControlName: function(index)
				{
					if(index > 0)
					{
						return "filter_type_<index>".replace("<index>", index);
					}
					else
					{
						return "filter_type";
					}
				},

				filterTypeDenyLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_deny_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_deny";
					}
				},

				newMacAddrControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_AddNewIp_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_AddNewIp";
					}
				},

				newMacAddrLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_new_mac_address_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_new_mac_address";
					}
				},

				newMacButtonId: function(index)
				{
					if(index > 0)
					{
						return "__V_add_button0_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_add_button0";
					}
				},

				existingMacAddrControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_LanIpSelector1_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_LanIpSelector1";
					}
				},

				existingMacAddrLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_existing_clients_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_existing_clients";
					}
				},

				existingMacAddButtonId: function(index)
				{
					if(index > 0)
					{
						return "__V_add_button1_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_add_button1";
					}
				},

				existingMacRemoveButtonId: function(index)
				{
					if(index > 0)
					{
						return "__V_remove_button0_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_remove_button0";
					}
				},

				clientListControlId: function(index)
				{
					if(index > 0)
					{
						return "__V_uiViewClientList_<index>".replace("<index>", index);
					}
					else
					{
						return "__V_uiViewClientList";
					}
				},

				clientListLabelId: function(index)
				{
					if(index > 0)
					{
						return "__ML_wireless_client_list_<index>".replace("<index>", index);
					}
					else
					{
						return "__ML_wireless_client_list";
					}
				}

			},

			addPageValidations: function(index)
			{
		    	var validationObj = {
		    			"elementId":wirelessMacView.instances[index].newMacAddrControlId,
		    			"label": globalView.getMultiLanguageText('__ML_new_mac_address'),
		    			"groups": "NewMac",
		    			"type":{
		    				"Required":{},
		    				"Pattern": {
		    					"regex":"^([0-9a-fA-F]{2}[:]){5}[0-9a-fA-F]{2}",
		    					"format":"90:21:AA:B6:E8:41"},
		    				"MacValidation": {}
		    				}
		    	};

		    	globalView.addRegulaValidation(validationObj);

			},

			addTab: function(index)
			{

				wirelessMacView.managerTab.managerTabId = "tabs-" + index;

				wirelessMacView.managerTab.managerTab = $("<div id='" + wirelessMacView.managerTab.managerTabId + "'></div>").appendTo("#tabs");

				wirelessMacView.managerTab.wirelessDiv = $("<div id='wirelessDiv" + index + "' class='wirelessMacDiv'></div>").appendTo(wirelessMacView.managerTab.managerTab);

				var instance = wirelessMacView.instances[index];
				var selectedFreq = instance.configSettings.freq;
				var selectedFreqName = instance.freqs[selectedFreq].text;

				if(wirelessMacView.instances.length <= 1)
					$("#managerSelectorUl").hide();
				else
					$("#managerSelectorUl").append("<li id='tab_" + index + "'><a href='#tabs-" + index + "'>" + globalView.getMultiLanguageText('__ML_wireless_network_lan') + " " + (index + 1) + " (" + selectedFreqName + ")</a></li>");

				switch(wirelessMacView.instances[index].configSettings.opMode)
				{
					case "ap":
						wirelessMacView.managerTab.addRow.macFiltering(index);
						wirelessMacView.managerTab.addRow.filterType(index);
						wirelessMacView.managerTab.addRow.macTable(index);
						wirelessMacView.instances[index].removedMacs = new Object();
						break;
					case "sta":
						wirelessMacView.managerTab.addRow.staWarning(index);
						break;
					case "repeater":
                                                wirelessMacView.managerTab.addRow.macFiltering(index);
                                                wirelessMacView.managerTab.addRow.filterType(index);
                                                wirelessMacView.managerTab.addRow.macTable(index);
                                                wirelessMacView.instances[index].removedMacs = new Object();
						break;
				}

			}

		},

		actions:
		{
			showOpModeWarning: function(){
				$("#commentDiv").remove();
				$("#tabs").remove();
				$("#contentDiv").append('<div id="bridgeModeWarningDiv" class="commentStyle" style="padding-top: 10px; padding-bottom: 10px; text-align: center;"><span id="__ML_wireless_operating_mode_bridge_mode_no_access_warning" ml="__ML_wireless_operating_mode_bridge_mode_no_access_warning"></span></div>');
			},
			addButtonNewClicked: function(index)
			{
				if(globalController.validateObjects("NewMac"))
				{
					if($('#' + wirelessMacView.instances[index].clientListControlId + " option").length > 31)
					{
						alert(globalView.getMultiLanguageText('__ML_mac_filter_max_warning').replace("@number@", 32));
						return;
					}
					var newClient = $("#" + wirelessMacView.instances[index].newMacAddrControlId).val().toUpperCase();
					wirelessMacView.actions.addMacToClientList(index, newClient);
				}
			},

			addButtonLanClicked: function(index)
			{
				var existingList = $("#" + wirelessMacView.instances[index].existingMacAddrControlId);
				newClient = existingList.val().toUpperCase();
				if(newClient == "invalid")
				{
					alert(__ML_invalid_mac);
					return;
				}
				else if (newClient == "")
				{
					alert(__ML_mac_client_list_empty);
					return;
				}

				wirelessMacView.actions.addMacToClientList(index, newClient);

			},

			addMacToClientList: function(index, newClient)
			{
				var returnValue = true;
				var clientList = $("#" + wirelessMacView.instances[index].clientListControlId);
				for(i=0; i < clientList.length; i++)
				{
					$("#" + wirelessMacView.instances[index].clientListControlId + " > option").each(function() {
					    if(this.text == newClient)
					    {
					    	alert(__ML_client_list);
					    	returnValue = false;
					    }
					});
				}
				if(returnValue)
				{
					var x = document.getElementById(wirelessMacView.instances[index].clientListControlId);
					var option = document.createElement("option");
					option.text = newClient;
					option.value = newClient;
					try
					{
					  // for IE earlier than version 8
					  x.add(option,x.options[null]);
					}
					catch (e)
					{
					  x.add(option,null);
					}

					//clientList.append($('<option></option>').val(newClient).html(newClient)); // Not working on IE8
				}
			},

			removeButtonClicked: function(index)
			{
				var selectedOption = $("#" + wirelessMacView.instances[index].clientListControlId + " option:selected");
				if (selectedOption.length > 0)
				{
					wirelessMacView.instances[index].removedMacs[selectedOption.val()] = selectedOption.val();
					selectedOption.remove();
				}
				else
				{
					alert(__ML_select_valid_mac);
				}
			},

			enableMacFilteringChanged: function(index, value)
			{
				if(value == "off")
				{
					$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).attr("checked", true);
					$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).attr('disabled', 'disabled');
					$("#" + wirelessMacView.instances[index].filterTypeAllowControlId).attr('disabled', 'disabled');

					$("#" + wirelessMacView.instances[index].newMacAddrControlId).attr('disabled', 'disabled').addClass('ui-state-disabled');

					$("#" + wirelessMacView.instances[index].newMacButtonId).attr('disabled', 'disabled').addClass('ui-state-disabled');
					$("#" + wirelessMacView.instances[index].existingMacAddButtonId).attr('disabled', 'disabled').addClass('ui-state-disabled');
					$("#" + wirelessMacView.instances[index].existingMacRemoveButtonId).attr('disabled', 'disabled').addClass('ui-state-disabled');

				}
				else if(value == "on")
				{
					$("#" + wirelessMacView.instances[index].filterTypeDenyControlId).removeAttr('disabled');
					$("#" + wirelessMacView.instances[index].filterTypeAllowControlId).removeAttr('disabled');

					$("#" + wirelessMacView.instances[index].newMacAddrControlId).removeAttr('disabled').removeClass('ui-state-disabled');

					$("#" + wirelessMacView.instances[index].newMacButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
					$("#" + wirelessMacView.instances[index].existingMacAddButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
					$("#" + wirelessMacView.instances[index].existingMacRemoveButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
				}
			}
		},

		addManagerTabs: function(managerCount)
		{
			$(".managerTab").remove();
			$(".footer").remove();

			$("#contentDiv").append("<div id='tabs' class='wirelessMacTopDiv marginCenter'></div>");
			$("#tabs").append("<ul id='managerSelectorUl'></ul>");
			for(var i = 0; i < wirelessMacView.instances.length; i++)
			{
				wirelessMacView.managerTab.addTab(i);
			}
		},

		documentReady: function()
		{
			$("#contentDiv").html("");
			wirelessMacView.addHedaerDiv();
			wirelessMacView.addCommentDiv();
		},

		createTabControls: function(activeManagerIndex)
		{
			var $tabs = $('#tabs').tabs();
			$tabs.tabs({ selected: activeManagerIndex });

	        $tabs.tabs({
	            select: function(event, ui) {
	        		if(wirelessMacView.confirmAndSetActiveManagerTab(ui.index))
	        		{
	        			wirelessMacController.activeManagerIndex = ui.index;
	        		}
	        		else
	        		{
	        			return false;
	        		}
	        	}
	        });
		},

		confirmAndSetActiveManagerTab: function(index)
		{
			var changeTab = true;
			var changed = false;
			if(wirelessMacView.managerTab.get.macFiltering(wirelessMacController.activeManagerIndex) != (wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclMode != "off")) changed = true;
			if(wirelessMacView.managerTab.get.aclMode(wirelessMacController.activeManagerIndex) != wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclMode) changed = true;
			if($("#" + wirelessMacView.instances[wirelessMacController.activeManagerIndex].newMacAddrControlId).val() != "") changed = true;
			if(wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclList.length != $("#" + wirelessMacView.instances[wirelessMacController.activeManagerIndex].clientListControlId + " option").length) changed = true;
			else
			{
				var i = 0;
				$("#" + wirelessMacView.instances[wirelessMacController.activeManagerIndex].clientListControlId + " > option").each(function() {
				    if(this.value != wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclList[i].acl_mac)
				    {
				    	changed = true;
				    	return false; // To break the each function
				    }
				    i++;
				});
			}
			if(wirelessMacController.activeManagerIndex == index) return false;

			if(changed)
			{
				if(confirm(globalView.getMultiLanguageText("__ML_wireless_settings_tab_change_confirm_message")))
				{
					wirelessMacView.managerTab.set.macFiltering(wirelessMacController.activeManagerIndex, (wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclMode != "off"));
					wirelessMacView.managerTab.set.filterType(wirelessMacController.activeManagerIndex, wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclMode);

					if(typeof wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclList != "undefined")
						wirelessMacView.managerTab.set.clientList(wirelessMacController.activeManagerIndex, wirelessMacView.instances[wirelessMacController.activeManagerIndex].configSettings.aclList);

					$("#" + wirelessMacView.instances[wirelessMacController.activeManagerIndex].newMacAddrControlId).val("");

				}
				else
				{
					changeTab = false;
				}
			}

			return changeTab;
		},

		addHedaerDiv: function()
		{
			$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
			$("#headerDiv").append("<span id='__ML_mac_filtering' ml='__ML_mac_filtering'></span>");
		},

		addCommentDiv: function()
		{
			$("#contentDiv").append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv'></div>");
			$("#commentDiv").html("");
			$("#commentDiv").append("<span id='__ML_wireless_access_control_info' ml='__ML_wireless_access_control_info'></span>");
			$("#commentDiv").append("<br /><br />");
			$("#commentDiv").append("<span id='__ML_wireless_access_control_info2' ml='__ML_wireless_access_control_info2'></span>");
		},

		addFooter: function()
		{
				
			if ($.grep(wirelessMacView.instances, function(instance) {
				if (instance.configSettings.opMode != "sta") {
					return true;
				}
				return false;
			}).length == 0) {
				return;
			}

			var footer = $("<div class='footer'></div>");
			footer.append('<input type="button" id="__ML_save" ml="__ML_save" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'saveClicked\'});"/>');
			footer.append('<input type="button" id="__ML_cancel" ml="__ML_cancel" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'reloadPage\'});" />');
			footer.appendTo("#contentDiv");
		}
}
