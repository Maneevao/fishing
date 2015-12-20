var cartPopupWidth;
var cartOffset;
var cartMessageHeigh;
var productBalloonWidth;
var productBalloonTop;
var timer;

$(document).ready(function() {
  $(".productBalloon").appendTo("#content");
});

function findCartAndWishListPopupWidth(id){
  var productBalloonDetailWidth = $('#'+id).find(".productBalloonDetail").width();
  image80Width = $('#'+id).find(".image80").width() + parseInt($('#'+id).find(".image80").css("margin-right")) + parseInt($('#'+id).find(".fieldBallonContainer").css("padding-left")) + parseInt($('#'+id).find(".fieldBallonContainer").css("padding-right")) + 2;
  cartPopupWidth = productBalloonDetailWidth + image80Width;
  if (cartPopupWidth > 381) {
    cartPopupWidth = 381;
    productBalloonDetailWidth = 260;
  }
  if (cartPopupWidth < 235) {
    cartPopupWidth = 235;
    $(".productBalloon .productBalloonDetail").css("float", "left");
  }
  $('#'+id).css("width", cartPopupWidth);
  $('#'+id).find(".productBalloonDetail").css("width", productBalloonDetailWidth);
}

function findCartPopupLeftPosition(id){
  cartOffset = $("#cartIcon").offset();
  var productBalloonWidth = $('#'+id).width();
  var left = cartOffset.left;
  var right = left+ $("#cartIcon").width();
  var productBalloonLeft = right - productBalloonWidth;
  $('#'+id).css("left", productBalloonLeft);
}

function findCartPopupTopPosition(id){
  cartMessageHeigh = $("#cartMessage").height()
  productBalloonTop = cartOffset.top + cartMessageHeigh + 11;
  $('#'+id).css("top", productBalloonTop);
  if($.browser.msie) {
    productBalloonTop -= 2;
  }
}

function findWishListPopupLeftPosition(id){
	  wishListOffset = $("#myWishList").offset();
	  var productBalloonWidth = $('#'+id).width();
	  var left = wishListOffset.left;
	  var right = left+ $("#myWishList").width();
	  var productBalloonLeft = left-(left+productBalloonWidth-right)/2-10;
	  $('#'+id).css("left", productBalloonLeft);
	}

function findWishListPopupTopPosition(id){
	  wishListMessageHeight = $("#cartMessage").height();
	  productBalloonTop = wishListOffset.top + wishListMessageHeight+10;
	  if($.browser.msie && $.browser.version=="9.0") {
	    productBalloonTop -= 2;
	  }
	  $('#'+id).css("top", productBalloonTop);
	}

function isScrolledIntoView(elem)
{
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}

function cartAndWishListPopupPosition(divId, elementId){
  if (isScrolledIntoView($(elementId))){
    $('#'+divId).removeClass("cartPopupScroll");
  }
  else{
    $('#'+divId).addClass("cartPopupScroll");
  }
}

function addItemToOrder(url, postData, numb) {
  $.ajax({
    url: url,
    dataType: 'json',
    data: postData,
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (data) {
      $('.shopInfo a#cartMessage, .shopInfo em#cartMessage').replaceWith('<a id="cartMessage" href=" ' + contextPath + '/cart/cart.jsp" title="">'+data['itemsCount']+'</a>');
      $('.shopInfo span').replaceWith('<span>'+' '+data['orderSubtotal']+'</span>');
    },
    error:  function (jqXHR, textStatus, errorThrown) {
      //alert(errorThrown);
    }
  });
  clearTimeout(timer);
  $(".productBalloon").hide();
  $("#newProductInCartBalloon"+numb+" .goToCart").show();
  $("#newProductInCartBalloon"+numb+" .goToWishList").hide();
  cartAndWishListPopupPosition("newProductInCartBalloon"+numb, "#cartMessage");
  $("#newProductInCartBalloon"+numb).fadeIn("slow")
  findCartAndWishListPopupWidth("newProductInCartBalloon"+numb);
  findCartPopupLeftPosition("newProductInCartBalloon"+numb);
  findCartPopupTopPosition("newProductInCartBalloon"+numb);
  $("#newProductInCartBalloon"+numb).css("display", "inline-block");
  $(".markers img:first-child").each(function(index) {
    tooltipMarker(this);
  });
  timer = window.setTimeout(function () { $("#newProductInCartBalloon"+numb).fadeOut("slow");}, 3000);

  $(window).scroll(function () {
    $('div.productBalloon').each(function() {
      cartAndWishListPopupPosition($(this).attr('id'), "#cartMessage");
    });
  });
  
  if (offer_id!=null && offer_id!="" && category_id!=null && category_id!=""){
    adRiverCounterAddItemToCart('http://ad.adriver.ru/cgi-bin/rle.cgi?sid=192823&amp;sz=add_basket&amp;custom=10=' + offer_id + ';11=' + category_id + '&bt=55&pz=0&rnd=![rnd]');
  }
}

function adRiverCounterAddItemToCart(s){
    var d = document, i = d.createElement('IMG'), b = d.body;
    s = s.replace(/!\[rnd\]/, Math.round(Math.random()*9999999)) + '&tail256=' + escape(d.referrer || 'unknown');
    i.style.position = 'absolute'; i.style.width = i.style.height = '0px';
    i.onload = i.onerror = function(){b.removeChild(i); i = b = null}
    i.src = s;
    b.insertBefore(i, b.firstChild);
}


function showErrorMessage(numb, message) {
  $("#quantity_input" + numb).addClass("error");
  $("#quantity_input" + numb).after("<span class='errorMessage quantityErrorMessage' id='quantityErrorMessage" + numb + "'>"+ message + "</span>");
  if ($(".errorMessage").first().offset() != null ) {
    scrollToElement($(".errorMessage").first().offset().top - 160);
  }	
}

function changeButton(numb) {
  var arr=$('#addToCartButton'+numb).attr('src').match('http://www.letu.ru/addToCartReDes.png');
  if (arr != null && arr.length > 0){
    $('#addToCartButton'+numb).attr('src', $('#addToCartButton'+numb).attr('src').replace('http://www.letu.ru/addToCartReDes.png', 'http://www.letu.ru/addToCart2ReDes.png'));
  }else{
    $('#addToCartButton'+numb).attr('src', $('#addToCartButton'+numb).attr('src').replace('http://www.letu.ru/addToCartSmall.png', 'http://www.letu.ru/addToCartSmall2.png'));
  }
  $('#atg_behavior_reportItemOnFlow'+numb).show();
  $('#addToCartButton'+numb).attr('takeAway', 'true');
}

function generatePostData(refId, productId, quantity, jsonPage, addItemCount) {
  if (addItemCount == null){
    postData='/atg/store/order/purchase/CartFormHandler.catalogRefIds='+refId;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.catalogRefIds= ';
    postData+='&/atg/store/order/purchase/CartFormHandler.productId='+productId;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.productId= ';
    postData+='&/atg/store/order/purchase/CartFormHandler.quantity='+quantity;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.quantity= ';
  } else {
    postData='/atg/store/order/purchase/CartFormHandler.items[0].catalogRefId='+refId;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.items[0].catalogRefId= ';
    postData+='&/atg/store/order/purchase/CartFormHandler.items[0].productId='+productId;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.items[0].productId= ';
    postData+='&/atg/store/order/purchase/CartFormHandler.items[0].quantity='+quantity;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.items[0].quantity= ';
    postData+='&/atg/store/order/purchase/CartFormHandler.addItemCount='+addItemCount;
    postData+='&_D:/atg/store/order/purchase/CartFormHandler.addItemCount= ';
  }
  postData+='&/atg/store/order/purchase/CartFormHandler.addItemToOrder=addItemToOrder';
  postData+='&_D:/atg/store/order/purchase/CartFormHandler.addItemToOrder= ';
  postData+='&/atg/store/order/purchase/CartFormHandler.ajaxAddItemToOrderSuccessUrl='+jsonPage;
  postData+='&_D:/atg/store/order/purchase/CartFormHandler.ajaxAddItemToOrderSuccessUrl= ';
  return postData;
}

var timer;
$(document).ready(function() {
  $("[id^='addToCartButton']").click(function() {
    var numb=($(this).attr('id')).substr(15); // hardcoded for button id length ;'(
    var quantity=$("#quantity_input"+numb).val();
    var addItemCount=1;
    var url=$('#addToCart'+numb).attr('action');
    var showErrors=true;
    if ($("#quantity_input" + numb).length == 0){
      showErrors=false;
    }
    var changeButton=false;
    if ($('#wishForm').length > 0) {
      url=$('#wishForm').attr("action");
      addItemCount=null;
      changeButton=true;
      quantity=1;
    }else if (quantity == undefined){
      changeButton=true;
      quantity=1;
    }
    var quantValidPage = contextPath + '/browse/gadgets/validateQuantityGateway.jsp';
    var jsonPage=contextPath + '/browse/gadgets/addItemToOrderJsonObject.jsp';
    var productId=$(this).attr('productId');
    var refId=$(this).attr('refId');
    var takeAway=$(this).attr('takeAway') == "true";
    var isError = false;
    var postData=generatePostData(refId, productId, quantity, jsonPage, addItemCount);


    if (showErrors){
      $("#quantityErrorMessage" + numb).remove();
      $("#quantity_input" + numb).removeClass("error");
    }

    if (quantity < 1 || quantity > 999999) {
      if (showErrors){
        $("#quantity_input" + numb).addClass("error");
        $("#quantity_input" + numb).after("<span class='errorMessage quantityErrorMessage' id='quantityErrorMessage" + numb + "'>"+ wrongItemAmount + "</span>");
        scrollToElement($(".errorMessage").first().offset().top - 160);
      }
      return false;
    }

    if (!takeAway){
      $.ajax({
        url: quantValidPage+'?quantity='+quantity+"&skuId="+refId,
        async: false,
        cache: false,
        success: function(data, textStatus, jqXHR) {
          data = eval("(" + data + ")");
          if (!data.isEnough) {
            $("#takeAwayDialog").data('errorMessage', data.message);
            isError = true;
          }
        }
      });
    }

    if (!takeAway && isError){
      $("#takeAwayDialog").data('url', url).data('postData', postData).data('numb', numb).data('changeButton', changeButton).data('showErrors', showErrors).dialog('open');
    }else{
      addItemToOrder(url, postData, numb);
    }
    return false;
  });

  //build Take Away Dialog
  $("#takeAwayDialog").dialog({
    width: "auto",
    modal: true,
    autoOpen: false,
    resizable: false,
  });

  $("#takeAwayDialog .closeD, #takeAwayNoButton").click(function() {
    $("#takeAwayDialog").dialog("close");
    if ($("#takeAwayDialog").data('showErrors')){
      showErrorMessage($("#takeAwayDialog").data('numb'), $("#takeAwayDialog").data('errorMessage'));
    }
    if ($("#takeAwayDialog").data('changeButton')){
      changeButton($("#takeAwayDialog").data('numb'));
    }
  });

  $("#takeAwayYesButton").click(function() {
    $("#takeAwayDialog").dialog("close");
    addItemToOrder($("#takeAwayDialog").data('url'), $("#takeAwayDialog").data('postData'), $("#takeAwayDialog").data('numb'));
    if ($("#takeAwayDialog").data('changeButton')){
      changeButton($("#takeAwayDialog").data('numb'));
    }
  });
});

function addItemToWishListAjax(currentElementId){
        var numb=($("#"+currentElementId).attr('id')).substr(19); // hardcoded for button id lenght ;'(
        if ($('#addToCart'+numb).length > 0) {
            var url=$('#addToCart'+numb).attr("action");
        }
        if ($('#productsCartform').length > 0) {
            var url=$('#productsCartform').attr("action");
        }
        var jsonPage= contextPath + '/browse/gadgets/addItemToWishListJsonObject.jsp';
        var productId=$("#"+currentElementId).attr('productId');
        var refId=$("#"+currentElementId).attr('refId');
        var giftListId=$("#"+currentElementId).attr('giftListId');
        $('#addToWishListButtonDiv'+numb).load(contextPath + '/browse/gadgets/addToWishListAnchor.jsp');
        postData='/atg/commerce/gifts/GiftlistFormHandler.giftlistId='+giftListId;
        postData+='&_D:/atg/commerce/gifts/GiftlistFormHandler.giftlistId= ';
        postData+='&/atg/store/order/purchase/CartFormHandler.addItemToGiftlistSuccessURLMap.'+giftListId+'='+jsonPage;
        postData+='&_D:/atg/store/order/purchase/CartFormHandler.addItemToGiftlistSuccessURLMap.'+giftListId+'= ';
        postData+='&/atg/store/order/purchase/CartFormHandler.addItemToWishlist='+giftListId;
        postData+='&_D:/atg/store/order/purchase/CartFormHandler.addItemToWishlist= ';
        postData+='&/atg/commerce/gifts/GiftlistFormHandler.quantity='+1;
        postData+='&_D:/atg/commerce/gifts/GiftlistFormHandler.quantity= ';
        postData+='&/atg/commerce/gifts/GiftlistFormHandler.catalogRefIds='+refId;
        postData+='&_D:/atg/commerce/gifts/GiftlistFormHandler.catalogRefIds= ';
        postData+='&/atg/commerce/gifts/GiftlistFormHandler.productId='+productId;
        postData+='&_D:/atg/commerce/gifts/GiftlistFormHandler.productId= ';
        $.ajax({
          url: url,
          dataType: 'json',
          data: postData,
          type: 'post',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (data) {
             var unescapedHtmlAddressName = unescapeHtml(data['wishList']);
           $('#myWishList').replaceWith(unescapedHtmlAddressName);
                },
          error:  function (jqXHR, textStatus, errorThrown) {
               //alert(errorThrown);
            }
        });
        clearTimeout(timer);
        $(".productBalloon").hide();
        $("#newProductInCartBalloon"+numb+" .goToCart").hide();
        $("#newProductInCartBalloon"+numb+" .goToWishList").show();
        cartAndWishListPopupPosition("newProductInCartBalloon"+numb, "#myWishList");
        $("#newProductInCartBalloon"+numb).fadeIn("slow");
        findCartAndWishListPopupWidth("newProductInCartBalloon"+numb);
        findWishListPopupLeftPosition("newProductInCartBalloon"+numb);
        findWishListPopupTopPosition("newProductInCartBalloon"+numb);
        $("#newProductInCartBalloon"+numb).css("display", "inline-block");
        $(".markers img:first-child").each(function(index) {
          tooltipMarker(this);
        });
        timer = window.setTimeout(function () { $("#newProductInCartBalloon"+numb).fadeOut("slow");}, 3000);

       $(window).scroll(function () {
            $('div.productBalloon').each(function() {
               cartAndWishListPopupPosition($(this).attr('id'), "#myWishList");
            });
         });
        return false;
    }

    function unescapeHtml(pString) {
      return $('<div/>').html(pString).text();
    }