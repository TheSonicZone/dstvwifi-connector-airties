var wirelessWpsModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessWpsModel.parseAirTouchQuery":
				wirelessWpsModel.parseAirTouchQuery();
				break;
			case "wirelessWpsModel.parseCapabilitiesQuery":
				wirelessWpsModel.parseCapabilitiesQuery();
				break;
			case "wirelessWpsModel.parseFreqQuery":
				wirelessWpsModel.parseFreqQuery();
				break;
			case "wirelessWpsModel.parseInstListQuery":
				wirelessWpsModel.parseInstListQuery();
				break;
			case "wirelessWpsModel.parseOpModeQuery":
				wirelessWpsModel.parseOpModeQuery();
				break;
			case "wirelessWpsModel.parseWpsPinQuery":
				wirelessWpsModel.parseWpsPinQuery();
				break;
			case "wirelessWpsModel.parseWpsRoleQuery":
				wirelessWpsModel.parseWpsRoleQuery();
				break
		}
	},
	
	instances: [],
	
	parseWpsRoleQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseWpsRoleQuery();
		}
	},
	
	parseAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseAirTouchQuery();
		}
	},
	
	parseCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessWpsModel.instances.length; i++)
			{
				wirelessWpsModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseFreqQuery();
		}
	},
	
	parseInstListQuery: function()
	{
		wirelessWpsModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessWpsModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessWpsModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},
	
	parseOpModeQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseOpModeQuery();
		}
	},

	
	parseWpsPinQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseWpsPinQuery();
		}
	},
	
	sendWpsRoleQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendWpsRoleQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseWpsRoleQuery"});
	},
	
	sendAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseAirTouchQuery"});
	},
	
	sendCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessWpsModel.instances.length; i++)
			{
				wirelessWpsModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseCapabilitiesQuery"});
	},

	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseFreqQuery"});
	},
	
	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseInstListQuery"});
	},
	
	sendOpModeQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseOpModeQuery"});
	},
	
	sendWpsPinQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendWpsPinQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseWpsPinQuery"});
	}
}
