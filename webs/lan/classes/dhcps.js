var dhcps = function(instance)
{
	this.instance = instance || "";
	this.leases = [];

	this.parseLeaseListQuery = function()
	{
		var index = 0;
		while(top.xmlResponseObject[this.instance]["lease<index>.mac".replace("<index>", index)])
		{
			var leaseMacKey = "lease<index>.mac".replace("<index>", index);
			var leaseNameKey = "lease<index>.name".replace("<index>", index);

			var tempObject = {};
			tempObject.mac = top.xmlResponseObject[this.instance][leaseMacKey].toUpperCase();
			tempObject.name = top.xmlResponseObject[this.instance][leaseNameKey];

			this.leases.push(tempObject);
			index++;
		}
	},

	this.sendLeaseListQuery = function()
	{
		globalModel.addQuery({instance: this.instance, key: "lease"});
	};

	this.getStationName = function(macAddr)
	{
		var stationName = "";
		for(var i=0; i<this.leases.length; i++)
		{
			if((this.leases[i].mac) == macAddr)
			{
				stationName = this.leases[i].name;
				break;
			}
		}

		return stationName;
	};
};

var dhcpsModel =
{
	dhcps_list: [],

	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "dhcpsModel.parseDhcpsListQuery":
				dhcpsModel.parseDhcpsListQuery();
				break;
			case "dhcpsModel.parseDhcpsPropertiesQuery":
				dhcpsModel.parseDhcpsPropertiesQuery();
				break;
		}
	},

	getStationName: function(macAddr)
	{
		var stationName = "";
		if(dhcpsModel.dhcps_list[0])
			stationName = dhcpsModel.dhcps_list[0].getStationName(macAddr);
		return stationName;
	},

	parseDhcpsListQuery: function()
	{
		try
		{
			var i = 0;
			while(top.xmlResponseObject["devmgr-0"]["dhcps.inst" + i])
			{
				dhcpsModel.dhcps_list.push(new dhcps(top.xmlResponseObject["devmgr-0"]["dhcps.inst" + i]));
				i++;
			}
		}
		catch(e)
		{
		}
	},

	parseDhcpsPropertiesQuery: function()
	{
		try
		{
			for(var i = 0; i < dhcpsModel.dhcps_list.length; i++)
			{
				dhcpsModel.dhcps_list[i].parseLeaseListQuery();
			}
		}
		catch(e)
		{
		}
	},

	sendDhcpsListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "dhcps"});
		globalModel.addEvent({eventHandler: "dhcpsModel", id: "dhcpsModel.parseDhcpsListQuery"});
	},

	sendDhcpsPropertiesQuery: function()
	{
		try
		{
			for(var i = 0; i < dhcpsModel.dhcps_list.length; i++)
			{
				dhcpsModel.dhcps_list[i].sendLeaseListQuery();
			}
		}
		catch(e)
		{
		}

		globalModel.addEvent({eventHandler: "dhcpsModel", id: "dhcpsModel.parseDhcpsPropertiesQuery"});
	}
};
