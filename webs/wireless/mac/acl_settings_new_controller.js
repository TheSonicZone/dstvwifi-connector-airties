var wirelessMacController =
{
	activeManagerIndex: 0,
	activeManagerIndex1: 0,
	documentReady: function()
	{
		wirelessMacView.documentReady();
		wirelessMacController.sendFirstQuery();
	},

	eventHandler: function(args)
	{
		var index = 0; //args.index || args.instance_index || wirelessMacController.activeManagerIndex;
		if(args.index != undefined) index = args.index;
		else if(args.instance_index != undefined) index = args.instance_index;
		else index = wirelessMacController.activeManagerIndex;
		var ap_index = args.ap_index || 0;

		switch(args.id)
		{
			case "wirelessMacController.firstQueryFinished":
				wirelessMacController.sendSecondQuery();
				break;
			case "wirelessMacController.secondQueryFinished":
				wirelessMacController.sendThirdQuery();
				break;
			case "wirelessMacController.thirdQueryFinished":
				wirelessMacController.sendFourthQuery();
				break;
			case "wirelessMacController.fourthQueryFinished":
				wirelessMacController.allQueriesFinished();
				break;
			case "wirelessMacController.enableMac_changed":
				wirelessMacView.actions.enableMacFilteringChanged(index, wirelessMacView.managerTab.get.macFiltering(index) ? "on":"off");
				break;
			case "wirelessMacController.addButtonNew_clicked":
				wirelessMacView.actions.addButtonNewClicked(index);
				break;
			case "wirelessMacController.addButtonLan_clicked":
				wirelessMacView.actions.addButtonLanClicked(index);
				break;
			case "wirelessMacController.removeButton_clicked":
				wirelessMacView.actions.removeButtonClicked(index);
				break;
			case "saveClicked":
				wirelessMacView.instances[wirelessMacController.activeManagerIndex].beSaved = true;
				wirelessMacController.save();
				break;
			case "saved":
				if(wirelessMacView.instances[wirelessMacController.activeManagerIndex].requiresReboot) global.reboot();
				wirelessMacController.activeManagerIndex1 = wirelessMacController.activeManagerIndex;
				page.documentReady();
				break;
			case "parseRebootRequiredQuery":
				wirelessMacModel.instances[index].parseRebootRequiredQuery();
				break;
			case "reloadPage":
				window.location.href = "/wireless/mac/acl_settings_new.html";
				break;
		}
	},

	allQueriesFinished: function()
	{
		wirelessMacView.instances = wirelessMacModel.instances.slice();
		wirelessMacView.addManagerTabs();
		wirelessMacView.addFooter();

		for(var i = 0; i < wirelessMacView.instances.length; i++)
		{
			wirelessMacView.managerTab.set.macFiltering(i, (wirelessMacView.instances[i].configSettings.aclMode != "off"));
			wirelessMacView.managerTab.set.filterType(i, wirelessMacView.instances[i].configSettings.aclMode);

			if(typeof wirelessMacView.instances[i].configSettings.aclList != "undefined")
				wirelessMacView.managerTab.set.clientList(i, wirelessMacView.instances[i].configSettings.aclList);

			wirelessMacView.managerTab.set.existingList(i,  wirelessMacView.instances[i].aps);

			wirelessMacView.managerTab.addPageValidations(i);

		}

		wirelessMacView.createTabControls(wirelessMacController.activeManagerIndex1);

		globalView.addButtonClass();

		globalView.showPage();
	},

	getWirelessInstances: function()
	{
		wirelessMacModel.sendInstListQuery();
	},

	sendFirstQuery: function()
	{
		wirelessMacController.getWirelessInstances();
		globalModel.addEvent({eventHandler: "wirelessMacController", id: "wirelessMacController.firstQueryFinished"});
		globalModel.sendAjax();
	},

	sendSecondQuery: function()
	{
		wirelessMacModel.sendCapabilitiesQuery();
		wirelessMacModel.sendOpModeQuery();
		wirelessMacModel.sendAirTouchQuery();
		globalModel.addEvent({eventHandler: "wirelessMacController", id: "wirelessMacController.secondQueryFinished"});
		globalModel.sendAjax();
	},

	sendThirdQuery: function()
	{
		wirelessMacModel.sendAPListQuery();
		globalModel.addEvent({eventHandler: "wirelessMacController", id: "wirelessMacController.thirdQueryFinished"});
		globalModel.sendAjax();
	},

	sendFourthQuery: function()
	{
		wirelessMacModel.sendApAclListQuery();
		wirelessMacModel.sendApAclModeQuery();
		wirelessMacModel.sendApEnabledQuery();
		wirelessMacModel.sendApStaListQuery();
		wirelessMacModel.sendFreqQuery();
		globalModel.addEvent({eventHandler: "wirelessMacController", id: "wirelessMacController.fourthQueryFinished"});
		globalModel.sendAjax();
	},

	save: function()
	{
		index = wirelessMacController.activeManagerIndex;
		if(wirelessMacView.instances[index].configSettings.airTouch && wirelessMacView.managerTab.get.macFiltering(index)) {
			if(confirm(__ML_wps_will_be_disabled_if_mac_filtering_is_enabled_confirm)) {
				wirelessMacView.instances[index].saveAirTouch(false);
			} else {
				return;
			}
		}
		
		globalView.disablePage();
		for(var index = 0; index < wirelessMacView.instances.length; index++)
		{
			if(wirelessMacView.instances[index].beSaved && wirelessMacView.instances[index].configSettings.opMode != "sta")
			{
				for (key in wirelessMacView.instances[index].removedMacs)
				{
					var removeMac = true;
					$("#" + wirelessMacView.instances[index].clientListControlId + " > option").each(function() {
					    if(this.value == key)
					    {
					    	removeMac = false;
					    	return;
					    }
					});

					if (removeMac == true)
					{
						wirelessMacView.instances[index].saveAclDelete(key);
					}
				}

				$("#" + wirelessMacView.instances[index].clientListControlId + " > option").each(function() {
					var addMac = true;
					for(var i=0; i<wirelessMacView.instances[index].configSettings.aclList.length; i++)
					{
						if(this.value == wirelessMacView.instances[index].configSettings.aclList[i].acl_mac)
						{
							addMac = false;
							break;
						}
					}

					if(addMac == true)
					{
						wirelessMacView.instances[index].saveAclAdd(this.value);
					}
				});

				wirelessMacView.instances[index].saveAclMode(wirelessMacView.managerTab.get.aclMode(index));
			}
		}

		for(var i = 0; i < wirelessMacView.instances.length; i++)
		{
			if(wirelessMacView.instances[i].beSaved)
			{
				wirelessMacView.instances[i].sendApply();
				globalModel.addEvent({eventHandler: "wirelessMacController", id: "parseRebootRequiredQuery", index: i});
			}
		}

		globalModel.addEvent({eventHandler: "wirelessMacController", id: "saved"});
		globalModel.sendAjax();
	}

}