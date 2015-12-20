//this script locates correct marker's tabs

$(document).ready(function() {
  tabsZIndex();
  if ($(".homePage .tabs").length){
    homePageTabs();
  }
});

function tabsZIndex(){
  $(".tabs").each(function () {
    allTabs = $(this).find("li");
    var tabsCount = $(allTabs).length;
    var currentZIndex = 1;
    var newZIndex = 1;
    for (i = (tabsCount - 1); i >= 0; i--){
      currentTab = allTabs[i];
      newZIndex = currentZIndex;
      if ($(currentTab).hasClass("active")){
        newZIndex = tabsCount + 1;
      }
      $(currentTab).css("z-index", newZIndex);
      currentZIndex++;
    }
  });
}
//delete border's for products (category and home pages)
function prepareProductList(categoryProduct){
  if (!(typeof micrositeId == "undefined" || micrositeId == null)){
	return;
  }

  if (!($(categoryProduct).parent().find(".showAllBtn").length)){
    $(categoryProduct).css("border-bottom", "0px");
  }
  var productMinHeight = parseInt($(".productItem .clearFix").css("min-height"));
  $(categoryProduct).find(".productLine").each(function () {
    var allProductItems = $(this).find(".productItem .clearFix");
    var productMaxHeight = productMinHeight;
    for (var i = 0; i <= allProductItems.size(); i++){
      var currentProductItem = $(allProductItems).get(i);
      var currentProductHeight = $(currentProductItem).height();
      if (productMaxHeight < $(currentProductItem).height()){
        productMaxHeight = $(currentProductItem).height();
      }
    }
    if (productMaxHeight != productMinHeight){
      $(this).find(".productItem .clearFix").each(function () {
        $(this).height(productMaxHeight);
      });
    }
  });
  var lastProductLine = $(categoryProduct).find(".productLine:last-child");
  var itemsInLineCount = Math.round(parseInt($(categoryProduct).css('width')) / parseInt($(categoryProduct).find(".productItem").css('width')));
  if ($(lastProductLine).find(".productItem").size() < itemsInLineCount){
    $(lastProductLine).find(".productItem:last-child").css("border-right", "1px solid #BFD9F1");
  }
  else{
    if($.browser.msie) {
      $(lastProductLine).find(".productItem:last-child").css("border-right", "none");
    }
  }
}

function homePageTabs(){
  var homePageTab = $(".tabs");
  var tabs = $(homePageTab).find("li");
  var firstTab = $(homePageTab).find("li:first-child");
  var firstTabTop = $(firstTab).offset().top
  var tabsWithoutSecFY = $(".tabs li:nth-child(n+2)");
  var tabsWithoutSecFYCount = $(tabsWithoutSecFY).size();
  var newTabWidth = 0;
  if (tabsWithoutSecFYCount == 0){
    $(firstTab).css("max-width", $(homePageTab).width());
  }
  if (tabsWithoutSecFYCount <= 2){
    var newTabWidth = checkTabsWidth(tabsWithoutSecFY, tabsWithoutSecFYCount);
    var homePageTabMargin = parseInt($(".firstTab").next().css("margin-left")) + parseInt($(".firstTab").next().css("margin-right"));
    var firstTabMaxWidth = $(homePageTab).width() - (newTabWidth + homePageTabMargin) * tabsWithoutSecFYCount;
    tabInTwoLines(firstTabMaxWidth);
    tabTextFading(firstTabMaxWidth);
    $(tabsWithoutSecFY).each(function () {
      $(this).width(newTabWidth);
    });
  }
  else{
    tabInTwoLines(300);
    tabTextFading(300);
    $(firstTab).find("a").css("max-width","275px");
    var tabsCalculatedWidth = 0;
    $(tabsWithoutSecFY).find("a").css("padding", "0"); 
    var maxTabWidth = checkTabsWidth(tabsWithoutSecFY, tabsWithoutSecFYCount);
    tabsCalculatedWidth = calculateTabsWidth(tabsWithoutSecFY, tabsWithoutSecFYCount);
    if (tabsCalculatedWidth >= maxTabWidth){
      newTabWidth = tabsCalculatedWidth;
    }
    else{
      newTabWidth = maxTabWidth;
    }
    $(tabsWithoutSecFY).each(function () {
      $(this).width(newTabWidth);
      if (firstTabTop != $(this).offset().top){
        $(this).remove();
        tabsWithoutSecFYCount--;
      }
    });
    tabsCalculatedWidth = calculateTabsWidth(tabsWithoutSecFY, tabsWithoutSecFYCount);
  }
}

function calculateTabsWidth(calculatedTabs, size){
  var homePageTab = $(".tabs");
  var calculatedTabsCount = size;
  var freeSpace = $(homePageTab).width() - $(".firstTab").width();
  var homePageTabMargin = parseInt($(".firstTab").next().css("margin-left")) + parseInt($(".firstTab").next().css("margin-right"));
  var tabsCalculatedWidth = freeSpace / calculatedTabsCount - homePageTabMargin;
  $(calculatedTabs).each(function () {
    $(this).width(tabsCalculatedWidth);
  });
  return tabsCalculatedWidth;
}

function checkTabsWidth(calculatedTabs, size){
  var maxTabWidth = 0;
  var newTabWidth = 0;
  $(calculatedTabs).each(function () {
    var currentTabWidth = $(this).width();
    if (currentTabWidth > maxTabWidth){
      maxTabWidth = currentTabWidth;
    }
  });
  return maxTabWidth;
}

function tabInTwoLines(width){
  if ($("#forYouName").width() ){
    $(".firstTab").find("a").css("line-height","18px");
  }  
}

function tabTextFading(width){
  if ($("#forYouName").height()){
    $("#forYouName").parent().append("<div></div>");
   } 
}
