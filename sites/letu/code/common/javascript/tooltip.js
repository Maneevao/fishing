function hideTooltip() {
    $(".tooltip").hide();
}

function tooltipPosition(tooltipObject, tooltip, distance, arrowAlign){
  var arrowHeight = 12;
  var tooltipDistance = distance;
  var tooltipLeft = $(tooltipObject).position().left;
  var tooltipWidth = $(tooltip).width();
  var tooltipFooterMargin = 115;
  if (arrowAlign == "center"){
    tooltipFooterMargin = tooltipWidth/2 -10;    
  }  
  if (arrowAlign == "left"){
    tooltipFooterMargin = 9;    
  } 
  $(tooltip).find(".tooltipContent .tooltipFooter").css("margin-left", tooltipFooterMargin);
  if (tooltip == "#newCardTooltip"){
    tooltipLeft -= $(tooltip).width()/2 - 8;
  }
  var tooltipTop = 0;
  if ($(tooltip).hasClass("bottomTooltip")){
    tooltipTop = $(tooltipObject).position().top + $(tooltip).height() + arrowHeight + tooltipDistance;
    if (($(tooltip).attr("id")=="cardNumberErrorTooltip" || $(tooltip).attr("id")=="cardTypeErrorTooltip" || $(tooltip).attr("id")=="loginResultTooltip") && $(tooltip).height()>40) {
      tooltipTop = tooltipTop-20;
    }
  }
  else{
    tooltipTop = $(tooltipObject).position().top - $(tooltip).height() - arrowHeight - tooltipDistance;
  }
  var objectMarginTop = parseInt($(tooltipObject).css("margin-top"));
  var objectMarginBottom = parseInt($(tooltipObject).css("margin-bottom"));
  if (objectMarginTop > 0){
    tooltipTop += objectMarginTop;
  }
  if (objectMarginBottom > 0){
    tooltipTop += objectMarginBottom;
  }
  $(tooltip).css("left", tooltipLeft);
  $(tooltip).css("top", tooltipTop);
}

function informationTooltip(tooltipObject, tooltip){
	informationTooltip(tooltipObject, tooltip, "center");
}

function informationTooltip(tooltipObject, tooltip, align){
  if ($(tooltipObject).is(':visible')){
    tooltipPosition(tooltipObject, tooltip, 2, align);
    $(tooltipObject).mouseenter(function() {
      tooltipPosition(tooltipObject, tooltip, 2, align);
      $(tooltip).show();
    }).mouseleave(function() {
      $(tooltip).hide();
      $(tooltip).mouseenter(function() {
        tooltipPosition(tooltipObject, tooltip, 2, align);
        $(tooltip).show();
      }).mouseleave(function() {
        $(tooltip).hide();
      });
    });
  }
}

function validationTooltip(tooltipObject, tooltip){
  if ($(tooltipObject).is(':visible')){
    tooltipPosition(tooltipObject, tooltip, -8, "left");
    $(tooltip).show();
    window.setTimeout("hideTooltip();", 4000);  
  }
}
