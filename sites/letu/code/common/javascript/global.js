/* 
 * =============================================================
 *  G L O B A L
 * ============================================================= 
 */
 
$(document).ready(function() {

/* ________________________________________
 *  Acardeon dropdown
 * ----------------------------------------
 */
	$(".acardeonTitle").click(function(event){
		event?event.stopPropagation():window.event.cancelBubble=!0;
		$(this).closest(".acardeonBox").toggleClass("open").find('.acardeonContent').stop(true, true).slideToggle();
	});

/* ________________________________________
 *  Gift products list
 * ----------------------------------------
 */
	(function layoutResize(){
		var giftBlockHeight = $(".giftContainer").outerHeight();
		var cartBlockHeight = $(".cartContainer").outerHeight() - $(".cartContainer .bottomBox").outerHeight();
		if(giftBlockHeight > cartBlockHeight){
			var newHeight = cartBlockHeight - $(".giftContainer .giftHeader").outerHeight() - 2;
			$(".giftContainer .giftList").css("max-height",newHeight);
		}
	})();

/* ________________________________________
 *  Label class toggler
 * ----------------------------------------
 */
	$(".giftContainer .giftList input").change( function() {
		$(this).closest("label").toggleClass("checked");
	});

/* ________________________________________
 *  Gift tooltip
 * ----------------------------------------
 */
	$(".giftContainer .giftList li").bind({
		mouseenter: function() {
			var offset = $(this).offset();
			var img = $(this).find("img").clone();
			if (img.size() == 0){
				return;
			}
			$('.giftTooltip .imgBox').append(img);
			$('.giftTooltip').appendTo($(this)).fadeIn("slow").offset({ 
				top:offset.top + $(this).outerHeight()/2 - $('.giftTooltip').outerHeight() - $('.giftTooltip .corner').outerHeight(), 
				left:offset.left + ($(this).width()/2) - ($(".giftTooltip").width()/2)
			});
		},
		mouseleave: function(){
			$('.giftTooltip .imgBox').empty();
			$('.giftTooltip').stop(true, true).hide().appendTo($(".giftContainer"));
		}
	});
});

/* ________________________________________
 *  Popup 
 * ----------------------------------------
 */
function calculatorLinkClick (event){
	//event?event.preventDefault():window.event.cancelBubble=!0;

	var popupHeight = $('#calculator_popup').outerHeight();
	var popupWidth = $('#calculator_popup').outerWidth();
	var screenWidth = document.documentElement.clientWidth;
	var screenHeight = document.documentElement.clientHeight;
	var topPos = (screenHeight - popupHeight)/3 + $('body').scrollTop();
	var leftPos = (screenWidth - popupWidth)/2 ;

	$("#layer").show();
	$("#calculator_popup").fadeIn();
	$('#calculator_popup').offset({ top: topPos, left: leftPos });

	$("#popup_closeBtn").click(function(event){
		event?event.stopPropagation():window.event.cancelBubble=!0;
		$("#layer").hide();
		$('#calculator_popup').fadeOut();
	});
	return false;
}

function filterPageGiftCerts(viewAll, pageIndex, pageSize) {
	var data = {};
	if (viewAll == null) {
		viewAll = document.getElementById("viewAllGiftCertificates").value == "true";
	}
	if (viewAll) {
		data.viewAll = true;
	} else if (pageIndex != undefined && pageSize != undefined) {
		data.page = pageIndex;
		data.pageSize = pageSize;
	}

	blockContent();
	
	$.ajax("http://www.letu.ru/giftcertificate/giftCertificatesLandingPage.jsp", {
		"data": data,
		"success": function(data) {
			var newContent = $(data).find(".categoryContainer");
			$(".categoryContainer").replaceWith(newContent);
			$("#pageOverlay").remove();
		}
	});
}