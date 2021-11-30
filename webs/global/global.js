String.prototype.replaceAll = function(find, replace) {
	return this.split(find).join(replace);
};

var global =
{
	defaultLogLevel: 10,
	logMode: "NONE",
	logLevel: 0, // 0: OFF
	queryStringData: new Array(),

	raiseEvent: function(event)
	{
		window[event.eventHandler].eventHandler(event);
	},

	raiseEvents: function(eventArray)
	{
		for(var i = 0; i < eventArray.length; i++)
		{
			global.raiseEvent(eventArray[i]);
		}
	},

	replaceAll: function(args)
	{
		args = args || {};
		args.text = args.text || "";
		args.search = args.search || "";
		args.replace = args.replace || "";

		while(args.text.indexOf(args.search) != -1)
		{
			args.text = args.text.replace(args.search, args.replace);
		}

		return args.text;
	},

	getCookie: function(args)
	{
		if (args.name == "") return "";
		var strCookie = " " + document.cookie;
		var idx = strCookie.indexOf(" " + args.name + "=");
		if (idx == -1) idx = strCookie.indexOf(";" + args.name + "=");
		if (idx == -1) return "";
		var idx1 = strCookie.indexOf(";", idx+1);
		if (idx1 == -1) idx1 = strCookie.length;
		return unescape(strCookie.substring(idx + args.name.length+2, idx1));
	},

	setCookie: function(args)
	{
		var now= new Date();
		var expDate = new Date();
		if (args.hours==null || args.hours==0) args.hours=1;
		expDate.setTime(now.getTime() + 3600000 * args.hours);
		document.cookie = args.name + "=" + escape(args.value) + ";expires=" + expDate.toUTCString() + ";path=/";
	},

	rssiSignalLevel: function(rssi)
	{
		rssi = rssi || 0;
		try
		{
			var signalLevel;
			if (rssi >= -50)
			{
				return signalLevel = 5;
			}
			else if (rssi <= -51 && rssi >= -60)
			{
				return signalLevel = 4;
			}
			else if (rssi <= -61 && rssi >= -65)
			{
				return signalLevel = 3;
			}
			else if (rssi <= -66 && rssi >= -75)
			{
				return signalLevel = 2;
			}
			else if (rssi <= -76)
			{
				return signalLevel = 1;
			}

		}
		catch(ex)
		{
			return 5;
		}
	},

	regexpCheck: function(value, pattern)
	{
		if(typeof(pattern) == "string") pattern = [pattern];

		for(var i = 0; i < pattern.length; i++)
		{
			var regexp = new RegExp(pattern);
			if(!regexp.test(value)) return false;
		}

		return true;

	},

	reboot: function()
	{
		alert(__ML_RequiresReboot);
		top.location.href="/tools/wait_reboot.html?status_modem=restart_modem";
	},

	parseURI: function()
	{
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
		    	global.queryStringData[sName] = unescape(sValue);
	        }
	    }
	},

	isFirstCall: function(functionName)
	{
		if(!this[functionName]) this[functionName] = true;
		else this[functionName] = false;

		return this[functionName];
	},

	objectSize: function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	},

	capitalizeFirst: function(string) {
	    return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
	},
	
	waitReboot: function(delay_time) {

		var params = {
			"status_modem" : "wait_reboot"
		};

		if(delay_time)
			params.delay_time = delay_time;

		top.location.href = "/tools/wait_reboot.html?" + $.param(params);
	},
	
	parseQueryString : function() {
		global.GETDATA = {};
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
				global.GETDATA[sName] = unescape(sValue);
			}
		}
	}
}
