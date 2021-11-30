var $darkImage = $("<img>").attr("src", "/images/Device_dark_grey.png");
var $lightImage = $("<img>").attr("src", "/images/Device_light_grey.png");
var $modemImage = $("<img>").attr("src", "/images/modem.png");
var $modemCirclesImage = $("<img>").attr("src", "/images/modem_circles.png");
var $okImage = $("<img>").attr("src", "/images/ok.png");
var $deviceCirclesImage = $("<img>").attr("src", "/images/Device_circles.png");
var $rssiLevel5Image = $("<img>").attr("src", "/images/level5.png");
var $rssiLevel4Image = $("<img>").attr("src", "/images/level4.png");
var $rssiLevel3Image = $("<img>").attr("src", "/images/level3.png");
var $rssiLevel2Image = $("<img>").attr("src", "/images/level2.png");
var $rssiLevel1Image = $("<img>").attr("src", "/images/level1.png");
var $lockImage = $("<img>").attr("src", "/images/lock.png");
var $deviceImage = $("<img>").attr("src", "/images/Device.png");
var $xImage = $("<img>").attr("src", "/images/x.png");

$.widget("Bridge.reConnectToWirelessView", {
    options : {
        ssid : "ssid"
    },
    _create : function() {
        var self = this;
        var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget reConnectToWirelessDiv");
        this.$nextButton = $("<button>").html(__ML_next).addClass("airtiesButton").button().prop("disabled", true).click(function(){
            self.element.trigger("nextClicked");
        });
        
        $("<div>").addClass("airtiesHeader").css("padding-bottom", "20px").html(__ML_repeater_setup_one_step_to_the_connect_the_internet).appendTo($containerDiv);

        $("<div>").html(__ML_repeater_setup_reconnect_introduction.split("{{ssid}}").join(this.options.ssid)).appendTo($containerDiv);
        
        $("<div>").css({
            "padding" : "20px",
            "text-align" : "center"
        }).html(__ML_repeater_setup_connected_to_gateway.split("{{ssid}}").join(this.options.ssid)).append($("<input>").prop("type", "checkbox").click(function() {
            self.$nextButton.prop("disabled", !$(this).is(":checked"));
        })).appendTo($containerDiv);
        
        var $buttonDiv = $("<div>").css("text-align", "right").appendTo($containerDiv);

        $buttonDiv.append(this.$nextButton);

        this.element.html($containerDiv);

    },
    _destroy : function() {
        this.element.html("");
        this.element.off("nextClicked");
    }
});

$.widget("Bridge.bridgeSetupFailed", {
    options : {
    },
    _create : function() {

        var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget reConnectToWirelessDiv");
        $("<div>").html(__ML_bridge_setup_failed).appendTo($containerDiv);

        this.element.html($containerDiv);
    },
    _destroy : function() {
        this.element.html("");
    }
});

/* ApListView */

function ApListView() {
}

ApListView.prototype.r = function(apList) {
    if (apList == undefined) {
        apList = [];
        for (var i = 0; i < 32; i++) {
            var apListItem = new ApListItem();
            apListItem.ssid("ssid_" + i);
            apListItem.mac("mac");
            apListItem.channel("channel");
            apListItem.protocol("protocol");
            apListItem.security("wpa");
            apListItem.rssi("-55");
            apList.push(apListItem);
        }
    }
    $("body").html(this.render(apList));
};

ApListView.prototype.render = function(apList) {
    var self = this;
    var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget apListContainerDiv");
    $("<div>").css({
        "padding" : "20px 0",
        "text-align" : "center"
    }).html(__ML_repeater_setup_select_your_wireless_network_from_the_list_by_clicking_the_network_name_ssid).appendTo($containerDiv);
    var $listDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget apListDiv").appendTo($containerDiv);
    var $infoDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget apListInfoDiv").appendTo($containerDiv);

    var $infoTable = $("<table>").css("height", "100%").appendTo($infoDiv);

    var $tr = $("<tr>").appendTo($infoTable);
    var $td = $("<td>").css("vertical-align", "top").appendTo($tr);

    var $guideTable = $("<table>").css("border-collapse", "collapse").appendTo($td);
    $("<tr>").append($("<td>").html($("<div>").html(__ML_repeater_setup_guide + " :"))).appendTo($guideTable);
    $("<tr>").append($("<td>").html($rssiLevel5Image)).append($("<td>").css("border-bottom", "1px solid #AAAAAA").html(__ML_repeater_setup_good_connection).attr("rowspan", "3")).appendTo($guideTable);
    $("<tr>").append($("<td>").html($rssiLevel4Image)).appendTo($guideTable);
    $("<tr>").append($("<td>").css("border-bottom", "1px solid #AAAAAA").html($rssiLevel3Image)).appendTo($guideTable);
    $("<tr>").append($("<td>").html($rssiLevel2Image)).append($("<td>").css("border-bottom", "1px solid #AAAAAA").html(__ML_repeater_setup_bad_connection).attr("rowspan", "2")).appendTo($guideTable);
    $("<tr>").append($("<td>").css("border-bottom", "1px solid #AAAAAA").html($rssiLevel1Image)).appendTo($guideTable);

    $("<tr>").append($("<td>").css("vertical-align", "bottom").append($("<div>").html(__ML_bridge_setup_if_your_wireLess_network_is_not_in_the_list_please_take_the_wireless_range_extender_close_to_your_wireless_router_and_click_rescan).append($("<div>").css({
        "text-align" : "right",
        "padding-top" : "20px"
    }).append($("<button>").html(__ML_repeater_setup_rescan).addClass("airtiesButton").button().click(function() {
        $(self).trigger("rescanClicked");
    }))))).appendTo($infoTable);

    var $tableDiv = $("<div>").css({
        "max-height" : "400px",
        "height" : "auto !important",
        "overflow" : "auto"
    }).appendTo($listDiv);
    var $table = $("<table>").addClass("apListTable").appendTo($tableDiv);

    $.each(apList, function(index, item) {
        $tr = $("<tr>").appendTo($table);
        $tr.click(function() {
            $(self).trigger("apClicked", index);
        });
        $tr.append($("<td>").html(item.ssid_serialized()))//
        .append($("<td>").append(item.rssiImage()))//
        .append($("<td>").html(item.security() != "off" ? $lockImage.clone() : ""));
    });

    $("<div>").css("clear", "both").appendTo($listDiv);
    return $containerDiv;
};

/* ApScanFinishedButCouldNotFindAnyNetworkView */

function ApScanFinishedButCouldNotFindAnyNetworkView() {
}

ApScanFinishedButCouldNotFindAnyNetworkView.prototype.animate = function() {
    this.$deviceImg.animate({
        "padding-left" : "0px"
    }, 2500);
};

ApScanFinishedButCouldNotFindAnyNetworkView.prototype.r = function() {
    $("body").html(this.render());
    this.animate();
};

ApScanFinishedButCouldNotFindAnyNetworkView.prototype.render = function() {
    var self = this;
    var $waitingDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget waitingDiv");

    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_welcome_to_our_installation_wizard.replace(/{{product_name}}/g, __DEF_ProductBoardTypeForLoginPage)).appendTo($waitingDiv);
    $("<div>").css("padding-top", "50px").html(__ML_repeater_setup_could_not_find_any_network).appendTo($waitingDiv);

    $waitingDiv.append($("<div>").css("float", "left").append($modemImage));
    this.$deviceImg = $("<div>").css({
        "float" : "left",
        "padding-left" : "100px"
    }).append($deviceImage).appendTo($waitingDiv);

    $waitingDiv.append($("<div>").css("clear", "both"));

    $("<div>").html(__ML_repeater_setup_press_rescan_to_scan_again_for_available_networks).css({
        "padding-top" : "50px",
        "padding-bottom" : "50px"
    }).appendTo($waitingDiv);

    var $buttonDiv = $("<div>").css("text-align", "right").appendTo($waitingDiv);

    var $rescanButton = $("<button>").html(__ML_repeater_setup_rescan).addClass("airtiesButton").button().click(function() {
        $(self).trigger("rescanClicked");
    }).appendTo($buttonDiv);
    return $waitingDiv;
};

/* ApScanFinishedButCouldNotFindAnyNetworkView */

function ApScanFinishedView() {

}

ApScanFinishedView.prototype.r = function() {
    $("body").html(this.render());
};

ApScanFinishedView.prototype.render = function() {
    var self = this;
    var $waitingDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget waitingDiv");

    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_welcome_to_our_installation_wizard).appendTo($waitingDiv);
    $("<div>").css("padding-top", "50px").html(__ML_bridge_setup_introduction_message).appendTo($waitingDiv);

    $("<div>").css("font-weight", "bold").html(__ML_repeater_setup_click_next_to_see_the_availabled_scanned_networks).css({
        "padding-top" : "50px",
        "padding-bottom" : "50px"
    }).appendTo($waitingDiv);

    var $buttonDiv = $("<div>").appendTo($waitingDiv);
    var $leftButtonDiv = $("<div>").css("float", "left").appendTo($buttonDiv);
    var $rightButtonDiv = $("<div>").css("float", "right").appendTo($buttonDiv);

    var $nextButton = $("<button>").html(__ML_repeater_setup_advanced_settings).addClass("airtiesButton").button().click(function() {
        $(self).trigger("advancedSetupClicked");
    }).appendTo($leftButtonDiv);

    var $nextButton = $("<button>").html(__ML_next).addClass("airtiesButton").button().click(function() {
        $(self).trigger("nextClicked");
    }).appendTo($rightButtonDiv);

    $waitingDiv.append($("<div>").addClass("ui-helper-clearfix"));
    return $waitingDiv;
};

/* ConnectedView */

function ConnectedView() {

}

ConnectedView.prototype.r = function(bridgeSsid) {
    bridgeSsid = bridgeSsid || "bridgeSsid";
    $("body").html(this.render(bridgeSsid));
};

ConnectedView.prototype.render = function(bridgeSsid) {
    var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget connectedDiv");
    $("<div>").addClass("airtiesHeader").html(__ML_wireless_operating_mode_sta_congratulations_connected).appendTo($containerDiv);

    var $table = $("<table>").css({
        "width" : "100%",
        "margin" : "auto"
    }).appendTo($containerDiv);

    var $row = $("<tr>").appendTo($table);

    $("<td>").css("width", "30%").append($modemCirclesImage).appendTo($row);
    $("<td>").css("width", "40%").append($okImage).appendTo($row);
    $("<td>").css("width", "30%").append($deviceCirclesImage).appendTo($row);

    $row = $("<tr>").appendTo($table);
    $("<td>").append(__ML_wireless_repeater_wlan_name).appendTo($row);
    $("<td>").append().appendTo($row);
    $("<td>").append(__ML_wireless_repeater_wlan_name).appendTo($row);
    $row = $("<tr>").appendTo($table);
    $("<td>").append($.serialize(bridgeSsid)).appendTo($row);
    $("<td>").append().appendTo($row);
    $("<td>").append($.serialize(bridgeSsid)).appendTo($row);

    var $buttonPane = $("<div>").css({
        "text-align" : "right",
        "padding-top" : "50px"
    }).appendTo($containerDiv);

    $("<a>").html(__ML_repeater_setup_start_browsing).attr({
        "target" : "_blank",
        "href" : "http://www.airties.com"
    }).button().addClass("airtiesButton").click(function() {
        $(this).blur();
    }).appendTo($buttonPane);

    return $containerDiv;
};

/* ConnectingToApView */

function ConnectingToApView() {

}

ConnectingToApView.prototype.r = function(bridgeSsid, apSsid) {
    bridgeSsid = bridgeSsid || "bridgeSsid";
    apSsid = apSsid || "apSsid";
    $("body").html(this.render(bridgeSsid, apSsid));
};

ConnectingToApView.prototype.render = function(bridgeSsid, apSsid) {
    var $waitingDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget connectingToAp");
    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_connecting).appendTo($waitingDiv);
    var $containerTable = $("<table>").css({
        "width" : "100%",
        "margin" : "auto",
        "text-align" : "center",
        "table-layout": "fixed"
    }).appendTo($waitingDiv);
    var $tableRow = $("<tr>").appendTo($containerTable);
    $("<td>").css("width", "30%").append($modemCirclesImage).appendTo($tableRow);

    $bulletTd = $("<td>").css({"width": "40%", "white-space": "nowrap"}).appendTo($tableRow);
    for (var i = 0; i < 10; i++) {
        $bulletTd.append($("<span>").addClass("ui-icon ui-icon-bullet ui-icon-connecting-bullet"));
    }
    $("<td id='blinkAnimation'>").css("width", "30%").append($lightImage).appendTo($tableRow);

    $tableRow = $("<tr>").appendTo($containerTable);
    $("<td>").append(__ML_wireless_repeater_wlan_name).appendTo($tableRow);
    $("<td>").append().appendTo($tableRow);
    $("<td>").append(__ML_wireless_repeater_wlan_name).appendTo($tableRow);
    $tableRow = $("<tr>").appendTo($containerTable);
    $("<td>").css("word-wrap", "break-word").append($.serialize(bridgeSsid)).appendTo($tableRow);
    $("<td>").append().appendTo($tableRow);
    $("<td>").append($.serialize(apSsid)).appendTo($tableRow);

    $waitingDiv.animationInterval = setInterval(function() {
        if ($(".ui-icon-connecting-bullet").length == 0) {
            clearInterval($waitingDiv.animationInterval);
            return;
        }
        var indexOfCurrent = $(".ui-icon-connecting-bullet").index($(".connectingBullet1"));
        var indexOfTail = $(".ui-icon-connecting-bullet").index($(".connectingBullet0_5"));
        var direction = indexOfCurrent > indexOfTail ? 1 : -1;

        switch(indexOfCurrent) {
            case -1:
                indexOfCurrent = 9;
                direction = -1;
                break;
            case 0:
            case $(".ui-icon-connecting-bullet").length - 1:
                direction = direction * (-1);
                break;
            default:
        }

        $(".connectingBullet1").removeClass("connectingBullet1 blue-icons");
        $(".connectingBullet0_5").removeClass("connectingBullet0_5 blue-icons");
        $(".connectingBullet0_25").removeClass("connectingBullet0_25 blue-icons");

        $($(".ui-icon-connecting-bullet")[indexOfCurrent + direction]).addClass("connectingBullet1 blue-icons");

        $($(".ui-icon-connecting-bullet")[indexOfCurrent]).addClass("connectingBullet0_5 blue-icons");

        $($(".ui-icon-connecting-bullet")[indexOfCurrent + direction * (-1)]).addClass("connectingBullet0_25 blue-icons");

        if (indexOfCurrent % 3 == 0) {
            if (indexOfCurrent % 2 == 0) {
                $("#blinkAnimation").html($lightImage);
            } else {
                $("#blinkAnimation").html($darkImage);
            }
        }

    }, 200);

    return $waitingDiv;
};

/* ConnectToApDialog */

function ConnectToApDialog() {
}

ConnectToApDialog.prototype.open = function(apListItem) {
    var self = this;
    var $containerDiv = $("<div>");
    var $ssidDiv = $("<div>").addClass("ui-helper-clearfix").appendTo($containerDiv);
    $("<div>").css("float", "left").html(apListItem.ssid_serialized()).appendTo($ssidDiv);
    $("<div>").css({
        "float" : "right",
        "padding-left" : "20px"
    }).append(apListItem.securityImage()).appendTo($ssidDiv);
    $("<div>").css("float", "right").append(apListItem.rssiImage()).appendTo($ssidDiv);

    if (!apListItem.rssiIsGood()) {
        $containerDiv.append($("<div>").css("float", "left").append($modemImage));
        this.$deviceImg = $("<div>").css({
            "float" : "left",
            "padding-left" : "100px"
        }).append($deviceImage).appendTo($containerDiv);

        $("<div>").addClass("ui-helper-clearfix").appendTo($containerDiv);
    }
    $("<div>").css("margin", "20px 0").append(apListItem.bridgeRssiMessage()).addClass(apListItem.rssiCssClass()).appendTo($containerDiv);
    if (apListItem.security() != "off") {
        $("<div>").css("float", "left").append(__ML_repeater_setup_wireless_password + " :").appendTo($containerDiv);
        $("<div>").css("float", "left").append($("<input>").attr({
            "id" : "wirelessPassword",
            "type" : "password"
        })).appendTo($containerDiv);
    }

    $containerDiv.dialog({
        "dialogClass" : "noTitle airtiesWidget",
        "draggable" : false,
        "modal" : true,
        "resizable" : false,
        "width" : "500px",
        "height" : "auto",
        "autoOpen" : true,
        "autofocus" : false,
        "open" : function() {
            $(this).bind("keypress", function(e) {
                if (e.keyCode == 13) {
                    $(self).trigger("connectClicked", [apListItem.ssid(), $("#wirelessPassword").val()]);
                }
            });
            $(".ui-widget-header").remove();

            if (apListItem.security() != "off") {
                $("#wirelessPassword").togglePasswordBox();
            }
            $("button").blur();

            $(".ui-widget-overlay").click($.proxy(function() {
                $(this).dialog("close");
            }, this));

            if (self.$deviceImg) {
                self.$deviceImg.animate({
                    "padding-left" : "0px"
                }, 2500);
            }
        },
        "close" : function(event, ui) {
            $(this).remove();
        },
        "buttons" : [{
            "class" : "airtiesButton",
            "text" : __ML_back,
            "click" : function() {
                $(this).dialog("close");
            }
        }, {
            "class" : "airtiesButton",
            "text" : __ML_repeater_setup_connect,
            "click" : function() {
                $(".ui-state-focus").blur();
                $(self).trigger("connectClicked", [apListItem.ssid(), $("#wirelessPassword").val()]);
            }
        }]
    });
};

ConnectToApDialog.prototype.r = function(apListItem) {
    if (apListItem == undefined) {
        apListItem = new ApListItem();
        apListItem.ssid("ssid");
        apListItem.mac("mac");
        apListItem.channel("channel");
        apListItem.protocol("protocol");
        apListItem.security("wpa");
        apListItem.rssi("-55");
    }
    $("body").html(this.open(apListItem));
};

/* NotConnectedView */

function NotConnectedView() {

}

NotConnectedView.prototype.r = function(bridgeSsid) {
    bridgeSsid = bridgeSsid || "bridgeSsid";
    $("body").html(this.render(bridgeSsid));
};

NotConnectedView.prototype.render = function(bridgeSsid) {
    var self = this;
    var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget connectedDiv");
    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_cannot_establish_connection_to_selected_device_with_ssid.replace("{{ssid}}", $.serialize(bridgeSsid))).appendTo($containerDiv);

    var $table = $("<table>").css({
        "width" : "100%",
        "margin" : "auto"
    }).appendTo($containerDiv);

    var $row = $("<tr>").appendTo($table);

    $("<td>").css("width", "30%").append($modemCirclesImage).appendTo($row);
    $("<td>").css("width", "40%").append($xImage).appendTo($row);
    $("<td>").css("width", "30%").append($deviceCirclesImage).appendTo($row);

    var $animationDiv = $("<div>").css("text-align", "left").appendTo($containerDiv);
    $("<div>").html(__ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem1).appendTo($animationDiv);
    $("<div>").html(__ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem2).appendTo($animationDiv);

    $animationDiv.append($("<div>").css("float", "left").append($modemImage));

    this.$deviceImg = $("<div>").css({
        "float" : "left",
        "padding-left" : "100px"
    }).append($deviceImage).appendTo($animationDiv);
    $animationDiv.append($("<div>").addClass("ui-helper-clearfix"));

    $("<div>").html(__ML_wireless_bridge_setup_location_of_the_device_is_bad_refresh).appendTo($animationDiv);
    this.$deviceImg.animate({
        "padding-left" : "0px"
    }, 2500);

    $("<div>").css("text-align", "right").append($("<button>").text(__ML_repeater_setup_start_over).button().addClass("airtiesButton")).click(function() {
        $(self).trigger("startOverClicked");
    }).appendTo($containerDiv);
    return $containerDiv;
};

/* WaitingForApScanView */

function WaitingForApScanView() {
}

WaitingForApScanView.prototype.r = function() {
    $("body").html(this.render());
};

WaitingForApScanView.prototype.render = function() {
    var $waitingDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget waitingDiv");

    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_welcome_to_our_installation_wizard).appendTo($waitingDiv);

    $("<div>").css("padding-top", "50px").html(__ML_bridge_setup_introduction_message).appendTo($waitingDiv);
    $("<div>").html(__ML_repeater_setup_searching_neighboring_access_points).css("padding-top", "50px").appendTo($waitingDiv);
    $("<div>").css("font-weight", "bold").html(__ML_repeater_setup_please_wait).appendTo($waitingDiv);
    return $waitingDiv;
};

/* WrongPasswordView */

function WrongPasswordView() {

}

WrongPasswordView.prototype.focus = function(bridgeSsid) {
    $("#wirelessPassword").focus();
};

WrongPasswordView.prototype.r = function(ssid) {
    ssid = ssid || "ssid";
    $("body").html(this.render(ssid));
};

WrongPasswordView.prototype.render = function(bridgeSsid) {
    var self = this;
    var $containerDiv = $("<div>").addClass("ui-widget ui-widget-content ui-corner-all airtiesWidget connectedDiv");
    $($containerDiv).bind("keypress", function(e) {
        if (e.keyCode == 13) {
            $(self).trigger("connectClicked", [bridgeSsid, $("#wirelessPassword").val()]);
        }
    });
    $("<div>").addClass("airtiesHeader").html(__ML_repeater_setup_wrong_password_please_try_again).appendTo($containerDiv);

    var $table = $("<table>").css({
        "width" : "100%",
        "margin" : "auto"
    }).appendTo($containerDiv);

    var $row = $("<tr>").appendTo($table);

    $("<td>").css("width", "30%").append($modemCirclesImage).appendTo($row);
    $("<td>").css("width", "40%").append($xImage).appendTo($row);
    $("<td>").css("width", "30%").append($deviceCirclesImage).appendTo($row);

    $("<div>").css({
        "text-align" : "left",
        "margin" : "25px 0"
    }).html(__ML_wireless_repeater_setup_check_wireless_password_of_your_device_p1 + $.serialize(bridgeSsid) + __ML_wireless_repeater_setup_check_wireless_password_of_your_device_p2).appendTo($containerDiv);

    var $passwordDiv = $("<div>").css("margin", "25px 0").addClass("ui-helper-clearfix").appendTo($containerDiv);
    $("<div>").css("float", "left").append(__ML_wireless_password + " :").appendTo($passwordDiv);
    var $passwordControl = $("<input>").attr({
        "id" : "wirelessPassword",
        "type" : "password"
    });
    $("<div>").css({
        "float" : "left",
        "text-align" : "left"
    }).append($passwordControl).appendTo($passwordDiv);
    $passwordControl.togglePasswordBox();

    var $buttonDiv = $("<div>").addClass("ui-helper-clearfix").appendTo($containerDiv);
    var $leftButtonDiv = $("<div>").css("float", "left").appendTo($buttonDiv);
    var $rightButtonDiv = $("<div>").css("float", "right").appendTo($buttonDiv);
    
    $leftButtonDiv.append($("<button>").text(__ML_back).button().addClass("airtiesButton").click(function() {
        $(self).trigger("backClicked");
    }));
    
    $rightButtonDiv.append($("<button>").text(__ML_repeater_setup_connect).button().addClass("airtiesButton").click(function() {
        $(self).trigger("connectClicked", [bridgeSsid, $passwordControl.val()]);
    }));
    
    return $containerDiv;
};

