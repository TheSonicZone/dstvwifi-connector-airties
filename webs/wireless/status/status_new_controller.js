var wirelessStatusController =
{
	indexForReboot: 0,
	documentReady: function()
	{
		wirelessStatusView.documentReady();
		wirelessStatusController.sendFirstQuery();
	},

	eventHandler: function(args)
	{
		var index = 0; //args.index || args.instance_index || wirelessMeshController.activeManagerIndex;
		if(args.index != undefined) index = args.index;
		switch(args.id)
		{
			case "wirelessStatusController.firstQueryFinished":
				wirelessStatusController.sendSecondQuery();
				break;

			case "wirelessStatusController.secondQueryFinished":
				wirelessStatusController.sendThirdQuery();
				break;

			case "wirelessStatusController.thirdQueryFinished":
				wirelessStatusController.sendFourthQuery();
				break;

			case "wirelessStatusController.fourthQueryFinished":
				wirelessStatusController.allQueriesFinished();
				break;
			case "saveClicked":
				wirelessStatusController.save();
				break;
			case "saved":
				if(wirelessStatusView.instances[wirelessStatusController.indexForReboot].requiresReboot) global.reboot();
				page.documentReady();
				break;
			case "parseRebootRequiredQuery":
				wirelessStatusController.indexForReboot = index;
				wirelessStatusModel.instances[index].parseRebootRequiredQuery();
				break;
			case "reloadPage":
				page.documentReady();
				break;
		}
	},

	allQueriesFinished: function()
	{
		wirelessStatusView.instances = wirelessStatusModel.instances.slice();

		for(var i=0; i <wirelessStatusView.instances.length; i++)
		{
			for(var j=0; j<wirelessStatusView.instances[i].aps.length; j++)
			{
				var instance = wirelessStatusView.instances[i];
				for(var m=0; m<instance.aps[j].stations.length; m++)
				{
					instance.aps[j].stations[m].name = dhcpsModel.getStationName(instance.aps[j].stations[m].sta_mac);
				}
			}

			wirelessStatusView.managerStatus.addStatusDiv(i);
		}

		if(__DEF_WirelessStatusHideDisableControl != 1)
			wirelessStatusView.addFooter();
		
		globalView.addButtonClass();
		
		globalView.showPage();
	},

	getWirelessInstances: function()
	{
		wirelessStatusModel.sendInstListQuery();
	},

	sendFirstQuery: function()
	{
		wirelessStatusController.getWirelessInstances();
		globalModel.addEvent({eventHandler: "wirelessStatusController", id: "wirelessStatusController.firstQueryFinished"});
		globalModel.sendAjax();
	},

	sendSecondQuery: function()
	{
		wirelessStatusModel.sendCapabilitiesQuery();
		wirelessStatusModel.sendLanSettingsQuery();
		wirelessStatusModel.sendOpModeQuery();
		globalModel.addEvent({eventHandler: "wirelessStatusController", id: "wirelessStatusController.secondQueryFinished"});
		globalModel.sendAjax();
	},

	sendThirdQuery: function()
	{
		wirelessStatusModel.sendAPListQuery();
		dhcpsModel.sendDhcpsListQuery();
		wirelessStatusModel.sendFreqQuery();
		wirelessStatusModel.sendEnabledQuery();
		globalModel.addEvent({eventHandler: "wirelessStatusController", id: "wirelessStatusController.thirdQueryFinished"});
		globalModel.sendAjax();
	},

	sendFourthQuery: function()
	{
		wirelessStatusModel.sendSSIDQuery();
		dhcpsModel.sendDhcpsPropertiesQuery();
		wirelessStatusModel.sendApSecModeQuery();
		wirelessStatusModel.sendApEnabledQuery();
		wirelessStatusModel.sendApStaListQuery();
		globalModel.addEvent({eventHandler: "wirelessStatusController", id: "wirelessStatusController.fourthQueryFinished"});
		globalModel.sendAjax();
	},

	save: function()
	{
		globalView.disablePage();

		for(var i = 0; i < wirelessStatusView.instances.length; i++)
		{
			if(wirelessStatusView.instances[i].configSettings.enabled != wirelessStatusView.managerStatus.get.enabled(i))
				wirelessStatusView.instances[i].saveEnabled(wirelessStatusView.managerStatus.get.enabled(i));
		}

		for(var i = 0; i < wirelessStatusView.instances.length; i++)
		{
			if(wirelessStatusView.instances[i].configSettings.enabled != wirelessStatusView.managerStatus.get.enabled(i))
			{
				wirelessStatusView.instances[i].sendApply();
				globalModel.addEvent({eventHandler: "wirelessStatusController", id: "parseRebootRequiredQuery", index: i});
			}
		}

		globalModel.addEvent({eventHandler: "wirelessStatusController", id: "saved"});
		globalModel.sendAjax();
	}
}