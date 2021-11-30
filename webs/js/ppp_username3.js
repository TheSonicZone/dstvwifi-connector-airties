
var ppp_username_object = Class.extend({

	construct: function(inst_name, parent_id, format)
	{
		this.inst_name = inst_name;
		this.username = "";
		this.network = "";
		this.parent_id = parent_id || "";
		this.format = format || "";
	},
	set_ttnet_username_desc_row: function(ttnet_username_desc_row)
	{
		this.ttnet_username_desc_row = ttnet_username_desc_row;
	},
	set_value: function(username)
	{
		var tempUsername = username.split("@");
		this.real_username = username;
		this.username = tempUsername[0] || "";
		this.network = tempUsername[1] || "";
		this.get_formatted_object();
	},
	get_value: function()
	{
		return $("#__V_ppp_username_" + this.parent_id).val();
	},
	get_id: function()
	{
		return "__V_ppp_username_" + this.parent_id;
	},
	change_regex_pattern: function()
	{
		for(var i = 0; i < myPageData.length; i++)
		{
			if(myPageData[i].RelatedObject == this.get_id())
			{
				myPageData[i].RegexPattern = this.get_regex_pattern();
				break;
			}
		}
	},
	get_page_val_behaviour: function()
	{
		switch(this.format)
		{
			case "noValidate":
				return [RequiredField];
				break;
			default:
				return [RequiredField, RegexField];
				break;
		}
	},
	existing_regex_pattern: function()
	{
		for(var i = 0; i < myPageData.length; i++)
		{
			if(myPageData[i].RelatedObject == this.get_id())
			{
				alert(myPageData[i].RegexPattern);
			}
		}
	},
	get_regex_pattern: function()
	{
		switch(this.format)
		{
			case "ttnet":
				try
				{
					if(this.get_value().split("@")[1] == "ttnet")
						return "^((\\\\[!-~])|[a-z0-9!#$%&'*+/=?^_`{|}~-])+(\\.((\\\\[!-~])|[a-z0-9!#$%&'*+/=?^_`{|}~-])+)*([@][a-z0-9]+([\\.-][a-z0-9]+)*)?$";
				}
				catch(ex)
				{
				}
				return "^((\\\\[!-~])|[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])+(\\.((\\\\[!-~])|[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])+)*([@][a-zA-Z0-9]+([\\.-][a-zA-Z0-9]+)*)?$";
				break;
			case "standart":
				return "^((\\\\[!-~])|[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])+(\\.((\\\\[!-~])|[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])+)*([@][a-zA-Z0-9]+([\\.-][a-zA-Z0-9]+)*)?$";
				break;
			case "noValidate":
				return "";
				break;
			default:
				alert("undefined regex pattern");
				break;
		}
	},
	get_regex_format: function()
	{
		switch(this.format)
		{
			case "ttnet":
				return getML("__ML_adsl_username_regex_format_ttnet_meb");
				break;
			case "standart":
				return eval(getML("__DEF_DefaultUsernameRegexDescription"));
				break;
			case "noValidate":
				return "";
				break;
			default:
				alert("undefined regex format");
				break;
		}
	},
	get_formatted_object: function()
	{
		var rv = "";
		switch(this.format)
		{
			case "ttnet":
				rv = "<input type='hidden' value='" + this.username + "@" + this.network + "' id='__V_ppp_username_@parent_id@' />";
				rv += "<input type='text' value='@__V_ppp_username_part1_value@' id='@id@' onkeyup='@onkeyup@' onchange='@onchange@' size='@size@'/>";
				rv += "<span id='ttnet_span_@parent_id@' style='height: 20px; width: 100px; display: @display_mode@'>@ttnet</span>";
				rv = replace_all(rv, "@id@", "__V_ppp_username_part1_@parent_id@");

				var onkeyup = "$(\"#__V_ppp_username_@parent_id@\").val($(\"#__V_ppp_username_part1_@parent_id@\").val() + ($(\"#ttnet_span_@parent_id@\").css(\"display\") == \"none\" ? \"\" : $(\"#ttnet_span_@parent_id@\").html()));" + this.inst_name + ".change_regex_pattern();";
				onkeyup = replace_all(onkeyup, "@parent_id@", this.parent_id);
				rv = replace_all(rv, "@onkeyup@", onkeyup);
				rv = replace_all(rv, "@onchange@", onkeyup);
				rv = replace_all(rv, "@parent_id@", this.parent_id);
				
				if(this.network == "ttnet")
				{
					rv = replace_all(rv, "@size@", "9");
					$("#" + this.ttnet_username_desc_row).html("<p><span id='__ML_ttnet_username_desc_row_span_text2' style='display: none;'></span><span id='__ML_ttnet_username_desc_row_span_text3' style='display: none; color:red;'></span><span id='__ML_ttnet_username_desc_row_span_text4' style='display: none;'></span></p>");
					rv = replace_all(rv, "@__V_ppp_username_part1_value@", this.username);
					rv = replace_all(rv, "@display_mode@", "inline-block");
					$("#" + this.ttnet_username_desc_row).append("<span id='_ML_ttnet_username_desc_row_span_text'>" + getML("__ML_ttnet_username_desc_row_span_text_" + CONFIG_MANAGER_UI_PPP_USERNAME_DESC) + "</span><input type='button' id='__ML_ttnet_username_desc_row_button_text' class='inputButton' onclick=';$(\"#_ML_ttnet_username_desc_row_span_text\").remove();$(\"#ttnet_span_" + this.parent_id + "\").hide();$(\"#__ML_ttnet_username_desc_row_span_text2,#__ML_ttnet_username_desc_row_span_text3,#__ML_ttnet_username_desc_row_span_text4\").show();$(\"#__ML_ttnet_username_desc_row_button_text\").hide();$(\"#__V_ppp_username_part1_" + this.parent_id + "\").attr(\"size\",\"14\");$(\"#__V_ppp_username_part1_" + this.parent_id + "\").val(\".............@............\");" + onkeyup + "' />").show();
				}
				else
				{
					rv = replace_all(rv, "@size@", "14");
					$("#" + this.ttnet_username_desc_row).html("<p><span id='__ML_ttnet_username_desc_row_span_text2'>" + __ML_ttnet_username_desc_row_span_text2 + "</span><span style='color:red;' id='__ML_ttnet_username_desc_row_span_text3'>" + __ML_ttnet_username_desc_row_span_text3 + "</span><span id='__ML_ttnet_username_desc_row_span_text4'>" + __ML_ttnet_username_desc_row_span_text4 + "</span></p>").show();
					rv = replace_all(rv, "@display_mode@", "none");
					rv = replace_all(rv, "@__V_ppp_username_part1_value@", this.real_username);
				}
				break;
			case "standart":
				rv = "<input type='text' value='" + this.real_username + "' id='__V_ppp_username_@parent_id@' />";
				rv = replace_all(rv, "@parent_id@", this.parent_id);
				break;
			case "noValidate":
				rv = "<input type='text' value='" + this.real_username + "' id='__V_ppp_username_@parent_id@' />";
				rv = replace_all(rv, "@parent_id@", this.parent_id);
				break;
			default:
				alert("undefined username format");
				break;
		}
		$("#" + this.parent_id).html(rv);
	}
});