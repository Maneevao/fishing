(function($) {
	var helper,
		visible,
		messageRegim,
		timeout1,
		timeout2;

	$.fn.message = function(message,regim) {
		message = $.trim(message || this.text());
		if (!message) {
			return;
		}
		clearTimeout(timeout1);
		clearTimeout(timeout2);
		messageRegim=regim;

		initMessage();
		initHelper();
		helper.find("p").html(message);
		helper.show().animate({ opacity: $.message.defaults.opacity}, $.message.defaults.fadeInDuration);
		visible = true;
		active = false;
		timeout1 = setTimeout(function() {
			visible = false;
		}, $.message.defaults.minDuration + $.message.defaults.displayDurationPerCharacter * Math.sqrt(message.length));
		timeout2 = setTimeout(fadeOutHelper, $.message.defaults.totalTimeout);
	};
	
	function initHelper() {
//		if (!helper) {
			helper = $($.message.defaults.template).appendTo(document.body);
			$(window).bind("mousemove click keypress", fadeOutHelper);
//		}
	};
	
	function fadeOutHelper() {
		if (helper.is(":visible") && !helper.is(":animated") && !visible) {
			helper.animate({ opacity: 0 }, $.message.defaults.fadeOutDuration, function() { $(this).hide() })
		}
	};
	
	function initMessage(){
		$.message = {};
		$.message.defaults = {};
		if (messageRegim=="info"){
			$.message.defaults = {
			opacity: 0.8,
			fadeOutDuration: 500,
			fadeInDuration: 200,
			displayDurationPerCharacter: 75,
			minDuration: 1000,
			totalTimeout: 2000,
			template: '<div class="jquery-message"><div class="round"></div><p></p><div class="round"></div></div>'
			};
		}
		else{
			$.message.defaults = {
			opacity: 0.8,
			fadeOutDuration: 500,
			fadeInDuration: 200,
			displayDurationPerCharacter: 75,
			minDuration: 1000,
			totalTimeout: 2000,
			template: '<div class="jquery-message1"><div class="round"></div><p></p><div class="round"></div></div>'
			};
		};
	};	
})(jQuery);
