//document.write("<script language=\"javascript\" src=\"/lang.js\"></script>");
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
			
var writeCliConsoleMessage = false;
var debugMessage = "";
var errorTimer = setTimeout("showError();",150000);
var submitted = false;

var not_whitespace = new RegExp(/[^\s]/);
var parent_count;

var xmlString = "";
var xmlArr;
var xmlResponse;
var queryStatus = 0;
var queryRetryCount = 3;
var GETDATA = new Array();

var TXN_QUERY = "query";
function beginXML(type) {
	queryStatus = 1;
	xmlString = "<xmlrequest version='1.0.1'>\n";
}

function addXML(type, instance, key, value) {
		if(value)
		{
			while(value.toString().indexOf("&") != -1)
			{
				value = value.replace("&", "#@amp;@#");
			}
			while(value.toString().indexOf("#@amp;@#") != -1)
			{
				value = value.replace("#@amp;@#", "&amp;");
			}

			while(value.toString().indexOf("<") != -1)
			{
				value = value.replace("<", "#@lt;@#");
			}
			while(value.toString().indexOf("#@lt;@#") != -1)
			{
				value = value.replace("#@lt;@#", "&lt;");
			}

			while(value.toString().indexOf(">") != -1)
			{
				value = value.replace(">", "#@gt;@#");
			}
			while(value.toString().indexOf("#@gt;@#") != -1)
			{
				value = value.replace("#@gt;@#", "&gt;");
			}

			while(value.toString().indexOf("\"") != -1)
			{
				value = value.replace("\"", "#@quot;@#");
			}
			while(value.toString().indexOf("#@quot;@#") != -1)
			{
				value = value.replace("#@quot;@#", "&quot;");
			}
		}

		xmlString += "<" + type + " inst=\""+ instance + "\"><key>" + key + "</key><value>" + value + "</value></" + type + ">\n";
	if(getDef("__DEF_UiMode") == "debug_message") debugMessage += "cli " + type + " " + instance + ":" + key + " " + value + "<br>";
	if(writeCliConsoleMessage) log("cli " + type + " " + instance + ":" + key + " " + value);
}

function log(message)
{
	try{
	console.log(message);
	}catch(ex){}
}

function addCommand(instance, key, value) {
	addXML("command", instance, key, value);
}

function addGet(instance, key, value) {
	addXML("get", instance, key, value);
}

function addSet(instance, key, value) {
	addXML("set", instance, key, value);
}

/* Get value with parameter */
function addGetP(instance, key, param) {
	addXML("get", instance, key, param);
}

function addQuery(instance, key, value) {
	addXML("query", instance, key, value);
}

function endXML() {
	xmlString += "</xmlrequest>";
	queryStatus = 2;
}
function ParseXML(data)
{
    var xmlDoc;
	try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM")
        xmlDoc.async="false"
        xmlDoc.loadXML(data)
    } catch (e) {
        var parser = new DOMParser()
        xmlDoc = parser.parseFromString(data, "text/xml")
    }
    return xmlDoc;
}

function sendAJAX(func, async) {
	if(async == undefined) async = true;
	if(getDef("__DEF_UiMode") == "debug_message" && debugMessage != "")
	{
		$("#waitDiv").html(debugMessage + "<br><br>");
		$("#waitDiv").show();
	}
	// Mozilla and Netscape browsers
	var xmlDoc;
	xmlDoc = ParseXML(xmlString);
	queryStatus = 3;
	$.ajax({
	url: "/cgi-bin/webapp",
	type: "POST",
	processData: false,
	data: xmlDoc,
	dataType: "xml",
	async: async,
	success: function(data) {
		queryStatus = 0;
		xmlResponse = data;
		var chkSession = getValue("webapp", "error");

		var sessionError = false;
		var forceToChangePassword = false;
		if(chkSession != "")
		{
			switch(chkSession)
			{
				case "1":
						sessionError = true;
				break;
				case "23":
						forceToChangePassword = true;
				break;
				default:
						sessionError = false;
				break ;
			}
		}
		else
		{
			sessionError = false;
		}
		if(sessionError)
		{
			top.location.href = "/login.html";
		}
		else if(forceToChangePassword)
		{
 			top.frames["mainFrame"].location = "/management/ui_password.html";
		}
		else
		{
			if(getDef("__DEF_UiMode") == "debug_message")
			{
				var serializer = new XMLSerializer();
				var xml = serializer.serializeToString(xmlResponse);

				var arr = [{search: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", replace: ""}, {search: "<response version=\"1.0.1\">\n", replace: ""}, {search: "</response>", replace: ""}, {search: "<", replace: "&lt;"}, {search: ">", replace: "&gt;"}, {search: "\n", replace: "<br>"}];
				for(var i = 0; i < arr.length; i++)
				{
					while(xml.indexOf(arr[i].search) != -1)
					{
						xml = xml.replace(arr[i].search, arr[i].replace);
					}
				}
				debugMessage += "----Response----<br>";
				debugMessage += xml + "<br>";
				debugMessage += "----------------<br>";
				$("#waitDiv").html(debugMessage + "<br><br>");
			}
			func();
		}
	}
});


}
function getXmlResponseArray(instance)
{
	var obj = new Object();
	try
	{
		var keys = xmlResponse.getElementsByTagName("key");
		var values = xmlResponse.getElementsByTagName("value");

		for(var i = 0; i < keys.length; i++)
		{
			if(keys[i].parentNode.nodeName == instance)
			{
				obj[keys[i].childNodes[0].nodeValue] = values[i].childNodes[0].nodeValue.toString() ;
			}
		}
	}
	catch(err)
	{
	}
	return obj;
}
function getValue2(instance, key){
	if(instance == null || key == null)
	return "";
	try
	{
		var keys = xmlResponse.getElementsByTagName("key");
		var values = xmlResponse.getElementsByTagName("value");
		for(var i = 0; i < keys.length; i++)
		{
			if(keys[0].parentNode.nodeName == instance && keys[i].childNodes[0].nodeValue == key) return values[i].childNodes[0].nodeValue;
		}
	}
	catch(err)
	{
		return "err";
	}
}


function getValue(instance, key){
	var x;
	var i;
	var j;
	var found;

	if(instance == null || key == null)
	return "";

	x = xmlResponse.getElementsByTagName(instance);


	try
	{
		for(j=0;j<x.length;j++)
		{

			found = 0;
			for(i=0;i<x[j].childNodes.length;i++)
			{

				if(x[j].childNodes[i].nodeName == "key")
				{
					if(x[j].childNodes[i].childNodes[0].nodeValue == key)
					found = 1;
				}

				if(found)
				{
					if(x[j].childNodes[i].nodeName == "value")
					return x[j].childNodes[i].childNodes[0].nodeValue;
				}

			}
			if(found == 1)
			return "";
		}
	}

	catch(err)
	{
		return "";
	}

	return "";
}
function getValueByIndex(module, instance_id, key)
{
    var instance = module + "-" + instance_id;
    return getValue(instance,key);
}

//Process the xml data
function xml2array(xmlDoc,parent_count) {
	var arr;
	var parent = "";
	parent_count = parent_count || new Object;

	var attribute_inside = 0;
	/*:CONFIG: Value - 1 or 0
	*	If 1, Value and Attribute will be shown inside the tag - like this...
	*	For the XML string...
	*	<guid isPermaLink="true">http://www.bin-co.com/</guid>
	*	The resulting array will be...
	*	array['guid']['value'] = "http://www.bin-co.com/";
	*	array['guid']['attribute_isPermaLink'] = "true";
	*
	*	If 0, the value will be inside the tag but the attribute will be outside - like this...
	*	For the same XML String the resulting array will be...
	*	array['guid'] = "http://www.bin-co.com/";
	*	array['attribute_guid_isPermaLink'] = "true";
	*/
	if(xmlDoc.nodeName && xmlDoc.nodeName.charAt(0) != "#") {
		if(xmlDoc.childNodes.length > 0) { //If its a parent
			arr = new Object;
			parent = xmlDoc.nodeName;

		}
	}
	var value = xmlDoc.nodeValue;
	if(xmlDoc.parentNode && xmlDoc.parentNode.nodeName && value) {
		if(not_whitespace.test(value)) {//If its a child
			arr = new Object;
			arr[xmlDoc.parentNode.nodeName] = value;
		}
	}

	if(xmlDoc.childNodes.length) {
		if(xmlDoc.childNodes.length == 1) { //Just one item in this tag.
//		if(0)
			arr = xml2array(xmlDoc.childNodes[0],parent_count); //:RECURSION:
		} else { //If there is more than one childNodes, go thru them one by one and get their results.
			var index = 0;

			for(var i=0; i<xmlDoc.childNodes.length; i++) {//Go thru all the child nodes.
				var temp = xml2array(xmlDoc.childNodes[i],parent_count); //:RECURSION:
				if(temp) {
					var assoc = false;
					var arr_count = 0;
					for(key in temp) {
						if(isNaN(key))
						    assoc = true;
						arr_count++;
						if(arr_count>2) break;//We just need to know wether it is a single value array or not
					}

					if(assoc && arr_count == 1) {
						if(arr[key]) { 	//If another element exists with the same tag name before,
										//		put it in a numeric array.
							//Find out how many time this parent made its appearance
							if(!parent_count || !parent_count[key]) {
								parent_count[key] = 0;

								var temp_arr = arr[key];
								arr[key] = new Object;
								arr[key][0] = temp_arr;
							}
							parent_count[key]++;
							arr[key][parent_count[key]] = temp[key]; //Members of of a numeric array
						} else {
							parent_count[key] = 0;
							arr[key] = temp[key];
							if(xmlDoc.childNodes[i].attributes.length) {
								for(var j=0; j<xmlDoc.childNodes[i].attributes.length; j++) {
									var nname = xmlDoc.childNodes[i].attributes[j].nodeName;
									if(nname) {
										/* Value and Attribute inside the tag */
										if(attribute_inside) {
											var temp_arr = arr[key];
											arr[key] = new Object;
											arr[key]['value'] = temp_arr;
											arr[key]['attribute_'+nname] = xmlDoc.childNodes[i].attributes[j].nodeValue;
										} else {
										/* Value in the tag and Attribute otside the tag(in parent) */
											arr['attribute_' + key + '_' + nname] = xmlDoc.childNodes[i].attributes[j].nodeValue;
										}
									}
								} //End of 'for(var j=0; j<xmlDoc. ...'
							} //End of 'if(xmlDoc.childNodes[i] ...'
						}
					} else {
						arr[index] = temp;
						index++;
					}
				} //End of 'if(temp) {'
			} //End of 'for(var i=0; i<xmlDoc. ...'
		}
	}

	if(parent && arr) {
		var temp = arr;
		arr = new Object;

		arr[parent] = temp;
	}
	return arr;
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function getVar(variable) {
    try
            {
                return document.getElementById(variable).value;
            }
            catch(err)
            {
                alert(variable  + " not found");
            }

}

function parseURI() {
    // Create a global array that will hold the value of each variable,
    // keyed by the name of the variable.

    // Get the string that follows the "?" in the window's location.
    var sGet = window.location.search;
    if (sGet) // if has a value...
    {
        // Drop the leading "?"
        sGet = sGet.substr(1);

        // Generate a string array of the name value pairs.
        // Each array element will have the form "foo=bar"
        var sNVPairs = sGet.split("&");

        // Now, for each name-value pair, we need to extract
        // the name and value.
        for (var i = 0; i < sNVPairs.length; i++)
        {
            // So, sNVPairs[i] contains the current element...
            // Split it at the equals sign.
            var sNV = sNVPairs[i].split("=");

            // Assign the pair to the GETDATA array.
            var sName = sNV[0];
            var sValue = sNV[1];
	    	for(var j = 2; j < sNV.length; j++)
		    {
			    sValue += "=" + sNV[j];
		    }
            GETDATA[sName] = unescape(sValue);
        }
    }
}

function disablePage(){
	$("#waitDiv").show();
	$("#contentDiv").hide();
	$("#productImage").hide();
}

function showError(){
	$("#waitDiv").hide();
    document.write(__ML_page_load_error + document.location);
}

function showPage(options) {
	if (options == undefined) {
		options = {}
	}
	
	if (options.addProductImage == undefined) {
		options.addProductImage = true; 
	}
	if(getDef("__DEF_ui_template") == "sky_wifi_connector" || getDef("__DEF_ui_template") == "sky_wifi_link" || getDef("__DEF_ui_template") == "sky_wifi_booster" ) {
		if (options.addProductImage) {
		AddProductImage();
		}
	}

	$("[tooltip]").each(function() {
		if($(this).attr("tooltip").substring(0, 4) == "__ML") $(this).attr("tooltip", getML($(this).attr("tooltip")));
	});
	$("input[ml]").each(function(){try{$(this).val(eval($(this).attr("ml")));}catch(ex){}});
	$("span[ml]").each(function(){try{$(this).html(eval($(this).attr("ml")));}catch(ex){}});
    var cells = document.getElementsByTagName("span");
    var val;
    for (var i=0;i < cells.length;i++)
    {
        i_id = cells[i].id;
        if ( i_id.substring(0,4) == "__ML" ) {
            try
            {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].innerHTML = eval(cells[i].id);
                }
            }
            catch(err)
            {
            }
        } else if ( i_id.substring(0,4) == "__V_" ) {
            try
            {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].innerHTML = eval(cells[i].id);
                }
            }
            catch(err)
            {
            }
        }
    }

    cells = document.getElementsByTagName("input");
    for (var i=0;i<cells.length;i++)
    {
        i_id = cells[i].id;
        if ( i_id.substring(0,4) == "__ML" ) {
            try
            {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].value = eval(cells[i].id);
                }
            }
            catch(err)
            {
            }
        } else if ( i_id.substring(0,4) == "__V_" ) {
            try
            {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].value = eval(cells[i].id);
                }
            }
            catch(err)
            {
            }
        }
    }

    cells = document.getElementsByTagName("select");
    for (var i=0;i<cells.length;i++)
    {
        i_id = cells[i].id;
        try
        {
            if ( i_id.substring(0,4) == "__V_" ) {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].value = eval(cells[i].id);
                }
            }
        }
        catch(err)
        {
        }
    }

    cells = document.getElementsByTagName("option");
    for (var i=0;i<cells.length;i++)
    {
        i_id = cells[i].id;
        try
        {
            if ( i_id.substring(0,5) == "__ML_" ) {
                val = eval(cells[i].id);
                if(typeof(val) == "string") {
                    cells[i].text = eval(cells[i].id);
                }
            }
        }
        catch(err)
        {
        }
    }

    clearTimeout(errorTimer);
    if(getDef("__DEF_UiMode") != "debug_message" || debugMessage == "") $("#waitDiv").hide();

    $("#contentDiv").show();
    submitted = false;
}


function AddProductImage() {
	try {
	if(top.frames.mainFrame) {
		if($('#mainDiv', top.frames["mainFrame"].document).length == 0) {
			$("#contentDiv", top.frames["mainFrame"].document).wrap('<div id="wrapDiv"></div>');
			$("#wrapDiv", top.frames["mainFrame"].document).wrap('<div id="mainDiv"></div>');
			$("#mainDiv", top.frames["mainFrame"].document).append('<div id="productImage"></div>');
		}
	} else {
		$("#contentDiv").wrap('<div id="wrapDiv"></div>');
		$("#wrapDiv").wrap('<div id="mainDiv"></div>');
		$("#mainDiv").append('<div id="productImage"></div>');
	}

	$("#productImage").show();

	} catch(err) {}
}

function Get_Cookie( check_name ) {

	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );

			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Delete_Cookie( name, path, domain )
{
   if ( Get_Cookie( name ) )
   {
      document.cookie = name + "=" + ( ( path ) ? ";path=" + path : "") +	( ( domain ) ? ";domain=" + domain : "" ) +	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
   }

}

function DeleteAllCookie( ) {

	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;
	var path = '/';
	var domain = '';
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	    document.cookie = cookie_name + "=" + ( ( path ) ? ";path=" + path : "") +	( ( domain ) ? ";domain=" + domain : "" ) +	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}

}

function rssi_status(rssi)
{
	try
	{
		var signalLevel;
		if (rssi <= 0 && rssi >= -60)
		{
			return signalLevel = __ML_signal_excellent;
		}
		else if (rssi <= -61 && rssi >= -70)
		{
			return signalLevel = __ML_signal_good;
		}
		else if (rssi <= -71 && rssi >= -80)
		{
			return signalLevel = __ML_signal_average;
		}
		else if (rssi <= -81)
		{
			return signalLevel = __ML_signal_poor;
		}
		else
		{
			return signalLevel = "";
		}
	}
	catch(ex){alert(ex);}
}

function security_status(security)
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
	catch(ex){alert(ex);}
}

var trStyleArrayDefault = new Array("table_style_alt_th", "table_style_alt");
function CreateTable(caption, rowArray, footer, firstColumnContainColumnHeaders, trStyleArray, parentId)
{
	try
	{
		if(trStyleArray == undefined) trStyleArray = trStyleArrayDefault;
		var rowCount = 0;
		for(var i = 0; i < rowArray.length; i++)
		{
			if(rowArray[i].length > rowCount) rowCount = rowArray[i].length;
		}

		var table = document.createElement("table");
		table.style.margin = "auto";
		var tbody = document.createElement("tbody");

		for(var i = 0; i < rowCount; i++)
		{
			var tr = document.createElement("tr")
					if(firstColumnContainColumnHeaders && i == 0) tr.className = "table_style_ana_th";
			else tr.className = trStyleArray[i % 2];
			for(var j = 0; j < rowArray.length; j++)
			{
				var td = document.createElement("td");
				if(typeof(rowArray[j][i]) == "string" || typeof(rowArray[j][i]) == "number")
				{
					var textNode = document.createTextNode(rowArray[j][i]);
					td.appendChild(textNode);
				}
				else if(rowArray[j][i] != undefined) td.appendChild(rowArray[j][i]);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		document.getElementById(parentId).appendChild(table);
	}
	catch(ex){alert(ex);}
}
function CreateSpace(count)
{
	for(var i = 0; i < count; i++)
	{
		document.getElementById("contentDiv").appendChild(document.createElement("br"));
	}
}

function CreateContentDiv()
{
	var div = document.createElement("div");
	div.id = "contentDiv";
	div.className = "menustyle";
	div.style.width = "100%";
	div.style.display = "none";
	div.style.textAlign = "center";
	document.body.appendChild(div);
}

/**
   accessable elements self and value
**/

function setVisibility(id, elems, check)
{
  try
  {
    var value = document.getElementById(id).value;
  }
  catch(e)
  {

  }
  var el =  document.getElementById(id);

  var elements = elems.split(',');
  for(var i = 0; i<elements.length; i++)
  {
    var elId =  elements[i].replace(/^\s+/, '');

    try
    {
      var elem = document.getElementById(elId);

      if(!elem)
      {
        continue;
      }
      if(eval(check))
      {
        elem.style.display = '';
      }
      else
      {
        elem.style.display= 'none';
      }
    }
    catch(e)
    {

    }
  }
}
function getVariable(variable)
{
	var returnValue = "";
	try
	{
		returnValue = eval(variable);
	}
	catch(ex){}
	return returnValue;
}
function getML(ml)
{
	return getVariable(ml);
}
function getDef(def)
{
	return getVariable(def);
}

function getObjectKeys(obj)
{
	var keys = [];

	for(var key in obj)
	{
		keys.push(key);
	}

	return keys;
}
function validate(value, relatedName, regexFormat, regexFormatDesc, required)
{
	var returnValue = true;
	if(required && value == "")
	{
		returnValue = false;
		alert(relatedName + __ML_Required_Field);
	}
	var regex = new RegExp(regexFormat);
	if(returnValue && !regex.test(value))
	{
		returnValue = false;
		alert(relatedName +  __ML_Regex_Msg + "[" + regexFormatDesc + "]" + "   " + value + " " +  __ML_Regex_wrong);
	}
	return returnValue;
}
function writeTopHtml()
{
	document.write('<table cellspacing="0" cellpadding="0" border="0" width="100%" style="height: 112px; background-image: url(&quot;/images/v_line_bg.gif&quot;); margin-bottom: 38px;"><tbody><tr><td style="width: 301px; background-image: url(&quot;/images/airties_logo.gif&quot;);">&nbsp;</td>						<td style="text-align: right; vertical-align: top;" class="right_padding"><div id="language" style="margin-top: 19px;" class="geneltxt_beyaz"><div style="margin-top: 10px;" class="topbanner_H1"><script type="text/javascript">document.write(__DEF_ProductBoardTypeForLoginPage  == "" ? __DEF_ProductBoardType : __DEF_ProductBoardTypeForLoginPage);</script></div></div></td></tr></tbody></table>');
}

function check_wpa2_only_mode(mode)
{
	var arr = getDef("__DEF_wireless_only_wpa2_modes").split(",");
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i] == mode) return true;
	}
	return false;
}

function is_wpa(sec_mode)
{
	if(sec_mode == "wpa" || sec_mode == "wpa2" || sec_mode == "wpa_both" || sec_mode == "wpa_aes" || sec_mode == "wpa2_tkip")
	{
		return true;
	}
	else
	{
		return false;
	}
}

function reboot()
{
	alert(__ML_RequiresReboot);
	top.location.href="/tools/wait_reboot.html?status_modem=restart_modem";
}

function default_gateway_is_multiple()
{
	if(getDef("__DEF_default_gateway_type") == "multiple")
	{
		return true;
	}
	return false;
}

var regex_ip_address = "^(([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\.)(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\.)){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$";
var format_ip_regex = "192.168.2.2";

function replace_all(str, find_str, replace_str)
{
	try
	{
		while(str.indexOf(find_str) != -1)
		{
			str = str.replace(find_str, replace_str);
		}
		return str;
	}
	catch(e)
	{
		return "";
	}
}

function checkCurrentLANOperatingMode(currentOptMode)
{
    var returnValue = false;

	if(currentOptMode && currentOptMode != "")
	{
	    switch(currentOptMode)
	    {
			case 'ap':	
				window.location.href = '/lan/operation_mode_no_access.html';
				break;
		  	default:
				returnValue = true;
	  			break;
	    }
    }
  	return returnValue;
}
