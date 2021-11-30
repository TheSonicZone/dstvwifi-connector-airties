var errorMessage = ""
var userMessage = ""

// remove leading whitespace 
String.prototype.lTrim = function () {
  return this.replace(/^\s*/, "");
}

// remove trailing whitespace
String.prototype.rTrim = function () {
  return this.replace(/\s*$/, "");
}

// remove leading and trailing whitespace
String.prototype.trim = function () {
  return this.rTrim().lTrim();
}

function IP2int(IPvalue) {
  var tmpArray = IPvalue.split(".");
  return((tmpArray[0] * 0x1000000) + (tmpArray[1] * 0x10000) + (tmpArray[2] * 0x100) + (tmpArray[3] * 0x01));
}

function int2IP(IPint) {
  tmpStr = "";
  tmpStr = (IPint >>> 24) + "." + ((IPint >>> 16) & 0xFF) + "." + ((IPint >>> 8) & 0xFF) + "." + (IPint & 0xFF);
  return tmpStr;
}

function verifyIP (IPvalue,AddressOrMaskOrGateway) { //GM: Gateway,pool start-end, dns check added
  //verify IP Address

  errorString = "";
  
 //GM: Address type switched
  switch ( AddressOrMaskOrGateway ) 
  {
  case 0:
  theName = __js_netmask ;
  break;
  
  case 1:
  theName = __js_ip ;
  break;
  
  case 2:
  theName = __js_gateway ;
  break;
  
  case 3:
  theName = __js_dhcp_pool_start;
  break;
  
  case 4:
  theName = __js_dhcp_pool_end;
  break;
  
  case 5:
  theName = __js_dhcp_dns1;
  break;
  
  case 6:
  theName = __js_dhcp_dns2;
  break;
  }  
  var ipArray = IPvalue.split(".");

  if (!ipArray || ipArray.length != 4)
    errorString += theName+__js_invalid_ip_ex;
  else {
    var i = 0;
    for (i = 0; i < 4; i++) {
      thisSegment = ipArray[i];
      if (thisSegment.trim() != "") {
        if (!(thisSegment >=0 && thisSegment <= 255)) { //check if number?
          errorString += theName + __js_invalid_ip_out_of_range ;
          i = 4;
        }
      } else
         errorString += theName+" "+__js_invalid_ip_ex ;
    }
  }
  if (errorString != "") {
    errorMessage = errorString+"\n";
    return false;
  }
  return true;
}

function verifyIPAddress (IPvalue, NullAllowed) {
  errorString = "";
  validValue = true;
  
  if (NullAllowed && (IPvalue == "0.0.0.0")) {
    return true;
  }

  if (verifyIP(IPvalue,true)) {
    var ipArray = IPvalue.split(".");    
    if ( !( (ipArray[0] >= 1) && (ipArray[0] <= 223) ) ) {
      errorString += __js_invalid_ip_first_portion_out_of_range ;
      validValue = false;
    }
  } else {
    validValue = false;
  }

  if (errorString != "") {
    errorMessage = errorString+"\n";
  }
  return validValue;
}

function verifyMask (Mask) {
  validValue = true;
  
  if( verifyIP(Mask,false) ){
    var ipArray = Mask.split(".");
    var ipTest = 0;
    if( ipArray[0] < 255 ) {
      if( (ipArray[1] > 0) || (ipArray[2] > 0) || (ipArray[3] > 0) ) {
        validValue = false;
      } else { 
        ipTest = ipArray[0];
      }
    } else {
      if( ipArray[1] < 255 ) {
        if( (ipArray[2] > 0) || (ipArray[3] > 0) ) {
          validValue = false;
        } else {
          ipTest = ipArray[1];
        }
      } else {
        if( ipArray[2] < 255 ) {
          if( (ipArray[3] > 0) ) {
            validValue = false;
          } else {
            ipTest = ipArray[2];
          }
        } else {
          ipTest = ipArray[3];
        }
      }
    }
    if( validValue ) {
      switch( ipTest ) {
      case "0":
      case "128":
      case "192":
      case "224":
      case "240":
      case "248":
      case "252":
      case "254":
      case "255":
        break;
      default:
        validValue = false;
      }
    }
    if( Mask == "0.0.0.0" ) {
      validValue = false;
    }
  } else {
    validValue = false;
  }

  if( !validValue )
    errorMessage = __js_invalid_gateway ;
  return validValue;
}

  function verifyMAC(macAddress) {
    // This function checks whether the address given is in MAC Address notation
    // MAC Address format is: 00:00:00:00:00:00
    validValue = true
    if (macAddress.length != 17) {
      validValue = false
    } else {
      testAddress = macAddress
      while (testAddress.trim() != "") {
        nrs = testAddress.substring(0,2)
        //  Use line below when MAC Address can only contain : . -
        if (testAddress.charAt(2) != ":" && testAddress.charAt(2) != "" && testAddress.charAt(2) != "." && testAddress.charAt(2) != "-"  && testAddress.charAt(2) != " ") return false
        if (validValue && !isHex(nrs)) { 
          errorMessage = macAddress+__js_invalid_MAC; 
          validValue = false;
        }
        testAddress = testAddress.substring(3,testAddress.length)
      }
      if (validValue && parseInt(macAddress.charAt(1),16) % 2 != 0) {
        errorMessage = macAddress+__js_invalid_MAC_second_ch_even; 
        validValue = false;
      }
    }
    if (!validValue)
      if (errorMessage == "")
        errorMessage =__js_invalid_MAC_ex ;
    return validValue
  }

function verifyRange (min, max) {
  min = parseInt(min);
  max = parseInt(max);
  if (min <= max)
    return (min <= max)
  else {
    alert(__js_incorrect_range )
    return false;
  }
}

function validateString (str) {
// allowed characters: 32,33,35-126 (34=", 39=')
// accents are not allowed: 34, 39, 192-214 + 217-246 + 249-255 + 191 (=¿)

  validString = true;
  var i=0;
  for (i=0;i<str.length;i++) {
    nr = str.charCodeAt(i) 
    if (!(nr>=32 && nr<=126 && nr != 34 && nr != 39)) {
      validString = false
      //errorMessage += __js_invalid_characters ;
      break
    }
  }
  return validString
}

function validateHexString (str) {
// allowed characters: 48-57 (0-9), 65-70 (A-F), 97-102 (a-f)

  validString = true;
  var i=0;
  for (i=0;i<str.length;i++) {
    nr = str.charCodeAt(i) 
    if (!((nr >= 48 && nr <= 57) || (nr >=65 && nr <= 70) || (nr >=97 && nr <= 102))) {
      validString = false
      //errorMessage = __js_incorrect_value_0_9_a_f;
      break;
    }
  }
  return validString
}

function strLength(str, length) {
  if (str.length != length) {
    errorMessage = __js_incorrect_value_max_length_characters ;
    return false;
  } return true;
}

/*
  // example. The # is used to seperate the different strings
  var macList = ""
  macList += "#" + "FF:FF:FF:FF:FF:FF"
  macList += "#" + "FF:FF:00:00:00:00"
*/
  
  function uniqueMACAddress(macValue, macList) {
    macValue = macValue.toUpperCase();
    macList = macList.toUpperCase();

    //if the MAC Address is not yet in the list
    return (macList.indexOf(macValue) == -1);
  }

  function uniqueIPAddress(ipValue, ipList) {
    return (ipList.indexOf(ipValue) == -1);  
  }
  
  function uniqueInList(unValue, unList) {
    return (unList.indexOf(unValue) == -1);  
  }

function macKeyFilter(e) {
//allow 0-9, A-F, a-f
//allow 45=-, 46=., 32= , 58=:
  if(window.event) // IE
    {
    if ((event.keyCode >= 48 && event.keyCode<=57) || (event.keyCode >= 65 && event.keyCode <= 70) || (event.keyCode >= 97 && event.keyCode <= 102) || 
      (event.keyCode == 58))
        event.returnValue = true;
    else
        event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ((e.which >= 48 && e.which<=57) || (e.which >= 65 && e.which <= 70) || (e.which >= 97 && e.which <= 102) || 
      (e.which == 58 || e.which == 8)) 
      {
      return true;
      } else {
      return false;
      }
    } 
}

function hexKeyFilter() {
//allow 0-9, A-F, a-f
  if(window.event) // IE
    {
    if ((event.keyCode >= 48 && event.keyCode<=57) || (event.keyCode >= 65 && event.keyCode <= 70) || (event.keyCode >= 97 && event.keyCode <= 102))
      event.returnValue = true;
    else
      event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 70) || (e.which >= 97 && e.which <= 102) || e.which == 8 )
      return true;
    else
      return false;
    }
}

function ipKeyFilter(e) {
//allow 0-9 & "."
  if(window.event) // IE
    {
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 46)
      event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ( (e.which < 48 || e.which > 57) && (e.which != 46 && e.which != 8 ) )
      return false;
    }
  
}

function phoneKeyFilter() {
//allow 0-9 & "+-,w"
  if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 43 && event.keyCode != 44 && event.keyCode != 45 && event.keyCode != 119)
    event.returnValue = false;
}

function digitKeyFilter(e) {
//allow 0-9
  if(window.event) // IE
    {
    if (event.keyCode < 48 || event.keyCode > 57)
      event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ((e.which < 48 || e.which > 57 ) && e.which != 8 )
      return false;
    }
}

function printableKeyFilter(e) {
  if(window.event) // IE
    {
    if (event.keyCode < 32 || event.keyCode > 126 ) 
      event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ((e.which < 32 || e.which > 126 ) && e.which != 8)
      return false;
    }
}

function SSIDKeyFilter(e) {
  if(window.event) // IE
    {
    if (event.keyCode == 34 || event.keyCode == 92 )
      event.returnValue = false;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
    if ((e.which == 34 || e.which == 92 ) && e.which != 8)
      return false;
    }
}

function handleError(handleFunc) {
  retValue = handleFunc
  if (!retValue) {
    if (errorMessage != "") {
      alert(errorMessage)
      errorMessage = ""
      return false
    } else
    return false    
  } else
    return true
}

function handle(handleFunc) {
  return handleFunc
}

function validateInput(objStr,validateFunc) {
//validate input with the given validation function
//show errorMessage, but only 1 per submit-request

  var result = validateFunc;
  if (!result) {
    if (userMessage=="") {
      if( objStr=="" )
        userMessage = errorMessage;
      else
        userMessage = "(" + objStr + " " + __js_err + " ): " + errorMessage;
    }
    return false;
  } else
    return true;
}

function directValidation(objStr, validateFunc) {
//validate input with the given validation function
//show errorMessage directly
  userMessage=""; // GM: Clear user message if there is any previously
  var result = validateInput(objStr, validateFunc);
  if (!result) {
    alert(userMessage);
    return false;
  } else
    return true;
}

function announceValidation() {
  if (userMessage != "") {
    alert(userMessage);
    userMessage = "";
    errorMessage = "";
    return false;
  } else
    return true;
}

function trimLeft(s) {
  //removes spaces at the beginning of a string
  while(''+s.charAt(0)==' ')
    s = s.substring(1,s.length);
  return s
}

function isHex(nr) {
  // This function checks whether a number is a hexadecimal number
  nrStr = "" + nr;
  var i=0;
  for (i=0; i < nrStr.length; i++) {
    var oneNr = nrStr.charAt(i)
    if ((oneNr >= "0" && oneNr <= "9") || (oneNr >= "a" && oneNr <= "f") || (oneNr >= "A" && oneNr <= "F")) { }
    else return false
  }
  return true;
}

function checkAndFormatIpAddress(ipAddress) {
  //var returnValue = "";
  var portionStart = 0;
  var portionCounter = 1;
  ipAddress = "" + ipAddress;
  var i=0;
  for (i=0; i< ipAddress.length; i++) {
    var curChar = ipAddress.charAt(i);
    if (curChar == ".") {
      //if the portion's value is not between 0 and 255 throw error
      var curVal = ipAddress.substring(portionStart,i);
      if (curVal < 0 || curVal > 255) {
        alert(__js_incorrect_ip_larger_255);
        return false;
      }
      portionCounter++;
      portionStart = i + 1;
    } else if (curChar >="0" && curChar <="9") {
    } else {
      alert(__js_incorrect_ip_seperation);
      return false;
    }
  }
  if (portionCounter != 4) {
    alert(__js_invalid_ip_ex );
    return false;
  }
  var curVal = ipAddress.substring(portionStart,ipAddress.length);
  if (curVal < 0 || curVal > 255) {
    alert(__js_incorrect_ip_larger_255);
    return false;
  }
  //return returnValue;
  return ipAddress;
}

function isValidPort(s) {
  if(!isNumeric(s))
    return(false);

  if((s > 65535) || (s < 1))
    return(false);

  return(true);
}
function checkMacAddress(macAddress) {
  macAddress = macAddress.toUpperCase()

  if (verifyMAC(macAddress) && macAddress != '00:00:00:00:00:00' && macAddress != 'FF:FF:FF:FF:FF:FF') {  
    return true;
  }

  if (errorMessage == "")
    errorMessage += macAddress+__js_invalid_MAC ;
  return false;
}	
	

function checkAndFormatMacAddress(macAddress) {
  // This function checks and converts a MAC Address to a specified address-notation
  // MAC Address format is: 00:00:00:00:00:00
  // eg. convertMacAddress('00-00-00-00-00-00') returns 00:00:00:00:00:00

  if (verifyMAC(macAddress)) {
    var i=0;
    for (i = 1;i < 6; i++) {
      macAddress = macAddress.substring(0,i*3 - 1) + ":" + macAddress.substring(i*3,macAddress.length);
    }
    return macAddress;
  }
  errorMessage += macAddress+__js_invalid_MAC ;
  return false;
}
