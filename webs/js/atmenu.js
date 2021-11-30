/********************************************************************

	atmenu.js
	
	Sinan Baltacioglu - Oct 9th, 2006
	
	Controls the left menu of the web interface. As long as the list
	follows the atmenu.css styles defined, as well as a proper 
	nesting of ul and li + a elements, it will work as intended.

********************************************************************/

var FADE_STEP_TIME_MILLIS = 50;
var FADE_STEP_GRADE = 10;
var FADE_OPACITY_START = 0;

var g_currentSelection = ''; // Keeps track of which menu item was clicked so we can hide it if it is clicked again

var hasVLAN = "<? query logic:status/has_vlan ?>";
function uiDoLogout()
{
  if (top.location != location) top.location.href = "../cgi-bin/webcm?getpage=../html/logout.html";
}

function uiDoRefresh()
{
  top.mainFrame.location.href=top.mainFrame.location;
}


/********************************************************************

	showMenu(id)
	
	This simply changes the display setting of the submenu that
	was clicked. It will hide all other menus first.	

********************************************************************/
function showMenu(id) 
{
	// grab the root menu element so we can use it
	var menuMainEl = document.getElementById('mainlevel');
	// This hides all submenus, comment out if you want the menus to stay open until reclicked
	//hideAllSubMenus(menuMainEl.getElementsByTagName('ul'));
	// If the id is not found, that means we do not have a submenu for this item
//	if(document.getElementById(id) != null)
	// Toggle the click item 
	if(g_currentSelection != id)
	{
		// Set the current selection to the new item
		if(document.getElementById(g_currentSelection) != null)
		    document.getElementById(g_currentSelection).style.display = '';
		g_currentSelection = id;
		// Make it's submenu visible
		if(document.getElementById(id) != null)
		{
		    //document.getElementById(id).style.display = 'block';
		    //$("#" + id).parent("li").toggleClass("active");
		    // Setup the fading
		    startFade(id);
		}
	}
	return true;
}

/********************************************************************

	hideAllSubMenus(subMenus)
	
	Takes in an array of submenu uls, then it will hide them all	

********************************************************************/
function hideAllSubMenus(subMenus)
{
	for(var i = 0; i < subMenus.length ; i++)
	{
		subMenus[i].style.display = '';
	}
}

/********************************************************************

	startFade(id)
	
	Prepares the element to be faded and starts the fading process

********************************************************************/
function startFade(id)
{
	document.getElementById(id).style.visibility = 'visible';
	setElementOpacityById(id, 0);
	fadeIn(id, FADE_OPACITY_START, FADE_STEP_GRADE, FADE_STEP_TIME_MILLIS);
}

/********************************************************************

	setElementOpacityById(element, opacity)
	
	Set the given elements opacity to the given value

********************************************************************/
function setElementOpacityById(id, opacity)
{
	var element = document.getElementById(id);
	// Mozilla Bug Handling
	opacity = (opacity == 100)?99.999:opacity;
	// Mozilla, Firefox (Old)
	element.style.MozOpacity = opacity/100;
	// Mozilla, Firefox (New), CSS3, Safari 1.2
	element.style.opacity = opacity/100;
	// Internet Explorer
	element.style.filter = "alpha(opacity:"+opacity+")";
	// Safari (Old), Konqueror
	element.style.KHTMLOpacity = opacity/100;
}

/********************************************************************

	fadeIn(id, currOpacity, opacityStepAmount, opacityStepTime)
	
	Slowly fades the element with id in, by the opacityStepAmount
	in a time of opacityStepTime ms. Recursive until 100% opacity

********************************************************************/
function fadeIn(id, currOpacity, opacityStepAmount, opacityStepTime) 
{
	if (currOpacity <= 100)
	{
		setElementOpacityById(id, currOpacity);
		currOpacity += opacityStepAmount;
		window.setTimeout("fadeIn('"+id+"',"+currOpacity+","+opacityStepAmount+","+opacityStepTime+")", opacityStepTime);
	}
}

