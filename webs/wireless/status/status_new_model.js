var wirelessStatusModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessStatusModel.parseApSecModeQuery":
				wirelessStatusModel.parseApSecModeQuery();
				break;
			case "wirelessStatusModel.parseApEnabledQuery":
				wirelessStatusModel.parseApEnabledQuery();
				break;
			case "wirelessStatusModel.parseApStaListQuery":
				wirelessStatusModel.parseApStaListQuery();
				break;
			case "wirelessStatusModel.parseAPListQuery":
				wirelessStatusModel.parseAPListQuery();
				break;
			case "wirelessStatusModel.parseCapabilitiesQuery":
				wirelessStatusModel.parseCapabilitiesQuery();
				break;
			case "wirelessStatusModel.parseLanSettingsQuery":
				wirelessStatusModel.parseLanSettingsQuery();
				break;
			case "wirelessStatusModel.parseEnabledQuery":
				wirelessStatusModel.parseEnabledQuery();
				break;
			case "wirelessStatusModel.parseFreqQuery":
				wirelessStatusModel.parseFreqQuery();
				break;
			case "wirelessStatusModel.parseInstListQuery":
				wirelessStatusModel.parseInstListQuery();
				break;
			case "wirelessStatusModel.parseSSIDQuery":
				wirelessStatusModel.parseSSIDQuery();
				break;
			case "wirelessStatusModel.runApQuery":
				wirelessStatusModel.runApQuery();
				break;
			case "wirelessStatusModel.parseOpModeQuery":
				wirelessStatusModel.parseOpModeQuery();
				break;
		}
	},
	
	instances: [],
	
	parseApSecModeQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApSecModeQuery();
			}
		}
		catch(e)
		{
		}
	},
	
	parseApEnabledQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApEnabledQuery();
			}
		}
		catch(e)
		{
		}
	},
	
	parseApStaListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApStaListQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseAPListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseAPListQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
	},
	
	parseLanSettingsQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseLanSettingsQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseEnabledQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].parseEnabledQuery();
		}
	},
	
	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].parseFreqQuery();
		}
	},
	
	parseInstListQuery: function()
	{
		wirelessStatusModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessStatusModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessStatusModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},
	
	parseSSIDQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseSSIDQuery();
			}
		}
		catch(e)
		{
		}
	},
	
	parseOpModeQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].parseOpModeQuery();
		}
	},
	
	sendOpModeQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseOpModeQuery"});
	},
	
	sendApSecModeQuery: function()
	{
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApSecModeQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApSecModeQuery"});
	},
	
	sendApEnabledQuery: function()
	{
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApEnabledQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApEnabledQuery"});
	},
	
	sendApStaListQuery: function()
	{
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApStaListQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApStaListQuery"});
	},
	
	sendAPListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_ap"});
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseAPListQuery"});
	},
	
	sendCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseCapabilitiesQuery"});
	},
	
	sendLanSettingsQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendLanSettingsQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseLanSettingsQuery"});
	},
	
	sendEnabledQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].sendEnabledQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseEnabledQuery"});
	},
	
	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseFreqQuery"});
	},
	
	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseInstListQuery"});
	},
	
	sendSSIDQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendSSIDQuery();
			}
		}
		catch(e)
		{
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseSSIDQuery"});
	}
}
