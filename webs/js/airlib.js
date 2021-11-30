var uiObject = Class.extend({

	construct: function()
	{
		this.managerArray = new Array();
		this.getArray = new Array();
		this.queryArray = new Array();
		this.transactionArray = new Array();
		this.tables = new Array();
		this.controls = new Array();
		this.options = new Array();
	},
	query: function()
	{
		this.instQuery();
		this.parseInstList();
		this.getValueQuery();
	},
	addManager: function(moduleId)
	{
		if(this.managerArray[moduleId] == null)
		{
			this.managerArray[moduleId] = [];
		}
	},
 	addInstance: function(moduleId, instance)
	{
		if(this.managerArray[moduleId] == null)
		{
			this.managerArray[moduleId] = [];
			this.managerArray[moduleId][instance] = [];
		}
	},
	addTransaction: function(moduleId)
	{
		var exists = false;
		for(var i = 0; i < this.transactionArray.length; i++)
		{
			if(this.transactionArray[i].module == moduleId.module)
			{
				exists = true;
				break;
			}
		}

		if(!exists) this.transactionArray.push(moduleId);
	},
	addGet: function(obj)
	{
		obj.version = obj.version || 1;
		if(obj.version == 1)
		{
			if(!this.checkParameters(obj, ["module,key"], "addGet")) return;

			this.addManager(obj.module);
			this.getArray.push({module: obj.module, key: obj.key, value: obj.value || ""});
			this.addTransaction({module: obj.module});
		}

		if(obj.version == 3)
		{
			if(!this.checkParameters(obj, ["module,key,keyTable,keyModule,keyField"], "addGet"))return;

			if(!this.tables[obj.keyTable])return;

			obj.keyProperty == obj.keyProperty || "value";

			this.addManager(obj.module);
			var tempArray = [];

			for(var i = 0; i < this.tables[obj.keyTable].length; i++)
			{
				if(!tempArray[obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty])])
				{
					this.getArray.push({module: obj.module, key: obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]), value: obj.value || ""});
					tempArray[obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty])] = true;
				}
			}

			this.addTransaction({module: obj.module});
		}
	},
	addQuery: function(obj)
	{
		try
		{
			obj.version = obj.version || 1;
			if(obj.version == 1)
			{
				if(!this.checkParameters(obj, ["module,key"], "addQuery")) return;

				this.addManager(obj.module);
				this.queryArray.push({module: obj.module, key: obj.key, value: obj.value || ""});
			}

			if(obj.version == 3)
			{
				if(!this.checkParameters(obj, ["module,key,keyTable,keyModule,keyField"], "addQuery"))return;


				if(!this.tables[obj.keyTable])return;

				obj.keyProperty == obj.keyProperty || "value";

				this.addManager(obj.module);
				var tempArray = [];
				for(var i = 0; i < this.tables[obj.keyTable].length; i++)
				{
					if(!tempArray[obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty])])
					{
						this.queryArray.push({module: obj.module, key: obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]), value: obj.value || ""});
						tempArray[obj.key.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty])] = true;
					}
				}
			}
		}
		catch(ex)
		{
			alert(ex);
		}
	},
	getManagers: function()
	{
		var returnValue = new Array();
		for(element in this.managerArray)
		{
			returnValue.push(element);
		}
		return(returnValue);
	},
	instQuery: function()
	{
		beginXML();
		for(manager in this.managerArray)
		{
			addQuery("devmgr-0", "inst_list", manager);
		}
		endXML();
		this.sendAjax();
	},
	getValueQuery: function()
	{

		beginXML();

		for(var i = 0; i < this.queryArray.length; i++)
		{
			if(!this.queryArray[i].execute)
			{
				for(inst in this.managerArray[this.queryArray[i].module])
				{
					addQuery(inst, this.queryArray[i].key, this.queryArray[i].value);
					this.queryArray[i].execute = true;
				}
			}
		}

		for(var i = 0; i < this.transactionArray.length; i++)
		{
			for(inst in this.managerArray[this.transactionArray[i].module])
			{
				addCommand("cfgmgr-0", "begin_transaction", inst);
			}
		}

		for(var i = 0; i < this.getArray.length; i++)
		{

			if(!this.getArray[i].execute)
			{
				for(inst in this.managerArray[this.getArray[i].module])
				{
					addGet(inst, this.getArray[i].key, this.getArray[i].value);
					this.getArray[i].execute = true;
				}
			}
		}

		for(var i = 0; i < this.transactionArray.length; i++)
		{
			for(inst in this.managerArray[this.transactionArray[i].module])
			{
				addCommand("cfgmgr-0", "end_transaction", inst);
			}
		}
		endXML();
		this.sendAjax();
	},
	parseInstList: function()
	{
		for(manager in this.managerArray)
		{
			var counter = 0;
			while(getValue("devmgr-0", manager + ".inst" + counter) != "")
			{
				this.managerArray[manager][getValue("devmgr-0", manager + ".inst" + counter)] = [];
				counter++;
			}
		}
	},
	getInstList: function(manager)
	{
		var returnArray = [];
		managerObj = this.managerArray[manager] || {};
		for(inst in managerObj)
		{
			returnArray.push(inst);
		}
		return returnArray;
	},
	sendAjax: function(func, param, async)
	{
		var _this = this;
		if(async == true) async = true;
		else async = false;

		var xmlDoc;
		xmlDoc = ParseXML(xmlString);
		$.ajax({
			url: "/cgi-bin/webapp",
			type: "POST",
			processData: false,
			data: xmlDoc,
			dataType: "xml",
			async: false,
			success: function(data)
			{

				xmlResponse = data;
				var chkSession = getValue("webapp", "error");

				var sessionError = false;
				var forceToChangePassword = false;
				if(chkSession != "")
				{
					switch(chkSession)
					{
						case "1":
								sessionError = true;
						break;
						case "23":
								forceToChangePassword = true;
						break;
						default:
								sessionError = false;
						break ;
					}
				}
				else
				{
					sessionError = false;
				}
				if(sessionError)
				{
					top.location.href = "/login.html";
				}
				else if(forceToChangePassword)
				{
					if(typeof top.frames["mainFrame"] === "undefined") {
						top.location.href = "/management/ui_password.html?returnPage=" + _this.uiPasswordReturnPage;
					} else {
						top.frames["mainFrame"].location = "/management/ui_password.html?returnPage=" + _this.uiPasswordReturnPage;
					}
				}
				else
				{
					if(func)
					{
						if(param) func(param);
						else func();
					}
				}
			}
		});
	},
	uiPasswordReturnPage : "/homepage.html",
	setUiPasswordReturnPage : function(returnPage) {
		this.uiPasswordReturnPage = escape(returnPage);
	},
  	checkNullArray: function(arr)
	{
		if(!arr)
		{
			arr = [];
			return false;
		}
		else
		{
			return true;
		}
	},
	addField: function(obj)
	{
		obj.fieldAlias = obj.fieldAlias || obj.field;
		obj.keyTable = obj.keyTable || obj.table;

		if(obj.autoFilter != false)
		{
			obj.autoFilter = true;
		}

		if(this.tables[obj.keyTable]) obj.keyTableLength = this.tables[obj.keyTable].length;
		else obj.keyTableLength = 0;

		if(!this.tables[obj.table])
		{
			this.tables[obj.table] = [];
		}

		if(obj.field.indexOf("@key@") != -1)
		{
			if(!this.tables[obj.keyTable])return;
		}

		for(inst in this.managerArray[obj.module])
		{
			obj.inst = inst;
			this.addFieldToTable(obj);
		}

		if(obj.autoFilter && obj.keyModule)
		{
			this.addFilter({table: obj.table, module: obj.keyModule, field: obj.keyField, compareModule: obj.module, compareField: obj.fieldAlias, compareProperty: "id"});
		}
	},
	addFieldToTable: function(obj)
	{
		var counter = 0;
		if(obj.sCounter) counter = obj.sCounter;
		
		if(obj.field.indexOf("@counter@") != -1 && obj.field.indexOf("@key@") != -1)
		{
			var rowCount = this.tables[obj.keyTable].length;
			for(var i = 0; i < rowCount; i++)
			{
				counter = 0;
				obj.realField = obj.field.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]).replace("@counter@", counter);
				
				if(obj.pathField)
				{
					obj.realPathField = obj.pathField.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]).replace("@counter@", counter);
				}
				
				while((getValue(obj.inst, obj.realField) != "") || (getValue(obj.inst, obj.realPathField) != ""))
				{
					obj.value = getValue(obj.inst, obj.realField);
					obj.id = this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty];
					this.addFieldToTable1(obj);
					counter++;
					obj.realField = obj.field.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]).replace("@counter@", counter);
					
					if(obj.pathField)
					{
						obj.realPathField = obj.pathField.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]).replace("@counter@", counter);
					}
				}
			}
		}
		else if(obj.field.indexOf("@counter@") != -1)
		{
			
			obj.pathField = obj.pathField || "";
			
			while((getValue(obj.inst, obj.field.replace("@counter@", counter)) != "") || (getValue(obj.inst, obj.pathField.replace("@counter@", counter)) != ""))
			{
				obj.realField = obj.field.replace("@counter@", counter);
				obj.value = getValue(obj.inst, obj.realField);
				obj.id = counter;
				this.addFieldToTable1(obj);
				counter++;
			}
// 			while(true)
// 			{
// 				var isContinue = false;
// 				var tmpValue = "";
// 
// 				if((getValue(obj.inst, obj.field.replace("@counter@", counter)) != "") || (getValue(obj.inst, obj.pathField.replace("@counter@", counter)) != ""))
// 				{
// 					obj.realField = obj.field.replace("@counter@", counter);
// 					tmpValue = getValue(obj.inst, obj.realField);
// 					isContinue = true;
// 				}
// 				else if(obj.pathField)
// 				{
// 					if(this.tables[obj.table][counter])
// 					{
// 						if(this.tables[obj.table][counter][obj.module])
// 						{
// 							if(this.tables[obj.table][counter][obj.module][obj.pathField])
// 							{
// 								obj.realField = obj.field.replace("@counter@", counter);
// 								tmpValue = "";
// 								isContinue = true;
// 							}
// 						}
// 					}
// 				}
// 				
// 				if(isContinue)
// 				{
// 					obj.value = tmpValue;
// 					obj.id = counter;
// 					this.addFieldToTable1(obj);
// 					counter++;
// 				}
// 				else
// 				{
// 					break;
// 				}
// 			}
		}
		else if(obj.field.indexOf("@key@") != -1)
		{
			var rowCount = this.tables[obj.keyTable].length;
			for(var i = 0; i < rowCount; i++)
			{
				obj.realField = obj.field.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]);
				obj.value = getValue(obj.inst, obj.realField);
				obj.id = this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty];
				this.addFieldToTable1(obj);
			}
		}
		else
		{
			obj.realField = obj.field;
// 			if(obj.field.indexOf("@key@") == -1)
// 			{
				obj.value = getValue(obj.inst, obj.realField);
				this.addFieldToTable1(obj);
// 			}
// 			else
// 			{
// 				var rowCount = this.tables[obj.keyTable].length;
// 				for(var i = 0; i < rowCount; i++)
// 				{
// 					obj.realField = obj.field.replace("@key@", this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty]);
// 					obj.value = getValue(obj.inst, obj.realField);
// 					obj.id = this.tables[obj.keyTable][i][obj.keyModule][obj.keyField][obj.keyProperty];
// 					this.addFieldToTable1(obj);
// 				}
// 			}
		}
	},
	addFieldToTable1: function(obj)
	{

		this.tables[obj.table] = this.tables[obj.table] || [];

		if(this.tables[obj.table].length == 0)
		{
			obj.index = 0;
			this.tables[obj.table].baseCount = 1;
			this.addFieldToTable2(obj);
		}
		else
		{
			if(this.tables[obj.table][0][obj.module])
			{
				if(obj.field.indexOf("@key@") == -1 && obj.field.indexOf("@counter@") == -1)
				{
					var indexArray = [];
					var tableLength;

					if(this.tables[obj.table].baseCount > this.tables[obj.table].length) tableLength = this.tables[obj.table].length;
					else tableLength = this.tables[obj.table].baseCount;
					for(var i = 0; i < tableLength; i++)
					{
						var singleModule = true;
						var byinst = false;
						for(module in this.tables[obj.table][i])
						{
							if(module == "filterCondition") continue;
							if(module != obj.module)
							{
								singleModule = false;
// 								break;
							}
							else
							{
								for(field in this.tables[obj.table][i][module])
								{
									if(obj.fieldAlias != field) byinst = true;
								}
							}
						}

						if(this.tables[obj.table][i][obj.module][obj.fieldAlias] && !byinst)
						{
							if(singleModule)
							{

							}
							else
							{
								indexArray.push(this.rowCopy(obj.table, i));
// 								break;
							}
						}
						else
						{
							if(singleModule)
							{
								var tempArray = this.getIndexArrayByInst(obj);
								for(var j = 0; j < tempArray.length; j++)
								{
									indexArray.push(tempArray[j]);
								}
// 								break;
							}
							else
							{
								var tempArray = this.getIndexArrayByInst(obj);
								for(var j = 0; j < tempArray.length; j++)
								{
									indexArray.push(tempArray[j]);
								}
// 								break;
							}
						}
						/*if(this.tables[obj.table][i][obj.module][obj.fieldAlias] && !singleModule)
						{

						}
						else if(!this.tables[obj.table][i][obj.module][obj.fieldAlias] && singleModule)
						{
							var tempArray = this.getIndexArrayByInst(obj);
							for(var j = 0; j < tempArray.length; j++)
							{
								indexArray.push(tempArray[j]);
							}
						}
						else
						{
						}*/
					}
					if(indexArray.length == 0) indexArray.push(-1);

					for(var i = 0; i < indexArray.length; i++)
					{
						obj.index = indexArray[i];
						this.addFieldToTable2(obj);
					}

// 					if(obj.fieldAlias == "downlink.attn") $("#log6").html($("#log6").html() + this.getTable({table: "t5", caption: obj.index}));

				}
				else if(obj.field.indexOf("@key@") == -1 && obj.field.indexOf("@counter@") != -1)
				{
						var indexArray = this.getIndexArrayById(obj);

						for(var i = 0; i < indexArray.length; i++)
						{
							obj.index = indexArray[i];
							this.addFieldToTable2(obj);

						}
				}
				else
				{
					if(this.tables[obj.table][0][obj.module][obj.fieldAlias])
					{
						if(obj.table == obj.keyTable)
						{
							for(var i = 0; i < obj.keyTableLength; i++)
							{
								obj.index = this.rowCopy(obj.table, i);
								this.addFieldToTable2(obj);
							}
						}
						else
						{
							this.addFieldToTable2(obj);
						}

					}
					else
					{
						for(var i = 0; i < this.tables[obj.table].length; i++)
						{
							obj.index = i;
							this.addFieldToTable2(obj);
						}
					}
				}
			}
			else
			{
				var tableLength = this.tables[obj.table].length;
				for(var i = 0; i < tableLength; i++)
				{
					obj.index = i;
					this.addFieldToTable2(obj);
				}
			}
		}
	},
	getIndexArrayByInst: function(obj)
	{
		var returnArray = [];
		for(var i = 0; i < this.tables[obj.table].length; i++)
		{
			for(field in this.tables[obj.table][i][obj.module])
			{
				if(this.tables[obj.table][i][obj.module][field].inst != null)
				{
					if(obj.inst == this.tables[obj.table][i][obj.module][field].inst)
					{
						returnArray.push(i);
					}
					break;
				}
			}
		}
		if(returnArray.length == 0) returnArray.push(-1);
		return returnArray;
	},
	getIndexArrayById: function(obj)
	{
		var returnArray = [];
		for(var i = 0; i < this.tables[obj.table].length; i++)
		{
			for(field in this.tables[obj.table][i][obj.module])
			{
				if(this.tables[obj.table][i][obj.module][field].inst == obj.inst && this.tables[obj.table][i][obj.module][field].id != null)
				{
					if(obj.id == this.tables[obj.table][i][obj.module][field].id)
					{
						returnArray.push(i);
					}
					break;
				}
			}
		}
		if(returnArray.length == 0) returnArray.push(-1);
		return returnArray;
	},
	getIndexArray: function(obj)
	{
		var returnArray = [];
		try
		{
			for(var i = 0; i < this.tables[obj.table].length; i++)
			{
				if(this.tables[obj.table][i][obj.keyModule][obj.keyField].value == obj.id) returnArray.push(i);
			}
		}
		catch(ex)
		{
		}
		return returnArray;
	},
	getIndex: function(obj)
	{
		var returnArray = [];
		var index = -1;
		for(var i = 0; i < this.tables[obj.table].length; i++)
		{
			for(field in this.tables[obj.table][i][obj.module])
			{
				if(this.tables[obj.table][i][obj.module][field].inst == obj.inst)
				{
					if(obj.id)
					{
						if(obj.keyField && obj.table == obj.keyTable && obj.id == this.tables[obj.table][i][obj.keyModule][obj.keyField][obj.keyProperty])
						{
							index = i;
						}
						else if(this.tables[obj.table][i][obj.module][field].id == obj.id)
						{
							index = i;
						}
					}
					else
					{
						index = i;
					}
				}
				if(obj.id) break;
			}
			if(index != -1) returnArray.push(index);
		}
		return {index: returnArray};
	},
	addFieldToTable2: function(obj)
	{
		if(obj.index == -1)
		{
			obj.index = this.tables[obj.table].length;
			this.tables[obj.table].baseCount = this.tables[obj.table].length + 1;
		}

		this.tables[obj.table][obj.index] = this.tables[obj.table][obj.index] || [];
		this.tables[obj.table][obj.index][obj.module] = this.tables[obj.table][obj.index][obj.module] || [];
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias] = [];
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].inst = obj.inst;
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].value = obj.value;
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].id = obj.id == null ? "" : obj.id;
		this.tables[obj.table][obj.index].filterCondition = true;
		obj.index = -1;
	},
	addFieldToTable222: function(obj)
	{
		try{
		if(obj.index == -1)
		{
			obj.index = this.tables[obj.table].length;
		}
		else
		{

			if(this.tables[obj.table][obj.index] && this.tables[obj.table][obj.index][obj.module] && this.tables[obj.table][obj.index][obj.module][obj.fieldAlias])
			{
				if(this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].inst != obj.inst || this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].value != obj.value || this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].id != obj.id)
				{
					obj.index = this.rowCopy(obj.table, obj.index);
					tempIndex = this.tables[obj.table].length;
					for(module in this.tables[obj.table][obj.index])
					{
						for(field in this.tables[obj.table][obj.index][module])
						{
							for(property in this.tables[obj.table][obj.index][module][field])
							{
								this.tables[obj.table][tempIndex] = this.tables[obj.table][tempIndex] || [];
								this.tables[obj.table][tempIndex][obj.module] = this.tables[obj.table][tempIndex][obj.module] || [];
								this.tables[obj.table][tempIndex][obj.module][obj.fieldAlias] = [];
								this.tables[obj.table][tempIndex][obj.module][obj.fieldAlias].inst = obj.inst;
								this.tables[obj.table][tempIndex][obj.module][obj.fieldAlias].value = obj.value;
								this.tables[obj.table][tempIndex][obj.module][obj.fieldAlias].id = obj.id == null ? "" : obj.id;
							}
						}
					}
					obj.index = -1;
					return;
				}
			}
		}}catch(ex){alert(ex + "----" + obj.index);}
		this.tables[obj.table][obj.index] = this.tables[obj.table][obj.index] || [];
		this.tables[obj.table][obj.index][obj.module] = this.tables[obj.table][obj.index][obj.module] || [];
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias] = [];
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].inst = obj.inst;
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].value = obj.value;
		this.tables[obj.table][obj.index][obj.module][obj.fieldAlias].id = obj.id == null ? "" : obj.id;
		obj.index = -1;
	},
	getRepetitionCount: function(tableName, sourceRowIndex)
	{
		var repetitionCount = 0;

		for(var i = 0; i < this.tables[tableName].length; i++)
		{
			for(module in this.tables[tableName][sourceRowIndex])
			{
				for(field in this.tables[tableName][sourceRowIndex][module])
				{
					for(property in this.tables[tableName][sourceRowIndex][module][field])
					{
						if(this.tables[tableName][i][module][field][property] == this.tables[tableName][sourceRowIndex][module][field][property]) repetitionCount++;
						break;
					}
					break;
				}
				break;
			}
		}

		return repetitionCount;
	},
	rowCopy: function(tableName, sourceRowIndex)
	{
		var newRowIndex = this.tables[tableName].length;
		this.tables[tableName][newRowIndex] = [];

		for(module in this.tables[tableName][sourceRowIndex])
		{
			this.tables[tableName][newRowIndex][module] = [];
			for(field in this.tables[tableName][sourceRowIndex][module])
			{
				this.tables[tableName][newRowIndex][module][field] = [];
				this.tables[tableName][newRowIndex][module][field] = this.tables[tableName][sourceRowIndex][module][field];
			}
		}
		return newRowIndex;
	},
	applyFilter: function(condition)
	{

		for(var i = 0; i < this.tables[condition.table].length; i++)
		{
			if(!this.tables[condition.table][i].filterCondition)
			{
				this.tables[condition.table].splice(i, 1);
				i--;
			}
		}
		if(this.tables[condition.table].baseCount > this.tables[condition.table].length) this.tables[condition.table].baseCount = this.tables[condition.table].length;

	},
	addFilter: function(condition)
	{
		try{
			condition.filterOperator = condition.filterOperator || "and";
			condition.compareType = condition.compareType || "equal";
			condition.property = condition.property || "value";
			condition.autoApplyFilter = condition.autoApplyFilter == false ? false : true;
			
			if(condition.compareTable)
			{
				condition.compareProperty = condition.compareProperty || "value";
				
				for(var i = 0; i < this.tables[condition.table].length; i++)
				{
					var isIn = false;
					for(var j = 0; j < this.tables[condition.compareTable].length; j++)
					{
						if(this.tables[condition.table][i][condition.module][condition.field][condition.property] == this.tables[condition.compareTable][j][condition.compareModule][condition.compareField][condition.compareProperty])
						{
							isIn = true;
							break;
						}
					}
					if(isIn)
					{
						if(condition.compareType == "not_in")
						{
							if(condition.filterOperator == "and")
							{
								this.tables[condition.table][i].filterCondition = false;
							}
						}
						else if(condition.compareType == "in")
						{
							if(condition.filterOperator == "or")
							{
								this.tables[condition.table][i].filterCondition = true;
							}
						}
					}
					else
					{
						if(condition.compareType == "not_in")
						{
							if(condition.filterOperator == "or")
							{
								this.tables[condition.table][i].filterCondition = true;
							}
						}
						else if(condition.compareType == "in")
						{
							if(condition.filterOperator == "and")
							{
								this.tables[condition.table][i].filterCondition = false;
							}
						}
					}
				}
			}
			else
			{
				for(var i = 0; i < this.tables[condition.table].length; i++)
				{
					if(!condition.compareModule)
					{
						if(condition.compareValue != this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "equal")
						{
							if(condition.filterOperator == "and")
							{
								this.tables[condition.table][i].filterCondition = false;
							}
						
						}
						else if(condition.compareValue == this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "equal")
						{
							if(condition.filterOperator == "or")
							{
								this.tables[condition.table][i].filterCondition = true;
							}
						}
						else if(condition.compareValue == this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "not_equal")
						{
							if(condition.filterOperator == "and")
							{
								this.tables[condition.table][i].filterCondition = false;
							}
						
						}
						else if(condition.compareValue != this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "not_equal")
						{
							if(condition.filterOperator == "or")
							{
								this.tables[condition.table][i].filterCondition = true;
							}
						}
					}
					else
					{
						if(!this.tables[condition.table][i][condition.compareModule])
						{
							return;
						}

						condition.compareProperty = condition.compareProperty || "value";
						
						if(!this.tables[condition.table][i][condition.module][condition.field] || !this.tables[condition.table][i][condition.compareModule][condition.compareField])
						{
							this.tables[condition.table][i].filterCondition = false;
						}
						else
						{
							if(this.tables[condition.table][i][condition.module][condition.field][condition.property] != this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "equal")
							{
								if(condition.filterOperator == "and")
								{
									this.tables[condition.table][i].filterCondition = false;
								}
							}
							else if(this.tables[condition.table][i][condition.module][condition.field][condition.property] == this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "equal")
							{
								if(condition.filterOperator == "or")
								{
									this.tables[condition.table][i].filterCondition = true;
								}
							}
							else if(this.tables[condition.table][i][condition.module][condition.field][condition.property] == this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "equal")
							{
								if(condition.filterOperator == "and")
								{
									this.tables[condition.table][i].filterCondition = false;
								}
							}
							else if(this.tables[condition.table][i][condition.module][condition.field][condition.property] != this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "equal")
							{
								if(condition.filterOperator == "or")
								{
									this.tables[condition.table][i].filterCondition = true;
								}
							}
						}
					}
				}
			}

			if(condition.autoApplyFilter == true)
			{
				this.applyFilter(condition);
			}
		}catch(ex){/*alert(ex + "\nthis.tables["+condition.table+"]["+i+"]["+condition.module+"]["+condition.field+"]["+condition.property+"] ");*/}
	},
	filterTable: function(condition)
	{
		try{
		condition.compareType = condition.compareType || "equal";
		condition.property = condition.property || "value";



		for(var i = 0; i < this.tables[condition.table].length; i++)
		{
			if(!condition.compareModule)
			{
				if(condition.compareValue != this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "equal")
				{
					this.tables[condition.table].splice(i, 1);
					i--;
				}
				else if(condition.compareValue == this.tables[condition.table][i][condition.module][condition.field][condition.property] && condition.compareType == "not_equal")
				{
					this.tables[condition.table].splice(i, 1);
					i--;
				}
			}
			else
			{
				condition.compareProperty = condition.compareProperty || "value";

				if(!this.tables[condition.table][i][condition.module][condition.field] || !this.tables[condition.table][i][condition.compareModule][condition.compareField])
				{
					this.tables[condition.table].splice(i, 1);
					i--;
				}
				else
				{
					if(this.tables[condition.table][i][condition.module][condition.field][condition.property] != this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "equal")
					{
						this.tables[condition.table].splice(i, 1);
						i--;
					}
					else if(this.tables[condition.table][i][condition.module][condition.field][condition.property] == this.tables[condition.table][i][condition.compareModule][condition.compareField][condition.compareProperty] && condition.compareType == "not_equal")
					{
						this.tables[condition.table].splice(i, 1);
						i--;
					}
				}
			}
		}
		if(this.tables[condition.table].baseCount > this.tables[condition.table].length) this.tables[condition.table].baseCount = this.tables[condition.table].length;
		}catch(ex){alert(ex + "\nthis.tables["+condition.table+"]["+i+"]["+condition.module+"]["+condition.field+"]["+condition.property+"] ");}
	},
	sortTable: function(object)
	{
		try{

		for(var i = 0; i < this.tables[object.table].length; i++)
		{
			for(var j = i + 1; j < this.tables[object.table].length; j++)
			{
				if(object.direction == "asc" && this.tables[object.table][i][object.module][object.field].value.toUpperCase() < this.tables[object.table][j][object.module][object.field].value.toUpperCase())
				{
					var tempObj1 = objectClone(this.tables[object.table][i]);
					this.tables[object.table][i] = objectClone(this.tables[object.table][j]);
					this.tables[object.table][j] = tempObj1;
				}
				
				if(object.direction == "desc" && this.tables[object.table][i][object.module][object.field].value.toUpperCase() > this.tables[object.table][j][object.module][object.field].value.toUpperCase())
				{
					var tempObj1 = objectClone(this.tables[object.table][i]);
					this.tables[object.table][i] = objectClone(this.tables[object.table][j]);
					this.tables[object.table][j] = tempObj1;
				}
			}
		}
		}catch(ex){alert(ex);}
	},
	getTable: function(object)
	{
		object.caption = object.caption || object.table;
		var str = "<table border='1'><caption>" + object.caption + "</caption>";
		try{
		for(var i = 0; i < this.tables[object.table].length; i++)
		{
			str += "<tr>";
			if(!object.columns)
			{
				for(module in this.tables[object.table][i])
				{
					for(field in this.tables[object.table][i][module])
					{
						str+="<td>obj.tables['"+object.table+"']["+i+"]['"+module+"']['"+field+"']</td><td>inst=" + this.tables[object.table][i][module][field].inst + "</td><td>value=" + this.tables[object.table][i][module][field].value + "</td><td>id=" + this.tables[object.table][i][module][field].id + "</td>";
					}

				}
			}
			else
			{
				for(var j = 0; j < object.columns.length; j++)
				{
					if(this.tables[object.table][i][object.columns[j].module] && this.tables[object.table][i][object.columns[j].module][object.columns[j].field]) str += "<td>" + this.tables[object.table][i][object.columns[j].module][object.columns[j].field].value + "</td>";
				}
			}

			str += "</tr>";
		}
		}catch(ex){str += "<tr><td>" + ex + "</td></tr>"}
		str += "</table>";
		return str;
	},
	checkParameters: function(obj, array, functionName)
	{
		var parameters = [];
		for(parameter in obj)
		{
			parameters.push(parameter + ": " + obj[parameter]);
		}

		var unavailableParameters = [];
		var ok = false;
		for(var i = 0; i < array.length; i++)
		{
			var unavailableParameterString = "";
			var ok1 = true;
 			var tempArray1 = array[i].split(",");
			for(var j = 0; j < tempArray1.length; j++)
			{

				var ok2 = false;
				var tempArray2 = tempArray1[j].split("||");

				for(var k = 0; k < tempArray2.length; k++)
				{
					if(obj[tempArray2[k]]) ok2 = true;
					else unavailableParameterString += (unavailableParameterString != "" ? ", " : "") + tempArray2[k];
				}

				if(!ok2)
				{
					ok1 = false;
				}

			}
			if(ok1) ok = true;
			else
			{
				unavailableParameters.push(unavailableParameterString);
				unavailableParameterString = "";
			}
		}

		if(!ok)
		{
			var message = "Eksik parametre!!!\nFunction: " + functionName + "\nGerekli Parametreler: ";
			for(var i = 0; i < array.length; i++)
			{
				message += (i != 0 ? " || " : "") + array[i];
			}

			message += "\nMevcut Parametreler: " + parameters + "\nEksik Parametreler: ";
			for(var i = 0; i < unavailableParameters.length; i++)
			{
				message += (i != 0 ? " || " : "") + unavailableParameters[i];
			}
			alert(message);
			return false;
		}
		return true;
	}
	,
	fillPage: function()
	{
		for(var i = 0; i < this.options.length; i++)
		{
			if(this.options[i].version == 2)
			{
				for(var j = 0; j < this.tables[this.options[i].table].length; j++)
				{
					$("#" + this.options[i].controlId).append($("<option></option>").attr("value", this.tables[this.options[i].table][j][this.options[i].module][this.options[i].field].value).text(this.tables[this.options[i].table][j][this.options[i].module][this.options[i].field].value));
				}
			}
		}
		for(var i = 0; i < this.controls.length; i++)
		{
			if(this.controls[i].field)
			{
				$("#" + this.controls[i].controlId).setValue(this.tables[this.controls[i].table][0][this.controls[i].module][this.controls[i].field].value);
			}
		}
	}
	,
	addControlData: function(object)
	{

		if(!this.checkParameters(object, ["controlId,table,module,field"], "addControlData")) return;
		this.controls.push(object);
	},
	addControlOption: function(object)
	{
		if(!this.checkParameters(object, ["controlId,table,module,field"], "addControlData")) return;
		object.version = object.version || 1;
		this.options.push(object);
	}

});

function objectClone(oldObject)
{
	var newObject = {};
	for(i in oldObject)
	{
		if(oldObject[i] && typeof(oldObject[i]) == "object")
		{
			newObject[i] = objectClone(oldObject[i]);
		}
		else
		{
			newObject[i] = oldObject[i];
		}
	}
	return newObject;
}


var showDebugAlerts = true;

function debugAlert(message)
{
	if(showDebugAlerts) alert(message);
}
