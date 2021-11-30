var wirelessNgAP = function(instance, apPrefix)
{
	this.instance = instance || "";
	this.apPrefix = apPrefix + "_" || "";
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

	this.sendGet = function(commandKey)
	{
		globalModel.addGet({instance: this.instance, key: this.apPrefix + commandKey});
	};

	this.parseResponse = function(commandKey)
	{
		return top.xmlResponseObject[this.instance][this.apPrefix + commandKey];
	};

	this.setValue = function(commandKey, value)
	{
		globalModel.addSet({instance: this.instance, key: this.apPrefix + commandKey, value: value});
	};

	this.parseSSID = function()
	{
		this.ssid = this.parseResponse("ssid");
		this.ssid_serialized = this.ssid.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};

	this.parseStaListQuery= function()
	{
		if(this.enabled == true)
		{
			var index = 0;
			while(top.xmlResponseObject[this.instance]["STA<index>.mac".replace("<index>", index)])
			{
				var staMacKey = "STA<index>.mac".replace("<index>", index);
				var staRateKey = "STA<index>.rate".replace("<index>", index);
				var staRssiKey = "STA<index>.rssi".replace("<index>", index);

				var tempObject = {};
				tempObject.sta_mac = top.xmlResponseObject[this.instance][staMacKey];
				tempObject.rate = top.xmlResponseObject[this.instance][staRateKey];
				tempObject.rssi = top.xmlResponseObject[this.instance][staRssiKey];

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
		this.ssid_hidden = this.parseResponse("hiddenssid") == "1";
	};

	this.parseEnabled = function()
	{
		this.enabled = this.parseResponse("enabled") == "1";
	};

	this.parseIsolation = function()
	{
		this.isolation = this.parseResponse("isolation") == "1";
	};

	this.parseRate = function()
	{
		this.rate = this.parseResponse("txrate");
	};

	this.parseWpaAuthType = function()
	{
		this.wpa_auth_type = this.parseResponse("wpa_authtype");
	};

	this.parseSecMode = function()
	{
		this.sec_mode = this.parseResponse("security_mode");
	};

	this.parseWepAuthType = function()
	{
		this.wep_auth_type = this.parseResponse("wep_authtype");
	};

	this.parseWepKeyType = function()
	{
		this.wep_key_type = this.parseResponse("wep_keytype");
	};

	this.parseWepKeyIndex = function()
	{
		this.wep_key_index = this.parseResponse("wep_keyindex");
		this.wep_key_index_for_functions = parseInt(this.wep_key_index) + 1;
	};

	this.parseWepKey1 = function()
	{
		this.wep_key1 = this.parseResponse("wep_key0");
	};

	this.parseWepKey2 = function()
	{
		this.wep_key2 = this.parseResponse("wep_key1");
	};

	this.parseWepKey3 = function()
	{
		this.wep_key3 = this.parseResponse("wep_key2");
	};

	this.parseWepKey4 = function()
	{
		this.wep_key4 = this.parseResponse("wep_key3");
	};

	this.parseWpaRekeyInterval = function()
	{
		this.wpa_rekey_interval = this.parseResponse("wpa_rekeyinterval");
	};

	this.parseWpaRadiusAddr = function()
	{
		this.wpa_radius_addr = this.parseResponse("wpa_radius_addr");
	};

	this.parseWpaRadiusPort = function()
	{
		this.wpa_radius_port = this.parseResponse("wpa_radius_port");
	};

	this.parseWpaRadiusKey = function()
	{
		this.wpa_radius_key = this.parseResponse("wpa_radius_key");
	};

	this.parseWpaRadiusEapReauthPeriod = function()
	{
		this.wpa_radius_eap_reauth_period = this.parseResponse("wpa_radius_reauthperiod");
	};

	this.parseWpa2RsnPreauth = function()
	{
		this.wpa2_rsn_preauth = this.parseResponse("rsnpreauth");
	};

	this.parseWpaPassword = function()
	{
		this.wpa_password = this.parseResponse("wpa_password");
	};

	this.sendSSID = function()
	{
		this.sendGet("ssid");
	};

	this.sendStaListQuery = function(value)
	{
		value = value || 0;
		globalModel.addQuery({instance: this.instance, key: this.apPrefix + "sta_list", value: value});
	};

	this.sendSsidHidden = function()
	{
		this.sendGet("hiddenssid");
	};

	this.sendEnabled = function()
	{
		this.sendGet("enabled");
	};

	this.sendIsolation = function()
	{
		this.sendGet("isolation");
	};

	this.sendRate = function()
	{
		this.sendGet("txrate");
	};

	this.sendWpaAuthType = function()
	{
		this.sendGet("wpa_authtype");
	};

	this.sendSecMode = function()
	{
		this.sendGet("security_mode");
	};

	this.sendWepAuthType = function()
	{
		this.sendGet("wep_authtype");
	};

	this.sendWepKeyType = function()
	{
		this.sendGet("wep_keytype");
	};

	this.sendWepKeyIndex = function()
	{
		this.sendGet("wep_keyindex");
	};

	this.sendWepKey1 = function()
	{
		this.sendGet("wep_key0");
	};

	this.sendWepKey2 = function()
	{
		this.sendGet("wep_key1");
	};

	this.sendWepKey3 = function()
	{
		this.sendGet("wep_key2");
	};

	this.sendWepKey4 = function()
	{
		this.sendGet("wep_key3");
	};

	this.sendWpaRekeyInterval = function()
	{
		this.sendGet("wpa_rekeyinterval");
	};

	this.sendWpaRadiusAddr = function()
	{
		this.sendGet("wpa_radius_addr");
	};

	this.sendWpaRadiusPort = function()
	{
		this.sendGet("wpa_radius_port");
	};

	this.sendWpaRadiusKey = function()
	{
		this.sendGet("wpa_radius_key");
	};

	this.sendWpaRadiusEapReauthPeriod = function()
	{
		this.sendGet("wpa_radius_reauthperiod");
	};

	this.sendWpa2RsnPreauth = function()
	{
		this.sendGet("rsnpreauth");
	};

	this.sendWpaPassword = function()
	{
		this.sendGet("wpa_password");
	};

	this.setSsid = function(value)
	{
		this.setValue("ssid", value);
	};

	this.setSsidHidden = function(value)
	{
		this.setValue("hiddenssid", value ? "1" : "0");
	};

	this.setEnabled = function(value)
	{
		this.setValue("enabled", value ? "1" : "0");
	};

	this.setIsolation = function(value)
	{
		this.setValue("isolation", value ? "1" : "0");
	};

	this.setRate = function(value)
	{
		this.setValue("txrate", value);
	};

	this.setSecMode = function(value)
	{
		this.setValue("security_mode", value);
	};

	this.setWepAuthType = function(value)
	{
		this.setValue("wep_authtype", value);
	};

	this.setWepKeyType = function(value)
	{
		this.setValue("wep_keytype", value);
	};

	this.setWepKeyIndex = function(value)
	{
		value = parseInt(value) - 1;
		this.setValue("wep_keyindex", value);
	};

	this.setWepKey1 = function(value)
	{
		this.setValue("wep_key0", value);
	};

	this.setWepKey2 = function(value)
	{
		this.setValue("wep_key1", value);
	};

	this.setWepKey3 = function(value)
	{
		this.setValue("wep_key2", value);
	};

	this.setWepKey4 = function(value)
	{
		this.setValue("wep_key3", value);
	};

	this.setWpaAuthType = function(value)
	{
		this.setValue("wpa_authtype", value);
	};

	this.setWpaRekeyInterval = function(value)
	{
		this.setValue("wpa_rekeyinterval", value);
	};

	this.setWpaRadiusEapReauthPeriod = function(value)
	{
		this.setValue("wpa_radius_reauthperiod", value);
	};

	this.setWpaPassword = function(value)
	{
		this.setValue("wpa_password", value);
	};

	this.setWpaRadiusAddr = function(value)
	{
		this.setValue("wpa_radius_addr", value);
	};

	this.setWpaRadiusPort = function(value)
	{
		this.setValue("wpa_radius_port", value);
	};

	this.setWpaRadiusKey = function(value)
	{
		this.setValue("wpa_radius_key", value);
	};

	this.setWpa2RsnPreauth = function(value)
	{
		this.setValue("rsnpreauth", value);
	};

}