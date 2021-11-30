var wirelessSecurityView =
{
	currentInstanceId: 0,
	currentApId: 0,
	documentReady: function()
	{
		$("#contentDiv").html("");
		wirelessSecurityView.addHedaerDiv();
		wirelessSecurityView.addCommentDiv();
		wirelessSecurityView.addPageValidations();
	},

	addHedaerDiv: function()
	{
		$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
		$("#headerDiv").append("<span id='__ML_wireless_security_header' ml='__ML_wireless_security_header'></span>");
	},

	addCommentDiv: function()
	{

		$("#contentDiv").append("<div id='securityDiv'></div>");
		$("#securityDiv").html("");


		$("#securityDiv").append(wirelessSecurityView.createSecurityTypeDiv());
		$("#securityDiv").append(wirelessSecurityView.createNoEncryptionDiv());
		$("#securityDiv").append(wirelessSecurityView.createWepSettingsDiv());
		$("#securityDiv").append(wirelessSecurityView.createWPASettingsDiv());

		$("#securityDiv").append("<div id='wpaMeshWarningDiv' style='display:none;'");
		$("#wpaMeshWarningDiv").append("<span id='__ML_security_wpa_mesh_warning' ml='__ML_security_wpa_mesh_warning'></span><br/><br/>");
		$("#securityDiv").append('<div class="footer" id="buttonContainer">');
		$("#buttonContainer").append('<input type="button" value="Save" name="SaveNone" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'saveClicked\'});" id="__ML_save" ml="__ML_save" />');
		$("#buttonContainer").append('<input type="button" value="Cancel" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'reloadPage\'});" id="__ML_cancel" ml="__ML_cancel" >');
	},

	addPageValidations: function()
	{
    	var validationObj = {
    			"elementId":"__V_passphrase",
    			"label": globalView.getMultiLanguageText('__ML_passphrase'),
    			"groups":"SaveWPA",
    			"type":{
    				"Required":{},
    				"Pattern": {
    					"regex":"^(((?!\x20)[\x20-\x7f]{7,62}[\x21-\x7f])|([a-fA-F0-9]{8,64}))$",
    					"format":"(abc.1234)8-63"
    					//,
		    			//"customMessage" : __ML_wireless_invalid_wpa_password_alert.replace(/#invalid_value#/g, "{userinput}")
    					}
    				}
    	};
    	// ^(([0-9A-Za-z!\"#$%'()*+,./:;=?@^_`{|}~\\\\[\\]-]{8,63}))$
    	globalView.addRegulaValidation(validationObj);

    	validationObj = {
    			"elementId":"__V_server",
    			"label": globalView.getMultiLanguageText('__ML_radius_server_ip_address'),
    			"groups":"SaveWPA",
    			"type":{
    				"Required":{},
    				"Pattern": {
    					"regex":"^(((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}))$",
    					"format":"192.168.2.2"}
    				}
    	};

    	globalView.addRegulaValidation(validationObj);

    	validationObj = {
    			"elementId":"__V_port",
    			"label": globalView.getMultiLanguageText('__ML_server_port'),
    			"groups":"SaveWPA",
    			"type":{
    				"Required":{},
    				"Pattern": {
    					"regex":"^(6553[0-6]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9]|5[0-9]{4}|4[0-9]{4}|3[0-9]{4}|2[0-9]{4}|1[0-9]{4}|[0-9]{1,4})$",
    					"format":"[0-9],0>,<65537"}
    				}
    	};

    	globalView.addRegulaValidation(validationObj);

    	validationObj = {
    			"elementId":"__V_secret",
    			"label": globalView.getMultiLanguageText('__ML_secret'),
    			"groups":"SaveWPA",
    			"type":{
    				"Required":{},
    				"Pattern": {
   						"regex":"^((?!\x20)[\x20-\x7f]{7,63}[\x21-\x7f])$",
    					"format":"(abc.1234)8-63"
    					//,
		    			//"customMessage" : __ML_wireless_invalid_wpa_secret_alert.replace(/#invalid_value#/g, "{userinput}")
    					}
    				}
    	};

    	//regex=/^(([0-9A-Za-z!"#$%\'()*+,./:;=?@^_`{|}~\\\\[\\]-]{8,64}))$/
    	globalView.addRegulaValidation(validationObj);

    	var validationObj = {
    			"elementId":"__V_rekey_intval",
    			"label": globalView.getMultiLanguageText('__ML_rekey_intval'),
    			"groups":"SaveWPA",
    			"type":{
    				"Required":{},
    				"Pattern":{
    					"regex":"^(214748364[0-7]|21474836[0-3][0-9]|2147483[0-5][0-9]{2}|214748[0-2][0-9]{3}|21474[0-7][0-9]{4}|2147[0-3][0-9]{5}|214[0-6][0-9]{6}|21[0-3][0-9]{7}|20[0-9]{8}|1?[0-9]{0,9})$",
    					"format":"(3600) 0-2147483647"
    				}
    				}
    	};

    	globalView.addRegulaValidation(validationObj);

	},

    checkSecurityMode: function()
    {
    	$('#buttonContainer').show();
    	$('#wpaMeshWarningDiv').hide();

    	var selectedSecurityMode = $('input[name="__V_encryption"]:checked').val();
    	if (typeof selectedSecurityMode != "undefined")
    	{
    		switch(selectedSecurityMode)
    		{
	    		case 'off':
	    			$('#wep_settings_div').hide();
	    			$('#wpa_settings_div').hide();
	    			$('#no_encryption_div').show();
	                document.getElementById("__ML_save").name = "SaveNONE";
	    		  break;
	    		case 'wep':
	    			wirelessSecurityView.setWEPRegex();

	    			$('#wpa_settings_div').hide();
	    			$('#no_encryption_div').hide();
	    			$('#wep_settings_div').show();
	                document.getElementById("__ML_save").name = "SaveWEP";
	    		  break;
	    		case 'wpa_both':
				      if(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].meshEnabled && __DEF_Accept_wpa == 0)
					  {
				    	  $('#wpa_settings_div').hide(); $('#wep_settings_div').hide(); $('#no_encryption_div').hide(); $('#buttonContainer').hide();
				    	  $('#wpaMeshWarningDiv').show();
				    	  return false;
					  }
				      $('#wep_settings_div').hide();
				      $('#no_encryption_div').hide();
				      $('#wpa_settings_div').show();
				      var wpaEncryptionType = $('#__V_wpa_encryption_type').val();
				      var wpaAuthType = $('#__V_wpa_auth_type').val();

				      if((wpaEncryptionType == "wpa2" || wpaEncryptionType == "wpa_both") && wpaAuthType == "1")
	                  {
				    	  $('#preauth_row').show();
	                  }
				      else
				      {
				    	  $('#preauth_row').hide();
				      }

				      if(wpaAuthType == "personal")
				      {
				    	  $('#rekey_intval_row').show();
				    	  $('#passphrase_row').show();
				    	  $('#wpa_settings_div').show();
				    	  $('#server_row').hide();
				    	  $('#port_row').hide();
				    	  $('#secret_row').hide();
				    	  $('#eap_reauth_period_row').hide();

				    	  $('#__V_passphrase').removeAttr('disabled');
				    	  $('#__V_rekey_intval').removeAttr('disabled');
				    	  $('#__V_server').attr('disabled','disabled');
				    	  $('#__V_port').attr('disabled','disabled');
				    	  $('#__V_secret').attr('disabled','disabled');
				      }
				      else
				      {
				    	  $('#eap_reauth_period_row').show();
				    	  $('#passphrase_row').hide();
				    	  $('#server_row').show();
				    	  $('#port_row').show();
				    	  $('#secret_row').show();

				    	  $('#__V_passphrase').attr('disabled','disabled');
				    	  $('#__V_server').removeAttr('disabled');
				    	  $('#__V_port').removeAttr('disabled');
				    	  $('#__V_secret').removeAttr('disabled');
				      }
				      document.getElementById("__ML_save").name = "SaveWPA";
	      		  break;
	    		default:
    		} //end-switch
    	}
    },

	createNoEncryptionDiv: function()
	{
    	var noEncryption = '';
    	noEncryption += '<div style="display: none;" id="no_encryption_div">';
    	noEncryption += '	<div class="marginCenter globalHeaderInfoDiv" id="wireless_security_no_encription">';
        noEncryption += '		<span id="__ML_wireless_security_no_encryption"  ml="__ML_wireless_security_no_encryption"></span>';
        noEncryption += '	</div>';
    	noEncryption += '</div>';

		return noEncryption;
	},

	createSecurityTypeDiv: function()
	{
		var securityType = '';
		securityType += '<div>';
		securityType += '<table class="marginCenter globalTable">';
		securityType += '	<tr id="multipleSSID">';
		securityType += '		<td>';
		securityType += '			<span id="__ML_wireless_choose_ssid_to_apply_security" ml="__ML_wireless_choose_ssid_to_apply_security"></span>';
		securityType += '		</td>';
		securityType += '		<td>';
		securityType += '			<select id="__V_ssid" onchange="wirelessSecurityView.fillElementsAccordingToSSID();"></select>';
		securityType += '		</td>';
		securityType += '	</tr>';
		securityType += '	<tr id="singleSSID">';
		securityType += '		<td>';
		securityType += '			<span id="__ML_ssid" ml="__ML_ssid"></span>';
		securityType += '		</td>';
		securityType += '		<td>';
		securityType += '			<span id="wirelessSecurityViewFirstSSID"></span>';
		securityType += '		</td>';
		securityType += '	</tr>';
		securityType += '	<tr>';
		securityType += '		<td>';
		securityType += '			<span id="__ML_wireless_security_type" ml="__ML_wireless_security_type"></span>';
		securityType += '		</td>';
		securityType += '		<td>';
		securityType += '			<input type="radio" name="__V_encryption" value="off" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'checkSecurityMode\'});" id="__V_radioButton_off" />&nbsp;';
		securityType += '			<span id="__ML_wireless_security_mode_no_encryption" ml="__ML_wireless_security_mode_no_encryption">No Encryption</span>';
		securityType += '			<span id="encryption_wep_block"><input type="radio" name="__V_encryption" value="wep" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'checkSecurityMode\'});" id="__V_radioButton_wep" />&nbsp;<span>WEP</span></span>';
		securityType += '			<input type="radio" name="__V_encryption" value="wpa_both" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'checkSecurityMode\'});" id="__V_radioButton_wpa_both" />&nbsp;<span>WPA/WPA2</span>';
		securityType += '		</td>';
		securityType += '	</tr>';
		securityType += '	<tr style="display: none;">';
		securityType += '		<td colspan="2">';
		securityType += '			<span id="__ML_wireless_operating_mode_bridge_mode_no_access_warning" ml="__ML_wireless_operating_mode_bridge_mode_no_access_warning"></span>';
		securityType += '		</td>';
		securityType += '	</tr>';
		securityType += '	<tr style="display: none;">';
		securityType += '		<td colspan="2">';
		securityType += '			<span id="__ML_wireless_operating_mode_repeater_mode_no_access_warning" ml="__ML_wireless_operating_mode_repeater_mode_no_access_warning"></span>';
		securityType += '		</td>';
		securityType += '	</tr>';
		securityType += '</table>';
		securityType += '</div>';

		return securityType;
	},

	createWepSettingsDiv: function()
	{
		var wepSettings = '';

		wepSettings += '<div style="display: none; width: 100%;" id="wep_settings_div">';
		wepSettings += '	<div class="marginCenter globalHeaderInfoDiv" id="wireless_security_info">';
		wepSettings += '		<span id="__ML_wireless_security_info" ml="__ML_wireless_security_info"></span>';
		wepSettings += '	</div>';
		wepSettings += '	<table id="WEP_settings_table" class="marginCenter wirelessSecuritySettingsTable globalBorder">';
		wepSettings += ' 		<thead>';
		wepSettings += '        <tr>';
		wepSettings += '		<th class="labelRight"><span id="__ML_authentication_mode" ml="__ML_authentication_mode">Authentication Mode</span>:</th>';
		wepSettings += '		<th colspan="2">';
		wepSettings += '					<select id="__V_auth_mode">';
		wepSettings += '		      		<option value="open" id="__ML_open" ml="__ML_open">Open</option>';
		wepSettings += '		      		<option value="restricted" id="__ML_shared" ml="__ML_shared">Shared</option>';
		wepSettings += '               		</select>';
		wepSettings += '		</th>';
		wepSettings += '        </tr>';
		wepSettings += '        <tr>';
		wepSettings += '		<th class="labelRight"><span id="__ML_active_key" ml="__ML_active_key">Active Key</span></th>';
		wepSettings += '		<th><span id="__ML_choose" ml="__ML_choose">Choose</span></th>';
		wepSettings += '		<th><span id="__ML_key" ml="__ML_key">Key</span></th>';
		wepSettings += '        </tr>';
		wepSettings += ' 		</thead>';
		wepSettings += '        <tr>';
		wepSettings += '		<td class="labelRight">1</td>';
		wepSettings += '		<td><input type="radio" name="__V_wep_key_index" value="1" checked="checked" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'setWEPRegex\'});" id="__V_radioButton_wep_key1" /></td>';
		wepSettings += '		<td><input type="text" id="__V_wep_key1" data-constraints="" /></td>';
		wepSettings += '        </tr>';
		wepSettings += '        <tr>';
		wepSettings += '		<td class="labelRight">2</td>';
		wepSettings += '		<td><input type="radio" name="__V_wep_key_index" value="2" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'setWEPRegex\'});" id="__V_radioButton_wep_key2" /></td>';
		wepSettings += '		<td><input type="text" id="__V_wep_key2" /></td>';
		wepSettings += '        </tr>';
		wepSettings += '        <tr>';
		wepSettings += '		<td class="labelRight">3</td>';
		wepSettings += '		<td><input type="radio" name="__V_wep_key_index" value="3" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'setWEPRegex\'});" id="__V_radioButton_wep_key3" /></td>';
		wepSettings += '		<td><input type="text" id="__V_wep_key3" /></td>';
		wepSettings += '        </tr>';
		wepSettings += '        <tr>';
		wepSettings += '		<td class="labelRight">4</td>';
		wepSettings += '		<td><input type="radio" name="__V_wep_key_index" value="4" onclick="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'setWEPRegex\'});" id="__V_radioButton_wep_key4" /></td>';
		wepSettings += '		<td><input type="text" id="__V_wep_key4" /></td>';
		wepSettings += '        </tr>';
		wepSettings += '	</table>';
		wepSettings += '</div>';

		return wepSettings;
	},

	createWPASettingsDiv: function()
	{
		var WPASettings = '';
		WPASettings += '<div style="display: none; width: 100%;" id="wpa_settings_div">';
		WPASettings += '<div class="marginCenter globalHeaderInfoDiv" id="wireless_settings_wpa_description">';
		WPASettings += '<span id="__ML_wireless_settings_wpa_description" ml="__ML_wireless_settings_wpa_description"></span>';
		WPASettings += '<br /><br />';
		WPASettings += '</div>';
		WPASettings += '<table id="WPA_settings_table" class="marginCenter widthAuto globalBorder">';
		WPASettings += '	<tr id="wpaAuthTypeRow">';
		WPASettings += '		<td><span id="__ML_wpa_auth_type" ml="__ML_wpa_auth_type"></span>:</td>';
		WPASettings += '		<td>';
		WPASettings += '			<select onchange="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'checkSecurityMode\'});" id="__V_wpa_auth_type">';
		WPASettings += '				<option value="personal" id="__ML_personal" ml="__ML_personal">Personal</option>';
		WPASettings += '				<option value="enterprise" id="__ML_enterprise" ml="__ML_enterprise">EnterPrise</option>';
		WPASettings += '			</select>';
		WPASettings += '		</td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr>';
		WPASettings += '		<td><span id="__ML_wpa_encryption_type" ml="__ML_wpa_encryption_type"></span>:</td>';
		WPASettings += '		<td>';
		WPASettings += '			<select onchange="global.raiseEvent({eventHandler: \'wirelessSecurityController\', id: \'checkSecurityMode\'});" id="__V_wpa_encryption_type">';
		WPASettings += '			</select>';
		WPASettings += '		</td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="passphrase_row">';
		WPASettings += '		<td><span id="__ML_passphrase" ml="__ML_passphrase">Passphrase</span>:</td>';
		WPASettings += '		<td><input type="text" id="__V_passphrase"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="server_row">';
		WPASettings += '		<td id="td1" ><span id="__ML_radius_server_ip_address" ml="__ML_radius_server_ip_address">Server Address</span>:</td>';
		WPASettings += '		<td id="td2" ><input type="text" id="__V_server"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="port_row">';
		WPASettings += '		<td><span id="__ML_port" ml="__ML_port">Server Port</span>:</td>';
		WPASettings += '		<td><input type="text" id="__V_port"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="secret_row">';
		WPASettings += '		<td><span id="__ML_secret" ml="__ML_secret">Secret</span>:</td>';
		WPASettings += '		<td><input type="text" id="__V_secret"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="rekey_intval_row">';
		WPASettings += '		<td><span id="__ML_rekey_intval" ml="__ML_rekey_intval">Group Rekey Interval(s)</span>:</td>';
		WPASettings += '		<td><input type="text" id="__V_rekey_intval" maxlength="10"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="eap_reauth_period_row">';
		WPASettings += '		<td>';
		WPASettings += '	  <span id="__ML_eap_reauth_period" ml="__ML_eap_reauth_period">EAP yenileme aralığı</span>:';
		WPASettings += '	</td>';
		WPASettings += '			<td><input type="text" id="__V_eap_reauth_period" /></td>';
		WPASettings += '	</tr>';
		WPASettings += '	<tr id="preauth_row">';
		WPASettings += '		<td><span id="__ML_preauth" ml="__ML_preauth">Preauth</span>:</td>';
		WPASettings += '		<td><input type="checkbox" id="__V_preauth"/></td>';
		WPASettings += '	</tr>';
		WPASettings += '</table>';
		WPASettings += '</div>';
		return WPASettings;

	},

	fillElementsAccordingToSSID: function()
	{
		var optionValue = $('#__V_ssid').val();

		var obj = jQuery.parseJSON(optionValue);
		wirelessSecurityView.currentInstanceId = obj.instanceId;
		wirelessSecurityView.currentApId = obj.apId;
		
		switch(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].configSettings.opMode) {
			case "ap":
				if (wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].pollableSecurityModes.wep) {
			$("#encryption_wep_block").show();
				} else {
			$("#encryption_wep_block").hide();
		}
		
		var wpaAuthTypeOptions = "";
				for (var i = 0; i < wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].wpaAuthanticationTypes.length; i++) {
			wpaAuthTypeOptions += "<option id='" + wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].wpaAuthanticationTypes[i].ml + "' ml='" + wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].wpaAuthanticationTypes[i].ml + "' value='" + wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].wpaAuthanticationTypes[i].value + "'>" + globalView.getMultiLanguageText(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].wpaAuthanticationTypes[i].ml) + "</option>";
		}

		var rowString = "";

				if (wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].pollableSecurityModes.wpa_both) {
			rowString += "<option value='wpa_both'>WPA+WPA2</option>";
		}

				if (wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].pollableSecurityModes.wpa) {
			rowString += "<option value='wpa'>WPA</option>";
		}

		rowString += "<option value='wpa2'>WPA2</option>";

		$("#__V_wpa_encryption_type").html(rowString);
		
		$("#__V_wpa_auth_type").html(wpaAuthTypeOptions);
		
		if ($("#__V_wpa_auth_type option").length > 1) {
			$("#wpaAuthTypeRow").show();
		} else {
			$("#wpaAuthTypeRow").hide();
		}

		if(globalWireless.isWpa(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].sec_mode))
			$('input:radio[name="__V_encryption"]').filter('[value="wpa_both"]').attr('checked', true);
		else
			$('input:radio[name="__V_encryption"]').filter('[value="' + wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].sec_mode + '"]').attr('checked', true);

		$('#__V_wpa_encryption_type').val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].sec_mode);
		$('#__V_wpa_auth_type').val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_auth_type);
		$('#__V_auth_mode').val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_auth_type);

		$('input:radio[name="__V_wep_key_index"]').filter('[value="' + wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_key_index_for_functions + '"]').attr('checked', true);

		$("#__V_rekey_intval").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_rekey_interval);
		$("#__V_server").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_radius_addr);
		$("#__V_port").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_radius_port);
		$("#__V_secret").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_radius_key);
		$("#__V_eap_reauth_period").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_radius_eap_reauth_period);
		$("#__V_passphrase").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa_password);
		$("#__V_wep_key1").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_key1);
		$("#__V_wep_key2").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_key2);
		$("#__V_wep_key3").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_key3);
		$("#__V_wep_key4").val(wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wep_key4);

				if (wirelessSecurityView.instances[wirelessSecurityView.currentInstanceId].aps[wirelessSecurityView.currentApId].wpa2_rsn_preauth == "1") {
			$("#__V_preauth").attr('checked', true);
				} else {
			$("#__V_preauth").attr('checked', false);
		}

		wirelessSecurityView.checkSecurityMode();
				break;
			case "sta":
				$("#__ML_wireless_operating_mode_bridge_mode_no_access_warning").parent().parent().show();
				break;
			case "repeater":
				$("#__ML_wireless_operating_mode_repeater_mode_no_access_warning").parent().parent().show();
				break;
		}


		
		if ($.grep(wirelessSecurityView.instances, function(instance) {
			if (instance.configSettings.opMode == "ap") {
				return true;
			}
			return false;
		}).length == 0) {
			$("#__ML_wireless_security_type").parent().parent().hide();
			$("#buttonContainer").hide();
			return;
		}

		
		
	},

	fillSSIDComboBox: function()
	{
		var myOptions = {
				// value : text
		};

		for(var i = 0; i < wirelessSecurityView.instances.length; i++)
		{
			var selectedFreq = wirelessSecurityView.instances[i].configSettings.freq;
			var selectedFreqName = wirelessSecurityView.instances[i].freqs[selectedFreq].text;
			for(var j=0; j<wirelessSecurityView.instances[i].aps.length; j++)
			{
				//if(j<__DEF_WirelessSSIDMaxCount)
					if(j == 0)
					{
						myOptions['{"instanceId":'+i+', "apId":'+j+'}'] = wirelessSecurityView.instances[i].aps[j].ssid_serialized + " (WLAN" + (wirelessSecurityView.instances.length > 1 ? (i+1) : "") + " " + selectedFreqName + ")";
						if(wirelessSecurityView.instances[i].meshExist) {
							myOptions['{"instanceId":'+i+', "apId":'+j+'}'] += " + Mesh";
						}
					}
					else
					{
						myOptions['{"instanceId":'+i+', "apId":'+j+'}'] = wirelessSecurityView.instances[i].aps[j].ssid + " (WLAN" + (i+1) + " " + selectedFreqName + ")";
					}
			}
		}

		$.each(myOptions, function(val, text) {
		    $('select#__V_ssid').append(
		        $('<option></option>').val(val).html(text)
		    );
		});

		$('select#__V_ssid').val('{"instanceId":'+wirelessSecurityView.currentInstanceId+', "apId":'+wirelessSecurityView.currentApId+'}');
		$('#wirelessSecurityViewFirstSSID').html($('select#__V_ssid option:first-child').text());
		
		if($('select#__V_ssid option').length == 1) { $("#multipleSSID").hide(); $("#singleSSID").show(); } else { $("#multipleSSID").show(); $("#singleSSID").hide(); }
	},

    setWEPRegex: function()
    {
		var regexPattern = "^(?:[0-9a-fA-F]{10}|[\\s\\S]{5}|[0-9a-fA-F]{26}|[\\s\\S]{13})?$";
		var regexFormat = "(5-10-13-26 " + __ML_characters + ")";

		var wepKeyIndex = $('input[name="__V_wep_key_index"]:checked').val();

		var validationObj = {};

		$('input[name="__V_wep_key_index"]').each(function(){
			if(this.checked)
			{
				validationObj = {
						"elementId":"__V_wep_key"+this.value,
						"label": globalView.getMultiLanguageText('__ML_key') + this.value,
						"groups":"SaveWEP",
						"type":{
							"Required":{}, // Required field
							"Pattern": {
								"regex": regexPattern,
								"format": regexFormat
							}
						}
				};
			}
			else
			{
				validationObj = {
						"elementId":"__V_wep_key"+this.value,
						"label": globalView.getMultiLanguageText('__ML_key') + this.value,
						"groups":"SaveWEP",
						"type":{
							"Pattern": {
								"regex": regexPattern,
								"format": regexFormat
							}
						}
				};
			}
			globalView.addRegulaValidation(validationObj);
		});
    }
};
