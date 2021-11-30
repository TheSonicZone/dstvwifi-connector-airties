# dstvwifi-connector-airties
Hacking and more of this crippled Wi-Fi access point

## Background
MonoChoice sold these back in '15 as a means to connect the DSTV Explora to the internet for those maroons who were 
too thick to buy an Ethernet cable and plug it into the STB. At first it was possible to configure it as a Wi-Fi AP
but then they upgraded the firmware remotely and disabled it rendering this item useless for anything except MonoChoice's
DSTV Explora.

Because the unit is an OEM Airties unit, it is possible to do some hacking, but we cannot port OpenWRT to it at this time because of
the proprietary Wi-Fi radio chip. In future I might be able to but its all about effort vs reward, as of this date its an old piece
of shit and I am offering this because its educational. Ergo... FOR EDUCATIONAL USES ONLY

## What you will find here
These are files and oddiments hacked out the device for the yearbook entitled THE SONIC ZONE (ISSUE 2021)
So far we have dumped the internal web server's contents in a directory called webs (which is webs.tar.lzma unzipped)
This of course allows us to muck about and hack by uploading a new version.

Be careful, however, as this thing still "calls home" to a server at AirTies to fetch new firmware versions. 
As of this writing however, it seems that the site is no longer there, we will look at that later, and maybe use that to 
force uploading of the stock firmware (although we have spent many hours trying to do this through the web interface). Maybe we can find the older
(working) version, who knows!

## Warning

MonoChoice (aka MultiChoice) are not nice people... they will try and come at you/me with lawyers so use this repo AT YOUR OWN RISK.
In the interests of my yearbook, please do not go tell MonoChoice about this or try and post about this repo on places MonoChoice reps and staff
frequent such as the Mybroadband forums. Please!
