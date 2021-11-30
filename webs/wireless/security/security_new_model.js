var wirelessSecurityModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessSecurityModel.parseAirTouchQuery":
				wirelessSecurityModel.parseAirTouchQuery();
				break;
			case "wirelessSecurityModel.parseAPListQuery":
				wirelessSecurityModel.parseAPListQuery();
				break;
			case "wirelessSecurityModel.parseCapabilitiesQuery":
				wirelessSecurityModel.parseCapabilitiesQuery();
				break;
			case "wirelessSecurityModel.parseFreqQuery":
				wirelessSecurityModel.parseFreqQuery();
				break;
			case "wirelessSecurityModel.parseInstListQuery":
				wirelessSecurityModel.parseInstListQuery();
				break;
			case "wirelessSecurityModel.parseSecurityValuesQuery":
				wirelessSecurityModel.parseSecurityValuesQuery();
				break;
			case "wirelessSecurityModel.parseSSIDQuery":
				wirelessSecurityModel.parseSSIDQuery();
				break;
			case "wirelessSecurityModel.parseTxmodeQuery":
				wirelessSecurityModel.parseTxmodeQuery();
				break;
			case "wirelessSecurityModel.parseWDSListQuery":
				wirelessSecurityModel.parseWDSListQuery();
				break;
			case "wirelessSecurityModel.parseWDSPropertiesQuery":
				wirelessSecurityModel.parseWDSPropertiesQuery();
				break;
			case "wirelessSecurityModel.parseOpModeQuery":
				wirelessSecurityModel.parseOpModeQuery();
				break;
		}
	},

	instances: [],

	parseAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].parseAirTouchQuery();
		}
	},

	parseAPListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseAPListQuery();
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
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].parseFreqQuery();
		}
	},

	parseInstListQuery: function()
	{
		wirelessSecurityModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessSecurityModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessSecurityModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},

	parseSecurityValuesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseSecurityValuesQuery();
			}
		}
		catch(e)
		{
		}
	},
	parseOpModeQuery: function(){
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].parseOpModeQuery();
		}
	},

	parseSSIDQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseSSIDQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseTxmodeQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].parseTxmodeQuery();
		}
	},

	parseWDSListQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseWDSListQuery();
			}
		}
		catch(e)
		{
		}
	},

	parseWDSPropertiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].parseWDSPropertiesQuery();
			}
		}
		catch(e)
		{
		}
	},

	sendAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseAirTouchQuery"});
	},

	sendAPListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_ap"});
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseAPListQuery"});
	},

	sendCapabilitiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseCapabilitiesQuery"});
	},

	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseFreqQuery"});
	},

	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseInstListQuery"});
	},

	sendSecurityValuesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].sendSecurityValuesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseSecurityValuesQuery"});
	},
	
	sendOpModeQuery: function(){
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].sendOpModeQuery();
		}
		
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseOpModeQuery"});
	},

	sendSSIDQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].sendSSIDQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseSSIDQuery"});
	},

	sendTxmodeQuery: function()
	{
		for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
		{
			wirelessSecurityModel.instances[i].sendTxmodeQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseTxmodeQuery"});
	},

	sendWDSListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_wds"});
		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseWDSListQuery"});
	},

	sendWDSPropertiesQuery: function()
	{
		try
		{
			for(var i = 0; i < wirelessSecurityModel.instances.length; i++)
			{
				wirelessSecurityModel.instances[i].sendWDSPropertiesQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "wirelessSecurityModel", id: "wirelessSecurityModel.parseWDSPropertiesQuery"});
	},

	setQuery: function(args)
	{
		try
		{
			wirelessSecurityModel.instances[args.instanceId].setQuery(args.newDataToSave);
		}
		catch(e)
		{
		}
	}
};
