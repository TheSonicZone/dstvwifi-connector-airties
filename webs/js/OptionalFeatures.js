var __of_usernameFormat = 1;
var __of_usernameFormatChanged = false;
var __of_network = "ttnet";


function __of_ChangeUsernameFormat(__of_obj)
{
    if(__of_usernameFormat==1) {
        var __of_childNodes = __of_obj.childNodes;
        if(__of_usernameFormatChanged) {
            __of_obj.innerHTML = "<input type='text' value='"+ __of_childNodes[0].value + __of_childNodes[1].nodeValue + "' size='14' maxlength='128' id='__V_ppp_username'>"
            __of_usernameFormatChanged = false;
        }
        else
        {
            var __of_username = __of_childNodes[0].value.split('@');
            __of_network = __of_username[1];
            __of_obj.innerHTML = "<input type='text' value='" + __of_username[0] + "' size='10' maxlength='122' id='__V_ppp_username'>" + __of_network;
            __of_usernameFormatChanged = true;
        }
    }
}



var AbstractControl = Class.extend({

construct: function() {},
DynamicUI: function() {}
});


var EmptyControl = AbstractControl.extend({

construct: function(){},
DynamicUI: function() {
    return("");
}
});

var UsernameStandart = AbstractControl.extend({

construct: function(){},
DynamicUI: function(username, network) {
    return("<input type='text' value='"+ username + network + "' size='14' maxlength='128' id='__V_ppp_username'>");
}
});

var UsernameTwain = AbstractControl.extend({

construct: function(){},
DynamicUI: function(username, network) {
    return("<input type='text' value='" + username + "' size='9' maxlength='100' id='__V_ppp_username'>@<input type='text' value='" + network + "' size='4' maxlength='28' id='__V_ppp_network' readonly='readonly'>");
}
});

var UsernameCombo = AbstractControl.extend({

construct: function(){},
DynamicUI: function(username, network) {
var network_list = __DEF_UsernameExt.split(":");
var returnValue = "<input type='text' value='" + username + "' size='9' maxlength='100' id='__V_ppp_username'>@<select id='__V_ppp_network'>";
for(var i = 0; i < network_list.length; i++)
{
returnValue += "<option value='" + network_list[i] + "'" + (network_list[i] == network ? " selected = 'selected'>" : ">")  + network_list[i] + "</option>";
}
returnValue += "</select>";
return(returnValue);
		}
});

var ControlFactory = Class.extend({

construct: function() {},
Create: function(devType) {
    var type;
    try{type = eval(devType);}
    catch(err)
    {
        type = EmptyControl;
    }

    return new type();
}
});



