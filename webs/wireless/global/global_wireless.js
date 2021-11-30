var globalWireless =
{
		customValidations: function()
		{
			$.regula('custom', {
				   name: "MacValidation",
				   defaultMessage: globalView.getMultiLanguageText('__ML_invalid_mac_address'),
				   validator: function() {
						var returnValue = true;
						var macAddr = this.value.toUpperCase();
						var macBegin = macAddr.substring(0, (macAddr.length-15));
						if (macAddr == "FF:FF:FF:FF:FF:FF")
						{
							returnValue = false;
						}
						else if (macAddr == "00:00:00:00:00:00")
						{
							returnValue = false;
						}
						else if (macBegin == "01")
						{
							returnValue = false;
						}
						return returnValue;
				   }
			});
		},

		customWpsPinValidation: function()
		{
			$.regula('custom', {
				   name: "WpsPinValidation",
				   defaultMessage: globalView.getMultiLanguageText('__ML_wireless_WPS_pin_validation_message'),
				   validator: function() {
						var returnValue = true;
						var regex = new RegExp("^[0-9]+$");
						var pinNumber = this.value;
						if(pinNumber.length != 4 && pinNumber.length != 8 && pinNumber.length != 9)
						{
							returnValue = false;
						}
						else if(pinNumber.length == 9)
						{
							var start = pinNumber.substring(0,4);
							var end = pinNumber.substring(5,9);
							if((pinNumber.charAt(4) != "-" && pinNumber.charAt(4) != " ") || !regex.test(start) || !regex.test(end))
								returnValue = false;
							else
								pinNumber = start.concat(end);
						}

						if(!regex.test(pinNumber))
							returnValue = false;

						if(returnValue && pinNumber.length == 8)
						{
							var accum = 0;
							var PIN = parseInt(pinNumber, 10);
							accum += 3 * (parseInt(PIN / 10000000) % 10);
							accum += 1 * (parseInt(PIN / 1000000) % 10);
							accum += 3 * (parseInt(PIN / 100000) % 10);
							accum += 1 * (parseInt(PIN / 10000) % 10);
							accum += 3 * (parseInt(PIN / 1000) % 10);
							accum += 1 * (parseInt(PIN / 100) % 10);
							accum += 3 * (parseInt(PIN / 10) % 10);
							accum += 1 * (parseInt(PIN / 1) % 10);
							returnValue = (0 == (accum % 10));
						}

						return returnValue;
				   }
			});
		},

		isAllowedSecurityMode: function(args)
		{
			var instanceId = args.instanceId;
			var selectedSecurityMode = args.selectedSecurityMode;

			var selectedMode = wirelessSecurityModel.instances[instanceId].configSettings.txmode;
			var selectedFreq = wirelessSecurityModel.instances[instanceId].configSettings.freq;
			var allowedSecurityModes = wirelessSecurityModel.instances[instanceId].freqs[selectedFreq].modes[selectedMode].securityModes;

			var selected_freq_name = wirelessSecurityModel.instances[instanceId].freqs[selectedFreq].text;
			var selected_mode_name = wirelessSecurityModel.instances[instanceId].freqs[selectedFreq].modes[selectedMode].text;
			var security_mode_names = {"off": __ML_wireless_security_mode_no_encryption, "wpa_both": __ML_both, "wpa": "WPA", "wpa2": "WPA2", "wep": "WEP"};

			var allowed = false;

			for(var j = 0; j < allowedSecurityModes.length; j++)
			{
				if(allowedSecurityModes[j] == selectedSecurityMode)
				{
					allowed = true;
				}
			}
			if(!allowed)
			{
				alert(__ML_wireless_certification_validation_mode_security_msg.replace("@mode@", selected_mode_name).replace("@security@", security_mode_names[selectedSecurityMode]));
				return false;
			}
			return true;
	    },

		isWpa: function (sec_mode)
		{
			sec_mode = sec_mode.toLowerCase();
			if(sec_mode == "wpa" || sec_mode == "wpa2" || sec_mode == "wpa_both" || sec_mode == "wpa_aes" || sec_mode == "wpa2_tkip")
			{
				return true;
			}
			else
			{
				return false;
			}
		},

		securityType: function(security)
		{
			try
			{
				var security_type;
				if (security == "off")
				{
					return security_type = __ML_wireless_security_mode_no_encryption;
				}
				else if (security == "wep" || security == "WEP")
				{
					return security_type = "WEP";
				}
				else if (security == "wpa" || security == "WPA")
				{
					return security_type = "WPA";
				}
				else if (security == "wpa_both" || security == "WPA_BOTH")
				{
					return security_type = "WPA/WPA2";
				}
				else if (security == "wpa2" || security == "WPA2")
				{
					return security_type = "WPA2";
				}
				else
				{
					return security_type = "";
				}
			}
			catch(ex)
			{
				alert(ex);
			}
		},

		reboot: function(instance)
		{
			if(!instance) return;
			
			if(instance.manageReboot)
			{
				global.reboot();
			}else
			{
				global.waitReboot(__DEF_wireless_reboot_delay_time);
			}
		},

		rssiStatus: function(rssi)
		{
		    var signalLevel;
		    var signalLevelDisplay;
			//rssi = rssi || 0;
			try
			{
		       if (rssi >= -50)
		       {
		           signalLevel = 5;
		       }
		       else if (rssi <= -51 && rssi >= -60)
		       {
		           signalLevel = 4;
		       }
		       else if (rssi <= -61 && rssi >= -65)
		       {
		           signalLevel = 3;
		       }
		       else if (rssi <= -66 && rssi >= -75)
		       {
		           signalLevel = 2;
		       }
		       else if (rssi <= -76)
		       {
		           signalLevel = 1;
		       }
			}
			catch(ex)
			{
				signalLevel = 5;
			}

			if (typeof signalLevel === "undefined") 
				signalLevelDisplay = "";
			else
				signalLevelDisplay = "<img src='/images/level" + signalLevel + ".png' border='0' />";

			return signalLevelDisplay;
		},
		rssiStatusMessage: function(rssi) {
			var message = __ML_wireless_location_of_the_device_is_good;
			if (rssi == undefined) {
				message = "";
			} else if (rssi < -65) {
				message = __ML_wireless_location_of_the_device_is_bad;
			}
	
			return message;
		},
		
		rssiStatusColor: function(rssi) {
			var color = "#49B749";
			if (rssi == undefined) {
				color = "";
			} else if (rssi < -65) {
				color = "#ED1C24";
			}
	
			return color;
		},

		rssiIsGood : function(rssi) {
			var isGood = true;
			if (rssi == undefined) {
				isGood = true;
			} else if (rssi < -65) {
				isGood = false;
			}
	
			return isGood;
		},

		rssiStatusUsingPercentage: function(rssi)
		{
		    var signalLevel;
		    var signalLevelDisplay;

		    if(__DEF_WirelessDisplayRssiPercentage == 1)
		    {
		    	signalLevelDisplay = globalView.getMultiLanguageText("__ML_wireless_signal_level")+": "+rssi+"%";
		    }
		    else
		    {
		    	rssi = rssi || 100;

		    	if(rssi >= 51)
		    		signalLevel = 5;
		    	else if(rssi >= 34 && rssi <= 50)
		    		signalLevel = 4;
		    	else if(rssi >= 26 && rssi <= 33)
		    		signalLevel = 3;
		    	else if(rssi >= 9 && rssi <= 25)
		    		signalLevel = 2;
		    	else if(rssi >= 0 && rssi <= 8)
		    		signalLevel = 1;

		    	signalLevelDisplay = "<img src='/images/level" + signalLevel + ".png' border='0' />";
		    }

		    return signalLevelDisplay;
		}
}
