function ApListItem() {
	this.data = {
		"ssid" : "",
		"mac" : "",
		"channel" : "",
		"protocol" : "",
		"security" : "",
		"rssi" : "",
		"rssiImage" : "",
		"password" : "",
		"mode" : ""
	};
}

ApListItem.prototype.mode = function(value) {
	if (value != undefined) {
		this.data.mode = value;
	}
	return this.data.mode;
};

ApListItem.prototype.password = function(value) {
	if (value != undefined) {
		this.data.password = value;
	}
	return this.data.password;
};

ApListItem.prototype.ssid = function(value) {
	if (value != undefined) {
		this.data.ssid = value;
	}
	return this.data.ssid;
};

ApListItem.prototype.ssid_serialized = function() {
	return $("<div>").text(this.ssid()).html().split(" ").join("&nbsp;");
};

ApListItem.prototype.mac = function(value) {
	if (value != undefined) {
		this.data.mac = value;
	}
	return this.data.mac;
};

ApListItem.prototype.channel = function(value) {
	if (value != undefined) {
		this.data.channel = value;
	}
	return this.data.channel;
};

ApListItem.prototype.protocol = function(value) {
	if (value != undefined) {
		this.data.protocol = value;
	}
	return this.data.protocol;
};

ApListItem.prototype.security = function(value) {
	if (value != undefined) {
		this.data.security = value;
	}
	return this.data.security;
};

ApListItem.prototype.securityImage = function() {
	if (this.security() == "off") {
		return "";
	} else {
		return $("<img>").attr("src", "/images/lock.png");
	}
};

ApListItem.prototype.rssi = function(value) {
	if (value != undefined) {
		this.data.rssi = value;
	}
	return this.data.rssi;
};

ApListItem.prototype.rssiImage = function() {
	var signalLevel;
	if (this.rssi() >= -50) {
		signalLevel = 5;
	} else if (this.rssi() <= -51 && this.rssi() >= -60) {
		signalLevel = 4;
	} else if (this.rssi() <= -61 && this.rssi() >= -65) {
		signalLevel = 3;
	} else if (this.rssi() <= -66 && this.rssi() >= -75) {
		signalLevel = 2;
	} else if (this.rssi() <= -76) {
		signalLevel = 1;
	}

	if (signalLevel != undefined) {
		return $("<img>").attr("src", "/images/level" + signalLevel + ".png");
	} else {
		return "";
	}
};

ApListItem.prototype.rssiMessage = function() {
	var message = __ML_wireless_location_of_the_device_is_good;
	if (this.rssi() == undefined) {
		message = "";
	} else if (this.rssi() < -65) {
		message = __ML_wireless_location_of_the_device_is_bad;
	}

	return message;
};

ApListItem.prototype.bridgeRssiMessage = function() {
	var message = __ML_wireless_location_of_the_device_is_good;
	if (this.rssi() == undefined) {
		message = "";
	} else if (this.rssi() < -65) {
		message = __ML_wireless_bridge_setup_location_of_the_device_is_bad;
	}

	return message;
};

ApListItem.prototype.rssiIsGood = function() {
	if (this.rssi() < -65) {
		return false;
	} else {
		return true;
	}
};

ApListItem.prototype.rssiCssClass = function() {
	var color = "green";
	if (this.rssi() == undefined) {
		color = "";
	} else if (this.rssi() < -65) {
		color = "red";
	}
	return color;
};
