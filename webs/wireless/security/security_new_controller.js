var wirelessSecurityController =
{
	documentReady: function()
	{
		wirelessSecurityView.documentReady();
		wirelessSecurityController.getWirelessInstances();
	},

	eventHandler: function(args)
	{
		var index = 0; //args.index || args.instance_index || wirelessMeshController.activeManagerIndex;
		if(args.index != undefined) index = args.index;
		switch(args.id)
		{
			case "checkSecurityMode":
				wirelessSecurityView.checkSecurityMode();
				break;
			case "wirelessSecurityController.getWirelessInstances":
				wirelessSecurityController.sendOpModeQuery();
				wirelessSecurityController.getCapabilities();
				break;
			case "wirelessSecurityController.getAPLists":
				wirelessSecurityController.getSSIDs();
				break;
			case "wirelessSecurityController.getCapabilities":
				wirelessSecurityController.getAPLists();
				break;
			case "wirelessSecurityController.getSecurityValues":
				wirelessSecurityController.allQueriesFinished();
				break;
			case "wirelessSecurityController.getSSIDs":
				wirelessSecurityController.getSecurityValues();
				break;
			case "saveClicked":
				wirelessSecurityController.save();
				break;
			case "saved":
				if(wirelessSecurityView.instances[index].requiresReboot) global.reboot();
				page.documentReady();
				break;
			case "setWEPRegex":
				wirelessSecurityView.setWEPRegex();
				break;
			case "parseRebootRequiredQuery":
				wirelessSecurityModel.instances[index].parseRebootRequiredQuery();
				break;
			case "reloadPage":
				page.documentReady();
				break;

		}
	},

	allQueriesFinished: function()
	{
		wirelessSecurityView.instances = wirelessSecurityModel.instances.slice();
		wirelessSecurityView.fillSSIDComboBox();
		wirelessSecurityView.fillElementsAccordingToSSID();

		globalView.addButtonClass();

		globalView.showPage();
	},

	getAPLists: function()
	{
		wirelessSecurityModel.sendAPListQuery();
		wirelessSecurityModel.sendWDSListQuery();
		globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "wirelessSecurityController.getAPLists"});
		globalModel.sendAjax();
	},

	getCapabilities: function()
	{
		wirelessSecurityModel.sendCapabilitiesQuery();
		globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "wirelessSecurityController.getCapabilities"});
		globalModel.sendAjax();
	},
	
	sendOpModeQuery: function(){
		wirelessSecurityModel.sendOpModeQuery();
	},

	getSecurityValues: function()
	{
		wirelessSecurityModel.sendSecurityValuesQuery();
		wirelessSecurityModel.sendWDSPropertiesQuery();
		wirelessSecurityModel.sendAirTouchQuery();
		wirelessSecurityModel.sendFreqQuery();
		wirelessSecurityModel.sendTxmodeQuery();
		globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "wirelessSecurityController.getSecurityValues"});
		globalModel.sendAjax();
	},

	getSSIDs: function()
	{
		wirelessSecurityModel.sendSSIDQuery();
		globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "wirelessSecurityController.getSSIDs"});
		globalModel.sendAjax();
	},

	getWirelessInstances: function()
	{
		wirelessSecurityModel.sendInstListQuery();
		globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "wirelessSecurityController.getWirelessInstances"});
		globalModel.sendAjax();
	},

	validationForAirTouch: function(obj)
	{
		var valid = true;
		var message = "";
		if(__DEF_WirelessWpsSupport == "1")
		{
			if(wirelessSecurityModel.instances[obj.instanceId].configSettings.airTouch == true)
			{
				var securityType = $('input[name="__V_encryption"]:checked').val();
				if(securityType == "wep")
				{
					valid = false;
					message = __ML_wireless_certification_validation_msg6;
				}
				else if(securityType == "wpa_both" && $("#__V_wpa_auth_type").val() != "personal")
				{
					message = __ML_wireless_certification_validation_msg7;
					valid = false;
				}
			}
		}
		if(!valid) alert(message);

		return valid;
	},

	loadPage: function(page)
	{
		window.location.href = page;
	},

	save: function()
	{
		if(globalController.validatePage()==true)
		{
			var optionValue = $('#__V_ssid').val();

			var obj = jQuery.parseJSON(optionValue);
			var instanceId = obj.instanceId;
			var apId = obj.apId;

			var newDataToSave = [];
			var selectedSecurityMode = $('input[name="__V_encryption"]:checked').val();

			if(selectedSecurityMode == "wpa_both")
				obj.selectedSecurityMode = $("#__V_wpa_encryption_type").val();
			else
				obj.selectedSecurityMode = selectedSecurityMode;

			var valid = globalWireless.isAllowedSecurityMode(obj);
			if(valid) valid = wirelessSecurityController.validationForAirTouch(obj);

			if(valid)
			{
				var instanceObj = wirelessSecurityModel.instances[instanceId].aps[apId];

				switch(selectedSecurityMode)
				{
					case "wep":
						instanceObj.setSecMode(selectedSecurityMode);
						instanceObj.setWepAuthType($('#__V_auth_mode').val());
						//instanceObj.setWepKeyType($('#__V_wep_key_type').val());
						instanceObj.setWepKeyIndex($('input[name="__V_wep_key_index"]:checked').val());
						instanceObj.setWepKey1($('#__V_wep_key1').val());
						instanceObj.setWepKey2($('#__V_wep_key2').val());
						instanceObj.setWepKey3($('#__V_wep_key3').val());
						instanceObj.setWepKey4($('#__V_wep_key4').val());

						break;
					case "wpa_both":
						var wpaEncryptionType = $('#__V_wpa_encryption_type').val();

						instanceObj.setSecMode(wpaEncryptionType);
						instanceObj.setWpaAuthType($('#__V_wpa_auth_type').val());
						instanceObj.setWpaRekeyInterval($('#__V_rekey_intval').val());
						instanceObj.setWpaRadiusEapReauthPeriod($('#__V_eap_reauth_period').val());

						if($('#__V_wpa_auth_type').val() == "personal")
						{
							instanceObj.setWpaPassword($('#__V_passphrase').val());
						}
						else
						{
							instanceObj.setWpaRadiusAddr($('#__V_server').val());
							instanceObj.setWpaRadiusPort($('#__V_port').val());
							instanceObj.setWpaRadiusKey($('#__V_secret').val());
						}

						if(wpaEncryptionType == "wpa2" || wpaEncryptionType == "wpa_both")
						{
							instanceObj.setWpa2RsnPreauth($('#__V_preauth').is(':checked') ? $('#__V_preauth').val() : "");
						}
						else if(wpaEncryptionType == "wpa" && wirelessSecurityModel.instances[instanceId].configSettings.airTouch == true)
						{
							if(confirm(__ML_wireless_WPS_warning_wpa_only))
							{
								wirelessSecurityModel.instances[instanceId].saveAirTouch(false);
							}
							else
							{
								return;
							}
						}

						break;
					case "off":
						instanceObj.setSecMode(selectedSecurityMode);
						break;
				}

				if(__DEF_WirelessWpsSupport == "1")
				{
					wirelessSecurityModel.instances[instanceId].setWpsConfigUuidUpdate("");
					wirelessSecurityModel.instances[instanceId].setWpsRole("registrar");
				}

				globalView.disablePage();

				wirelessSecurityModel.instances[instanceId].sendApply();

				globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "parseRebootRequiredQuery", index: instanceId});
				globalModel.addEvent({eventHandler: "wirelessSecurityController", id: "saved"});
				globalModel.sendAjax();
			}
		}
	}
}