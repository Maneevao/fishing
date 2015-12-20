function hidePopup(obj) {
	$(obj).parents(".whitePopupContainer").hide();
	  removeHandler(window, 'DOMMouseScroll', wheel);
	  removeHandler(window, 'mousewheel', wheel);
	  removeHandler(document, 'mousewheel', wheel);
}

function addHandler(object, event, handler, useCapture) {
	if (object.addEventListener) {
		object.addEventListener(event, handler, useCapture ? useCapture : false);
	} else if (object.attachEvent) {
		object.attachEvent('on' + event, handler);
	} else alert("Add handler is not supported");
}

function removeHandler(object, event, handler) {
    if (object.removeEventListener) {
          object.removeEventListener(event, handler, false);
    } else if (object.detachEvent) {
          object.detachEvent('on' + event, handler);
    } else alert("Remove handler is not supported");
}

function wheel(event) {
    var delta;
    event = event || window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    if (event.preventDefault)  event.preventDefault();
    event.returnValue = false;
    return delta;
}

function hideAjaxPopup(obj) {
  hidePopup(obj);

  var container = $('#loadableContent');
  var contentBeforeLoading = $("#tempLoadingContainer").html();

  container.empty();
  container.html(contentBeforeLoading);
}

var currentPopupId;

function showAjaxPopup(id, urlToLoad) {
  currentPopupId = id;

  showPopup(id);

  var tempContainer = $('#tempContainer');

  tempContainer.empty();
  tempContainer.load(urlToLoad);

  setTimeout("switchContent()", 500); // emulate waiting process
}

function switchContent(callback) {
  var container = $('#loadableContent');
  var tempContainer = $('#tempContainer');

  var loadedContent = tempContainer.html();

  container.empty();
  container.html(loadedContent);

  // Binding just loaded form with custom handler, DO NOT USE only form id
  $("#loadableContent form").bind("submit", function(event) {
    event.preventDefault();
    handleAjaxCustomSubmit();
  });

  // Binding maxlength validation
  $("#loadableContent textarea[maxlength]").keyup(function() {
    var max = parseInt($(this).attr('maxlength'));
    if($(this).val().length > max){
      $(this).val($(this).val().substr(0, max));
    }
  });

  if(callback!=null){
	  callback();
  }
}

$(document).ready(function() {
	$("a.topCatLinks").each(function() {
		var nextElement = $(this).next();
		if (nextElement.length == 0) {
      if(this.parentNode.nodeName.length != 3) { // not a div (yeah, really kludge :)
        $(this).addClass("withoutArrows");
      }
		}
	});
});

function scrollToElement(offset) {
	if (offset != null){
		$('html, body').stop().animate({scrollLeft: 0, scrollTop:offset}, 1000);
	}
}

function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
	parentPaddingTop = parseInt(group.parent().css("padding-top"));
	parentPaddingBottom = parseInt(group.parent().css("padding-bottom"));
	resultParentHeight = tallest;
	group.parent().height(resultParentHeight);
}

  function findFileSize(fileUrl){
    var request;
    request = $.ajax({
      type: "HEAD",
      url: fileUrl,
      success: function () {
        fileSize = request.getResponseHeader("Content-Length")/1024;
        $(".fileSize").prepend("("+fileSize);
        $(".fileSize").css("display", "inline");
      }
    });
  }

function imgError(img){
	var src="http://www.letu.ru/common/img/unavailable/250x250.png";
	$(img).attr("src",src);
}
function brandImgError(img,brandName){
	var parentElement=$(img).parent();
	parentElement.css("display","table-cell");
	$(img).css("display","none");
	parentElement.empty();
	parentElement.append(brandName);
}
/*fix for selects with zero border*/
function checkSelectZeroBorder(){
  var selectBorderWidth =($("select").outerWidth() - $("select").width() - parseInt($("select").css("padding-left")) - parseInt($("select").css("padding-right")));
  if (selectBorderWidth == 0){
    $("select").css("padding", "1px");
  }
}

/*makes footer always at the bottom*/
function positionFooter() {
  var docHeight = $(".globalContainer").height() - $("#sticky-footer-push").height();
  var windowHeight = $(window).height();
  if(docHeight < windowHeight){
    var diff = windowHeight - docHeight;
    if (!$("#sticky-footer-push").length > 0) {
      $("#footer").before('<div id="sticky-footer-push"></div>');
    }
    $("#sticky-footer-push").height(diff);
  }
  if(docHeight > windowHeight){
    var diff = 0;
    $("#sticky-footer-push").height(diff);
  }
}

function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};

//ul height as highest li
function setHeight(column) {
  var maxHeight = 0;
  column = $(column);
  column.find("li").each(function() {       
    if($(this).height() > maxHeight) {
      maxHeight = $(this).height();
    }
  });
  column.height(maxHeight);
}

//menu fix for IE
function megaMenuForIE(ul){
  if ($(ul).length){
    var ml=0;
    var menuWidth = $("#nav").outerWidth();
    var subContainer = $(ul).parents(".sub-container");
    var li = subContainer.parent("li");
    var pos = $(li).position();
    var pl = pos.left;
    //alert(pl);
    var totiw = ul.width();
    var checkWidth = menuWidth - (pl + totiw);
    var subLeft = pl - ml;
    var params = {left:pl + 'px', marginLeft:-ml + 'px'};
    if (pl < 0) {
      $(subContainer).css("left", "0px");
    } 
    else if (checkWidth <= 2) {
      $(subContainer).css("right", "0px");
    }
    if($.browser.msie && $.browser.version=="8.0") {
      //$(subContainer).boxShadow('0px 0px 8px #001a34'); IE 8 shadow, TBD
      //$(subContainer+"+div").hide();
      //setTimeout("$(subContainer+'+div').show()", 200); // emulate waiting process
    }
  }
}

/*fix for unsupported :checked in IE8 for radio buttons*/
function IE8checked(){
  $("input[type=radio]").each(function () {
    var label = $(this).parent().find("label");
    if ($(this).is(':checked') ){
      $(label).addClass("checked");
    }
    if ( ! $(this).is(':checked') ){
      if ($(label).hasClass('checked') ){
        $(label).removeClass("checked");
      }
    }
  });
}

function openExternalLink(){
  $("a[href^='http://']").each(function() { 
    if (!($(this).attr("target"))){
      $(this).attr("target","_blank");
    }
  });
}

/*styles script*/
$(document).ready(function() {
  /*site position when tabs are present*/
    var windowHeight = $(window).height();
    var documentHeight = $(document).trueHeight();
    if (documentHeight <= windowHeight) {
      scrollbarWidth = getScrollBarWidth();
      contentLeft = $(".contentContainer").offset().left;
      contentNewLeft = contentLeft - scrollbarWidth/2;
      $(".headerContainer").offset({ left: contentNewLeft });
      $(".contentContainer").offset({ left: contentNewLeft });
      $(".subscribe").offset({ left: contentNewLeft });
     $(".topFooter").offset({ left: contentNewLeft });
     //Kostyl for wishlist product popup
     $(".productBalloon").css("position", "fixed");
    }
  $(".globalContainer").css("visibility", "visible");

  
  $(".probeCheckbox").click (function() {
    if ($(this).is(':checked')) {
	  currentProbeAmount++;
	} else {
	  currentProbeAmount--;
	  $(this).removeAttr("checked");
	}
	if (currentProbeAmount>=maxProbeAmount) {
	  $(".probeCheckbox").each(function () {
	    if (!$(this).attr("checked")) {
	      $(this).attr("disabled","disabled");
	    }
	  });
	} else {
	  $(".probeCheckbox").each(function () {
	    $(this).removeAttr("disabled");
	  });	
	}   
  })


  /*fix for trim() in IE8*/
  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }
  /*brands page */
  var brandCount = $(".brandRow").size();
  var linesCount = Math.ceil (brandCount / 6); //round up number of cells
  for (var i = 0; i < linesCount; i++) {
    $('#brandsList').append("<div class='brandLine'></div>");
    var item1 = $('.brandLine')[i];
    var leftBrandRowCount = $("#brandsList > .brandRow").size();
    if ( leftBrandRowCount >= 6 ){
      for (var j = 0; j <= 5; j++) {
        $('#brandsList').find( item1 ).append($("#brandsList .brandRow").get(0));
      }
    }
    else{
      for (var j = 0; j <= leftBrandRowCount-1; j++) {
        $('#brandsList').find( item1 ).append($("#brandsList .brandRow").get(0));
      }
    }
    var currentBrandRows = $('#brandsList').find( item1 ).find(".brandRow");
    equalHeight(currentBrandRows);
  }
  /*choosing data icon*/
  if($.browser.msie && $.browser.version=="8.0") {
    $(".iconForDatePicker A.dp-choose-date").css("margin", "0 0 0 7px");
  }
  $("#myWishList .pagination li.all").remove(); //delete link "show all" on wish list

  /*hide gallery blue line if this div is last*/
  var galleryNextDiv = $('.gallery').next();
  var galleryNextDivCount = $(galleryNextDiv).size();
  var galleryNextDivDisplay = $(galleryNextDiv).css("display");
  if ((galleryNextDivCount == 0) || ($(galleryNextDiv).css("display") == "none")){
    $(".gallery").css("border-bottom", "0px");
  }
  /*facet left panel*/
  initFacetsLeftPanel();
  /*quick view for products*/
  initQuickViewButtons();
  
  if($.browser.mozilla) {
    if ($("select").length){
      checkSelectZeroBorder();
    }
  }
  /*stops all animation for dialogs on close*/
  $(".closeD").stop(true, true);

  positionFooter();
  $(window)
    .scroll(positionFooter)
    .resize(positionFooter);

  openExternalLink();
//build removeNotInstockDialog
  $("#removeNotInstockDialog").dialog({
    width: "auto",
    modal: true,
    autoOpen: false,
    resizable: false,
  });
  
  $("#removeNotInstockDialog .closeD").click(function() {
    $("#removeNotInstockDialog").dialog("close");
  });
  
  $('#real_checkout').click(function() { 
    var positions = "";
    $('.awayOrange .name a').each(function () {
	  positions = (positions.length >= 0 && positions != "") ? (positions + ', ' + $(this).text()) : (positions + $(this).text());  
    })
	if(positions.length >= 0 && positions != "") {
	  $("#removeNotInstockDialog").dialog('open');
	  return false;
	}
  });

if ($.browser.webkit){
    $("#birthdayBlock > a").css("display", "block");
  }

});

/*
 * Function performs initialization of facets panel style
 */
function initFacetsLeftPanel(){
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	  if($.browser.chrome){
	    $(".facetValue").css("padding-top", "3px");
	    $(".facetValue").first().css("padding-top", "0px");
	    $(".productBalloon").find(".fieldBallonContainer").css("min-height", "134px");
	}
}
/*
 * Fuction performs initialzation of quickView buttons 
 */
function initQuickViewButtons(){
	$(".imgContainer").mouseover(function() {
	    $(this).find('.quickViewButton').css('display','block');
	  }).mouseout(function(){
	    $(this).find('.quickViewButton').css('display','none');
	  });

	  $("#displayQuickView").live('click', function() {
	    quickViewManager.displayQuickView("tariffsList", true);
	    $("#tariffsList").parents().find("#quickViewPopup").addClass("tariffsListPopup");
	});
}


$(window).load(function (){
  if ($("#limitedInfo").length){
	informationTooltip("#limitedInfo", "#limitedStockTooltip", "left");
  }
  if ($("#giftInBDay").length){
    informationTooltip("#giftInBDay", "#giftInBDayTooltip");
  }
  if($.browser.msie && $.browser.version=="8.0") {
  $(".categoryProduct:visible").each(function () {
      prepareProductList($(this));
    });
  }
  else{
    $(".categoryProduct").each(function () {
      prepareProductList($(this));
    });
  }
});

function checkSelectedProbes() {
	if (currentProbeAmount<maxProbeAmount) {
		removeDialog('che');
	} else {
	  $('#real_checkout').click();
	}
}

function redirectToTabPage(index){
	var url = $("#tabUrl"+index).val();
	if (url){
		window.location.href = url;
	}
}

 function blockContent() {			
	var overlayWidth = $("#content").css("width");
	var overlayHeight = $(".contentContainer").css("height");
			
	$("#content").prepend("<div id='pageOverlay'><div class='page-overlay-loader'></div></div>");
	$("#pageOverlay").css("width", overlayWidth);
	$("#pageOverlay").css("height", overlayHeight);		
}

$(document).ready(function () {
	var $area = $('#commentArea');
	var $btn = $('#sendComment');
		
	$area.bind('focus.startEdit', function () {
		$(this).bind('keyup.edit', function () {
			if ($.trim($(this).val()) != '') {
				$btn.attr('disabled', false);
			} else {
				$btn.attr('disabled', true);
			}
		});
	});
		
	$area.bind('blur.endEdit', function () {
		$(this).unbind('.edit');
	});
});

