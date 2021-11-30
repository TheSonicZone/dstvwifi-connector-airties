function Class() { }
Class.prototype.construct = function() {};
Class.extend = function(def) {
	var classDef = function() {
		if (arguments[0] !== Class) { this.construct.apply(this, arguments); }
	};
	var proto = new this(Class);
	var superClass = this.prototype;
	for (var n in def) {
		var item = def[n];
		if (item instanceof Function) item.$ = superClass;
		proto[n] = item;
	}
	classDef.prototype = proto;
	classDef.extend = this.extend;
	return classDef;
};
var BaseClass = Class.extend({
	id: "default",
 disabled: false,
 construct: function(id) {
	 if(id != undefined) this.id = id;
 },

 getId: function() {
	 return this.id;
 }
});

var atTable = BaseClass.extend({
	header: "",
 footer: "",
 margin: "auto",
 paddingLeft: "20px",
 paddingRight: "20px",
 firstRowIsColumnHeader: false,
 styleArray: new Array("table_style_alt_th", "table_style_alt"),
 rows: new Array(),
 construct: function(id) {
	 this.rows = new Array();
	 arguments.callee.$.construct.call(this, id);
 },
 getId: function() {
	 return this.id;
 },
 addRow: function(cellArray) {
	 this.rows.push(cellArray);
 },
 get: function() {
	 var table = document.createElement("table");
	 table.style.margin = this.margin;
	 table.id = this.id;
	 table.cellSpacing = 0;
	 var tbody = document.createElement("tbody");
	 for(var i = 0; i < this.rows.length; i++)
	 {
		 var tr = document.createElement("tr");
		 if(i == 0 && this.firstRowIsColumnHeader) {tr.className = "table_style_ana_th"; tr.style.height = "21px";}
		 else tr.className = this.styleArray[i%this.styleArray.length];
		 for(var j = 0; j < this.rows[i].length; j++)
		 {
		 		this.rows[i][j].style.paddingLeft = this.paddingLeft;
				this.rows[i][j].style.paddingRight = this.paddingRight;
// 				this.rows[i][j].style.textAlign = "center";

			 tr.appendChild(this.rows[i][j]);
		 }
		 tbody.appendChild(tr);
	 }

	 table.appendChild(tbody);
	 return table;
 }
});

var atDiv = BaseClass.extend({
	objectArray: new Array(),
 construct: function(id, object) {
	 this.objectArray = new Array();
	 if(object != undefined) this.append(object);
	 arguments.callee.$.construct.call(this, id);
 },
 append: function (object) {
	 this.objectArray.push(object);
 },
 get: function () {
	 var div = document.createElement("div");
	 div.id = this.id;
	 for(var k = 0; k < this.objectArray.length; k++)
	 {
		 div.appendChild(this.objectArray[k]);
	 }
	 return div;
 }
}
)

		var atTableCell = BaseClass.extend({
	colspan: 1,
 objectArray: new Array(),
 textAlign: "center",
//  visible: true,
 construct: function(id, object) {
	 this.objectArray = new Array();
	 if(object != undefined) this.append(object);
	 arguments.callee.$.construct.call(this, id);
 },
 append: function (object) {
	 this.objectArray.push(object);
 },
 get: function () {
	 var td = document.createElement("td");
	 td.id = this.id;
	 td.setAttribute("colspan", this.colspan);
	 td.style.textAlign = this.textAlign;
// 	 td.style.paddingLeft = "20px";
// 	 td.style.visibility = this.visible;
	 for(var k = 0; k < this.objectArray.length; k++)
	 {
// 	 alert(this.objectArray[k]);
		 td.appendChild(this.objectArray[k]);
	 }
	 return td;
 }
		});

var atButton = BaseClass.extend({
			value: "atButton",
			eventArray: new Array(),
			className: "inputButton",
   construct: function(id, value) {
   		this.eventArray = new Array();
	   this.value = value;
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var button = document.createElement("input");
	   button.type = "button";
	   button.id = this.id;
	   button.value = this.value;
	   button.className = "inputButton";
	   for(var i = 0; i < this.eventArray.length; i++)
	   {
						  eval(this.eventArray[i]);
		   }
	   return button;
	   },
	   addEvent: function(event, eventFunction) {
	   this.eventArray.push("button." + event + " = function() {" + eventFunction + "}");
   }
		});



		var atCheckbox = BaseClass.extend({
	checked: false,
	disabled: false,
   eventArray: new Array(),
   eventNameArray: new Array(),
   eventFunctionArray: new Array(),
   construct: function(id, checked) {
   this.checked = checked;
	   this.eventArray = new Array();
	   eventNameArray = new Array();
	eventFunctionArray = new Array();
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var cb;

	   try{
		   cbString = "<input type ='checkbox' id='" + this.id + "'";
		if(this.disabled) cbString += " disabled='disabled'";
		   for(var i = 0; i < this.eventArray.length; i++)
		   {
			   cbString += " " + this.eventNameArray[i] + "='" + this.eventFunctionArray[i] + "'";
		   }
		   if(this.checked) cbString += " checked='checked'";
		   cbString += "/>";
		   cb = document.createElement(cbString);
	   }catch(ex)
	   {
		cb = document.createElement("input");
	   cb.type = "checkbox";
	   cb.id = this.id;
		cb.checked = this.checked;
		cb.disabled = this.disabled;
	   for(var i = 0; i < this.eventArray.length; i++)
	   {
		   eval(this.eventArray[i]);
	   }
	   }
	   return cb;
   },
   addEvent: function(event, eventFunction) {
	   this.eventNameArray.push(event); this.eventFunctionArray.push(eventFunction);
	   this.eventArray.push("cb." + event + " = function() {" + eventFunction + "}");
   }
		});

		var atTextbox = BaseClass.extend({
		value: "",
		construct: function(id, value) {
		this.value = value;
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var textbox;

	   try
	   {
	   textbox = document.createElement("<input type ='text' id='" + this.id + "' value='" + this.value + "'/>");
	   }catch(ex)
	   {
	   	textbox = document.createElement("input");
		textbox.type = "text";
		textbox.id = this.id;
		textbox.value = this.value;
   		}
		return textbox;
		}});

		var atSpan = BaseClass.extend({
			innerHTML: "atSpan",
			visible: true,

   construct: function(id, innerHTML) {
	   this.innerHTML = innerHTML;
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var span = document.createElement("span");
	   span.id = this.id;
	   span.innerHTML = this.innerHTML;
	   span.style.display = this.visible ? "" : "none";
	   return span;
   }
		});


		var atCombobox = BaseClass.extend({
			optionArray: new Array(),
   value: "",
   construct: function(id, optionArray, value) {
	   this.optionArray = optionArray;
	   this.value = value;
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var combobox = document.createElement("select");
	   combobox.id = this.id;
	   for(var i = 0; i < this.optionArray.length; i++)
	   {
		   var option = document.createElement("option");
		   option.id = "opt_" + this.id + "_" + this.optionArray[i][0];
		   option.value = this.optionArray[i][0];
		   option.innerHTML = this.optionArray[i][1];
		   if(this.value == option.value) option.selected = true;
		   else option.selected = false;
		   combobox.appendChild(option);
		   // if(this.checked == true)
// {
// var newAttr = document.createAttribute("checked");
// newAttr.nodeValue = true;
// radio.setAttributeNode(newAttr);
// }d(option);
	   }
	   combobox.disabled = this.disabled;
	   return combobox;
   }
		});
		var atRadio = BaseClass.extend({

			name: "",
   value: "",
   spanText: "",
   eventArray: new Array(),
   visible: true,
   className: "menuStyle",
   construct: function(id, name, value, spanText) {
	   this.eventArray = new Array();
	   this.value = value;
	   this.spanText = spanText;
	   this.name = name;
	   arguments.callee.$.construct.call(this, id);
   },
   get: function () {
	   var radio;
	   try
	   {
		   radio = document.createElement("<input id='" + this.id + "' type='radio' name='" + this.name + "' value='" + this.value + "' class='" + this.className + "'/>");
	   }
	   catch(ex)
	   {
		   radio = document.createElement("input");
		   radio.id = this.id;
		   radio.name = this.name;
		   radio.type = "radio";
		   radio.value = this.value;
		   radio.className = this.className;
		}

		   var returnObject = radio;
		   for(var i = 0; i < this.eventArray.length; i++)
		   {
			   eval(this.eventArray[i]);
		   }
		   if(this.spanText != "" && this.spanText != undefined )
		   {
			   var span = document.createElement("span");
			   span.innerHTML = this.spanText;

			   var c = document.createElement("span");
			   c.appendChild(radio);
			   c.appendChild(span);
			   returnObject = c;
		   }
		   returnObject.style.display = this.visible ? "" : "none";
		   return returnObject;

   },

   addEvent: function(event, eventFunction) {
	   this.eventArray.push("radio." + event + " = function() {" + eventFunction + "}");
   }
		});
			var atLink = BaseClass.extend({
			target: "_self",
			href: "",
			innerHTML: "",
			className: "",
			construct: function(id, target, href, innerHTML) {
			this.innerHTML = innerHTML;
			this.target = target;
			this.href = href;
			arguments.callee.$.construct.call(this, id);
			},
			get: function () {
			var link = document.createElement("a");
			link.id = this.id;
			link.target = this.target;
			link.href = this.href;
			link.className = this.className;
			var span = document.createElement("span");
			span.id = "span_" + this.innerHTML;
			span.innerHTML = this.innerHTML;
			link.appendChild(span);
			return link;
			}
		});

		var atListbox = BaseClass.extend({
		optionArray: new Array(),
		value: "",
		size: "10",
		listWidth: "100px",
		construct: function(id, optionArray, value) {
		this.optionArray = optionArray;
		this.value = value;
		arguments.callee.$.construct.call(this, id);
		},
		get: function () {

		var listbox;
		try
		{
			listbox = document.createElement("<select id='" + this.id + "' size='" + this.size + "' width='" + this.listWidth + "' multiple/>");
		}
		catch(ex)
		{
		listbox = document.createElement("select");
		listbox.id = this.id;
		listbox.size = this.size;
		listbox.style.width = this.listWidth;
		}
		for(var i = 0; i < this.optionArray[0].length; i++)
						   {

						   if(this.optionArray[0][i] != undefined &&  this.optionArray[1][i] != undefined)
						   {
						   var option = document.createElement("option");
						   option.id = "opt_" + this.id + "_" + this.optionArray[0][i];
						   option.value = this.optionArray[0][i];
						   option.innerHTML = this.optionArray[1][i];
						   if(this.value == option.value) option.selected = true;
						   else option.selected = false;
						   listbox.appendChild(option);
						   }
						   }
		listbox.disabled = this.disabled;
		return listbox;
		}
		});

function CreateWaitDiv()
{
	var div = document.createElement("div");
	div.id = "waitDiv";
	div.style.textAlign = "center";
	div.appendChild(document.createTextNode(__ML_please_wait));
	div.appendChild(document.createElement("br"));
	var img = document.createElement("img");
	img.src = "/images/ajax-loader.gif";
	div.appendChild(img);
	document.body.appendChild(div);
}

function CreateContentDiv(caption, intro)
{
	var div = document.createElement("div");
	div.id = "contentDiv";
	div.className = "menustyle";
	div.style.width = "100%";
	div.style.display = "none";
	div.style.textAlign = "center";
	div.style.verticalAlign = "middle";
	if(caption != undefined)
	{
		var captionDiv = document.createElement("div");
		captionDiv.id = captionDiv;
		captionDiv.className = "table_style_ana_th";
		captionDiv.style.width = "100%";
		captionDiv.style.height = "21px";
		captionDiv.style.textAlign = "center";
		captionDiv.innerHTML = eval(caption);
		div.appendChild(captionDiv);
	}
	if(intro != undefined)
	{
		var div2 = document.createElement("div");
		div2.setAttribute('class', 'commentStyle');
		var span = document.createElement("span");
		span.id = intro;
		span.innerHTML = eval(intro);
		span.paddingLeft = "10%";
		span.paddingRight = "10%";
		span.textAlign = "justify";
		span.margin = "auto";
		var br = document.createElement("br");
		div.appendChild(br);
		var br = document.createElement("br");
		div.appendChild(br);
		div2.appendChild(span);
		div.appendChild(div2);
	}
	document.body.appendChild(div);
}

function CreatePageCaption(captionText)
{
	var div = document.createElement("div")
	div.className = "table_style_ana_th";
	div.style.width = "100%";
	div.style.height = "21px";
	div.style.textAlign = "center";
	var textNode = document.createTextNode(captionText);
	div.appendChild(textNode);
	document.getElementById("contentDiv").appendChild(div);
}

function CreateSpace(count)
{
	for(var i = 0; i < count; i++)
	{
		document.getElementById("contentDiv").appendChild(document.createElement("br"));
	}
}

function ShowContent()
{
// 	document.getElementById("waitDiv").style.display = "none";
// 	document.getElementById("contentDiv").style.display = "";
	showPage();
}

function CreateSaveCancelButtons()
{
	var contentDiv = document.getElementById("contentDiv");
	var button = document.createElement("input");
	button.id = "SaveButton";
	button.type = "button";
	button.value = __ML_save;
	button.onclick = function() {Save();};
	button.className = "inputButton";
	contentDiv.appendChild(button);
	var button = document.createElement("input");
	button.id = "CancelButton";
	button.type = "button";
	button.value = __ML_cancel;
	button.onclick = function() {Cancel();};
	button.className = "inputButton";
	contentDiv.appendChild(button);
	CreateSpace(2);
}
