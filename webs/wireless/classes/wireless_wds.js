var wirelessWds = function(instance)
{
	this.instance = instance || "";
	this.enabled = "";
	this.mac = "";
	this.removed = false;

	this.sendEnabled = function()
	{
		globalModel.addGet({instance: this.instance, key: "enabled"});
	};

	this.sendMac = function()
	{
		globalModel.addGet({instance: this.instance, key: "mac"});
	};

	this.parseEnabled = function()
	{
		this.enabled = top.xmlResponseObject[this.instance]["enabled"] == "1";
	};

	this.parseMac = function()
	{
		this.mac = top.xmlResponseObject[this.instance]["mac"].toUpperCase();
	};
};
