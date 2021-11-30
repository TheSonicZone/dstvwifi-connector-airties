/*
 * Airties Patterns 1.1.0.0 - Design Patterns applied to AJAX
 * Copyright (c) 2007 Baris ERGUN (www.airties.com)
 *
*/

var queryDepthLength = 1;
var requiresReboot = false;
var myPageData = new Array();

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

    //Give this new class the same static extend method
    classDef.extend = this.extend;
    return classDef;

};


var AspQueryGenerator = Class.extend({

construct: function(queryArray, queryDepth) { /* optional constructor method */ },
BuildSendQuery: function(ty) {

},
BuildParseQuery: function() {


}
});

var AspQueryv1 = AspQueryGenerator.extend({

construct: function(queryArray, queryDepth){
    this.qArray = queryArray; // this variable is to hold the Array of Queries that will processed further
    this.qDepth = queryDepth; // this variable is to hold which Stage of the POST AJAX is taking place. For example
                              // if the queryDepth was 0 that would mean that this is the first stage of the POST AJAX operations and so forth.


},
BuildSendQuery: function(queryList,transactions){

        var passiveQuery = this.qArray[this.qDepth].Passive == true?true:false;
        var dynamicPassiveQuery = eval(this.qArray[this.qDepth].DynamicPassive) == true?true:false;

        if(!passiveQuery && !dynamicPassiveQuery)
        {
            var moduleNameIsArray = false;
            if(this.qArray[this.qDepth].Module.indexOf("@") != -1) // Here we check if the given Module name is only a string or
            {                                                          // collection of strings on the page
               var compStr = eval(this.qArray[this.qDepth].Module.replace("@",""));
               if(typeof(compStr) == "object")
               {
                    moduleNameIsArray = true;
               }
            }
            var moduleName = this.qArray[this.qDepth].Module.charAt(0) == "@" ? eval(this.qArray[this.qDepth].Module.replace("@","")):
                this.qArray[this.qDepth].Module; // Module name can be statically writen such as config-0 or can be wirtten with '@' prefix
                                                     // which will mean that the moduleName is a Javascript variable indicated on that page.
            var queryStr = this.qArray[this.qDepth].Key; // Get the 'Key' value of the Query in operation
            var query2Str = this.qArray[this.qDepth].Value; // Get the 'Value' value of the Query in operation
            var transactionStr  = this.qArray[this.qDepth].Transaction // Is this a Transaction Get or a Query?
            if(!moduleNameIsArray) // If the Module Name is not an array
            {
                // We should avoid making the same query  repeatedly with below procedure
                var varArray = new Array();
                varArray[0] = moduleName;
                varArray[1] = queryStr;
                varArray[2] = query2Str;
                varArray[3] = transactionStr;
                var arrayExists = false;
                for(var t = 0; t < queryList.length ; t++)
                {
                    if(queryList[t][0] == varArray[0] && queryList[t][1] == varArray[1] && queryList[t][2] == varArray[2]
                    && queryList[t][3] == varArray[3])
                    {
                        arrayExists = true;
                        break;
                    }
                }
                if(!arrayExists)
                {
                    queryList.push(varArray);
                }
                // We should avoid making the same begin and end transaction call  repeatedly with below procedure
                if(transactionStr)
                {
                    var transactionPushed = false;
                    for(var t = 0; t < transactions.length ; t++)
                    {
                        if(transactions[t] == moduleName)
                        {
                            transactionPushed = true;
                            break;
                        }
                    }
                    if(!transactionPushed)
                    {
                        transactions.push(moduleName);
                    }
                }
            }
            else // If the Module Name is an array
            {
                for(var y=0;y < moduleName.length;y ++) // for each Module Name in the moduleName array do the same things
                {
                    var varArray = new Array();
                    varArray[0] = moduleName[y];
                    varArray[1] = queryStr;
                    varArray[2] = query2Str;
                    varArray[3] = transactionStr;
                    var arrayExists = false;
                    for(var t = 0; t < queryList.length ; t++)
                    {
                        if(queryList[t][0] == varArray[0] && queryList[t][1] == varArray[1] && queryList[t][2] == varArray[2]
                         && queryList[t][3] == varArray[3])
                         {
                            arrayExists = true;
                            break;
                         }
                    }

                    if(!arrayExists)
                    {
                        queryList.push(varArray);
                    }
                    if(transactionStr)
                    {
                        var transactionPushed = false;
                        for(var t = 0; t < transactions.length ; t++)
                        {
                            if(transactions[t] == moduleName[y])
                            {
                                transactionPushed = true;
                                break;
                             }
                        }
                        if(!transactionPushed)
                        {
                            transactions.push(moduleName[y]);
                        }
                    }
                }
            }
        }
},
BuildParseQuery: function(parseQueryList,alreadyQueried) {
        var passiveQuery = this.qArray[this.qDepth].Passive == true?true:false;
        var dynamicPassiveQuery = eval(this.qArray[this.qDepth].DynamicPassive) == true?true:false;

        if(!passiveQuery && !dynamicPassiveQuery)
        {

                // If the moduleName's prefix is '@' than it means that it is a Javascript Object declared on that page.
                var moduleName = this.qArray[this.qDepth].Module.charAt(0)== "@" ?
                    eval(this.qArray[this.qDepth].Module.replace("@","")) :
                    this.qArray[this.qDepth].Module;
                var valueField = this.qArray[this.qDepth].Value;
                var pollField = this.qArray[this.qDepth].PollField;
                // This variable indicates what to parse from the AJAX POST Result
                var pollFieldInc = this.qArray[this.qDepth].PollFieldInc;
                var postFix = this.qArray[this.qDepth].PostFix == null?"":this.qArray[this.qDepth].PostFix;
                // This variable indicates that the pollField value will be incremented by adding a integer value at the end of it.
                if(this.qDepth == this.qArray.length -1)
                { // If the ASPQuery is at the final stage of its Query List than this means that final results will be assigned to a HTML DOM Object
                // or a Javascript on that Page.
                    var count = 0;
                    var moduleType = typeof(moduleName);
                    var varArray = new Array();

                    varArray[0] = moduleType == "object" ?moduleName[count]:moduleName;
                    varArray[1] = pollFieldInc == true? pollField + count:pollField;
                    varArray[1] = ArrayCombiner([varArray[1], postFix]);

                    alreadyQueried = IsPollInList(varArray,parseQueryList);

                    var polledValue = getValue(varArray[0], varArray[1]); // Parse the result
                    var ourObjFactory = new UIObjectFactory();
                    var ourObj = ourObjFactory.Create(eval(this.qArray.ObjType),
                    this.qArray.RelatedObject); // Reference to  the Javascript or HTML DOM Object that will be assigned
                    var valueToSet = polledValue == ""? this.qArray.EmptyString:
                     this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                     this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                     polledValue; // If the returning result is an empty string than assing the EmptyString Key declared for this Query Object
                                  // Else -> If the Enum field declared Enum the returned result and assign it or If the RetStr field is declared
                                  // Find the Value for the given Return String and assign it Or directly Assign the returned value to the HTML DOM
                                  // or Javascript Object on that page.
                     if(moduleType == "object") // If the moduleType is an Array
                     {
                        var loopCount = 0;
                         while(loopCount < moduleName.length) // while the polledValue comes as an Empty String
                         {

                             if(valueToSet != null)
                             {
                                if(!alreadyQueried)
                                {
                                    parseQueryList.push(varArray); // push the Parsing Parameters in to this array to fyrther check not to repeat it
                                    ourObj.SetValues(valueToSet); // Set the returned value to the Related object using Factory Pattern
                                }

                             }
                             var varArray = new Array();
                             varArray[0] = moduleName[++count];
                             varArray[1] = pollField;
                             varArray[1] = ArrayCombiner([varArray[1], postFix]);
                             alreadyQueried = IsPollInList(varArray,parseQueryList);

                             polledValue = getValue(varArray[0], varArray[1]); // Accorsing to the changed Parameters poll the new value
                             valueToSet = polledValue == ""? this.qArray.EmptyString:
                             this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                             this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                             polledValue;
                             loopCount ++;
                         }
                     }
                     else // If the Module Name is not an object and it is a solid string
                     {
                         if(pollFieldInc)
                         {
                            while(polledValue != "") // while the polledValue comes as an Empty String
                             {

                                 if(valueToSet != null)
                                 {
                                    if(!alreadyQueried)
                                    {
                                        parseQueryList.push(varArray); // push the Parsing Parameters in to this array to fyrther check not to repeat it
                                        ourObj.SetValues(valueToSet); // Set the returned value to the Related object using Factory Pattern
                                    }

                                 }
                                 var varArray = new Array();
                                 varArray[0] = moduleName;
                                 varArray[1] = pollField + ++count;
                                 varArray[1] = ArrayCombiner([varArray[1], postFix]);
                                 alreadyQueried = IsPollInList(varArray,parseQueryList);

                                 polledValue = getValue(varArray[0], varArray[1]); // Accorsing to the changed Parameters poll the new value
                                 valueToSet = polledValue == ""? this.qArray.EmptyString:
                                 this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                                 this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                                 polledValue;

                              }



                         }
                          else
                          {
                             if(valueToSet != null)
                             {
                                if(!alreadyQueried)
                                    {
                                        parseQueryList.push(varArray);

                                    }
                                ourObj.SetValues(valueToSet);
                             }
                          }
                     }
                }
                else // If the ASPQuery object is not at its final stage or step
                {
                    var ourInnerVar = this.qArray[this.qDepth + 1].Module;
                    // Get the next coming query's Module Variable.
                    if(ourInnerVar.charAt(0) == "@") // This variable would be generaly prefixed with '@' There is
                                                     // no other kind of handling at the moment
                    {
                            var pollField = this.qArray[this.qDepth].PollField;
                            var varStr= typeof(eval(ourInnerVar.replace("@","")));
                            varStr = varStr.replace("string","StringObj").replace("object", "ArrayObj").replace("undefined", "StringObj");
                            var varType = eval(varStr);
                            var varFact = new PageVarFactory();
                            var yeni = varFact.Create(varType, ourInnerVar.replace("@",""));
                            var count = 0;
                            var moduleNameArray = new Array();
                            if(typeof(moduleName) == "object")
                            {
                                for (var ge = 0; ge < moduleName.length; ge++)
                                {
                                    moduleNameArray.push(moduleName[ge]);
                                }
                            }
                            else
                            {
                                moduleNameArray.push(moduleName)
                            }
                            var varArray = new Array();
                            varArray[0] = moduleNameArray[count];
                            varArray[1] = pollFieldInc == true ? pollField +count:pollField;
                            varArray[1] = ArrayCombiner([varArray[1], postFix]);

                            alreadyQueried = IsPollInList(varArray,parseQueryList);

                            var polledValue = getValue(varArray[0],varArray[1]);
                            while(polledValue != "")
                            {

                                if(!alreadyQueried)
                                {
                                    parseQueryList.push(varArray);
                                    yeni.SetValues(polledValue);
                                }
                                var varArray = new Array();
                                count++;
                                if(typeof(moduleName) != "object") // Bu modül Name yerinde bir string variable olduğu anlamına gelir
                                {
                                    varArray[0] = moduleNameArray[0];
                                    if(pollFieldInc == true) // Bu Poll Fieldin incremetable olduğunu söyler
                                    {

                                        varArray[1] = pollField + count;
                                        varArray[1] = ArrayCombiner([varArray[1], postFix]);
                                    }
                                    else
                                    {
                                        //Bu Poll Fieldin incremetable olmadığını söyler O yüzden bu loop daha fazla devam etmemeli.
                                        break;
                                    }
                                }
                                else // Bu modül Name yerinde bir Array variable olduğu anlamına gelir. O yüzden modüllere tek tek erişmek için
                                // arttırılmış count buraya verilir.
                                {
                                    varArray[0] = moduleNameArray[count];
                                    varArray[1] = pollField;
                                    varArray[1] = ArrayCombiner([varArray[1], postFix]);
                                }
                                for(var t = 0; t < parseQueryList.length; t++)
                                {
                                    if(parseQueryList[t][0] == varArray[0] && parseQueryList[t][1] == varArray[1])
                                    {

                                        alreadyQueried = true;
                                        break;
                                    }
                                }
                                polledValue = getValue(varArray[0], varArray[1]);

                            }
                    }
                }
           }

    }
});

var AspQueryv2 = AspQueryGenerator.extend({

construct: function(queryArray, queryDepth){
    this.qArray = queryArray; // this variable is to hold the Array of Queries that will processed further
    this.qDepth = queryDepth; // this variable is to hold which Stage of the POST AJAX is taking place. For example
                              // if the queryDepth was 0 that would mean that this is the first stage of the POST AJAX operations and so forth.


},
BuildSendQuery: function(queryList,transactions){
    var passiveQuery = this.qArray[this.qDepth].Passive == true?true:false;
    var dynamicPassiveQuery = eval(this.qArray[this.qDepth].DynamicPassive) == true?true:false;

        if(!passiveQuery && !dynamicPassiveQuery)
        {
        var keyNameIsArray = false;
        if(this.qArray[this.qDepth].Key.indexOf("@") != -1) // Here we check if the given Key name is only a string or
        {                                                          // collection of strings on the page
           var compStr = eval(this.qArray[this.qDepth].Key.replace("@",""));
           if(typeof(compStr) == "object")
           {
                keyNameIsArray = true;
           }
        }
        var moduleName = this.qArray[this.qDepth].Module; // Get the 'Module' value of the Query in operation

        var queryStr =  this.qArray[this.qDepth].Key.charAt(0) == "@" ? eval(this.qArray[this.qDepth].Key.replace("@","")):
            this.qArray[this.qDepth].Key; // Key name can be statically writen such as NAT.port_forwarding or can be wirtten with '@' prefix
                                                 // which will mean that the moduleName is a Javascript variable indicated on that page.

        var query2Str = this.qArray[this.qDepth].Value; // Get the 'Value' value of the Query in operation
        var prefix = this.qArray[this.qDepth].Prefix == null ?"":this.qArray[this.qDepth].Prefix;
        var postfix = this.qArray[this.qDepth].PostFix == null ?"":this.qArray[this.qDepth].PostFix;
        var transactionStr  = this.qArray[this.qDepth].Transaction // Is this a Transaction Get or a Query?
        if(!keyNameIsArray) // If the Key Name is not an array
        {
            // We should avoid making the same query  repeatedly with below procedure
            var varArray = new Array();
            varArray[0] = moduleName;
            varArray[1] = ArrayCombiner([prefix,queryStr,postfix]);
            varArray[2] = query2Str;
            varArray[3] = transactionStr;


            var arrayExists = false;
            for(var t = 0; t < queryList.length ; t++)
            {
                if(queryList[t][0] == varArray[0] && queryList[t][1] == varArray[1] && queryList[t][2] == varArray[2]
                && queryList[t][3] == varArray[3])
                {
                    arrayExists = true;
                    break;
                }
            }
            if(!arrayExists)
            {
                queryList.push(varArray);
            }
            // We should avoid making the same begin and end transaction call  repeatedly with below procedure
            if(transactionStr)
            {
                var transactionPushed = false;
                for(var t = 0; t < transactions.length ; t++)
                {
                    if(transactions[t] == moduleName)
                    {
                        transactionPushed = true;
                        break;
                    }
                }
                if(!transactionPushed)
                {
                    transactions.push(moduleName);
                }
            }
        }
        else // If the Key Name is an array
        {

            for(var y=0;y < queryStr.length;y ++) // for each Module Name in the moduleName array do the same things
            {
                var varArray = new Array();
                varArray[0] = moduleName;
                varArray[1] = ArrayCombiner([prefix,queryStr[y],postfix]);
                varArray[2] = query2Str;
                varArray[3] = transactionStr;

                var arrayExists = false;
                for(var t = 0; t < queryList.length ; t++)
                {
                    if(queryList[t][0] == varArray[0] && queryList[t][1] == varArray[1] && queryList[t][2] == varArray[2]
                     && queryList[t][3] == varArray[3])
                     {
                        arrayExists = true;
                        break;
                     }
                }

                if(!arrayExists)
                {
                    queryList.push(varArray);
                }
                if(transactionStr)
                {
                    var transactionPushed = false;
                    for(var t = 0; t < transactions.length ; t++)
                    {
                        if(transactions[t] == moduleName)
                        {
                            transactionPushed = true;
                            break;
                         }
                    }
                    if(!transactionPushed)
                    {
                        transactions.push(moduleName);
                    }
                }
            }
        }
    }
},
BuildParseQuery: function(parseQueryList,alreadyQueried) {
      var passiveQuery = this.qArray[this.qDepth].Passive == true?true:false;
      var dynamicPassiveQuery = eval(this.qArray[this.qDepth].DynamicPassive) == true?true:false;

        if(!passiveQuery && !dynamicPassiveQuery)
        {
                // If the keyName's prefix is '@' than it means that it is a Javascript Object declared on that page.

                var moduleName = this.qArray[this.qDepth].Module;
                var keyNameIsVar = false;
                var keyName;
                if(this.qArray[this.qDepth].Key.charAt(0)== "@")
                {keyName =eval(this.qArray[this.qDepth].Key.replace("@",""));
                 keyNameIsVar = true;}
                 else                {
                    keyName = this.qArray[this.qDepth].Key;
                 }
                /*var keyName = this.qArray[this.qDepth].Key.charAt(0)== "@" ? eval(this.qArray[this.qDepth].Key.replace("@","")) :
                    this.qArray[this.qDepth].Key;                                   */
                var pollField = this.qArray[this.qDepth].PollField;
                var prefix = this.qArray[this.qDepth].Prefix == null ? "":this.qArray[this.qDepth].Prefix;
                // This variable indicates what to parse from the AJAX POST Result
                var pollFieldInc = this.qArray[this.qDepth].PollFieldInc;
                // This variable indicates that the pollField value will be incremented by adding a integer value at the end of it.

                var polledValue;
                var valueToSet;

                if(this.qDepth == this.qArray.length -1)
                { // If the ASPQuery is at the final stage of its Query List than this means that final results will be assigned to a HTML DOM Object
                // or a Javascript on that Page.
                    var count = 0;
                    var keyType = typeof(keyName);
                    if (keyType == "object")
                    {
                        if(pollFieldInc)
                        {
                            var resultArray = new Array();
                            var countInc = 0;
                            var varArray = new Array();
                            varArray[0] = moduleName;
                            varArray[1] = ArrayCombiner([prefix , keyName[count], pollField]);
                            alreadyQueried = IsPollInList(varArray, parseQueryList);
                            varArray[1] += countInc;

                            polledValue = getValue(varArray[0], varArray[1]); // Parse the result
                            polledValue = polledValue == ""?this.qArray.EmptyString:polledValue;
                            while (polledValue != "")
                            {
                                resultArray.push(polledValue);
                                varArray[1] = ArrayCombiner([prefix, keyName[count], pollField]) +  ++countInc;
                                polledValue = getValue(varArray[0], varArray[1]);


                            }


                            polledValue =resultArray;

                            valueToSet = polledValue;

                        }
                        else
                        {
                            var varArray = new Array();
                            varArray[0] = moduleName;
                            varArray[1] = ArrayCombiner([prefix, keyName[count], pollField]);

                            alreadyQueried = IsPollInList(varArray, parseQueryList);
                            polledValue = getValue(varArray[0], varArray[1]); // Parse the result

                            valueToSet = polledValue == ""? this.qArray.EmptyString:
                     this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                     this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                     polledValue; // If the returning result is an empty string than assing the EmptyString Key declared for this Query Object
                                  // Else -> If the Enum field declared Enum the returned result and assign it or If the RetStr field is declared
                                  // Find the Value for the given Return String and assign it Or directly Assign the returned value to the HTML DOM
                                  // or Javascript Object on that page.
                        }

                    }
                    else
                    {
                        if(pollFieldInc)
                        {
                            var varArray = new Array();
                            varArray[0] = moduleName;
                            if(keyNameIsVar)
                            {varArray[1] = ArrayCombiner([prefix,keyName,pollField]) + "0";// first element is 0}
                             }
                            else
                            {varArray[1] = ArrayCombiner([prefix,pollField]) + "0";// first element is 0}
                            }
                            alreadyQueried = IsPollInList(varArray, parseQueryList);
                            polledValue = getValue(varArray[0], varArray[1]); // Parse the result
                            valueToSet = polledValue == ""? this.qArray.EmptyString:
                     this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                     this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                     polledValue; // If the returning result is an empty string than assing the EmptyString Key declared for this Query Object
                                  // Else -> If the Enum field declared Enum the returned result and assign it or If the RetStr field is declared
                                  // Find the Value for the given Return String and assign it Or directly Assign the returned value to the HTML DOM
                                  // or Javascript Object on that page.
                        }
                        else
                        {
                            var varArray = new Array();
                            varArray[0] = moduleName;
                            if(keyNameIsVar)
                            {varArray[1] = ArrayCombiner([prefix,keyName, pollField]);}

                            else
                            {varArray[1] = ArrayCombiner([prefix, pollField]);
                            }


                            alreadyQueried = IsPollInList(varArray, parseQueryList);
                            polledValue = getValue(varArray[0], varArray[1]); // Parse the result
                            valueToSet = polledValue == ""? this.qArray.EmptyString:
                     this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                     this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                     polledValue; // If the returning result is an empty string than assing the EmptyString Key declared for this Query Object
                                  // Else -> If the Enum field declared Enum the returned result and assign it or If the RetStr field is declared
                                  // Find the Value for the given Return String and assign it Or directly Assign the returned value to the HTML DOM
                                  // or Javascript Object on that page.
                        }

                    }




                    var ourObjFactory = new UIObjectFactory();
                    var ourObj = ourObjFactory.Create(eval(this.qArray.ObjType),
                    this.qArray.RelatedObject); // Reference to  the Javascript or HTML DOM Object that will be assigned

                     if(keyType == "object") // If the keyType is an Array
                     {
                         var loopCount = 0;
                         while(loopCount < keyName.length) // while the polledValue comes as an Empty String
                         {

                             if(valueToSet != null)
                             {
                                if(!alreadyQueried)
                                {

                                    parseQueryList.push(varArray); // push the Parsing Parameters in to this array to fyrther check not to repeat it
                                    ourObj.SetValues(valueToSet); // Set the returned value to the Related object using Factory Pattern
                                }

                             }
                             if(pollFieldInc)
                             {
                                var resultArray = new Array();
                                var countInc = 0;
                                var varArray = new Array();
                                varArray[0] = moduleName;
                                varArray[1] = ArrayCombiner([prefix, keyName[++count], pollField]);
                                alreadyQueried = IsPollInList(varArray, parseQueryList);
                                varArray[1] += countInc;
                                polledValue = getValue(varArray[0], varArray[1]); // Accorsing to the changed Parameters poll the new value

                                if(keyName[count] == null)
                                {
                                    break; // to avoid infinite Loop
                                }
                               while(polledValue != "")
                                {
                                    resultArray.push(polledValue);
                                    varArray[1] =  ArrayCombiner([prefix, keyName[count], pollField]) + ++countInc;
                                    polledValue = getValue(varArray[0],varArray[1]);

                                }
				if(resultArray == "" && !this.qArray.allowEmptyArray)
				{
					resultArray.push("-");
					polledValue = resultArray;
					valueToSet = polledValue;
				}
				else
				{
					polledValue = resultArray;
					valueToSet = polledValue;
				}


                             }
                             else
                             {
                                 var varArray = new Array();
                                 varArray[0] = moduleName;

                                 if(++count < keyName.length)
                                 {
                                    varArray[1] = ArrayCombiner([prefix, keyName[count], pollField]);

                                    alreadyQueried = IsPollInList(varArray, parseQueryList);
                                    polledValue = getValue(varArray[0], varArray[1]); // Accorsing to the changed Parameters poll the new value
                                    polledValue = polledValue == ""?this.qArray.EmptyString:polledValue;
                                    valueToSet = this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                                    this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                                    polledValue;
                                 }
                                 else
                                 {
                                    break;
                                 }
                             }
                             loopCount++;
                         }
                     }
                     else // If the Key Name is not an object and it is a solid string
                     {
                         if(pollFieldInc)
                         {
                            while(polledValue != "") // while the polledValue comes as an Empty String
                            {
                                if(valueToSet != null)
                                 {
                                    if(!alreadyQueried)
                                    {
                                        parseQueryList.push(varArray);
                                        ourObj.SetValues(valueToSet);
                                    }

                                 }

                                 var varArray = new Array();
                                varArray[0] = moduleName;
                                if(keyNameIsVar)
                                {varArray[1] = ArrayCombiner([prefix ,keyName, pollField]) + ++count;

                                }
                                else
                                {varArray[1] = ArrayCombiner([prefix , pollField]) + ++count;
                                }
                                alreadyQueried = IsPollInList(varArray, parseQueryList);
                                polledValue = getValue(varArray[0], varArray[1]); // Parse the result

                                valueToSet = polledValue == ""? this.qArray.EmptyString:
                                     this.qArray.Enum != null ? this.qArray.Enum[polledValue]:
                                     this.qArray.RetStr != null ? this.qArray.RetStr.eval(polledValue):
                                     polledValue; // If the returning result is an empty string than assing the EmptyString Key declared for this Query Object
                                                  // Else -> If the Enum field declared Enum the returned result and assign it or If the RetStr field is declared
                                                  // Find the Value for the given Return String and assign it Or directly Assign the returned value to the HTML DOM
                                                  // or Javascript Object on that page.


                            }

                         }
                         else
                         {
                             if(valueToSet != null)
                             {
                                if(!alreadyQueried)
                                    {
                                        parseQueryList.push(varArray);
                                    }
                                ourObj.SetValues(valueToSet);
                             }

                         }
                     }
                }
                else // If the ASPQuery object is not at its final stage or step
                {
                    var ourInnerVar = this.qArray[this.qDepth + 1].Key;
                    // Get the next coming query's Key Variable.
                    if(ourInnerVar.charAt(0) == "@") // This variable would be generaly prefixed with '@' There is
                                                     // no other kind of handling at the moment
                    {
                            var pollField = this.qArray[this.qDepth].PollField;
                            var varStr= typeof(eval(ourInnerVar.replace("@","")));
                            varStr = varStr.replace("string","StringObj").replace("object", "ArrayObj").replace("undefined", "StringObj");
                            var varType = eval(varStr);
                            var varFact = new PageVarFactory();
                            var yeni = varFact.Create(varType, ourInnerVar.replace("@",""));
                            var count = 0;
                            var keyNameArray = new Array();


                            if(typeof(keyName) == "object")
                            {
                                for (var ge = 0; ge < keyName.length; ge++)
                                {
                                    keyNameArray.push(keyName[ge]);
                                }


                                if (pollFieldInc == true)
                                {
                                    var countInc = 0;
                                    var resultArray = new Array();

                                    var varArray = new Array();
                                    varArray[0] = moduleName;
                                    varArray[1] =  ArrayCombiner([prefix, keyNameArray[count], pollField]);
                                    alreadyQueried = IsPollInList(varArray, parseQueryList);
                                    varArray[1] += countInc;

                                    polledValue = getValue(varArray[0],varArray[1]);


                                    while(polledValue != "")
                                        {
                                            resultArray.push(polledValue);
                                            varArray[1] =  ArrayCombiner([prefix ,keyNameArray[count],pollField]) + ++countInc;
                                            polledValue = getValue(varArray[0],varArray[1]);
                                        }

                                    varArray[1] =  ArrayCombiner([prefix,keyNameArray[count], pollField]); // I put this to control overpolling
                                    polledValue = resultArray;

                                }
                                else
                                {
                                    var varArray = new Array();
                                    varArray[0] = moduleName;
                                    varArray[1] = ArrayCombiner([prefix, keyNameArray[count], pollField]);
                                    alreadyQueried = IsPollInList(varArray, parseQueryList);
                                    polledValue = getValue(varArray[0], varArray[1]);
                                }

                            }
                            else
                            {
                                var varArray = new Array();
                                varArray[0] = moduleName;
                                varArray[1] = pollFieldInc ==true? pollField + count :pollField ;
                                alreadyQueried = IsPollInList(varArray, parseQueryList);
                                polledValue = getValue(varArray[0], varArray[1]);


                            }

                            while(polledValue != "")
                            {

                                if(!alreadyQueried)
                                {

                                    parseQueryList.push(varArray);
                                    yeni.SetValues(polledValue);
                                }

                                count++;
                                if(typeof(keyName) != "object") // Bu key Name yerinde bir string variable olduğu anlamına gelir
                                {
                                    var varArray = new Array();
                                    varArray[0] = moduleName;
                                    if(pollFieldInc == true) // Bu Poll Fieldin incremetable olduğunu söyler
                                    {
                                        varArray[1] =  pollField + count;

                                    }
                                    else
                                    {
                                        //Bu Poll Fieldin incremetable olmadığını söyler O yüzden bu loop daha fazla devam etmemeli.
                                        break;
                                    }

                                    alreadyQueried = IsPollInList(varArray, parseQueryList);


                                    polledValue = getValue(varArray[0], varArray[1]);


                                }
                                else // Bu key Name yerinde bir Array variable olduğu anlamına gelir. O yüzden modüllere tek tek erişmek için
                                // arttırılmış count buraya verilir.
                                {

                                    if(pollFieldInc == true) // Bu Poll Fieldin incremetable olduğunu söyler
                                    {
                                        var countInc = 0;
                                        var resultArray = new Array();
                                        var varArray = new Array();
                                        varArray[0] = moduleName;
                                        varArray[1] =  ArrayCombiner([prefix ,keyNameArray[count], pollField]);
                                        alreadyQueried = IsPollInList(varArray, parseQueryList); // we do this here not after addin countInc
                                        varArray[1] +=  countInc;
                                        polledValue = getValue(varArray[0],varArray[1]);

                                        while(polledValue != "")
                                        {

                                            resultArray.push(polledValue);
                                            varArray[1] =  ArrayCombiner([prefix, keyNameArray[count], pollField]) + ++countInc;
                                            polledValue = getValue(varArray[0],varArray[1]);
                                        }

                                        varArray[1] =  ArrayCombiner([prefix, keyNameArray[count], pollField]); // I need this to control overpolling
                                        polledValue = resultArray;

                                    }
                                    else
                                    {
                                        var varArray = new Array();
                                        varArray[0] = moduleName;
                                        if(count < keyNameArray.length)
                                        {
                                            varArray[1] = ArrayCombiner([prefix, keyNameArray[count], pollField]);
                                            alreadyQueried = IsPollInList(varArray, parseQueryList);
                                            polledValue = getValue(varArray[0], varArray[1]);
                                        }
                                        else
                                        {
                                            break;
                                        }

                                    }
                                }
                            }
                    }
                }
             }
    }
});



var AspQueryFactory = Class.extend({

construct: function() { /* optional constructor method */ },
Create: function(queryArray, queryDepth) {
    var varType;
    if(queryArray.Version == null)
    {
        varType = AspQueryv1;
    }
    else
    {

        varType = eval(queryArray.Version);
    }

    return new varType(queryArray, queryDepth);
}
});



/*This part is for ASP Query Routines*/
function AspQuery(queryArray, queryDepth)
{
    this.qArray = queryArray; // this variable is to hold the Array of Queries that will processed further
    this.qDepth = queryDepth; // this variable is to hold which Stage of the POST AJAX is taking place. For example
                              // if the queryDepth was 0 that would mean that this is the first stage of the POST AJAX operations and so forth.

AspQuery.prototype.SendQuery = function() // The SendQuery to manage the AJAX Post Procedure
{
    beginXML();
    try{
    var queryList = new Array(); // Here we hold the Query Procedures in this array
    var transactions = new Array(); // Here we hold the begin and end transaction GET routines

    for(var ty = 0; ty < this.qArray.length; ty++)
    {

        var aspFactory = new AspQueryFactory();
        var ourAspQueryGen = aspFactory.Create(this.qArray[ty],this.qDepth);
        ourAspQueryGen.BuildSendQuery(queryList,transactions);

    }
    // Finally this is the place where we make our ASPQuery Calls according to the arrays formed above.

    for(var hg=0; hg <queryList.length; hg++)
    {
        if(!queryList[hg][3])
        {
            addQuery(queryList[hg][0], queryList[hg][1], queryList[hg][2]);
        }
    }
    for(var fg=0; fg <transactions.length; fg++)
    {
        addCommand("cfgmgr-0", "begin_transaction", transactions[fg]);
    }
    for(var hg=0; hg <queryList.length; hg++)
    {
        if(queryList[hg][3])
        {
            addGet(queryList[hg][0], queryList[hg][1],queryList[hg][2]);
        }

    }
    for(var fg=0; fg <transactions.length; fg++)
    {
        addCommand("cfgmgr-0", "end_transaction", transactions[fg]);
    }
    }
    catch(err){/*alert(__ML_Query_Error + " Query "+ err.description == null?err:err.description);*/}
    endXML();
    AspQuery.prototype.objectInUse = this; // Make sure that the reference to this ASPQuery Object is hold in objectInUse vaiable
                                           // Because in the Asynchronous call to Parsequery the 'this' object reference is lost
                                           // because of the nature of Javascript.
    var fn = AspQuery.prototype.ParseQuery; // Point to the function where the Asynchronous Ajax event is received.
    sendAJAX(fn); // sendAjax Queries with this function

}
AspQuery.prototype.ParseQuery = function()
{
    try
    {
        var parseQueryList = new Array();
        var alreadyQueried = false; // a check to avoid to parse the same result again.

        for(var ty = 0; ty < AspQuery.prototype.objectInUse.qArray.length; ty++) // For every Query made we will now parse the results
        {
            var aspFactory = new AspQueryFactory();
            var ourAspQueryGen = aspFactory.Create(AspQuery.prototype.objectInUse.qArray[ty],AspQuery.prototype.objectInUse.qDepth);
            ourAspQueryGen.BuildParseQuery(parseQueryList,alreadyQueried);

        }
      }catch(err){/*alert( __ML_Query_Error + " Parse " + err.description == null? err:err.description);*/}

    AspQuery.prototype.objectInUse.siguenteObj.SendQuery();

}
AspQuery.prototype.getDeeperQuery = function(nextObj)
{
   this.siguenteObj = nextObj;
}
}

// implementing a decorator
AspQueryFinal = function()
{
  AspQueryFinal.prototype.SendQuery = function(){

    try
    {
        if(typeof(pageSpecificOps) == "function")
            pageSpecificOps();
    }
    catch(err)
    {

    }

    showPage();


  }
}


function page_query()
{
    var validObjects = new Array(); // This array will be used to hold the Query Objects defined on each page
    for (var i=0;i < myPageData.length;i++)
    {
        try
        {
                if(queryDepthLength < myPageData[i].length)
                {
                    queryDepthLength = myPageData[i].length; // query Depth Length is increased to the highest depth length
                }
                validObjects.push(myPageData[i]);  // push each QueryObject into this array
         }
         catch(err){}
    }
    var queries = new Array(); // This array is to hold each ASPQuery object
    for(var ir = 0; ir <queryDepthLength; ir++)
    {
        var queryArray = new Array(); // this array is the first constructor parameter of ASPQuery object
        for(var hy = 0; hy < validObjects.length; hy++) // For each Query Object defined on the Html Page
        {
            if(validObjects[hy].length > ir) // If the subsequent number of queries of that Query Object is bigger than the current ir value
            {
                queryArray.push(validObjects[hy]); // Here we form the first parameter of the AspQuery constructor
            }
        }
        queries.push(new AspQuery(queryArray, ir)); // And the ASPQuery is constructed and pushed into queries Array that is holding all
    }    // ASPQuery objects
    var lastQuery = new AspQueryFinal(); // The last ASPQuery Object will be the ASPQueryFinal where the last decorator operations take place.
    for(var ql= 0; ql < queries.length; ql++) // In this for loop we link all the Decorator Objects to each other
    {
        if(queries[ql+1] != null)
        {
            queries[ql].getDeeperQuery(queries[ql+1]);
        }
        else
        {
            queries[ql].getDeeperQuery(lastQuery);
        }
    }

    queries[0].SendQuery();// And call the first Decorator Objects SendQuery function (This will subsequently
    // call all the other Decortor Objects SendQuery function. But because AJAX is asynchronous normally
    // the SendQuery function of the next object will be called at the aend of the Asynchronous Callback function which is
    // ParseQuery in every ASPQuery Object). Other point here is that the Decorators final objects Sendquery function is called
    // in the Normal Decorator Pattern but because this is a modified implementation I do it from the first Linked Objects SendQuery
    // function.
}
/*End Of ASP Query Routines*/
// This function only operates on Html Objects that are nested in Html Tables
function object_visibility(visiblity_group, set_defaults)
{

    try
    {
        for (var i=0;i < myPageData.length;i++)
        {
            if(myPageData[i].VisibleGroup != null)
            {
				var conditionCheck = true;
				if(myPageData[i].VisibleConditionCheck != null)
				{
					if(!eval(myPageData[i].VisibleConditionCheck))
					{
						conditionCheck = false;
					}
				}
                var objectVisible = false;
                for(var j= 0; j <myPageData[i].VisibleGroup.length;j++)
                {
                    if(visiblity_group == myPageData[i].VisibleGroup[j])
                    {
                        objectVisible = true;
                        break;
                    }
                }
                var ourObject = document.getElementById(myPageData[i].RelatedObject);
                if(ourObject == null)
                {
                    ourObject = document.getElementsByName(myPageData[i].RelatedObject).item(0);
                }
                var realObject = ourObject;
                for(var f=0; f < myPageData[i].VisibiltyDepth; f++)
                {
                    ourObject = ourObject.parentNode;

                }

		if(objectVisible && conditionCheck)
                {
                    realObject.style.display = "";
                    ourObject.style.display = "";
                }
                else
                {
                    realObject.style.display = "none";
                    ourObject.style.display = "none";
                }
                if(myPageData[i].Defaults != null && set_defaults )
                {
                    var objectFact = new UIObjectFactory();
                    var ourObjects = objectFact.Create(eval(myPageData[i].ObjType), myPageData[i].RelatedObject);
                    ourObjects.SetValues(eval("myPageData[i].Defaults." + visiblity_group));

                }

            }

        }
    }
    catch(err)
    {

    }

}




var UIObjects = Class.extend({

construct: function() { },
SetValues: function(valueObject) {

},
GetValues: function() {

}
});

var VarObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = uiElement; },
SetValues: function(valueObject) {

   eval(this.ourelement + "=\"" + valueObject + "\"");

},
GetValues: function() {
 return eval(this.ourelement);
}
});

var VarArrayObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = uiElement; },
SetValues: function(valueObject){


   eval(this.ourelement).push(valueObject);
},
GetValues: function() {
 return eval(this.ourelement);
}
});

var TextBoxObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
   this.ourelement.value = valueObject;
},
GetValues: function() {
 return this.ourelement.value;
}
});

var LabelObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
   this.ourelement.innerHTML = valueObject;
},
GetValues: function() {
 return this.ourelement.innerHTML;
}
});

var SelectObjFilling = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
  var optionElement=document.createElement('option');
  optionElement.selected = valueObject.charAt(valueObject.length -1) == "@";
  var strTpDisp = valueObject.charAt(valueObject.length -1) == "@"? valueObject.substring(0,valueObject.length -1):valueObject;
  optionElement.text= strTpDisp
  optionElement.value =strTpDisp;



 try
    {
        this.ourelement.add(optionElement,null); // standards compliant
    }
    catch(ex)
    {
        this.ourelement.options.add(optionElement); // IE only
    }



},
GetValues: function() {
 var retVals = new Array();
 for(var h=0;h < this.ourelement.length;h++)
 {
    var strInSubj = this.ourelement.options[h].value;
    retVals.push(this.ourelement.options[h].selected?strInSubj+"@":strInSubj);
 }
 return retVals;
}
});

var SelectObjFillValue = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(keyValuePair) {
  var keyObject = keyValuePair[0];
  var valueObject = keyValuePair[1];

  var optionElement=document.createElement('option');
  optionElement.selected = keyObject.charAt(keyObject.length -1) == "@";
  var strTpDisp = keyObject.charAt(keyObject.length -1) == "@"? keyObject.substring(0,keyObject.length -1):keyObject;
  var strValue = valueObject.charAt(valueObject.length -1) == "@"? valueObject.substring(0,valueObject.length -1):valueObject;
  optionElement.text= strTpDisp
  optionElement.value =strValue;

    try
    {
        this.ourelement.add(optionElement,null); // standards compliant
    }
    catch(ex)
    {
        this.ourelement.options.add(optionElement); // IE only
    }



},
GetValues: function() {
 var retVals = new Array();
 for(var h=0;h < this.ourelement.length;h++)
 {
    var keyValue = new Array();
    var keyInSubj = this.ourelement.options[h].selected?this.ourelement.options[h].text + "@":this.ourelement.options[h].text;
    var valueInSubj = this.ourelement.options[h].selected?this.ourelement.options[h].value + "@":this.ourelement.options[h].value;
    keyValue.push(keyInSubj);
    keyValue.push(valueInSubj);
    retVals.push(keyValue);
 }
 return retVals;
}
});


var SelectObjSelecting = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
  for(var h=0;h < this.ourelement.length;h++)
 {
    if(this.ourelement.options[h].value == valueObject)
    {
        this.ourelement.options[h].selected = true;
        break;
    }

 }


},
GetValues: function() {
 var selectedValue = "-";
 for(var h=0;h < this.ourelement.length;h++)
 {
    if(this.ourelement.options[h].selected)
    {
        selectedValue = this.ourelement.options[h].value;
        break;
    }

 }
 return selectedValue;
}
});



var RadioCollObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementsByName(uiElement); },
SetValues: function(valueObject) {
  for(var h=0;h < this.ourelement.length;h++)
 {
    if(this.ourelement.item(h).value == valueObject)
    {
        this.ourelement.item(h).checked = true;
        break;
    }

 }


},
GetValues: function() {
 var selectedValue = "-";
 for(var h=0;h < this.ourelement.length;h++)
 {
    if(this.ourelement.item(h).checked)
    {
        selectedValue = this.ourelement.item(h).value;
        break;
    }

 }
 return selectedValue;
}
});

var CheckBoxObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {

   this.ourelement.checked = valueObject == "1";
},
GetValues: function() {
 return this.ourelement.checked?1:0;
}
});

var RadioButObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
   if(valueObject == "1")
        this.ourelement.click();
},
GetValues: function() {
 return this.ourelement.checked?1:0;
}
});
var RadioButtonObj = UIObjects.extend({

construct: function(uiElement){ this.ourelement = document.getElementById(uiElement); },
SetValues: function(valueObject) {
},
GetValues: function() {
return this.ourelement.value;
}
});
var DivObj = UIObjects.extend({

construct: function(uiElement){ try{this.ourelement = document.getElementById(uiElement); }catch(ex){}},
SetValues: function(valueObject) {
try{
this.ourelement.innerHTML = valueObject;
}catch(ex){}
},
GetValues: function() {
var returnValue = "";
try{
returnValue = this.ourelement.innerHTML;
}catch(ex){}
return returnValue;
}
});

var UIObjectFactory = Class.extend({

construct: function() {  },
Create: function(objectType, objectName) {
    return new objectType(objectName);
}

});


var PageVarObjects = Class.extend({

construct: function() { /* optional constructor method */ },
SetValues: function(valueObject) {

},
GetValues: function() {

}
});

var StringObj = PageVarObjects.extend({

construct: function(varElement){this.ourelement = varElement;},
SetValues: function(valueObject){
   eval(this.ourelement + "=\"" + valueObject + "\";");

},
GetValues: function() {
 return eval(this.ourelement);
}
});

var ArrayObj = PageVarObjects.extend({

construct: function(varElement){this.ourelement = varElement;},
SetValues: function(valueObject){

   eval(this.ourelement).push(valueObject);

},
GetValues: function() {

 return eval(this.ourelement);
}
});


var PageVarFactory = Class.extend({

construct: function() { /* optional constructor method */ },
Create: function(varType, varName) {
    return new varType(varName);
}
});

var PageValidationObjects = Class.extend({

construct: function() { },
Validate: function() {

}
});

var RequiredField = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
    try
    {
        var uiFactory = new UIObjectFactory();
        var ourObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.RelatedObject);
        var value = ourObject.GetValues();
        if(this.ourelement.RelatedName == null)
        {
            alert("Note to developer : RelatedName must be defined");
            return false;
        }
		 else if((this.ourelement.RegexPattern != null || this.ourelement.RejectRegexPattern != null) && this.ourelement.RegexFormat == null)
		{
			alert("Note to developer : RegexFormat must be defined");
			return false;
		}
		 else
		 {
            if(value == "")
            {
                alert(this.ourelement.RelatedName + __ML_Required_Field);
                return false;
			 }
		}
    }
    catch(err)
    {
        //alert(err.description);
        return false;
    }
    return true;

}
});


var RegexField = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
try
    {
        var value = "";
        var uiFactory = new UIObjectFactory();
        var ourObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.RelatedObject);
        value = ourObject.GetValues();

        if(this.ourelement.RegexPattern == null)
        {
            alert("Note to developer : Regex Pattern is not written");
            return false;
        }
        else if(this.ourelement.RelatedName == null)
        {
            alert("Note to developer : RelatedName must be defined");
            return false;
        }
        else
        {
            if(value.match(this.ourelement.RegexPattern) == null)
            {
                alert(this.ourelement.RelatedName +  __ML_Regex_Msg + "[" + this.ourelement.RegexFormat + "]" +
                "   " + value + " " +  __ML_Regex_wrong);
                return false;
            }
	    if(this.ourelement.RegexExcludeValues != null)
	    {
		    for(var i = 0; i < this.ourelement.RegexExcludeValues.length; i++)
		    {
			    if(value.toUpperCase() == this.ourelement.RegexExcludeValues[i].toUpperCase())
			    {
				    alert(this.ourelement.RelatedName +  __ML_Regex_Msg + "[" + this.ourelement.RegexFormat + "]" +
						    "   " + value + " " +  __ML_Regex_wrong);
				    return false;
			    }
		    }
	    }

	    if(this.ourelement.RejectRegexPattern != null)
	    {

		    if(this.ourelement.RejectRegexPattern.constructor.toString().indexOf("Array") != -1)
		    {
			    for(var i = 0; i < this.ourelement.RejectRegexPattern.length; i++)
			    {
				    if(value.match(this.ourelement.RejectRegexPattern[i]) != null)
				    {
					    alert(this.ourelement.RelatedName +  __ML_Regex_Msg + "[" + this.ourelement.RegexFormat + "]" +
							    "   " + value + " " +  __ML_Regex_wrong);
					    return false;
				    }
			    }
		    }
		    else
		    {
			    if(value.match(this.ourelement.RejectRegexPattern) != null)
			    {
				    alert(this.ourelement.RelatedName +  __ML_Regex_Msg + "[" + this.ourelement.RegexFormat + "]" +
						    "   " + value + " " +  __ML_Regex_wrong);
				    return false;
			    }
		    }
	    }
        }

    }
    catch(err)
    {

        //alert(err.description);
        return false;
    }
    return true;
}
});

var UniqueName = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function()
{
	try
	{
		var uiFactory = new UIObjectFactory();
		var ourObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.RelatedObject);
		var value = ourObject.GetValues();

		if((!this.ourelement.UniqueNameArray) && (!this.ourelement.UniqueNameTable))
		{
			alert("Note to developer : .UniqueNameArray or UniqueNameTable is not written");
			return false;
		}
		else if(this.ourelement.UniqueNameExisting == null)
		{
			alert("Note to developer : .UniqueNameExisting is not written");
			return false;
		}
		else if(this.ourelement.RelatedName == null)
		{
			alert("Note to developer : RelatedName must be defined");
			return false;
		}
		else
		{
			var ourExistingName = eval(this.ourelement.UniqueNameExisting);
			var tmpValue = "";
			if(value != ourExistingName)
			{
				if(this.ourelement.UniqueNameArray)
				{
					var ourArray = eval(this.ourelement.UniqueNameArray);

					for(var g = 0; g < ourArray.length; g++)
					{
// 						alert(ourArray[g]);
						if(this.ourelement.UniqueNameArrayProperty)
						{
							if(ourArray[g][this.ourelement.UniqueNameArrayProperty] == null)
							{
								alert("Note to developer : UniqueNameArrayProperty must be defined as correctly");
								return false;
							}
							else
							{
								tmpValue = ourArray[g][this.ourelement.UniqueNameArrayProperty];
							}
						}
						else
						{
							tmpValue = ourArray[g];
						}

						if(value.toUpperCase() == tmpValue.toUpperCase())
						{
							alert(value + " " + __ML_Uniqe_Name.replace("@replace",this.ourelement.RelatedName));
							return false;
						}
					}
				}
				if(this.ourelement.UniqueNameTable)
				{
					var tableObject = eval(this.ourelement.UniqueNameTable);

					if(!tableObject.object)
					{
						alert("Note to developer : UniqueNameTable.object must be defined as correctly");
						return false;
					}
					else if(!tableObject.table)
					{
						alert("Note to developer : UniqueNameTable.table must be defined as correctly");
						return false;
					}
					else if(!tableObject.module)
					{
						alert("Note to developer : UniqueNameTable.module must be defined as correctly");
						return false;
					}
					else if(!tableObject.field)
					{
						alert("Note to developer : UniqueNameTable.field must be defined as correctly");
						return false;
					}
					else if(!tableObject.property)
					{
						tableObject.property = "value";
					}

					var ourObject = eval(tableObject.object);
					var ourTable = ourObject.tables[tableObject.table];
					if(!ourTable)
					{
// 						alert("Note to developer :UniqueNameTable.table dont found!");
						return true;
					}
					for(var i = 0; i < ourTable.length; i++)
					{
						if(value.toUpperCase() == ourTable[i][tableObject.module][tableObject.field][tableObject.property].toUpperCase())
						{
							alert(value + " " + __ML_Uniqe_Name.replace("@replace",this.ourelement.RelatedName));
							return false;
						}
					}
				}

			}
		}
	}
	catch(err)
	{
		alert(err.description);
		return false;
	}

	return true;
}
});

var CompareFields = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
try
    {

        var uiFactory = new UIObjectFactory();
        var ourObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.RelatedObject);
        var value = ourObject.GetValues();
        if(this.ourelement.FieldToCompare == null)
        {
            alert("Note to developer : .FieldToCompare is not written");
            return false;
        }
        else if(this.ourelement.CompareFieldName == null)
        {
            alert("Note to developer : .CompareFieldName is not written");
            return false;
        }
        else if(this.ourelement.CompareOperator == null)
        {
            alert("Note to developer : .CompareOperator is not written");
            return false;
        }
        else if(this.ourelement.RelatedName == null)
        {
            alert("Note to developer : RelatedName must be defined");
            return false;
        }
        else
        {
            var compObjItSelf = document.getElementById(this.ourelement.FieldToCompare);
            var compObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.FieldToCompare);
            var valueComp = compObject.GetValues();

            if(compObjItSelf.disabled == true || compObjItSelf.style.display == "none")
            {return true;}


            var compResult;
            switch(this.ourelement.CompareOperator)
            {
                case "=":
                    compResult = value == valueComp;
                    break;
                case ">":
                    compResult = value > valueComp;
                    break;
                case ">Integer":
                    compResult = parseInt(value) > parseInt(valueComp);
                    break;
                case "<":
                    compResult = value < valueComp;
                    break;
                case "<=":
                    compResult = value <= valueComp;
                    break;
                case ">=":
                    compResult = value >= valueComp;
                    break;
                default:
                    alert("Note to developer: No such an operator your options are =,>,<,>=,<=");
                    return false;

            }


            if(compResult)
            {
                return true;
            }
            else
            {
                alert(this.ourelement.RelatedName + " " + this.ourelement.CompareOperator  + " "+
                  this.ourelement.CompareFieldName + __ML_CompareFieldAlert);
                return false;
            }


        }

    }
    catch(err)
    {
        //alert(err.description);
        return false;
    }
    return true;
}
});


var RequiresReboot = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
try
    {

        var uiFactory = new UIObjectFactory();
        var ourObject = uiFactory.Create(eval(this.ourelement.ObjType), this.ourelement.RelatedObject);
        var value = ourObject.GetValues();

        if(this.ourelement.ExistingValue == null)
        {
            alert("Note to developer : .ExistingValue is not written");
            return false;
        }
        else
        {
            var ourValue = eval(this.ourelement.ExistingValue);

            if(ourValue != value)
            {
                requiresReboot = true;
                return true;
            }

        }

    }
    catch(err)
    {
        alert(err.description);
        return false;
    }
    return true;
}
});

var RangeValidator = PageValidationObjects.extend({
construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
  try
  {
        var uiFactory = new UIObjectFactory();
        var ourObject = uiFactory.Create(eval(this.ourelement.ObjType),
this.ourelement.RelatedObject);
		var value = parseFloat(ourObject.GetValues());

        if((this.ourelement.MaxLimit != null) &&
(parseFloat(this.ourelement.MaxLimit) < value))
        {
          alert(__ML_error_bigger_than.replace(/%name%/,
this.ourelement.RelatedName).replace(/%value%/,
this.ourelement.MaxLimit));
          return false;
        }
        if((this.ourelement.MinLimit != null) && (value >
parseFloat(this.ourelement.MinLimit)))
        {
                alert(__ML_error_less_than.replace(/%name%/,
this.ourelement.RelatedName).replace(/%value%/,
this.ourelement.MinLimit));
                return false;
        }
  }
  catch(e)
  {
        return false;
  }

  return true;
}

});



var OutOfBounds = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
try
    {

        if(this.ourelement.NewValue == null)
        {
            alert("Note to developer : .NewValue is not written");
            return false;
        }
        else if((!this.ourelement.UniqueNameArray) && (!this.ourelement.UniqueNameTable))
	{
		alert("Note to developer : .UniqueNameArray or UniqueNameTable is not written");
		return false;
	}
        else if(this.ourelement.MaximumElements == null)
        {
            alert("Note to developer : .MaximumElements is not written");
            return false;
        }
        else
        {
            if(this.ourelement.NewValue == true)
            {
		    if(this.ourelement.UniqueNameArray)
		    {
			    if(this.ourelement.MaximumElements <= eval(this.ourelement.UniqueNameArray).length)
			    {
				if(this.ourelement.OutOfBoundsMessage != undefined)
				{
					alert(this.ourelement.OutOfBoundsMessage);
				}
				else
				{
				    alert(__ML_OutOfBounds.replace("@number",this.ourelement.MaximumElements).replace("@type_names",  eval(this.ourelement.UniqueNameArray)));
				}
				
				    return false;
			    }
		    }

		if(eval(this.ourelement.UniqueNameTable))
		{
			var tableObject = eval(this.ourelement.UniqueNameTable);
			if(eval(tableObject.object))
			{
				var ourObject = eval(tableObject.object);

				if(ourObject.tables[tableObject.table])
				{
					if(this.ourelement.MaximumElements <= ourObject.tables[tableObject.table].length)
					{
						if(this.ourelement.OutOfBoundsMessage != undefined)
						{
							alert(this.ourelement.OutOfBoundsMessage);
						}
						else
						{
							var tmpStr = "";
							for(var i = 0; i < ourObject.tables[tableObject.table].length; i++)
							{
								tmpStr += ourObject.tables[tableObject.table][i][tableObject.module][tableObject.field].value;
								if(i != (ourObject.tables[tableObject.table].length - 1))
								{
									tmpStr += ", ";
								}
							}

							alert(__ML_OutOfBounds.replace("@number",this.ourelement.MaximumElements).replace("@type_names",  tmpStr));
						}
						return false;
					}
				}
			}
		}
            }

        }

    }
    catch(err)
    {
        alert(err.description);
        return false;
    }
    return true;
}
});

var CustomValidator = PageValidationObjects.extend({

construct: function(objectParam){this.ourelement = objectParam;},
Validate: function(){
try
    {

        if(this.ourelement.CustomValFunc == null)
        {
            alert("Note to developer : .CustomValFunc is not written");
            return false;
        }
        else
        {
            return this.ourelement.CustomValFunc();

        }

    }
    catch(err)
    {
        alert(err.description);
        return false;
    }
    return true;
}
});

var PageValidatorFactory = Class.extend({

construct: function() { },
Create: function(varType, varParam) {
    return new varType(varParam);
}
});

function PageValidate(validationGroup)
{
	for(var g = 0; g < myPageData.length; g ++)
	{
		var result = false;
		var objectItSelf = document.getElementById(myPageData[g].RelatedObject);
		if(objectItSelf == null)
		{
			objectItSelf = document.getElementsByName(myPageData[g].RelatedObject);
			if(objectItSelf.length > 0)
			{
				result = myPageData[g].PageValBehaviour != null && myPageData[g].PageValGroup == validationGroup && objectItSelf.item(0).disabled == false && objectItSelf.item(0).style.display != "none";
			}
		}
		else
		{
			result = myPageData[g].PageValBehaviour != null && myPageData[g].PageValGroup == validationGroup && objectItSelf.disabled == false && objectItSelf.style.display != "none";
		}
		if(result)
		{
			var ourFactory = new PageValidatorFactory();
			for (var f = 0; f < myPageData[g].PageValBehaviour.length; f++)
			{
					var ourObjInUse = ourFactory.Create(myPageData[g].PageValBehaviour[f],myPageData[g]);
					if(ourObjInUse.Validate() == false)
					{
						return false;
					}
			}
		}
	}
	return true;
}


function IsPollInList(queryVar, queryList)
{
    result =false;
    for(var t = 0; t < queryList.length; t++)
    {
        if(queryList[t][0] == queryVar[0] && queryList[t][1] == queryVar[1])
        {
            result = true;
            break;
        }
    }
    return result;
}
function ArrayCombiner(givenArray)
{
    var processArray = new Array();
    for(var t = 0; t < givenArray.length; t++)
    {
        if(givenArray[t] != "")
        {
            processArray.push(givenArray[t]);
        }
    }
    return processArray.join(".");

}
function SelectFiller(selObjName, keyValues, valueValues)
{
	try
	{
		var keyLength = keyValues.length;

		if(keyValues.object)
		{
			if(keyValues.table &&  keyValues.module && keyValues.field)
			{
				if(!keyValues.property)
				{
					keyValues.property = "value";
				}
				keyLength = keyValues.object.tables[keyValues.table].length;
			}
			else
				return;
		}

		if(valueValues.object)
		{
			if(valueValues.table &&  valueValues.module && valueValues.field)
			{
				if(!valueValues.property)
				{
					valueValues.property = "value";
				}
			}
			else
				return;
		}

		var objFact = new UIObjectFactory();
		var ourObj =  objFact.Create(SelectObjFillValue , selObjName);

		for( var i = 0; i < keyLength; i++)
		{
			var keyValueObj = new Array();
			if(keyValues[i] != null && valueValues[i] != null)
			{
				keyValueObj[0] = keyValues[i];
				keyValueObj[1] = valueValues[i];
			}
			else if(keyValues[i] != null && valueValues.object)
			{
				keyValueObj[0] = keyValues[i];
				keyValueObj[1] = valueValues.object.tables[valueValues.table][i][valueValues.module][valueValues.field][valueValues.property];
			}
			else if(keyValues.object == null && valueValues[i] != null)
			{
				keyValueObj[0] = keyValues.object.tables[keyValues.table][i][keyValues.module][keyValues.field][keyValues.property];
				keyValueObj[1] = valueValues[i];
			}
			else if(keyValues.object && valueValues.object)
			{
				if(keyValues.object.tables[keyValues.table][i][keyValues.module][keyValues.field][keyValues.property] != null && valueValues.object.tables[valueValues.table][i][valueValues.module][valueValues.field][valueValues.property] != null)
				{
					keyValueObj[0] = keyValues.object.tables[keyValues.table][i][keyValues.module][keyValues.field][keyValues.property];
					keyValueObj[1] = valueValues.object.tables[valueValues.table][i][valueValues.module][valueValues.field][valueValues.property];
				}
			}

			if(keyValueObj[0] != null && keyValueObj[1] != null) ourObj.SetValues(keyValueObj);
		}

		if(keyValues && !valueValues)
		{
			var keyValueObj = new Array();
			keyValueObj[0] = keyValues;
			keyValueObj[1] = "";
			ourObj.SetValues(keyValueObj);
		}
	}
	catch(err)
	{
	}
}
function getValues(objName, objType)
    {
        var typeObj = eval(objType);
        var ourObject = new typeObj(objName);
        return ourObject.GetValues();
    }

function setValues(objName, objType, objValue)
	{
	var typeObj = eval(objType);
	var ourObject = new typeObj(objName);
	return ourObject.SetValues(objValue);
    }




function SetRegex(objectId, regexPattern, regexFormat, pageValGroup, pageValBehaviour)
	{
		try
		{
			for(i = 0; i < myPageData.length; i++)
			{
				if(objectId == myPageData[i].RelatedObject)
				{
					myPageData[i].RegexPattern = regexPattern;
					myPageData[i].RegexFormat = regexFormat;
					myPageData[i].PageValGroup = pageValGroup;
					myPageData[i].PageValBehaviour = pageValBehaviour;
				}
			}
		}
		catch(err)
		{
			alert(err);
		}
	}

var uiLanguageObject = Class.extend({

	construct: function(type)
	{
		this.type = type;
		this.languagesArray = new Array();
		this.header = "";
		this.footer = "";
	},
 	addLanguage: function(code, value, priority, conditionDefVar)
  	{
		if(conditionDefVar == 0) return;

		if(this.type == "select")
		{
			this.languagesArray.push({"code" : code, "value" : value, "priority" : priority, "str" : this.getLink(code, value)});
		}
		else
		{
			this.languagesArray.push({"code" : code, "value" : value, "priority" : priority, "str" : this.getLink(code, value)});
		}

	},
   	getLink: function(code, value)
  	{
  		var langTxt = "";
  		if(this.type == "select")
  			langTxt = '<option value="'+code+'">'+value+'</option>';
  		else
			langTxt = "<a id='lang_" + code + "' href=\"javascript:void SelectLang('" + code + "')\"><b>" + value + "</b></a>";
		 
		 return langTxt;
	},
 	getLinks: function(separator)
  	{
  		switch(this.type) {
  			case "select":
  			seperator = "";
  			break;
  			default:
  			separator = separator || "&nbsp; - &nbsp;";
  			break;
  			
  		}

		var links = "";
	  	for(var i = 0; i < this.languagesArray.length; i++)
	  	{
			if((i != 0) && (separator != null))
		  	{
				links += separator;
		  	}
		  	links += this.languagesArray[i].str;
	  	}
		return this.header + links + this.footer;
	},

  	sortLanguageArray: function()
  	{
		for(var i = 0; i < this.languagesArray.length ; i++)
		{
			for(var j = i + 1; j < this.languagesArray.length; j++)
		  	{
				if(this.languagesArray[i].priority > this.languagesArray[j].priority)
			  	{
					var temp = [];
					temp = this.languagesArray[i];
					this.languagesArray[i] = this.languagesArray[j];
					this.languagesArray[j] = temp;
				}
			}
		}
	}
});