function ClickCancel() {
  document.location.href = document.location;
}

 function hex2String(h) {
   return parseInt(h,16);
 }

function dec2Hex(dec){
  dec = Math.abs(dec);
  var hex = "";
  var a = "" + dec;
  a = a.length;
  var h = "0123456789ABCDEF";
  var n=0;
  for (n; n<a; n++){
    he = h.charAt(dec-Math.floor(dec/16)*16);
    dec = (dec - h.indexOf(he)) / 16;
    hex = he + hex;
  }
  if (hex.charAt(0) == "0" && hex.length != 1) hex = hex.substring(1,hex.length);
  return hex.length>1 ? hex : "0"+hex;
}

 function string2Hex(s) {
   var hValue = s.charCodeAt(0).toString(16)
   return hValue.length>1 ? hValue : "0"+hValue;
 }

 function hex2Dec(h) {
   return parseInt(hex2String(h))
 }

function parseDate(dateStr) {
  d = dateStr.substr(0,2);
  m = dateStr.substr(2,2);
  y = dateStr.substr(4,4);
  
  dateStr = y+'/'+m+'/'+d+dateStr.substr(8,dateStr.length)
  return dateStr;
}
