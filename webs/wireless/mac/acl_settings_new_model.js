var wirelessMacModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessMacModel.parseApAclListQuery":
				wirelessMacModel.parseApAclListQuery();
				break;
			case "wirelessMacModel.parseApAclModeQuery":
				wirelessMacModel.parseApAclModeQuery();
				break;
			case "wirelessMacModel.parseApEnabledQuery":
				wirelessMacModel.parseApEnabledQuery();
				break;
			case "wirelessMacModel.parseAPListQuery":
				wirelessMacModel.parseAPListQuery();
				break;
			case "wirelessMacModel.parseApStaListQuery":
				wirelessMacModel.parseApStaListQuery();
				break;
			case "wirelessMacModel.parseCapabilitiesQuery":
				wirelessMacModel.parseCapabilitiesQuery();
				break;
			case "wirelessMacModel.parseFreqQuery":
				wirelessMacModel.parseFreqQuery();
				break;
			case "wirelessMacModel.parseInstListQuery":
				wirelessMacModel.parseInstListQuery();
				break;
			case "wirelessMacModel.parseOpModeQuery":
				wirelessMacModel.parseOpModeQuery();
				break;
			case "wirelessMacModel.parseAirTouchQuery":
				wirelessMacModel.parseAirTouchQuery();
				break;
		}
	},

	instances: [],

	parseApAclListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseApAclListQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseApAclModeQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseApAclModeQuery();
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
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseApEnabledQuery();
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
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseApStaListQuery();
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
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseAPListQuery();
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
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].parseFreqQuery();
		}
	},
	
	parseOpModeQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].parseOpModeQuery();
		}
	},

	parseAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].parseAirTouchQuery();
		}
	},

	parseInstListQuery: function()
	{
		wirelessMacModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessMacModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessMacModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},
	
	sendOpModeQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseOpModeQuery"});
	},
	
	sendAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseAirTouchQuery"});
	},

	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseInstListQuery"});
	},

	sendApAclListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].sendApAclListQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseApAclListQuery"});
	},

	sendApAclModeQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].sendApAclModeQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseApAclModeQuery"});
	},

	sendApEnabledQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].sendApEnabledQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseApEnabledQuery"});
	},

	sendApStaListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].sendApStaListQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseApStaListQuery"});
	},

	sendAPListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_ap"});
		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseAPListQuery"});
	},

	sendCapabilitiesQuery: function()
	{

		try
		{
			for(var i = 0; i < wirelessMacModel.instances.length; i++)
			{
				wirelessMacModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseCapabilitiesQuery"});
	},
	
	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessMacModel.instances.length; i++)
		{
			wirelessMacModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessMacModel", id: "wirelessMacModel.parseFreqQuery"});
	},

}
