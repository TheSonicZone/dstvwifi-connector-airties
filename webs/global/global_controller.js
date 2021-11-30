var globalController =
{
		overrideMessages: function()
		{
			$.regula('override', {
		        name: 'Pattern',
		        constraintType: regula.Constraint.Pattern,
		        defaultMessage: '{label} ' + globalView.getMultiLanguageText('__ML_Regex_Msg') + '[ {format} ] {userinput} ' + globalView.getMultiLanguageText('__ML_Regex_wrong')
		        //,
		        //customMessage : "{customMessage}"
		    });

			$.regula('override', {
		        name: 'Required',
		        constraintType: regula.Constraint.Required,
		        defaultMessage: '{label} ' + globalView.getMultiLanguageText('__ML_Required_Field')
		    });

			$.regula('override', {
		        name: 'Numeric',
		        constraintType: regula.Constraint.Numeric,
		        defaultMessage: '{label} ' + globalView.getMultiLanguageText('__ML_Regex_Msg') + '[ {format} ] {userinput} ' + globalView.getMultiLanguageText('__ML_Regex_wrong')
		    });
		},

		validatePage: function()
		{
			var returnValue = true;
			/*
			$.regula('custom', {
				   name: "MustBeWep",
				   defaultMessage: "The answer must be equal to 42",
				   validator: function() {
				      return this.value == 42;
				   }
			});
			*/

			globalController.overrideMessages();

			var options = { elements: $("input[data-constraints]:visible").get()};

			$.regula('bind', options);

	        var constraintViolations = $.regula('validate', options);

	        for(var index in constraintViolations) {
	             var validationResult = constraintViolations[index];
	             alert(validationResult.message);
	             returnValue = false;
	             break;
	        }
	        return returnValue;
		},

		validateObjects: function(group)
		{
			var returnValue = true;

			globalController.overrideMessages();

			var options = { elements: $("input[data-constraints]:visible").get()};

			$.regula('bind', options);

			//var constraintViolations = $.regula('validate', {groups: [regula.Group.NewMac]});
			var constraintViolations = regula.validate({groups: [regula.Group[group]]});
			var messages = "";

			for(var index in constraintViolations)
			{
			      var constraintViolation = constraintViolations[index];
			      alert(constraintViolation.message);
		          returnValue = false;
		          break;
			}

			return returnValue;
		}
}
