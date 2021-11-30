var wirelessWpsView =
{
		managerTab:
		{
			managerTab: "",
			managerTabId: "",
			wirelessDiv: "",

			addRow:
			{
				wpsWarning: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					var wpsWarningSpanTemplate = '<span id="__ML_wireless_WPS_disabled_message" ml="__ML_wireless_WPS_disabled_message"></span>';

					var div = $("<div class='textCenter'></div>").appendTo(mt.wirelessDiv);
					div.append(wpsWarningSpanTemplate);
				},
				
				registrarModeMethod1: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsSoftButtonId = mt.getId.wpsSoftButtonId(index);
					instance.method1StatusId = mt.getId.method1StatusId(index);
					instance.method1StatusLoaderId = mt.getId.method1StatusLoaderId(index);
					instance.method1StatusNoticeId = mt.getId.method1StatusNoticeId(index);
					
					var methodTitleTemplate = '<span id="__ML_wireless_WPS_medhod1" ml="__ML_wireless_WPS_medhod1" class="large"></span>';
					
					var methodInfoTemplate = '<span id="__ML_wireless_WPS_medhod1_info" ml="__ML_wireless_WPS_medhod1_info"></span>';
					
					var methodButtonTemplate = '<input type="button" id="<id>" ml="__ML_wireless_WPS_soft_button" onclick="wirelessWpsView.managerTab.actions.wpsSoftButtonClicked(<index>)" />';
					
					var methodStatusTemplate = '<div id="<idNotice>" class="wirelessWpsNotice"><div id="<idLoader>" style="display:none;"><img src="/images/ajax-loader2.gif"></img></div><div id="<id>"></div></div>';
					
					var methodButtonAndStatusDiv =  "<div>" + methodButtonTemplate.replace("<id>", instance.wpsSoftButtonId).replace("<index>", index) + " " + methodStatusTemplate.replace("<id>", instance.method1StatusId).replace("<idLoader>", instance.method1StatusLoaderId).replace("<idNotice>", instance.method1StatusNoticeId) + "</div>";
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(methodTitleTemplate + "<br />" + methodInfoTemplate + "<br />" + methodButtonAndStatusDiv);

				},
				
				registrarModeMethod2: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsRegisterButtonId = mt.getId.wpsRegisterButtonId(index);
					instance.method2StatusId = mt.getId.method2StatusId(index);
					instance.method2StatusNoticeId = mt.getId.method2StatusNoticeId(index);
					instance.method2ControlId = mt.getId.method2ControlId(index);

					var methodTitleTemplate = '<span id="__ML_wireless_WPS_medhod2" ml="__ML_wireless_WPS_medhod2" class="large"></span>';
					var methodInfoTemplate = '<span id="__ML_wireless_WPS_medhod2_info" ml="__ML_wireless_WPS_medhod2_info"></span>';
					
					var methodSpanTemplate = '<span id="__ML_wireless_WPS_client_pin" ml="__ML_wireless_WPS_client_pin"></span>';
					var methodControlTemplate = '<input type="text" id="<id>" />';
					
					var methodButtonTemplate = '<input type="button" id="<id>" ml="__ML_wireless_WPS_register" onclick="wirelessWpsView.managerTab.actions.wpsRegisterButtonClicked(<index>)" />';
					var methodStatusTemplate = '<div id="<idNotice>" class="wirelessWpsNotice"><div id="<idLoader>" style="display:none;"><img src="/images/ajax-loader2.gif"></img></div><div id="<id>"></div></div>';
					var methodButtonAndStatusDiv =  "<div>" + methodSpanTemplate + " " +  methodControlTemplate.replace("<id>", instance.method2ControlId) + " " + methodButtonTemplate.replace("<id>", instance.wpsRegisterButtonId).replace("<index>", index) + " " + methodStatusTemplate.replace("<id>", instance.method2StatusId).replace("<idLoader>", instance.method2StatusLoaderId).replace("<idNotice>", instance.method2StatusNoticeId) + "</div>";
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(methodTitleTemplate + "<br />" + methodInfoTemplate + "<br />" + methodButtonAndStatusDiv);

				},
				
				registrarModeMethod3: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsPinControlId = mt.getId.wpsPinControlId(index);
					
					var methodTitleTemplate = '<span id="__ML_wireless_WPS_medhod3" ml="__ML_wireless_WPS_medhod3" class="large"></span>';
					
					var methodInfoTemplate = '<span id="__ML_wireless_WPS_medhod3_info" ml="__ML_wireless_WPS_medhod3_info"></span>';
					
					var methodPinNumberTemplate = '<span id="<id>" class="large globalBorder"></span>';
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(methodTitleTemplate + "<br />" + methodInfoTemplate + "<br />" + methodPinNumberTemplate.replace("<id>", instance.wpsPinControlId));

				},
				
				enrollModeMethod1: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsSoftButtonId = mt.getId.wpsSoftButtonId(index);
					instance.method1StatusId = mt.getId.method1StatusId(index);
					instance.method1StatusLoaderId = mt.getId.method1StatusLoaderId(index);
					instance.method1StatusNoticeId = mt.getId.method1StatusNoticeId(index);
					
					var methodTitleTemplate = '<span id="__ML_wireless_WPS_medhod1" ml="__ML_wireless_WPS_medhod1" class="large"></span>';
					
					var methodInfoTemplate = '<span id="__ML_wireless_WPS_medhod1_info_enroll" ml="__ML_wireless_WPS_medhod1_info_enroll"></span>';
					
					var methodButtonTemplate = '<input type="button" id="<id>" ml="__ML_wireless_WPS_soft_button" onclick="wirelessWpsView.managerTab.actions.wpsSoftButtonClicked(<index>)" />';
					
					var methodStatusTemplate = '<div id="<idNotice>" class="wirelessWpsNotice"><div id="<idLoader>" style="display:none;"><img src="/images/ajax-loader2.gif"></img></div><div id="<id>"></div></div>';
					
					var methodButtonAndStatusDiv =  "<div>" + methodButtonTemplate.replace("<id>", instance.wpsSoftButtonId).replace("<index>", index) + " " + methodStatusTemplate.replace("<id>", instance.method1StatusId).replace("<idLoader>", instance.method1StatusLoaderId).replace("<idNotice>", instance.method1StatusNoticeId) + "</div>";
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(methodTitleTemplate + "<br />" + methodInfoTemplate + "<br />" + methodButtonAndStatusDiv);

				},
				
				enrollModeMethod2: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsPinControlId = mt.getId.wpsPinControlId(index);
					
					var methodTitleTemplate = '<span id="__ML_wireless_WPS_medhod2_enrollee" ml="__ML_wireless_WPS_medhod2_enrollee" class="large"></span>';
					
					var methodInfoTemplate = '<span id="__ML_wireless_WPS_medhod2_info_enroll" ml="__ML_wireless_WPS_medhod2_info_enroll"></span>';
					
					var methodPinNumberTemplate = '<span id="<id>" class="large globalBorder"></span>';
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(methodTitleTemplate + "<br />" + methodInfoTemplate + "<br />" + methodPinNumberTemplate.replace("<id>", instance.wpsPinControlId));

				},
				
				enrollModeActivatePIN: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var mt = wirelessWpsView.managerTab;
					
					instance.wpsActivatePINButtonId = mt.getId.wpsActivatePINButtonId(index);
					instance.activatePINStatusId = mt.getId.activatePINStatusId(index);
					instance.activatePINStatusLoaderId = mt.getId.activatePINStatusLoaderId(index);
					instance.activatePINStatusNoticeId = mt.getId.activatePINStatusNoticeId(index);
					
					var activatePINInfoTemplate = '<span id="__ML_wireless_WPS_activate_pin_info_enroll" ml="__ML_wireless_WPS_activate_pin_info_enroll"></span>';
					var activatePINButtonTemplate = '<input type="button" id="<id>" ml="__ML_wireless_WPS_activate_pin_button" onclick="wirelessWpsView.managerTab.actions.wpsActivatePINButtonClicked(<index>)" />';
					
					var activatePINStatusTemplate = '<div id="<idNotice>" class="wirelessWpsNotice"><div id="<idLoader>" style="display:none;"><img src="/images/ajax-loader2.gif"></img></div><div id="<id>"></div></div>';
					
					var activatePINButtonAndStatusDiv =  "<div>" + activatePINButtonTemplate.replace("<id>", instance.wpsActivatePINButtonId).replace("<index>", index) + " " + activatePINStatusTemplate.replace("<id>", instance.activatePINStatusId).replace("<idLoader>", instance.activatePINStatusLoaderId).replace("<idNotice>", instance.activatePINStatusNoticeId) + "</div>";
					
					var div = $('<div></div>').appendTo(mt.wirelessDiv);
					div.append(activatePINInfoTemplate + "<br />" + activatePINButtonAndStatusDiv);
				}
			},
			
			set: 
			{
				wpsPin: function(index, value)
				{
					return $("#" + wirelessWpsView.instances[index].wpsPinControlId).html(value);
				}
			},
			
			get: 
			{
			},
			
			getId: 
			{
				wpsSoftButtonId: function(index)
				{
					if(index > 0)
					{
						return "btnWpsSoft_<index>".replace("<index>", index);
					}
					else
					{
						return "btnWpsSoft";
					}
				},
				
				wpsActivatePINButtonId: function(index)
				{
					if(index > 0)
					{
						return "btnWpsActivatePIN_<index>".replace("<index>", index);
					}
					else
					{
						return "btnWpsActivatePIN";
					}
				},

				method1StatusId: function(index)
				{
					if(index > 0)
					{
						return "divMethod1Status_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod1Status";
					}
				},

				method1StatusLoaderId: function(index)
				{
					if(index > 0)
					{
						return "divMethod1StatusLoader_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod1StatusLoader";
					}
				},
				
				method1StatusNoticeId: function(index)
				{
					if(index > 0)
					{
						return "divMethod1StatusNotice_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod1StatusNotice";
					}
				},

				activatePINStatusId: function(index)
				{
					if(index > 0)
					{
						return "divActivatePINStatus_<index>".replace("<index>", index);
					}
					else
					{
						return "divActivatePINStatus";
					}
				},

				activatePINStatusLoaderId: function(index)
				{
					if(index > 0)
					{
						return "divActivatePINStatusLoader_<index>".replace("<index>", index);
					}
					else
					{
						return "divActivatePINStatusLoader";
					}
				},
				
				activatePINStatusNoticeId: function(index)
				{
					if(index > 0)
					{
						return "divActivatePINStatusNotice_<index>".replace("<index>", index);
					}
					else
					{
						return "divActivatePINStatusNotice";
					}
				},

				wpsRegisterButtonId: function(index)
				{
					if(index > 0)
					{
						return "btnWpsRegister_<index>".replace("<index>", index);
					}
					else
					{
						return "btnWpsRegister";
					}
				},

				method2StatusId: function(index)
				{
					if(index > 0)
					{
						return "divMethod2Status_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod2Status";
					}
				},
				
				method2StatusLoaderId: function(index)
				{
					if(index > 0)
					{
						return "divMethod2StatusLoader_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod2StatusLoader";
					}
				},
				
				method2StatusNoticeId: function(index)
				{
					if(index > 0)
					{
						return "divMethod2StatusNotice_<index>".replace("<index>", index);
					}
					else
					{
						return "divMethod2StatusNotice";
					}
				},
				
				method2ControlId: function(index)
				{
					if(index > 0)
					{
						return "txtClientPin_<index>".replace("<index>", index);
					}
					else
					{
						return "txtClientPin";
					}
				},
				
				wpsPinControlId: function(index)
				{
					if(index > 0)
					{
						return "divPinNumber_<index>".replace("<index>", index);
					}
					else
					{
						return "divPinNumber";
					}
				}
			},
			
			addPageValidations: function(index)
			{
		    	var validationObj = {
		    			"elementId": wirelessWpsView.instances[index].method2ControlId,
		    			"label": globalView.getMultiLanguageText('__ML_wireless_WPS_client_pin'),
		    			"groups": "addWpsPin",
		    			"type":{
		    				"Required":{},
		    				"WpsPinValidation": {}
		    				}
		    	};

		    	globalView.addRegulaValidation(validationObj);
			},
			
			addTab: function(index)
			{
				wirelessWpsView.managerTab.managerTabId = "tabs-" + index;

				wirelessWpsView.managerTab.managerTab = $("<div id='" + wirelessWpsView.managerTab.managerTabId + "'></div>").appendTo("#tabs");

				wirelessWpsView.managerTab.wirelessDiv = $("<div id='wirelessDiv" + index + "' class='marginCenter globalHeaderInfoDiv'></div>").appendTo(wirelessWpsView.managerTab.managerTab);

				var instance = wirelessWpsView.instances[index];
				var selectedFreq = instance.configSettings.freq;
				var selectedFreqName = instance.freqs[selectedFreq].text;

				if(wirelessWpsView.instances.length <= 1)
					$("#managerSelectorUl").hide();
				else
					$("#managerSelectorUl").append("<li id='tab_" + index + "'><a href='#tabs-" + index + "'>" + globalView.getMultiLanguageText('__ML_wireless_network_lan') + " " + (index + 1) + " (" + selectedFreqName + ")</a></li>");
					
				if(instance.configSettings.airTouch)
				{
					if(instance.wpsRole == "enrollee")
					{
						wirelessWpsView.managerTab.addRow.enrollModeMethod1(index);
						wirelessWpsView.managerTab.addRow.enrollModeMethod2(index);
						wirelessWpsView.managerTab.addRow.enrollModeActivatePIN(index);
					}
					else
					{
						wirelessWpsView.managerTab.addRow.registrarModeMethod1(index);
						wirelessWpsView.managerTab.addRow.registrarModeMethod2(index);
						wirelessWpsView.managerTab.addRow.registrarModeMethod3(index);
					}
					wirelessWpsView.managerTab.addPageValidations(index);
				}
				else
				{
					wirelessWpsView.managerTab.addRow.wpsWarning(index);
				}
			},
			
			actions:
			{
				wpsSoftButtonClicked: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					
					$("#" + instance.wpsSoftButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					$("#" + instance.wpsRegisterButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					$("#" + instance.wpsActivatePINButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					
					wirelessWpsController.sendWpsPushButtonQuery(index);
					
					$("#" + instance.method1StatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_running'));
					$("#" + instance.method1StatusLoaderId).show();
				},

				wpsRegisterButtonClicked: function(index)
				{
					var instance = wirelessWpsView.instances[index];

					if(globalController.validateObjects("addWpsPin"))
					{
						var pinNumber = $('#'+ instance.method2ControlId).val();

						if(pinNumber.length == 9)
						{
							var start = pinNumber.substring(0,4);
							var end = pinNumber.substring(5,9);
							pinNumber = start.concat(end);
						}

						wirelessWpsController.sendWpsRegisterQuery(index, pinNumber);

						$("#" + instance.wpsSoftButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
						$("#" + instance.wpsRegisterButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
						$("#" + instance.wpsActivatePINButtonId).attr('disabled','disabled').addClass('ui-state-disabled');

						$("#" + instance.method2StatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_running'));
						$("#" + instance.method2StatusLoaderId).show();
					}
				},
				
				wpsActivatePINButtonClicked: function(index)
				{
					var instance = wirelessWpsView.instances[index];
					var pinNumber = instance.wpsPin;
					
					$("#" + instance.wpsSoftButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					$("#" + instance.wpsRegisterButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					$("#" + instance.wpsActivatePINButtonId).attr('disabled','disabled').addClass('ui-state-disabled');
					
					wirelessWpsController.sendWpsActivatePINQuery(index, pinNumber);
					
					$("#" + instance.activatePINStatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_running'));
					$("#" + instance.activatePINStatusLoaderId).show();
				}
			},
			
			updateRegisterStatus: function(index, wpsStatus)
			{
				var instance = wirelessWpsView.instances[index];

				if(wpsStatus != "running") 
				{
					$("#" + instance.wpsSoftButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
					$("#" + instance.wpsRegisterButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
					$("#" + instance.wpsActivatePINButtonId).removeAttr('disabled').removeClass('ui-state-disabled');
				}
				
				/*
				if(wpsStatus == "successful") $("#" + instance.method2StatusId).attr("class","success");
				else if (wpsStatus == "timeout") $("#" + instance.method2StatusId).attr("class","error");
				else if (wpsStatus == "disabled") $("#" + instance.method2StatusId).attr("class","error");
				else if (wpsStatus == "overlap") $("#" + instance.method2StatusId).attr("class","error");
				*/
			},
			
			updateRegisterStatusForPushButtonQuery: function(index, wpsStatus)
			{
				var instance = wirelessWpsView.instances[index];

				if(wpsStatus != "running") 
				{		
					$("#" + instance.method1StatusLoaderId).hide();
				}

				wirelessWpsView.managerTab.updateRegisterStatus(index, wpsStatus);

				$("#" + instance.method1StatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_' + wpsStatus));
			},
			
			updateRegisterStatusForRegisterQuery: function(index, wpsStatus)
			{
				var instance = wirelessWpsView.instances[index];

				if(wpsStatus != "running") 
				{	
					$("#" + instance.method2StatusLoaderId).hide();
				}

				wirelessWpsView.managerTab.updateRegisterStatus(index, wpsStatus);

				$("#" + instance.method2StatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_' + wpsStatus));
			},
			
			updateActivatePinStatusForActivatePinQuery: function(index, wpsStatus)
			{
				var instance = wirelessWpsView.instances[index];

				if(wpsStatus != "running") 
				{	
					$("#" + instance.activatePINStatusLoaderId).hide();
				}

				wirelessWpsView.managerTab.updateRegisterStatus(index, wpsStatus);

				$("#" + instance.activatePINStatusId).html(globalView.getMultiLanguageText('__ML_wireless_WPS_status_' + wpsStatus));
			}
		},
		
		documentReady: function()
		{
			$("#contentDiv").html("");
			wirelessWpsView.addHedaerDiv();
			wirelessWpsView.addCommentDiv();
		},
		
		addManagerTabs: function(managerCount)
		{
			$(".managerTab").remove();
			$(".footer").remove();

			$("#contentDiv").append("<div id='tabs' class='wirelessWpsTopDiv marginCenter'></div>");
			$("#tabs").append("<ul id='managerSelectorUl'></ul>");
			for(var i = 0; i < wirelessWpsView.instances.length; i++)
			{
				wirelessWpsView.managerTab.addTab(i);
			}
		},
		
		createTabControls: function(activeManagerIndex)
		{
			var $tabs = $('#tabs').tabs();
			$tabs.tabs({ selected: activeManagerIndex });

	        $tabs.tabs({
	            select: function(event, ui) {
	        		if(wirelessWpsView.confirmAndSetActiveManagerTab(ui.index))
	        		{
	        			wirelessWpsController.activeManagerIndex = ui.index;
	        		}
	        		else
	        		{
	        			return false;
	        		}
	        	}
	        });
		},
		
		confirmAndSetActiveManagerTab: function(index)
		{
		},
		
		addHedaerDiv: function()
		{
			$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
			$("#headerDiv").append("<span id='__ML_wireless_WPS' ml='__ML_wireless_WPS'></span>");
		},

		addCommentDiv: function()
		{
			$("#contentDiv").append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv'></div>");
			$("#commentDiv").html("");
			$("#commentDiv").append("<span id='__ML_wireless_WPS_info' ml='__ML_wireless_WPS_info'></span>");
		},

		addFooter: function()
		{
			var footer = $("<div class='footer'></div>");
			footer.append('<input type="button" id="__ML_save" ml="__ML_save" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'saveClicked\'});"/>');
			footer.append('<input type="button" id="__ML_cancel" ml="__ML_cancel" onclick="global.raiseEvent({eventHandler: \'wirelessMacController\', id: \'reloadPage\'});" />');
			footer.appendTo("#contentDiv");
		}
}
