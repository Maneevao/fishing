var c = new $.cookie();
var numb;
var isDisplayDiv;
var numbersError = [];
function getContextPath() {
  return contextPath;
}



$(function () {
  $('#tabs').tabs();
});



$(function () {
  $("#dialog").dialog({
    width:"auto",
    modal:true,
    autoOpen:false,
    resizable:false
  });

  if ((jQuery.browser.msie && parseFloat(jQuery.browser.version) >= 8 ) || (jQuery.browser.mozilla && parseFloat(jQuery.browser.version) >= 6) || (jQuery.browser.safari && parseFloat(jQuery.browser.version) >= 5) || (jQuery.browser.opera && parseFloat(jQuery.browser.version) >= 11.10)) {
    return false;
  } else {
    c.get();
    if (c.shown) {
      return false;
    } else {
      $("#browserCompatibility").dialog({
        width:"auto",
        modal:true,
        autoOpen:true,
        resizable:false
      });
      var date = new Date();
      date.setTime(date.getTime() + (30 * 60 * 1000));
      c.shown = true;
      c.set({ path:'/', expires:date});
    }
  }
  ;
  $("#openD").click(function () {
    $("#dialog").dialog("open");
  });
  $(".closeD").click(function () {
    $("#dialog, #passwordRestore, #browserCompatibility").dialog("close");
  });
});

function showAjaxPop(id, urlToLoad) {
  currentPopupId = id;

  $("#" + id).dialog({
    width:"auto",
    modal:true,
    resizable:false
  });

  $(function () {
    $(".closeD").click(function () {
      $("#" + id).dialog("close");
    });

  });
  var container = $('#loadableContent');
  var contentBeforeLoading = $("#tempLoadingContainer").html();

  container.empty();
  container.html(contentBeforeLoading);
  var tempContainer = $('#tempContainer');

  tempContainer.empty();
  tempContainer.load(urlToLoad, function () {
    setTimeout("switchContent(); initOnPageLoad();", 500); // emulate waiting process
  });
}

function closePopup(id) {
  $("#" + id).dialog('close');
}

function showNewAddress(id) {
  if (addressAmount >= 10) {
    removeDialog("max");
    return false;
  }
  var urlToLoadFrom = getContextPath() + '/global/json/newAddressForm.jsp';

  // 'sourcePageNameOfPopup' variable may be declared somewhere on a page
  if (sourcePageNameOfPopup && sourcePageNameOfPopup.length != 0) {
    urlToLoadFrom += '?sourcePage=' + sourcePageNameOfPopup;
  }   

  showAjaxPop(id, urlToLoadFrom);
}

function showEditAddress(id, addressName, preValidate) {
  if (!addressName || addressName.length == 0) {
    alert('Empty address name!');

    return;
  }

  var urlToLoadFrom = getContextPath() + '/global/json/editAddressForm.jsp?addressName=' + addressName;
  if (preValidate != null && preValidate) {
    urlToLoadFrom = urlToLoadFrom + '&preValidate=true'
  }

  // 'sourcePageNameOfPopup' variable may be declared somewhere on a page
  if (sourcePageNameOfPopup && sourcePageNameOfPopup.length != 0) {
    urlToLoadFrom += '&sourcePage=' + sourcePageNameOfPopup;
  }
  showAjaxPop(id, urlToLoadFrom);
}

var timer;
function endAndStartTimer(func) {
  window.clearTimeout(timer);
  // var millisecBeforeRedirect = 10000;
  timer = window.setTimeout(func, 1000);
}

var quickViewManager = {
  productId:null,
  timeoutHandle:null,
  timeoutDelay:1000,
  quickViewPopupSelector:'#quickViewPopup',
  
  showQuickView:function (notClose) {
    $(this.quickViewPopupSelector).dialog({
      width:"auto",
      modal:true,
      resizable:false
    });
    $(function () {
      var magicCrossButtonContainer = $("#quickViewPopup .closeD");

      // clear any erroneous and Indian-style function binding
      magicCrossButtonContainer.unbind('click');

      if (!notClose) {
        magicCrossButtonContainer.click(function () {
          $(quickViewManager.quickViewPopupSelector).dialog("close");
          $("#quickViewContent").empty();
        });
      }
    });
  },
  
  doShow:function (notClose) {
    $(this.quickViewPopupSelector).addClass("quickViewFrame");
    $("#quickViewContent").empty();
    $("#" + this.productId).clone().appendTo($("#quickViewContent"));
    this.showQuickView(notClose);
    $(".markers img:first-child").each(function(index) {
      tooltipMarker(this);
    });
  },
  findProductContainer:function (productId) {
    return $("#imgContainer" + productId);
  },
  
  displayQuickView:function (productId, instant, className, notClose) {
    $(this.quickViewPopupSelector).addClass(className);
    var invoker = this.findProductContainer(productId);
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
    this.productId = productId;
    if (instant) {
      this.doShow(notClose);
    } else {
      // invoker.mouseout(this.mouseout);
      this.timeoutHandle = setTimeout("quickViewManager.doShow();", this.timeoutDelay);
    }
    return this;
  },
  addTrackingCodeScript: function(url) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    frame.src = url + this.productId;
    $("body").append(frame);
  },
  displayQuickViewFromFile:function (jspURL, className) {
    $(this.quickViewPopupSelector).addClass(className);
    this.doShow();
    var tempContainer = $("." + className).find("#quickViewContent");
    $(tempContainer).load(jspURL);
  },
  mouseout:function (ev) {
    var invoker = ev.currentTarget.id;
    if (invoker && invoker.indexOf("imgContainer") == 0) {
      var productId = invoker.substring(12, invoker.length);
      if (productId == quickViewManager.productId) {
        clearTimeout(quickViewManager.timeoutHandle);
        quickViewManager.timeoutHandle = null;
        quickViewManager.productId = null;
      }
    }
    $(ev.currentTarget).mouseout(function () {
    });
  }
};

function removeFromPickUp(typeId) {
  if (typeId) {
    var remItem = $("input[name='remove_ci_"+typeId+"']").val();
    $("#removalCommerceIds").val(remItem);
  } else {
    for (var i=1; ; i++) {
      var remItem = $("input[name='remove_ci_"+i+"']").val();
      if (remItem) {
        if (i == 1) {
          $("#removalCommerceIds").val(remItem);
        } else {
          $('<input name="' + $("#removalCommerceIds").attr("name") +
              '" type="hidden" value="' + remItem + '"/>').appendTo($('#atg_store_checkoutShippingAddressRU'));
        }
      } else {
        break;
      }
    }
  }
  $('#skuRemovePckButton').click();
}

function removeFromPickUpToWishlist() {
  for (var i=1; ; i++) {
    var remItem = $("input[name='remove_ci_"+i+"']").val();
    if (remItem) {
      remItem += "," + $("input[name='remove_pi_"+i+"']").val() + "," + $("input[name='remove_si_"+i+"']").val();
      if (i == 1) {
        $("#removalCommerceIds").val(remItem);
      } else {
        $('<input name="' + $("#removalCommerceIds").attr("name") +
            '" type="hidden" value="' + remItem + '"/>').appendTo($('#atg_store_checkoutShippingAddressRU'));
      }
    } else {
      break;
    }
  }
  $('#skuRemovePckButton').click();
}

function removeDialog(id, startIndex) {
  $("#removeDialog").addClass("quickViewFrame");
  showRemoveDialog();
  $("#removeDialogContent").empty();
  $(".removeDialogContainer > h3 ").empty();
  var type = id.substring(0, 3);
  var typeId = id.substring(3);
  switch (type) {
    case "adr":  // address removal dialog
      var message = addressRemoveConfirmation;
      $("#deleteApprove").show();
      $("#deleteCancel").attr("value", deleteCancel);
      var onClickEvent = "$('.closeD').click();window.location = $('#addressRemoveButton" + typeId + "').attr('href');";
      break;
    case "sku": // cart sku removal dialog
      var message = itemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();$('#skuRemoveButton" + typeId + "').click();";
      break;
    case "pck": // cart sku removal dialog for pick up functionality
      var message = typeId ? itemRemoveConfirmation : allItemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();removeFromPickUp('" + typeId + "');";
      break;
    case "pcw": // cart sku removal dialog for pick up functionality when moving to wishlist
      var message = allItemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();removeFromPickUpToWishlist();";
      break;
    case "che": // more probes available dialog
        var message = moreProbesAvailable;
        var onClickEvent = "$('.closeD').click();$('#real_checkout').click();";
      break;
  case "oth": // other city warning dialog
        var message = otherCityWarningMessage;
        var onClickEvent = "$('.closeD').click();confirmOtherCityDelivery();";    
      break;  
    case "all": // all cart sku's removal dialog
      var message = allItemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();$('#skuRemoveButtonAll').click();";
      break;
    case "rec": // sku quantity at cart page update ( if value = 0 )
      var message = itemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();$('#atg_store_update').click();";
      break;
    case "skw": // wishlist sku removal dialog
      var message = itemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();deleteGiftItem(" + typeId + "," + startIndex + ")";
      break;
    case "alw": // all wishlist skus removal dialog
      var message = allItemRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();$('#atg_store_deleteWishList').click()";
      break;
    case "max": // max address amount reached dialog
      var message = maxAddressAmountMessage;
      $("#deleteApprove").hide();
      $("#deleteCancel").attr("value", deleteClose);
      break;
    case "ndk": // ndk removal dialog
      var message = ndkRemoveConfirmation;
      var onClickEvent = "$('.closeD').click();$('#ndk_delete').click()";
      break;
    case "chk": // confirm checkout
    var message = confirmation;
      var onClickEvent = "$('.closeD').click();$('#real_checkout').click();";
    break;
  }
  $(".removeDialogContainer > h3 ").append(message);
  $(".removeDialogContainer > .deleteButtons > #deleteApprove").attr("onclick", onClickEvent);
  $(".removeDialogContainer").clone().appendTo($("#removeDialogContent"));
  $("#removeDialogContent > .removeDialogContainer").css("display", "inline-block");
}

function showRemoveDialog() {
  $("#removeDialog").dialog({
    width:"auto",
    modal:true,
    resizable:false
  });

  $(function () {
    $(".closeD").click(function () {
      $("#removeDialog").dialog("close");
      $("#removeDialogContent").empty();
    });
  });
}

$(document).ready(function () {
  $(".brandInfoWrCont img").each(function (index) {
    $(this).error(function () {
      $(this).hide();
    });
    $(this).attr("src", $(this).attr("src"));
  });
  $("#imgBrandDescription img").each(function (index) {
    $(this).error(function () {
      $(this).hide();
    });
    $(this).attr("src", $(this).attr("src"));
  });

  $(".collapsedAll").click(function () {
    $(".collapsedBody").show(600);
    $(this).attr("style", "display:none");
    $(".expandedAll").attr("style", "display:block");
    return false;
  });

  $(".expandedAll").click(function () {
    $(".collapsedBody").hide(600);
    $(this).attr("style", "display:none");
    $(".collapsedAll").attr("style", "display:block");
    return false;
  });

  $(".collapsedHead").click(function () {
    $(this).parent().next(".collapsedBody").slideToggle(600);
    $(this).toggleClass("collapsedHeadUp");
    return false;
  });

  $(".headerMenu #nav li a").hover(function () {
    $("#atg_store_searchInput").autocomplete("close");
    $("#atg_store_searchInput").blur();
  });

  $('#nav').dcMegaMenu({
    rowItems:'auto',
    speed:'fast'
  });
  setEqualHeight($(".equalHeightsContainer"));
  
  $("#takeAwayDialog .closeD").click(function() {
      $("#takeAwayDialog").dialog("close");
      if(isDisplayDiv) {
      $.each(numbersError, function() {
        if($("#quantityErrorMessage" + this).length == 0) {
          $("#quantity_" + this).addClass("error");
          $("#quantity_" + this).parent().after("<span class='errorMessage quantityErrorMessage' id='quantityErrorMessage" + this + "'>"+ $("#takeAwayDialog").data('errorMessage') + "</span>");
          }
      });
    } 
    });
});

function setEqualHeight(containers) {
  containers.each(
    function () {
      var tallestcolumn = 0;
      var columns = $(this).find(".equalHeights");
      columns.each(
        function () {
          currentHeight = $(this).height();
          if (currentHeight > tallestcolumn) {
            tallestcolumn = currentHeight;
          }
        }
      );

      columns.each(
        function () {
          $(this).height(tallestcolumn);
        }
      );
    });
}

$(document).ready(function () {
  var $prodFadeTg = $('#productFadeToggle');
  var $wrContErTg = $('#wrapperContainerTooggle');
  var $wrContNtTg = $('#wrapperContentTooggle');
  if ($prodFadeTg.length == 0){
    $prodFadeTg = $('#fadeToggle');
  }
  var containerHeight = $wrContErTg.height();
  var contentHeight = $wrContNtTg.height();
  if (contentHeight > containerHeight) {
    var isOpen = false;
    $prodFadeTg.show().bind('click.showTooggle', function () {
      var $textNode = $prodFadeTg.find('em');

      if (!isOpen) {

        $wrContErTg.animate({height:contentHeight}, 300);
        $('#fadeOutList').css({"display":"block"});
        $('#fadeInList').css({"display":"none"});
        $('#wrapperContainerTooggle').css({"margin-bottom":"15px"});
      } else {
        $wrContErTg.animate({height:containerHeight}, 300);
        $('#fadeInList').css({"display":"block"});
        $('#fadeOutList').css({"display":"none"});
        $('#wrapperContainerTooggle').css({"margin-bottom":"0px"});
      }
      isOpen = !isOpen;
    });
  } else {
    $prodFadeTg.css({"display":"none"});
    $wrContErTg.height('auto');
  }
});

$(document).ready(function () {
  $('#toggle_cart_result .resultToggleUp span').click(function () {
    $(this).siblings('div').slideToggle("slow").closest(".resultToggleUp").toggleClass("resultToggleDown");
    $(".tooltip").css("display","none");
  });
  //more about certificate
  $('#details-popup-link').click(function (e) {
    e.preventDefault();

    $("#quickViewContent").load("http://www.letu.ru/myaccount/profile/moreInfo.jsp", function(){
      $("#quickViewPopup").dialog({
        width:"auto",
        modal:true,
        resizable:false
      });
      $("#quickViewPopup").dialog("open");
    });

    $(".closeD").click(function () {
      $("#quickViewPopup").dialog("close");
      $("#quickViewContent").empty();
    });
  });
  //click on individualInfo link
  $('#individualInfo').click(function (e) {
    e.preventDefault();

    $("#quickViewPopup").dialog({
      width:"auto",
      modal:true,
      resizable:false
    });

    $("#quickViewContent").load("http://www.letu.ru/myaccount/profile/individualInfo.jsp", function(){
      $("#quickViewPopup").dialog("open");
    });

    $(".closeD").click(function () {
      $("#quickViewPopup").dialog("close");
      $("#quickViewContent").empty();
    });
  });
  //click on legalInfo link
  $('#legalInfo').click(function (e) {
    e.preventDefault();

    $("#quickViewPopup").dialog({
      width:"auto",
      modal:true,
      resizable:false
    });

    $("#quickViewContent").load("http://www.letu.ru/myaccount/profile/legalInfo.jsp", function(){
      $("#quickViewPopup").dialog("open");
    });

    $(".closeD").click(function () {
      $("#quickViewPopup").dialog("close");
      $("#quickViewContent").empty();
    });
  });

});


function changeMinAndMaxCostInputFieldsValues() {
  var minCost = parseInt($("#slider").slider("values", 0));
  var maxCost = parseInt($("#slider").slider("values", 1));
  $("input#minCost").val(minCost);
  $("input#maxCost").val(maxCost);
  $("#slider").slider("values", 0, minCost).slider("values", 1, maxCost);
}

var site = function () {
  this.navLi = $('#nav li').children('ul').hide().end();
  this.init();
};

site.prototype = {

  init:function () {
    this.setMenu();
  },

  // Enables the slidedown menu, and adds support for IE6

  setMenu:function () {

    $.each(this.navLi, function () {
      if ($(this).children('ul')[0]) {
        $(this)
          .append('<span />')
          .children('span')
          .addClass('hasChildren')
      }
    });

    this.navLi.hover(function () {
      // mouseover
      $(this).find('> ul').stop(true, true).slideDown('slow', 'easeOutBounce');
    }, function () {
      // mouseout
      $(this).find('> ul').stop(true, true).hide();
    });

  }

};

new site();

$(document).ready(function () {
  $(".gallerySub .jCarouselLite").jCarouselLite({
    mouseWheel:true,
    btnNext:".gallerySub .carNext",
    btnPrev:".gallerySub .carPrev",
    auto:800,
    speed:1000,
    visible:6,
    hoverPause:true
  });
  
  var chanelLastView = $(".latestViwed");
  $(".jCarouselLite", chanelLastView).jCarouselLite({
    mouseWheel:true,
    btnNext:".latestViwed .carNext",
    btnPrev:".latestViwed .carPrev",
    circular:false,
    visible: chanelLastView.hasClass('chanelPage') ? 4 : 3
  });
  
  

  $(".relatedProd .jCarouselLite").jCarouselLite({
    mouseWheel:true,
    btnNext:".relatedProd .carNext",
    btnPrev:".relatedProd .carPrev",
    circular:false,
    visible:3
  });

  $(".markedProd .jCarouselLite").jCarouselLite({
  mouseWheel: true,
  btnNext: ".markedProd .carNext",
  btnPrev: ".markedProd .carPrev",
  circular: true,
  visible: 3
  });

  $('div.tabsContainer div.tabC').hide();
  $('div.tab1').show();
  $('div.tabsContainer .tabs .tab1').addClass('active');
  if($('#contacts div.tabsContainer .tabs .tab2').hasClass('active')){
	$('#contacts div.tabsContainer .tabs .tab1').removeClass('active');
	$('div.tabsContainer div.tabC').hide();
	$('div.tab2').show();
  }

  $('div.tabsContainer .tabs .tab').click(function () {
    var thisClass = this.className.replace(/^.*(\btab\d\b).*$/, "$1");
    $('div.tabsContainer div.tabC').hide();
    $('div.' + thisClass).show();
    $('div.tabsContainer .tabs .tab').removeClass('active');
    $(this).addClass('active');
    tabsZIndex();
    $(".categoryProduct:visible").each(function () {
      prepareProductList($(this));
      $(".markers img:first-child").each(function(index) {
        tooltipMarker(this);
      });
    });
    return false;
  });

  $('#tabs').css('display', 'block');

  $('.firstTab a').addClass(function () {
    var addedClass;

    if ($(this).width() > 320) {
      addedClass = "firstName";
    }
    return addedClass;
  })
});
$("input#email").live("keypress", function (e) {
  if (e.keyCode == '13') {
    var isPopup = $('div#passwordRestorePopup');
    if (isPopup.length > 0) {
      handleAjaxCustomSubmit(contextPath);
    }
    else {
      $('#remindButton').click();
    }
  }
});
$("input#emailReceiptOfGoods").live("keypress", function (e) {
  if (e.keyCode == '13') {
    handleAjaxCustomSubmit(contextPath);
  }
});




/*
 * $(function() { $('.tabs div a').each(function() { this.style.width =
 * $(this).parent().width()+'px';
 * }); * });
 */
//Popup remind password
function popupForRemindPassword() {
  $("#passwordRestorePopup").dialog({
    width:"auto",
    modal:true,
    autoOpen:false,
    resizable:false,
    close:function (event) {
      $('div#dynamicContentPasswordRestorePopup').empty();
      $('div#dynamicContentPasswordRestorePopup').load(getContextPath() + "/global/gadgets/passwordPopup.jsp");
      $("input#atg_store_passwordInputLast").val("");
    }
  });
  $("#passwordRestorePopup").dialog("open");
  var email = $("input#atg_store_emailInput").val();
  $("input#email").val(email);
}
function closePopupForRemindPassword() {
  $("#passwordRestorePopup").dialog("close");
}

//Popup Receipt Of Goods
function popupForReceiptOfGoods(skuId) {
  if (skuId != null) {
    $("#skuId").val(skuId);
  }
  var myContextPath = getContextPath();
  $("#receiptOfGoodsPopup").dialog({
    width:"auto",
    modal:true,
    autoOpen:false,
    resizable:false,
    close:function (event) {
      $('div#dynamicContentreceiptOfGoodsPopup').empty();
      $('div#dynamicContentreceiptOfGoodsPopup').load(myContextPath + "/global/gadgets/receiptOfGoodsPopup.jsp");
    }
  });
  $("#receiptOfGoodsPopup").dialog("open");
}
function closePopupForReceiptOfGoods() {
  $("#receiptOfGoodsPopup").dialog("close");
}

$(document).ready(function () {
  $(".atg_store_numericInput").keypress(function (event) {
    if ($.browser.mozilla) {
      if ((event.charCode > 47 && event.charCode < 58) || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39) {
      } else { // numbers, delete, backspace, arrows
        event.preventDefault();
      }
    } else {
      if ((event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 127 || event.keyCode == 8) {
      } else { // numbers, delete, backspace
        event.preventDefault();
      }
    }
  });

  $(".atg_store_numericInput").bind('paste', function (e) {
    e.preventDefault();
  });
  $("#receiptOfGoodsPopup .closeD").click(function () {
    closePopupForReceiptOfGoods();
  });
});

  $(document).ready(function() {
    applyPhoneMask();
  });

function applyPhoneMask() {
  var MASK = "+7 (999) 999-99-99";
  var pattern = /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;
  var phoneInput = $('.apply-phone-mask');
  var phoneText = $('.check-phone-mask');
  if (phoneInput.length > 0) {
    phoneInput.each(function(index, phone){
      var $phone = $(this);
      if ($phone.val() == '') {
        $phone.mask(MASK);
      } else if (!pattern.test($phone.val()) && !$phone.hasClass('error')) {
        $phone.addClass('error');
        $phone.closest('dd').append('<span class="errorMessage">' + 'Неверный формат номера телефона' + '</span>');
      }
      $phone.bind("change paste keyup", function() {
        $input = $(this);
          if ($input.val() == '') {
            $input.mask(MASK);
          }
      });
    });
  }
  if (phoneText.length > 0) {
    phoneText.each(function(index, phone){
      var $phone = $(this);
      $phone.removeClass('error');
      $('.addressPhoneNumberErrorMessage').remove();
      if (!pattern.test($phone.text())) {
        $phone.addClass('error');
        $phone.closest('p').append('<span class="addressPhoneNumberErrorMessage">' + 'Неверный формат номера телефона' + '</span>');
        $('#button_continue_checkout').attr('disabled', 'true');
      }
    });  
  }  
}

var countOrders = 0;
$(document).ready(function () {
  // collapsible management
  $('.page_collapsible').collapsible({
    defaultOpen:'body-section1',
    cookieName:'body'
  });

  $('.page_collapsible').click(function () {
    countOrders = $('.orderHistorySub').children().length;
    var counClose = 0;
    var counOpen = 0;
    $.each($('.orderHistorySub .page_collapsible'),
      function (i, value) {
        flagClose = jQuery.contains($(value).attr("class"), 'page_collapsible collapse-close');
        if (flagClose !== true) {
          counClose++;
        } else {
          counOpen++;
        }
      });
    if ((countOrders - 1) === counClose) {
      $('#closeAll').css('display', 'none');
      $('#openAll').css('display', 'block');
    } else if ((countOrders - 1) === counOpen) {
      $('#openAll').css('display', 'none');
      $('#closeAll').css('display', 'block');
    }

  })

  // assign open/close all to functions
  function openAll() {
    $('.page_collapsible').collapsible('open');
  }

  function closeAll() {
    $('.page_collapsible').collapsible('close');
  }

  // listen for close/open all
  $('#closeAll').click(function (event) {
    event.preventDefault();
    closeAll();
    $(this).css('display', 'none');
    $('#openAll').css('display', 'block');
  });
  $('#openAll').click(function (event) {
    event.preventDefault();
    openAll();
    $(this).css('display', 'none');
    $('#closeAll').css('display', 'block');
  });

  $("#confirmationPopup").dialog({
    width:"auto"
  });
  $(".brangImg img").width(function () {
    if ($(this).width() == 0) {
      $(".brangImg").css('display', 'none');
    }
  });


});

function recountItemsNumber() {
  var windowCurrentPosition= $(window).scrollTop();
  var areNullValues = false;
  
  $('input.text.qty.atg_store_numericInput').each(function () {
  
  });
  
  var makeCount = true;
  var isReturn = true;
  isDisplayDiv = false;
  numbersError = [];
  positionNamesUnavailable = [];
  $('input.text.qty.atg_store_numericInput').each(function () {
  numb = parseInt(($(this).attr('id')).split('_')[(($(this).attr('id')).split('_').length-1)]);
  var quantity = $("#quantity_"+numb).val();
  var addItemCount = 1;
  var showErrors = true;
  if ($("#quantity_" + numb).length == 0){
    showErrors=false;
  }
  if ($('#wishForm').length > 0) {
    addItemCount=null;
    quantity=1;
  }else if (quantity == undefined){
    quantity=1;
  }
  var quantValidPage = contextPath + '/browse/gadgets/validateQuantityGateway.jsp';
  var jsonPage = contextPath + '/browse/gadgets/addItemToOrderJsonObject.jsp';
  var productId = $(this).attr('productId');
  var refId = $(this).attr('refId');
  var currentItemId = $(this).attr('name');
  var isError = false;
  var postData = generatePostData(refId, productId, quantity, jsonPage, addItemCount); 
    
  $.ajax({
    url: quantValidPage+'?quantity='+quantity+"&skuId="+refId+"&updateValue=true&ci="+currentItemId,
    async: false,
    cache: false,
    success: function(data, textStatus, jqXHR) {
      data = eval("(" + data + ")");
      if (!data.isEnough) {
        $("#takeAwayDialog").data('errorMessage', data.message);
      isError = true;
      }
    
    if (data.isEnough && showErrors){
      $("#quantityErrorMessage" + numb).remove();
      $("#quantity_" + numb).removeClass("error");
    }
    }
  });

  if (isError){
    makeCount = false;    
    isDisplayDiv = true;
    numbersError.push(numb);
    
    if(isDisplayDiv) {
      $.each(numbersError, function() {
        if($("#quantityErrorMessage" + this).length == 0) {
          $("#quantity_" + this).addClass("error");
          $("#quantity_" + this).parent().after("<span class='errorMessage quantityErrorMessage' id='quantityErrorMessage" + this + "'>"+ $("#takeAwayDialog").data('errorMessage') + "</span>");
        }
      });
    }
    
    $("#takeAwayDialog").data('postData', postData).data('numb', numb).data('showErrors', showErrors).dialog('open');
  }
    
  });
  
  if (makeCount){
    $('input.text.qty.atg_store_numericInput').each(function () {
      if ($(this).attr('value') == '0' && !$(this).is('.disabledInputText')) {
        removeDialog("rec");
        areNullValues = true;
      }
    });  
    if (!areNullValues) {
    $('#atg_store_update').click(); 
  }
  }
  
  $.scrollTo({top: windowCurrentPosition, left: '0px'}, 1000);
}

function handleEnterPress(event, buttonToClick) {
  if (event.keyCode == 13) {
    $('#' + buttonToClick).click();
  }
}

function handleQuantityFieldEnterPress(event, field) {
  if(event.keyCode == 13){
    $('#' + field).blur();
  }
}

/* shy start */
function conv_text_br($text) {
  $wordmaxlen = 50;
  $hyp = "<br>";
  $marker = "\x01";
  preg_match_all('/(<.*?\>)/si', $text, $tags);
  $text = preg_replace('/(<.*?\>)/si', $marker, $text);
  $words = split(' ', $text);

  for ($i = 0; $i < count($words); $i++) {
    if (strlen($words[$i]) >= $wordmaxlen)
      $words[$i] = chunk_split($words[$i], $wordmaxlen, $hyp);
  }
  $text = implode(' ', $words);
  for ($i = 0; $i < count($tags[1]); $i++)
    $text = preg_replace("/$marker/si", $tags[1][$i], $text, 1);
  return $text;
}
/* shy end */
function popupForImageShowAll(buttonId) {
    $("#dialog").dialog({
        width:"auto",
        modal:true,
        autoOpen:false,
    });
   url = $("#"+buttonId).attr("url");
   if (url.length>0) {
     $('#mainGalleryImage').html('<img src="' + url + '"/>');   
   }
   
   
   $("#dialog").dialog("open");
   $(".closeD").click(function () {
      $("#dialog").dialog("close");
   });
}

function addMarkerToNavHistory(event,markerId) {
  
  //IE DIE DIE DIE
  var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
  var url = (target.parentElement.href)? target.parentElement.href : target.href;
  $.ajax({
      url: contextPath+ "/browse/gadgets/navHistoryCollectorGateway.jsp",
      data: {markerId: markerId},
      type: 'post',
      success: function(data) {
        window.location.href = url;        
        }
    });
  
}

$(function () {
  var $select = $(".chosen-select");

  (function prepareSelect() {
      var $options = $select.find('option:not(.fixed)'), tree = {}, letters = [], numbers = [];

      $options.each(function () {
         var $el = $(this),
             text = $el.text().trim(),
             letter = text[0], num = text.split(/[\.|\s]/);

          if (num !== null && !isNaN(parseInt(num[0]))) {
              num = parseInt(num[0]);
              (tree[num] = tree[num] || []).push($el);
              if (numbers.indexOf(num) === -1) {
                  numbers.push(num);
              }
          }
          else {
              (tree[letter] = tree[letter] || []).push($el);
              if (letters.indexOf(letter) === -1) {
                  letters.push(letter);
              }
          }
      });
      letters.sort(function (char1, char2) {
          if (char1 > char2) {
              return 1;
          }
          if (char1 < char2) {
              return -1;
          }

          return 0;
      });
      numbers.sort(function (num1, num2) {
          if (num1 > num2) {
              return 1;
          }
          if (num1 < num2) {
              return -1;
          }

          return 0;
      });
      $options.detach();
      $.each(letters, function (i, letter) {
         var $optgroup = $('<optgroup />');

          $optgroup.attr('label', letter);
          $.each(tree[letter], function (i, el) {
            $optgroup.append($(el));
          });
          $select.append($optgroup);
      });
      $.each(numbers, function (i, num) {
          var $optgroup = $('<optgroup />');

          $optgroup.attr('label', num);
          $.each(tree[num], function (i, el) {
            $optgroup.append($(el));
          });
          $select.append($optgroup);
      });

  })();
  $select.chosen({no_results_text: "ничего не найдено", allow_single_deselect: true});
  $('.chosen-single span').text($('.chosen-select').attr('data-placeholder'));
  $select.change(function() {
    invokeBrandSearch(); 
  });
});

function invokeBrandSearch() {
  if (!$('.chosen-container-single').hasClass('chosen-with-drop')) {
    var element = $('.active-result.result-selected');
    if (element.length > 1) {
      element = $.grep(element, function(e, i) {
        return !$(element[i]).hasClass('chosen-all'); 
      })
    } 
    var classes = $(element[0]).attr('class').split(/\s+/);
    $.each(classes, function(index, item){
      if (item.toLowerCase().indexOf("chosen") >= 0) {
        var href = $('#select option.' + item).attr('value');
        document.location.href = href;
      }
    });
  }  
}

