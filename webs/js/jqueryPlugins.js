(function($) {
    $.serialize = function(text) {
        return $("<div>").text(text).html().split(" ").join("&nbsp;");
    };
	$.fn.simpletooltip = function() {
		return this.each(function() {
			var text = $(this).attr("title");
			$(this).attr("title", "");
			if (text != undefined) {
				$(this).hover(function(e) {
					var tipX = e.pageX + 12;
					var tipY = e.pageY + 12;
					$(this).attr("title", "");
					$("body").append("<div id='simpleTooltip' style='position: absolute; z-index: 100; display: none;'>" + text + "</div>");
					$("#simpleTooltip").css("left", tipX).css("top", tipY).fadeIn("medium");
				}, function() {
					$("#simpleTooltip").remove();
					$(this).attr("title", text);
				});
				$(this).mousemove(function(e) {
					var tipX = e.pageX + 12;
					var tipY = e.pageY + 12;
					$("#simpleTooltip").css("left", tipX).css("top", tipY).fadeIn("medium");
				});
			}
		});
    };
})(jQuery);

(function($) {
	$.fn.togglePasswordBox = function() {
		var $pass = this;
		var $checkbox = $("<input>").attr("type", "checkbox");

		var inputSize = $(this).prop("size");

		function changeView($pass) {
			var $newObj = $("<input>").attr({
				"id" : $pass.attr("id"),
				"size" : inputSize,
				"maxlength" : "128"
			});
			var $pass = $("#" + $pass.attr("id"));

			if ($pass.attr("type") == "text") {
				$newObj.attr("type", "password");
			} else {
				$newObj.attr("type", "text");
			}

			if ($pass.data("events") != undefined) {
				$.each($pass.data("events"), function(key, events) {
					$.each(events, function(index, element) {
						$newObj.on(key, element.handler);
					});
				});
			}

			$newObj.val($pass.val());
			$pass.remove();
			$newObj.insertBefore($checkbox.parent());
		}


		$checkbox.click(function() {
			changeView($pass);
		});

		$("<div>").append($checkbox).append(__ML_showPassword).insertAfter($pass);

		return this;
	};
})(jQuery);

(function($) {
	$.fn.tooltip = function() {
		return this.each(function() {
			var text = $(this).attr("tooltip");
			var bindObjID = $(this).attr("bindObj");

			var directionX = 12;
			var directionY = parseInt($(this).attr("positionFactor") | 12);

			if (text != undefined || bindObjID != undefined) {

				$(this).hover(function(e) {
					var tipX = e.pageX + directionX;
					var tipY = e.pageY + directionY;
					$(".tooltip").remove();

					$("body").append("<div id='simpleTooltip" + $(this).attr("id") + "' class='tooltip' style='position: absolute; z-index: 100; display: none;'><span id='simpleTooltipText'>" + (text != undefined ? $(this).attr("tooltip") : "") + (bindObjID != undefined ? "(" + getObjectValue(bindObjID) + ")" : "") + "</span></div>");
					$("#simpleTooltip" + $(this).attr("id")).css("left", tipX).css("top", tipY).fadeIn("fast");
				}, function() {
					$("#simpleTooltip" + $(this).attr("id")).remove();
				});
				$(this).mousemove(function(e) {
					var tipX = e.pageX + directionX;
					var tipY = e.pageY + directionY;
					$("#simpleTooltip" + $(this).attr("id")).css("left", tipX).css("top", tipY).fadeIn("fast");
				});
				$(this).click(function(e) {
					$("#simpleTooltipText").text((text != undefined ? $(this).attr("tooltip") : "") + (bindObjID != undefined ? "(" + getObjectValue(bindObjID) + ")" : ""));
				});
			}
		});
	}
})(jQuery);

(function($) {
	$.fn.addButtonClass = function() {
		return this.each(function() {
			$(this).button().addClass("buttonOptional");
		});
	}
})(jQuery);

(function($) {
	$.fn.objectType = function() {

		if (!$(this)[0]) {
			return "";
		} else if (!$(this)[0].tagName) {
			return "";
		}

		if ($(this)[0].tagName.toLowerCase() == "input")
			return $(this).attr("type");
		else
			return $(this)[0].tagName.toLowerCase();
	}
})(jQuery);

jQuery.expr[':'].hiddenByParent = function(a) {
	return jQuery(a).is(':hidden') && jQuery(a).css('display') != 'none';
};

function getObjectValue(id) {
	var val = "";

	if ($("#" + id).objectType() == "span") {
		val = $("#" + id).text();
	} else {
		val = "";
		//doldurulur
	}

	return val;
}

