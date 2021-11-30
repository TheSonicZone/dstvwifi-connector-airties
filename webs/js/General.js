String.prototype.replaceAll = function(find, replace) {
	return this.split(find).join(replace);
};

$.ajaxSetup({
	cache : false
});

var WebappErrors = {
	"SESSION_ERROR" : "1",
	"FORCE_TO_CHANGE_PASSWORD" : "23"
};

function Webapp() {
	this.data = {
		request : {
			"rows" : []
		},
		"response" : {},
		"retryCount" : 0,
		"retryDelay" : 5000
	};
}

Webapp.prototype.retryCount = function(value) {
	if (value != undefined) {
		this.data.retryCount = value;
	}
	return this.data.retryCount;
};

Webapp.prototype.retryDelay = function(value) {
	if (value != undefined) {
		this.data.retryDelay = value;
	}
	return this.data.retryDelay;
};

Webapp.prototype.add = function(type, inst, key, value) {

	if (value == undefined) {
		value = "";
	} else {

		value = value.toString()//
		.replace(/&/g, "&amp;")//
		.replace(/</g, "&lt;")//
		.replace(/>/g, "&gt;")//
		.replace(/"/g, "&quot;");
	}

	this.data.request.rows.push({
		"type" : type,
		"inst" : inst,
		"key" : key,
		"value" : value
	});
};

Webapp.prototype.getXmlString = function() {
	var xmlString = "<xmlrequest version='1.0.1'>\n";
	$.each(this.data.request.rows, function(index, element) {
		xmlString += '<{type} inst="{inst}"><key>{key}</key><value>{value}</value></{type}>\n'//
		.replaceAll(/{type}/g, element.type)//
		.replaceAll(/{inst}/g, element.inst)//
		.replaceAll(/{key}/g, element.key)//
		.replaceAll(/{value}/g, element.value);
	});
	xmlString += "</xmlrequest>";
	return xmlString;
};

Webapp.prototype.getXmlDoc = function() {
	var xmlDoc;

	try {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(this.getXmlString());
	} catch (e) {
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(this.getXmlString(), "text/xml");
	}

	return xmlDoc;
};

Webapp.prototype.getValue = function(inst, key) {
	if (this.data.response[inst] == undefined || this.data.response[inst][key] == undefined) {
		return "";
	} else {
		return this.data.response[inst][key];
	}
};

Webapp.prototype.sendAjax = function(callbackFn) {
	var self = this;
	$.ajax({
		url : "/cgi-bin/webapp",
		type : "POST",
		processData : false,
		data : this.getXmlDoc(),
		dataType : "xml",
		async : true,
		success : function(data) {
			self.data.response = {};
			var keys = data.getElementsByTagName("key");
			var values = data.getElementsByTagName("value");

			for (var i = 0; i < keys.length; i++) {
				try {

					if (self.data.response[keys[i].parentNode.nodeName] == undefined) {
						self.data.response[keys[i].parentNode.nodeName] = {};
					}

					var key = keys[i].childNodes[0].nodeValue.toString();
					var value = "";
					if (values[i].childNodes[0] != undefined && values[i].childNodes[0].nodeValue != undefined) {
						value = values[i].childNodes[0].nodeValue.toString();
					}
					self.data.response[keys[i].parentNode.nodeName][key] = value;
				} catch(e) {
					errorData = data;
				}
			}

			switch(self.getValue("webapp", "error")) {
				case WebappErrors.SESSION_ERROR:
					top.location.href = "/login.html";
					break;
				case WebappErrors.FORCE_TO_CHANGE_PASSWORD:
					top.frames["mainFrame"].location = "/management/ui_password.html";
					break;
			}

			callbackFn();

		},
		error : function(xhr, ajaxOptions, thrownError) {
			if (self.retryCount() > 0) {
				self.retryCount(self.retryCount() - 1);
				var proxyFn = $.proxy(self.sendAjax, self, callbackFn);
				setTimeout(proxyFn, self.retryDelay());
			}
		}
	});
};

