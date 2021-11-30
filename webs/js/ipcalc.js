function substr_count( haystack, needle, offset, length ) {
    var pos = 0, cnt = 0;
    haystack += '';
    needle += '';
    if(isNaN(offset)) offset = 0;
    if(isNaN(length)) length = 0;
    offset--;
    while( (offset = haystack.indexOf(needle, offset+1)) != -1 ){
        if(length > 0 && (offset+needle.length) > length){
            return false;
        } else{
            cnt++;
        }
    }
    return cnt;
}

function ip2long(ip) {
      var ips = ip.split('.');
      var iplong = 0;
      with (Math) {
          iplong = ips[0]*pow(256,3)+ips[1]*pow(256,2)+ips[2]*pow(256,1)+ips[3]*pow(256,0)
      }
      return iplong;
  }

function h_fillbitsfromleft(num)
{
    if (num >= 8 ){
        return(255);
    }
    bitpat=0xff00;
    while (num > 0){
        bitpat=bitpat >> 1;
        num--;
    }
    return(bitpat & 0xff);
}

function h_countbitsfromleft(num)
{
    if (num == 255 ){
        return(8);
    }
    i = 0;
    bitpat=0xff00;
    while (i < 8){
        if (num == (bitpat & 0xff)){
            return(i);
        }
        bitpat=bitpat >> 1;
        i++;
    }
    return(Number.NaN);
}




function calcNWbits(d1, d2, d3, d4)
{
    sumofbits=0;
    tmpvar = parseInt(d1,10);
    if (isNaN(tmpvar)){
        return false;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        return false;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(d2,10);
    if (isNaN(tmpvar)){
        return false;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        return false;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(d3,10);
    if (isNaN(tmpvar)){
        return false;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        return false;
    }
    sumofbits+=bitsfromleft;
    tmpvar = parseInt(d4,10);
    if (isNaN(tmpvar)){
        return false;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        return false;
    }

    return sumofbits;
}




function calNBFL(ipAddress, netMask) {

    if(substr_count(ipAddress, ".") != 3 || substr_count(netMask, ".") != 3)
    {
      return false;
    }

    var ipDigits = ipAddress.split('.');
    var maskDigits = netMask.split('.');

    if(ipDigits.length != 4 &&  maskDigits.length != 4)
    {
      return false;
    }

    var rt=0;
    for(var i =0; i < ipDigits.length; i++)
    {
      tmpvar = parseInt(ipDigits[i],10);
      if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
          return false;
      }
    }

    for(var i =0; i < maskDigits.length; i++)
    {
      tmpvar = parseInt(maskDigits[i],10);
      if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
          return false;
      }
    }

    tmpvar=parseInt(calcNWbits(maskDigits[0], maskDigits[1], maskDigits[2], maskDigits[3]) ,10);
    if (tmpvar <0 || tmpvar >32 || tmpvar == false){
        return false;
    }

    var startIpAddress = new Array();
    var endIpAddress = new Array();

    if (tmpvar == 31){

        startIpAddress[0] =  ipDigits[0] & maskDigits[0];
        startIpAddress[1] =  ipDigits[1] & maskDigits[1];
        startIpAddress[2] =  ipDigits[2] & maskDigits[2];
        startIpAddress[3] =  (ipDigits[3] & maskDigits[3]);
        startIpAddress[3] = startIpAddress[3];

        endIpAddress[0] =  ipDigits[0] | (~ maskDigits[0] & 0xff);
        endIpAddress[1] =  ipDigits[1] | (~ maskDigits[1] & 0xff);
        endIpAddress[2] =  ipDigits[2] | (~ maskDigits[2] & 0xff);
        endIpAddress[3] =  ipDigits[3] | (~ maskDigits[3] & 0xff);
    }
    else if (tmpvar == 32){
        startIpAddress[0] =  ipDigits[0];
        startIpAddress[1] =  ipDigits[1];
        startIpAddress[2] =  ipDigits[2];
        startIpAddress[3] =  ipDigits[3];

        endIpAddress[0] =  ipDigits[0];
        endIpAddress[1] =  ipDigits[1];
        endIpAddress[2] =  ipDigits[2];
        endIpAddress[3] =  ipDigits[3];
    }
    else
    {

      startIpAddress[0] =  ipDigits[0] & maskDigits[0];
      startIpAddress[1] =  ipDigits[1] & maskDigits[1];
      startIpAddress[2] =  ipDigits[2] & maskDigits[2];
      startIpAddress[3] =  ipDigits[3] & maskDigits[3];
      startIpAddress[3] = startIpAddress[3];



      endIpAddress[0] =  ipDigits[0] | (~ maskDigits[0] & 0xff);
      endIpAddress[1] =  ipDigits[1] | (~ maskDigits[1] & 0xff);
      endIpAddress[2] =  ipDigits[2] | (~ maskDigits[2] & 0xff);
      endIpAddress[3] =  ((ipDigits[3] | (~ maskDigits[3] & 0xff)) - 1);
      if(endIpAddress[3] == -1 )
      {
        endIpAddress[3] = startIpAddress[3];
      }
    }
    if(tmpvar != 32)
    {
      if(ipDigits[3] > startIpAddress[3])
      {
        startIpAddress[3] = ipDigits[3];
      }
    }
    return {"startAddress": startIpAddress.join(".") ,"endAddress": endIpAddress.join(".")};
}