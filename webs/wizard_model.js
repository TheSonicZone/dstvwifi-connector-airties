var quickSetupModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "quickSetupModel.parseAirTouchQuery":
				quickSetupModel.parseAirTouchQuery();
				break;
			case "quickSetupModel.parseAPListQuery":
				quickSetupModel.parseAPListQuery();
				break;
			case "quickSetupModel.parseCapabilitiesQuery":
				quickSetupModel.parseCapabilitiesQuery();
				break;
			case "quickSetupModel.parseFreqQuery":
				quickSetupModel.parseFreqQuery();
				break;
			case "quickSetupModel.parseInstListQuery":
				quickSetupModel.parseInstListQuery();
				break;
			case "quickSetupModel.parseOpModeQuery":
				quickSetupModel.parseOpModeQuery();
				break;
			case "quickSetupModel.parseSecurityValuesQuery":
				quickSetupModel.parseSecurityValuesQuery();
				break;
			case "quickSetupModel.parseSsidQuery":
				quickSetupModel.parseSsidQuery();
				break;
		}
	},

	instances: [],

	parseAirTouchQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].parseAirTouchQuery();
		}
	},

	parseAPListQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].parseAPListQuery();
		}
	},

	parseCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < quickSetupModel.instances.length; i++)
			{
				quickSetupModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseFreqQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].parseFreqQuery();
		}
	},

	parseInstListQuery: function()
	{
		quickSetupModel.instances = [];
		//if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) quickSetupModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		if(top.xmlResponseObject["devmgr-0"])
		{
			while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
			{
				quickSetupModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
				i++;
			}
		}
	},

	parseOpModeQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].parseOpModeQuery();
		}
	},

	parseSecurityValuesQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].aps[0].parseSecMode();
			quickSetupModel.instances[i].aps[0].parseWepKey1();
			quickSetupModel.instances[i].aps[0].parseWpaRadiusKey();
			quickSetupModel.instances[i].aps[0].parseWpaPassword();
			quickSetupModel.instances[i].aps[0].parseWpaAuthType();
		}
	},

	parseSsidQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].aps[0].parseSSID();
		}
	},

	sendAirTouchQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseAirTouchQuery"});
	},

	sendAPListQuery: function()
	{
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseAPListQuery"});
	},

	sendCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < quickSetupModel.instances.length; i++)
			{
				quickSetupModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseCapabilitiesQuery"});
	},

	sendFreqQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseFreqQuery"});
	},


	sendInstListQuery: function()
	{
		//globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseInstListQuery"});
	},

	sendOpModeQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseOpModeQuery"});
	},

	sendSecurityValuesQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].aps[0].sendSecMode();
			quickSetupModel.instances[i].aps[0].sendWepKey1();
			quickSetupModel.instances[i].aps[0].sendWpaRadiusKey();
			quickSetupModel.instances[i].aps[0].sendWpaPassword();
			quickSetupModel.instances[i].aps[0].sendWpaAuthType();
		}
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseSecurityValuesQuery"});
	},

	sendSsidQuery: function()
	{
		for(var i = 0; i < quickSetupModel.instances.length; i++)
		{
			quickSetupModel.instances[i].aps[0].sendSSID();
		}
		globalModel.addEvent({eventHandler: "quickSetupModel", id: "quickSetupModel.parseSsidQuery"});
	}
}
