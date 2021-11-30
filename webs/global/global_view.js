$.ajaxSetup({
  cache: false
});

$.ajax({
	url: "/lang.js",
	dataType: "script",
	async: false,
	success: function(){
	}
});


var globalView =
{
    addRegulaValidation: function(validationObj)
    {
    	var elementId = validationObj.elementId;
    	var relatedLabel = validationObj.label;
    	var groups = validationObj.groups;

    	var type = validationObj.type;

    	var index = validationObj.index;

    	var dataConstraintsString = "";
    	for(key in type)
    	{
    		dataConstraintsString += '@'+key+'(';
			if(relatedLabel)
				dataConstraintsString += 'label="'+relatedLabel+'"';
			if(type[key].regex)
				dataConstraintsString += ',regex=/'+type[key].regex+'/';
			if(type[key].format)
				dataConstraintsString += ',format="'+type[key].format+'"';
			//if(type[key].customMessage)
				//dataConstraintsString += ',customMessage="'+type[key].customMessage+'"';
			if(groups)
				dataConstraintsString += ',groups=['+groups+']';
			if(index)
				dataConstraintsString += ',index="'+index+'"';
			dataConstraintsString += ')';
    	}

		$('#'+elementId).attr('data-constraints', dataConstraintsString);
    },

	appendContentDiv: function()
	{
		$("body").append("<div id='contentDiv' class='contentDiv'>");
	},

	appendWaitDiv: function()
	{
		$("body").append("<div align='center' id='waitDiv'><p ml='__ML_please_wait'></p><p><img src='/images/ajax-loader.gif'/></p></div>");
		globalView.setMlByMlAttribute();
	},

	documentReady: function()
	{
		$("body").html("");
		globalView.appendWaitDiv();
		globalView.appendContentDiv();
		globalView.disablePage();
	},

	getMultiLanguageText: function(variable)
	{
		return globalView.getVariable(variable);
	},

	getVariable: function(variable)
	{
		var returnValue = "";
		try
		{
			returnValue = eval(variable);
		}
		catch(ex){}
		return returnValue;
	},

	setMlByMlAttribute: function()
	{
		try
		{
			$("input[ml]").each(function(){$(this).val(globalView.getMultiLanguageText($(this).attr("ml")));});
			$("span[ml]").each(function(){$(this).html(globalView.getMultiLanguageText($(this).attr("ml")));});
			$("p[ml]").each(function(){$(this).html(globalView.getMultiLanguageText($(this).attr("ml")));});
			$("option[ml]").each(function(){$(this).html(globalView.getMultiLanguageText($(this).attr("ml")));});
		}
		catch(e)
		{
		}
	},

	showPage: function()
	{
		globalView.setMlByMlAttribute();

		if(__DEF_ui_template == "sky_wifi_connector" || __DEF_ui_template == "sky_wifi_link" || __DEF_ui_template == "sky_wifi_booster" )
			globalView.addProductImage();

		$("#waitDiv").hide();
		$("#contentDiv").show();
	    $("#productImage").show();
	},

	addProductImage: function()
	{
		if($("#productImage").length == 0) {
			if(top.frames.mainFrame) {
				if($('#mainDiv', top.frames["mainFrame"].document).length == 0) {
					$("#contentDiv", top.frames["mainFrame"].document).wrap('<div id="wrapDiv"></div>');
					$("#wrapDiv", top.frames["mainFrame"].document).wrap('<div id="mainDiv"></div>');
					$("#mainDiv", top.frames["mainFrame"].document).append('<div id="productImage" style="display: none;"></div>');
				}
			} else {
				$("#contentDiv").wrap('<div id="wrapDiv"></div>');
				$("#wrapDiv").wrap('<div id="mainDiv"></div>');
				$("#mainDiv").append('<div id="productImage" style="display: none;"></div>');
			}
		}

	},

	disablePage: function()
	{
		$("#waitDiv").show();
		$("#contentDiv").hide();
		$("#productImage").hide();
	},

	addRowClass: function()
	{
		$("#contentDiv table tbody tr:visible:even").addClass("even");
		$("#contentDiv table tbody tr:visible:odd").addClass("odd");
	},

	addButtonClass: function()
	{
		$("button, input:submit, input:button").button();
		$("button, input:submit, input:button").addClass("buttonOptional");
	}
}
