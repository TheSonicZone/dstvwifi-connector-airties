var wirelessWpsController =
{
	wpsStatusIntervalId: [],
	
	documentReady: function()
	{
		wirelessWpsView.documentReady();
		wirelessWpsController.sendFirstQuery();
	},
	
	eventHandler: function(args)
	{
		var index = 0; //args.index || args.instance_index || wirelessMeshController.activeManagerIndex;
		if(args.index != undefined) index = args.index;
		switch(args.id)
		{
			case "wirelessWpsController.firstQueryFinished":
				wirelessWpsController.sendSecondQuery();
				break;
			case "wirelessWpsController.secondQueryFinished":
				wirelessWpsController.sendThirdQuery();
				break;
			case "wirelessWpsController.thirdQueryFinished":
				wirelessWpsController.allQueriesFinished();
				break;
			case "wirelessWpsController.wpsPushButtonQuerySent":
				wirelessWpsController.wpsStatusIntervalId[index] = setInterval("wirelessWpsController.sendWpsStatusForPushButtonQuery(" + index + ")", "3000");
				break;
			case "wirelessWpsController.wpsRegisterQuerySent":
				wirelessWpsController.wpsStatusIntervalId[index] = setInterval("wirelessWpsController.sendWpsStatusForRegisterQuery(" + index + ")", "3000");
				break;
			case "wirelessWpsController.wpsActivatePINQuerySent":
				wirelessWpsController.wpsStatusIntervalId[index] = setInterval("wirelessWpsController.sendWpsStatusForActivatePINQuery(" + index + ")", "3000");
				break;
			case "wirelessWpsController.wpsStatusForPushButtonQuerySent":
				wirelessWpsModel.instances[index].parseWpsStatusQuery();
				var wpsStatus = wirelessWpsModel.instances[index].configSettings.wpsStatus;
				
				if(wpsStatus != "running") 
				{
					clearInterval(wirelessWpsController.wpsStatusIntervalId[index]);
				}
				
				wirelessWpsView.managerTab.updateRegisterStatusForPushButtonQuery(index, wpsStatus);

				break;
			case "wirelessWpsController.wpsStatusForRegisterQuerySent":
				wirelessWpsModel.instances[index].parseWpsStatusQuery();
				var wpsStatus = wirelessWpsModel.instances[index].configSettings.wpsStatus;
				
				if(wpsStatus != "running") 
				{
					clearInterval(wirelessWpsController.wpsStatusIntervalId[index]);
				}
				
				wirelessWpsView.managerTab.updateRegisterStatusForRegisterQuery(index, wpsStatus);

				break;
			case "wirelessWpsController.wpsStatusForActivatePINQuerySent":
				wirelessWpsModel.instances[index].parseWpsStatusQuery();
				var wpsStatus = wirelessWpsModel.instances[index].configSettings.wpsStatus;
				
				if(wpsStatus != "running") 
				{
					clearInterval(wirelessWpsController.wpsStatusIntervalId[index]);
				}
				
				wirelessWpsView.managerTab.updateActivatePinStatusForActivatePinQuery(index, wpsStatus);

				break;
			case "saveClicked":
				wirelessWpsController.save();
				break;
			case "saved":
				page.documentReady();
				break;
			case "reloadPage":
				page.documentReady();
				break;
		}
	},
	
	allQueriesFinished: function()
	{
		
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			if(wirelessWpsModel.instances[i].wpsExist == false)
			{
				wirelessWpsModel.instances.splice(i,1);
			}
		}

		wirelessWpsView.instances = wirelessWpsModel.instances.slice();
		wirelessWpsView.addManagerTabs();
		//wirelessWpsView.addFooter();
		wirelessWpsView.createTabControls(wirelessWpsController.activeManagerIndex1); // It must be located after adding footer.

		for(var i=0; i < wirelessWpsView.instances.length; i++)
		{
			wirelessWpsView.managerTab.set.wpsPin(i, wirelessWpsView.instances[i].wpsPin);
		}
		
		globalView.addButtonClass();
		
		globalView.showPage();
	},
	
	getWirelessInstances: function()
	{
		wirelessWpsModel.sendInstListQuery();
	},

	sendFirstQuery: function()
	{
		wirelessWpsController.getWirelessInstances();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.firstQueryFinished"});
		globalModel.sendAjax();
	},
	
	sendSecondQuery: function()
	{
		wirelessWpsModel.sendCapabilitiesQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.secondQueryFinished"});
		globalModel.sendAjax();
	},
	
	sendThirdQuery: function()
	{
		wirelessWpsModel.sendAirTouchQuery();
		wirelessWpsModel.sendFreqQuery();
		wirelessWpsModel.sendOpModeQuery();
		wirelessWpsModel.sendWpsPinQuery();
		wirelessWpsModel.sendWpsRoleQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.thirdQueryFinished"});
		globalModel.sendAjax();
	},
	
	sendWpsPushButtonQuery: function(index)
	{
		wirelessWpsModel.instances[index].sendWpsPushButtonQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsPushButtonQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	sendWpsRegisterQuery: function(index, pinNumber)
	{
		wirelessWpsModel.instances[index].setWpsPinQuery(pinNumber);
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsRegisterQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	sendWpsActivatePINQuery: function(index, pinNumber)
	{
		wirelessWpsModel.instances[index].setWpsPinQuery(pinNumber);
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsActivatePINQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	sendWpsStatusForPushButtonQuery: function(index)
	{
		wirelessWpsModel.instances[index].sendWpsStatusQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsStatusForPushButtonQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	sendWpsStatusForRegisterQuery: function(index)
	{
		wirelessWpsModel.instances[index].sendWpsStatusQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsStatusForRegisterQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	sendWpsStatusForActivatePINQuery: function(index)
	{
		wirelessWpsModel.instances[index].sendWpsStatusQuery();
		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "wirelessWpsController.wpsStatusForActivatePINQuerySent", index: index});
		globalModel.sendAjax();
	},
	
	save: function()
	{
		globalView.disablePage();

		for(var i = 0; i < wirelessStatusView.instances.length; i++)
		{

		}

		globalModel.addEvent({eventHandler: "wirelessWpsController", id: "saved"});
		globalModel.sendAjax();
	}
}
