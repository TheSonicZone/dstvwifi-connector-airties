var wirelessCoreAP = function(instance)
{
	this.instance = instance || "";
	this.ssid = "";
	this.stations = [];
	this.wpa_auth_type = "";
	this.sec_mode = "";
	this.wep_auth_type = "";
	this.wep_key_type = "";
	this.wep_key_index = "";
	this.wep_key_index_for_functions = "";
	this.wep_key1 = "";
	this.wep_key2 = "";
	this.wep_key3 = "";
	this.wep_key4 = "";
	this.wpa_rekey_interval = "";
	this.wpa_radius_addr = "";
	this.wpa_radius_port = "";
	this.wpa_radius_key = "";
	this.wpa_radius_eap_reauth_period = "";
	this.wpa2_rsn_preauth = "";
	this.wpa_password = "";
	this.ssid_hidden = "";
	this.enabled = "";
	this.isolation = "";
	this.rate = "";
	this.acl_mode = "";
	this.acl_list = [];

	this.parseAclList = function()
	{
		var index = 1;
		while(top.xmlResponseObject[this.instance]["station<index>.acl_mac".replace("<index>", index)])
		{
			var staAclMacKey = "station<index>.acl_mac".replace("<index>", index);

			this.acl_list.push({"acl_mac":top.xmlResponseObject[this.instance][staAclMacKey]});
			index++;
		}
	};

	this.parseAclMode = function()
	{
		var temp = top.xmlResponseObject[this.instance]["acl_mode"];
		if(temp == 0) this.acl_mode = "off";
		else if(temp == 1) this.acl_mode = "allow";
		else if(temp == 2) this.acl_mode = "block";
	};

	this.parseSSID = function()
	{
		this.ssid = top.xmlResponseObject[this.instance]["ssid"];
		this.ssid_serialized = this.ssid.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};

	this.parseStaListQuery = function(index)
	{
		var index = index || 1;
		if(this.enabled == true)
		{
			while(top.xmlResponseObject[this.instance]["station<index>.sta_mac".replace("<index>", index)])
			{
				var staMacKey = "station<index>.sta_mac".replace("<index>", index);
				var staRateKey = "station<index>.rate".replace("<index>", index);
				//var staRssiKey = "station<index>.rssi".replace("<index>", index);
				var staStrengthKey = "station<index>.strength".replace("<index>", index);

				var tempObject = {};
				tempObject.sta_mac = top.xmlResponseObject[this.instance][staMacKey];
				tempObject.rate = top.xmlResponseObject[this.instance][staRateKey];
				//tempObject.rssi = top.xmlResponseObject[this.instance][staRssiKey];
				tempObject.rssi = top.xmlResponseObject[this.instance][staStrengthKey];

				this.stations.push(tempObject);
				index++;
			}

			var staRequery = top.xmlResponseObject[this.instance]["sta_requery"] == "1";

			if(staRequery == true)
			{
				this.sendStaListQuery(stations.length);
				globalModel.sendAjax();
				this.parseStaListQuery(stations.length);
			}
		}
	};

	this.parseSsidHidden = function()
	{
		this.ssid_hidden = top.xmlResponseObject[this.instance]["ssid_hidden"] == "1";
	};

	this.parseEnabled = function()
	{
		this.enabled = top.xmlResponseObject[this.instance]["enabled"] == "1";
	};

	this.parseIsolation = function()
	{
		this.isolation = top.xmlResponseObject[this.instance]["isolation"] == "1";
	};

	this.parseRate = function()
	{
		this.rate = top.xmlResponseObject[this.instance]["tx_rate"];
	};

	this.parseWpaAuthType = function()
	{
		this.wpa_auth_type = top.xmlResponseObject[this.instance]["wpa_auth_type"] == "0" ? "personal" : "enterprise";
	};

	this.parseSecMode = function()
	{
		this.sec_mode = top.xmlResponseObject[this.instance]["sec_mode"];
	};

	this.parseWepAuthType = function()
	{
		this.wep_auth_type = top.xmlResponseObject[this.instance]["wep_auth_type"];
	};

	this.parseWepKeyType = function()
	{
		this.wep_key_type = top.xmlResponseObject[this.instance]["wep_key_type"];
	};

	this.parseWepKeyIndex = function()
	{
		this.wep_key_index = top.xmlResponseObject[this.instance]["wep_key_index"];
		this.wep_key_index_for_functions = this.wep_key_index;
	};

	this.parseWepKey1 = function()
	{
		this.wep_key1 = top.xmlResponseObject[this.instance]["wep_key1"];
	};

	this.parseWepKey2 = function()
	{
		this.wep_key2 = top.xmlResponseObject[this.instance]["wep_key2"];
	};

	this.parseWepKey3 = function()
	{
		this.wep_key3 = top.xmlResponseObject[this.instance]["wep_key3"];
	};

	this.parseWepKey4 = function()
	{
		this.wep_key4 = top.xmlResponseObject[this.instance]["wep_key4"];
	};

	this.parseWpaRekeyInterval = function()
	{
		this.wpa_rekey_interval = top.xmlResponseObject[this.instance]["wpa_rekey_interval"];
	};

	this.parseWpaRadiusAddr = function()
	{
		this.wpa_radius_addr = top.xmlResponseObject[this.instance]["wpa_radius_addr"];
	};

	this.parseWpaRadiusPort = function()
	{
		this.wpa_radius_port = top.xmlResponseObject[this.instance]["wpa_radius_port"];
	};

	this.parseWpaRadiusKey = function()
	{
		this.wpa_radius_key = top.xmlResponseObject[this.instance]["wpa_radius_key"];
	};

	this.parseWpaRadiusEapReauthPeriod = function()
	{
		this.wpa_radius_eap_reauth_period = top.xmlResponseObject[this.instance]["wpa_radius_eap_reauth_period"];
	};

	this.parseWpa2RsnPreauth = function()
	{
		this.wpa2_rsn_preauth = top.xmlResponseObject[this.instance]["wpa2_rsn_preauth"];
	};

	this.parseWpaPassword = function()
	{
		this.wpa_password = top.xmlResponseObject[this.instance]["wpa_password"];
	};
	this.sendAclList = function()
	{
		globalModel.addGet({instance: this.instance, key: "acl_list"});
	};

	this.sendAclMode = function()
	{
		globalModel.addGet({instance: this.instance, key: "acl_mode"});
	};
	this.sendSSID = function()
	{
		globalModel.addGet({instance: this.instance, key: "ssid"});
	};

	this.sendStaListQuery= function(value)
	{
		var counterValue = value || 0;
		globalModel.addQuery({instance: this.instance, key: "sta_list", value: counterValue});
	};

	this.sendSsidHidden = function()
	{
		globalModel.addGet({instance: this.instance, key: "ssid_hidden"});
	};

	this.sendEnabled = function()
	{
		globalModel.addGet({instance: this.instance, key: "enabled"});
	};

	this.sendIsolation = function()
	{
		globalModel.addGet({instance: this.instance, key: "isolation"});
	};

	this.sendRate = function()
	{
		globalModel.addGet({instance: this.instance, key: "tx_rate"});
	};

	this.sendWpaAuthType = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_auth_type"});
	};

	this.sendSecMode = function()
	{
		globalModel.addGet({instance: this.instance, key: "sec_mode"});
	};

	this.sendWepAuthType = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_auth_type"});
	};

	this.sendWepKeyType = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key_type"});
	};

	this.sendWepKeyIndex = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key_index"});
	};

	this.sendWepKey1 = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key1"});
	};

	this.sendWepKey2 = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key2"});
	};

	this.sendWepKey3 = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key3"});
	};

	this.sendWepKey4 = function()
	{
		globalModel.addGet({instance: this.instance, key: "wep_key4"});
	};

	this.sendWpaRekeyInterval = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_rekey_interval"});
	};

	this.sendWpaRadiusAddr = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_radius_addr"});
	};

	this.sendWpaRadiusPort = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_radius_port"});
	};

	this.sendWpaRadiusKey = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_radius_key"});
	};

	this.sendWpaRadiusEapReauthPeriod = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_radius_eap_reauth_period"});
	};

	this.sendWpa2RsnPreauth = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa2_rsn_preauth"});
	};

	this.sendWpaPassword = function()
	{
		globalModel.addGet({instance: this.instance, key: "wpa_password"});
	};

	this.setAclAdd = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "acl_add", value: value});
	};

	this.setAclDelete = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "acl_delete", value: value});
	};

	this.setAclMode = function(value)
	{
		if(value == "off") value = 0;
		else if(value == "allow") value = 1;
		else if(value == "block") value = 2;
		globalModel.addSet({instance: this.instance, key: "acl_mode", value: value});
	};

	this.setSecMode = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "sec_mode", value: value});
	};

	this.setSsid = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "ssid", value: value});
	};

	this.setSsidHidden = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "ssid_hidden", value: value ? "1" : "0"});
	};

	this.setEnabled = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "enabled", value: value ? "1" : "0"});
	};

	this.setIsolation = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "isolation", value: value ? "1" : "0"});
	};

	this.setRate = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "tx_rate", value: value});
	};

	this.setWepAuthType = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_auth_type", value: value});
	};

	this.setWepKeyType = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key_type", value: value});
	};

	this.setWepKeyIndex = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key_index", value: value});
	};

	this.setWepKey1 = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key1", value: value});
	};

	this.setWepKey2 = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key2", value: value});
	};

	this.setWepKey3 = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key3", value: value});
	};

	this.setWepKey4 = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wep_key4", value: value});
	};

	this.setWpaAuthType = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_auth_type", value: value == "personal" ? "0" : "1"});
	};

	this.setWpaRekeyInterval = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_rekey_interval", value: value});
	};

	this.setWpaRadiusEapReauthPeriod = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_radius_eap_reauth_period", value: value});
	};

	this.setWpaPassword = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_password", value: value});
	};

	this.setWpaRadiusAddr = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_radius_addr", value: value});
	};

	this.setWpaRadiusPort = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_radius_port", value: value});
	};

	this.setWpaRadiusKey = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa_radius_key", value: value});
	};

	this.setWpa2RsnPreauth = function(value)
	{
		globalModel.addSet({instance: this.instance, key: "wpa2_rsn_preauth", value: value});
	};

}