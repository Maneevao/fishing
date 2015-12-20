$(document).ready(function() {
  $(".productItem form").each(function(index) {
    var productItemDescription = $(this).parent().find(".productItemDescription");
    $(productItemDescription).append(this);
  }); 
  $(".productItem .atg_behavior_addItemToCart").each(function(index) {
    var productItemDescription = $(this).parent().find(".productItemDescription");
    $(productItemDescription).append(this);
  }); 
});

$(window).load(function (){
  $(".borderContainer .productItem .markers").each(function(index) {
    textFadeVertical(this);
  }); 
  $(".markers img:first-child").each(function(index) {
    tooltipMarker(this);
  });
});

function textFadeVertical(markerBlock){
  var markerHeight = $(markerBlock).height();
  var productName = $(markerBlock).parent().find(".title");
  var productRealName = $(productName).find("a");
  var productItemHeight = $(markerBlock).parent().parent().parent().height();
  var productPrice = $(markerBlock).parent().parent().parent().find(".wrItemPrice");
  var productNameMaxHeight = productItemHeight - markerHeight - $(productPrice).innerHeight() - parseInt($(productPrice).css("bottom")) - 5;
  $(productName).css("max-height", productNameMaxHeight);
  if (productNameMaxHeight < $(productRealName).height()){
    var currentHref = $(productName).find("a").attr('href');
    $(productName).after("<a href='" + currentHref + "'></a>");
  }
}

function tooltipMarker(marker){
  var clearFixBlock = $(marker).closest(".clearFix");
  var markerDescriptionImg = $(marker).parent().find(".markerDescription");
  if ($(markerDescriptionImg).length){
    var markerLeft = $(marker).position().left;
    var markerTop = $(marker).position().top;
    $(markerDescriptionImg).css("left", markerLeft);
    $(markerDescriptionImg).css("top", markerTop);
    $(marker).mouseenter(function() {
      $(clearFixBlock).addClass("hoverMarker");
      $(marker).css("visibility", "hidden");
      $(markerDescriptionImg).show();
    });
    $(markerDescriptionImg).mouseleave(function() {
      $(marker).css("visibility", "visible");
      $(markerDescriptionImg).hide();
      $(clearFixBlock).removeClass("hoverMarker");
    });
    $(marker).parent().mouseleave(function() {
      $(marker).css("visibility", "visible");
      $(markerDescriptionImg).hide();
      $(clearFixBlock).removeClass("hoverMarker");
    });
  }
  else{
    $(marker).attr("title", $(marker).attr("alt"));
  }
}