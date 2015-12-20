var $regionListJsonAddress = "http://www.letu.ru/global/json/regionListJSON.jsp";
var $cityListJsonAddress = "http://www.letu.ru/global/json/cityListJSON.jsp";
var $streetListJsonAddress = "http://www.letu.ru/global/json/streetListJSON.jsp";
var cityDropdownCounter = 0;

$(document).ready(function(){

  setGeolocationCity();
  $(document).click(function() {
    _closeDropDown($("#quickViewContent #userCityDropDownUL"));
    _closeDropDown($("#quickViewContent #userCheckoutCityDropDownUL"));
  });

  $("#quickViewContent #updateCurrentCityForm #updateCurrentCityButton").live("click", function(event) {
    if ($("#quickViewContent #cityInputOnPopupId").val().length > 0) {
      $("#quickViewContent #updateCurrentCityForm").submit();
    } else {
      displayErrorForNonExistentCity();
    }
  });

  $('#quickViewContent #updateCurrentCityForm ul.cities li, #quickViewContent #updateCurrentCityForm ul.citiesFirst li').live("click",function() {
    $('#quickViewContent #cityInputOnPopup').val($(this).text().trim());
    $('#quickViewContent #cityInputOnPopupId').val($(this).find('.cityId').val());
    $('#quickViewContent ul.cities li').css('color','#444');
    $(this).css('color','#d61187');
    $('#quickViewContent #userCityBlock').removeClass("error");
    $('#quickViewContent #userCityBlock').children("span").remove();
    $("#quickViewContent #updateCurrentCityButton").removeAttr("disabled");
    changeCurrentCityManualHandler();
  });

  $('#quickViewContent #updateCheckoutCityForm ul.cities li, #quickViewContent #updateCheckoutCityForm ul.citiesFirst li').live("click",function() {
    $('#quickViewContent #checkoutCityInputOnPopup').val($(this).text().trim());
    $('#quickViewContent #checkoutCityInputOnPopupId').val($(this).find('.cityId').val());
    $('#quickViewContent ul.cities li').css('color','#444');
    $(this).css('color','#d61187');
    $('#quickViewContent #checkoutCityBlock').removeClass("error");
    $('#quickViewContent #checkoutCityBlock').children("span").remove();
    $("#quickViewContent #updateCurrentCityWithStoresButton").removeAttr("disabled");
    changeCheckoutCityManualHandler();
  });

  $("#quickViewContent #updateCurrentCityForm").live("keypress", function(e) {
    if (e.keyCode == 13 && $("#quickViewContent #updateCurrentCityButton").attr("disabled")) return false;
  });

  $("#quickViewContent #updateCheckoutCityForm").live("keypress", function(e) {
    if (e.keyCode == 13 && $("#quickViewContent #updateCurrentCityWithStoresButton").attr("disabled")) return false;
  });

  $("#quickViewContent #cityInputOnPopup").live("click", function(e) {
    $("#quickViewContent #userCityDropDownUL").each(function() {
      if (!+$(this).attr("ddState")) {
        changeCurrentCityManualHandler();
      }
    });
  });

  $("#quickViewContent #checkoutCityInputOnPopup").live("click", function(e) {
    $("#quickViewContent #userCheckoutCityDropDownUL").each(function() {
      if (!+$(this).attr("ddState")) {
        changeCheckoutCityManualHandler();
      }
    });
  });

  $('#userCityHref').live('click', function() {
    quickViewManager.displayQuickView("cities", true, undefined, true);
    var currentCityName = $('#city #userCity').text().trim();
    $('#quickViewContent #cityInputOnPopup').val(currentCityName);
    var currentCityId = $('#userCityId').val();
    $('#quickViewContent #cityInputOnPopupId').val(currentCityId);
    $('#quickViewContent ul.cities li').each(function(){
      if( $(this).find('.cityId').val() == currentCityId ) {
        $(this).css('color','#d61187');
      }
    });
    changeCurrentCityManualHandler();
  });

  $('#checkoutCityHref').live('click', function() {
    quickViewManager.displayQuickView("citiesWithStores", true, undefined, true);
    var currentCityName = $('#checkoutCityHref #userCity').text().trim();
    var currentCityId = $('#userCityId').val();
    $('#quickViewContent #checkoutCityInputOnPopup').val(currentCityName);
    $('#quickViewContent ul.cities li').each(function(){
      if( $(this).find('.cityId').val() == currentCityId ) {
        $(this).css('color','#d61187');
      }
    });
    changeCheckoutCityManualHandler();
  });

  $('#quickViewPopup .closeD').live("click",function() {
    if (quickViewManager.productId !== "cities" && quickViewManager.productId !== "citiesWithStores") {
      return;
    }
    quickViewManager.productId = null;
    var currentCity = $('#city #userCityHref #userCity').text().trim();
    var geoCity;
    var geoRegion;
    if (currentCity.length == 0) {
      if (typeof(geolocationCity) != 'undefined' && typeof(geolocationRegion) != 'undefined') {
        geoCity = geolocationCity;
        geoRegion = geolocationRegion;
      } else {
        geoCity = citiesPopupData.geoCity;
        geoRegion = citiesPopupData.geoRegion;
      }
      var defaultCity = citiesPopupData.defaultCity; 
      var defaultCityId = citiesPopupData.defaultCityId;
      var currentCityId;
      var shippingRegion;

      checkCityRequest(geoCity + " (" + geoRegion + ")", "single", "false", function (data) {
        if (data[0].id == -1 ) {
          currentCity = defaultCity;
          currentCityId = defaultCityId;
        } else {
          currentCityId = data[0].id;  
          currentCity = data[0].name;
          shippingRegion = data[0].shippingRegion;
        }
        if (shippingRegion) {
          currentCity = currentCity + " (" + shippingRegion + ")";
        }
        $('#quickViewContent #cityInputOnPopup').val(currentCity);
        $('#quickViewContent #cityInputOnPopupId').val(currentCityId);
        $("#quickViewContent #cities #updateCurrentCityForm").submit();
      });
    } else {
      _closeCitiesFormDialog();
    }
  });

  function setGeolocationCity() {
    var currentCity = $('#city #userCityHref #userCity').text().trim();
    var geoCity;
    var geoRegion;
    if (currentCity.length == 0) {
      if (typeof(geolocationCity) != 'undefined' && typeof(geolocationRegion) != 'undefined') {
        geoCity = geolocationCity;
        geoRegion = geolocationRegion;
      } else {
        geoCity = citiesPopupData.geoCity;
        geoRegion = citiesPopupData.geoRegion;
      }
      var defaultCity = citiesPopupData.defaultCity; 
      var defaultCityId = citiesPopupData.defaultCityId;
      var currentCityId;
      var shippingRegion;

      checkCityRequest(geoCity + " (" + geoRegion + ")", "single", "false", function (data) {
        if (data[0].id == -1 ) {
          currentCity = defaultCity;
          currentCityId = defaultCityId;
        } else {
          currentCityId = data[0].id;  
          currentCity = data[0].name;
          shippingRegion = data[0].shippingRegion;
        }
        if (shippingRegion) {
          currentCity = currentCity + " (" + shippingRegion + ")";
        }
        $('#cities #cityInputOnPopup').val(currentCity);
        $('#cities #cityInputOnPopupId').val(currentCityId);
        _handleAjaxCityFormSubmitWithoutPopup();
      });
    }
  }

  $(document).delegate("#updateCurrentCityForm", "submit", function(event) {
    //if we are on page to choose shipping method or on account page
    if ($('.deliveryChoise').length > 0) {
      var input = $("<input>")
           .attr("type", "hidden")
           .attr("name", "updateCheckoutCity").val(true);
      $(this).append($(input));
      $('#quickViewContent #checkoutSuccessURL').val("http://www.letu.ru/checkout/checkout.jsp");
      return true;
    } else if($('.personalData').length > 0) {
      $('#quickViewContent #checkoutSuccessURL').val("http://www.letu.ru/myaccount/profile/accountProfileEdit.jsp");
      return true;
    } else {
      if (typeof $(this).attr("citiesFormSubmitting") === 'undefined') { // preventing double submission
        $(this).attr("citiesFormSubmitting", true);
        _handleAjaxCityFormSubmit();
      }
      event.preventDefault();
      return false;
    }
  });

});

function _closeCitiesFormDialog() {
  $(quickViewManager.quickViewPopupSelector).dialog("close");
  $("#quickViewContent").empty();
}

function _handleAjaxCityFormSubmit() {
  ajaxSubmit.submitForm($("#quickViewContent #updateCurrentCityForm"), function (data, textStatus, jqXHR) {
    if (textStatus == "success") {
      var newCity = $('#quickViewContent #cityInputOnPopup').val();
      if (typeof newCity !== 'undefined') {
        newCity = newCity.trim();
        $('#city #userCityHref #userCity').html(" " + newCity.trim());
        $('#userCityHref').show();
        var newCityId = $('#quickViewContent #cityInputOnPopupId').val();
        $('#userCityId').val(newCityId);
      }
      _closeCitiesFormDialog();
    } 
  },
  {
    submitBy: '/atg/store/profile/RegistrationFormHandler.updateCurrentCity',
    ajaxOptions: {
      dataType: "html"
    }
  });
}

function _handleAjaxCityFormSubmitWithoutPopup() {
  ajaxSubmit.submitForm($("#cities #updateCurrentCityForm"), function (data, textStatus, jqXHR) {
    if (textStatus == "success") {
      var newCity = $('#cities #cityInputOnPopup').val();
      if (typeof newCity !== 'undefined') {
        newCity = newCity.trim();
        $('#city #userCityHref #userCity').html(" " + newCity.trim());
        $('#userCityHref').show();
        var newCityId = $('#cities #cityInputOnPopupId').val();
        $('#userCityId').val(newCityId);
      }
      _closeCitiesFormDialog();
    } 
  },
  {
    submitBy: '/atg/store/profile/RegistrationFormHandler.updateCurrentCity',
    ajaxOptions: {
      dataType: "html"
    }
  });
}

function showCityQuickView() {
  $(document).ready(function(){
    setTimeout(function() {
      quickViewManager.displayQuickView("cities", true, undefined, true);
      if (typeof geolocationCity !== 'undefined') {
        $('#quickViewContent #cityInputOnPopup').val(geolocationCity);
      }
      changeCurrentCityManualHandler();
    }, 1000);
  });
}

function deliveryCityClick() {
  quickViewManager.displayQuickView("cities", true, undefined, true);
  $('#quickViewContent #cityInputOnPopup').val($('.checkoutContainer #deliveryCityHref').text().trim());
  var currentDeliveryCityId = $('#deliveryCityId').val();
  $('#quickViewContent #cityInputOnPopupId').val(currentDeliveryCityId);
  changeCurrentCityManualHandler();
}

function checkCityRequest(filterExpression, range, citiesWithStores, successAction) {
  cityDropdownCounter++;
  if (!filterExpression) {
    successAction(new Array());
    return;
  }
  var counter = cityDropdownCounter;
  var jsonPage = contextPath + $cityListJsonAddress;
  $.ajax({
    url : jsonPage,
    dataType : 'json',
    type : 'POST',
    data : {
      "filterExpression" : filterExpression,
      "range" : range,
      "citiesWithStores" : citiesWithStores
    },
    async : true,
    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    success : function(data) {
      if (counter == cityDropdownCounter) {
        successAction(data);
      } else {
        console.log('!!!!! resulted cities for ' + filterExpression + ", but cityDropdownCounter:" + cityDropdownCounter + " != counter:" + counter);
      }
    }
  });
}

function changeCurrentCityManualHandler() {
  var noInputCity = citiesPopupData.notExistentCity;
  var cityInputNode = $("#quickViewContent #cityInputOnPopup");
  var cityListNode = $("#quickViewContent #userCityDropDownUL");
  var cityInputIdNode = $("#quickViewContent #cityInputOnPopupId");
  var cityErrorLineNode = $("#quickViewContent #userCityBlock");
  var filterExpression = $.trim(cityInputNode.val());
  checkCityRequest(filterExpression, "short", "false", function(data) {
    cityListNode.children("li").each(function() {
      ($(this)).remove();
    });
    if (data.length == 0) {
      _closeDropDown(cityListNode);
      cityInputIdNode.val("");
      $("#quickViewContent #updateCurrentCityButton").attr("disabled", "disabled");
      cityErrorLineNode.removeClass("error");
      cityErrorLineNode.children("span").remove();
      return;
    }

    if (data[0].id == -1) {
      displayErrorForNonExistentCity($("#quickViewContent #updateCurrentCityButton"), cityListNode, cityErrorLineNode);
      return;
    }
    if (data.length > 1) {
      cityInputIdNode.val("");
      $("#quickViewContent #updateCurrentCityButton").attr("disabled", "disabled");
      for ( var i in data) {
        var city = data[i];
        if (filterExpression.toLowerCase() == city.name.toLowerCase()) {
          cityInputIdNode.val(city.id);
          $("#quickViewContent #updateCurrentCityButton").removeAttr("disabled");
        }
      }
    } else {
      if (filterExpression.toLowerCase() == data[0].name.toLowerCase()) {
        cityInputIdNode.val(data[0].id);
        _closeDropDown(cityListNode);
        $("#quickViewContent #updateCurrentCityButton").removeAttr("disabled");
      } else {
        cityInputIdNode.val("");
        $("#quickViewContent #updateCurrentCityButton").attr("disabled", "disabled");
      }
    }
    cityErrorLineNode.removeClass("error");
    cityErrorLineNode.children("span").remove();
    if (data.length != 1 || (data.length == 1 && filterExpression.toLowerCase() != data[0].name.toLowerCase())) {
      jQuery.each(data, function(i, val) {
        var oLi = document.createElement("li");
        var oA = document.createElement("a");
        if (val.shippingRegion) {
          oA.appendChild(document.createTextNode(val.name + " (" + val.shippingRegion + ")"));
        } else {
          oA.appendChild(document.createTextNode(val.name));
        }
        oA.setAttribute("href", "#");
        oA.setAttribute("value", val.id);
        oA.onclick = function(event) {
          // click on city node
          event ? event.stopPropagation() : window.event.cancelBubble = !0;
          event ? event.preventDefault() : window.event.returnValue = false;
          _closeDropDown(cityListNode);
          var newCityName = $(this).html();
          cityInputNode.val(newCityName);
          var newCityId = $(this).attr("value");
          cityInputIdNode.val(newCityId);

          $("#quickViewContent #updateCurrentCityButton").removeAttr("disabled");
        };
        oLi.appendChild(oA);
        cityListNode.append(oLi);
      });
      _openDropDown(cityListNode);
    }
  });
}

function displayErrorForNonExistentCity(button, cityList, cityBlock) {
  var noInputCity = citiesPopupData.notExistentCity;
  cityBlock.addClass("error");
  if ($("#quickViewContent .incorrectCity").length == 0) {
    cityBlock.append('<span class="otherCityWarningMessage incorrectCity"></span>');
  }
  $("#quickViewContent .incorrectCity").html(noInputCity);
  button.attr("disabled", "disabled");
  _closeDropDown(cityList);
}

function changeCheckoutCityManualHandler() {
  var noInputCity = citiesPopupData.notExistentCity;
  var cityInputNode = $("#quickViewContent #checkoutCityInputOnPopup");
  var cityListNode = $("#quickViewContent #userCheckoutCityDropDownUL");
  var cityInputIdNode = $("#quickViewContent #checkoutCityInputOnPopupId");
  var cityErrorLineNode = $("#quickViewContent #checkoutCityBlock");
  var streetInputNode = $("#currentStreetInput");
  var streetListNode = $("#streetDropDownUL");
  var filterExpression = $.trim(cityInputNode.val());
  checkCityRequest(filterExpression, "short", "true", function(data) {
    cityListNode.children("li").each(function() {
      ($(this)).remove();
    });
    streetListNode.children("li").each(function() {
      ($(this)).remove();
    });
    if (data.length == 0) {
      _closeDropDown(cityListNode);
      cityInputIdNode.val("");
      $("#quickViewContent #updateCurrentCityWithStoresButton").attr("disabled", "disabled");
      cityErrorLineNode.removeClass("error");
      cityErrorLineNode.children("span").remove();
      return;
    }
    if (data[0].id == -1) {
      displayErrorForNonExistentCity($("#quickViewContent #updateCurrentCityWithStoresButton"), cityListNode, cityErrorLineNode);
      return;
    }
    if (data.length > 1) {
      cityInputIdNode.val("");
      streetInputNode.val("");
      $("#quickViewContent #updateCurrentCityWithStoresButton").attr("disabled", "disabled");
      for ( var i in data) {
        var city = data[i];
        if (filterExpression.toLowerCase() == city.name.toLowerCase()) {
          cityInputIdNode.val(city.id);
          $("#quickViewContent #updateCurrentCityWithStoresButton").removeAttr("disabled");
        }
      }
    } else {
      if (filterExpression.toLowerCase() == data[0].name.toLowerCase()) {
        cityInputIdNode.val(data[0].id);
        _closeDropDown(cityListNode);
        $("#quickViewContent #updateCurrentCityWithStoresButton").removeAttr("disabled");
      } else {
        cityInputIdNode.val("");
        $("#quickViewContent #updateCurrentCityWithStoresButton").attr("disabled", "disabled");
      }
    }
    cityErrorLineNode.removeClass("error");
    cityErrorLineNode.children("span").remove();
    if (data.length != 1 || (data.length == 1 && filterExpression.toLowerCase() != data[0].name.toLowerCase())) {
      var streetInputEnable = false;
      jQuery.each(data, function(i, val) {
        if (val.name.toUpperCase() == filterExpression.toUpperCase()) {
          // we've got match
          streetInputEnable = true;
        } else {
          streetInputEnable = false;
        }
        var oLi = document.createElement("li");
        var oA = document.createElement("a");
        if (val.shippingRegion) {
          oA.appendChild(document.createTextNode(val.name + " (" + val.shippingRegion + ")"));
        } else {
          oA.appendChild(document.createTextNode(val.name));
        }
        oA.setAttribute("href", "#");
        oA.setAttribute("value", val.id);
        oA.onclick = function(event) {
          // click on city node
          event ? event.stopPropagation() : window.event.cancelBubble = !0;
          event ? event.preventDefault() : window.event.returnValue = false;
          _closeDropDown(cityListNode);
          var newCityName = $(this).html();
          cityInputNode.val(newCityName);
          var newCityId = $(this).attr("value");
          cityInputIdNode.val(newCityId);
          $("#quickViewContent #updateCurrentCityWithStoresButton").removeAttr("disabled");
        };
        oLi.appendChild(oA);
        cityListNode.append(oLi);
        if (streetInputEnable) {
          // region name is on place, we need to set id of this region
          cityInputIdNode.val(val.id);
          // enable city field and fill new data into
          streetInputNode.removeAttr('disabled');
          streetInputNode.val("");
          // show streets
          changeCurrentStreetManualHandler();
        }
      });
      _openDropDown(cityListNode);
    }
  });
}

// states:
// -2 - closing
// -1 - closing, but then to open
// 0 - closed
// 1 - opening, but then to close
// 2 - opening
// 3 - opened

function _openDropDown(ddDiv) {
  switch (+ddDiv.attr("ddState")) {
  case 1:
    ddDiv.attr("ddState", 2);
  case 2:
  case 3:
    return;
  case -2:
    ddDiv.attr("ddState", -1);
  case -1:
    return;
  default:
    ddDiv.attr("ddState", 2);
  }
  ddDiv.addClass("open");
  ddDiv.slideDown(function() {
    if (ddDiv.attr("ddState") == 1) {
      // marked to be closed
      ddDiv.attr("ddState", 3); // opened
      _closeDropDown(ddDiv);
    } else {
      ddDiv.attr("ddState", 3); // opened
    }
  });
}

function _closeDropDown(ddDiv) {
  switch (+ddDiv.attr("ddState")) {
  case -1:
    ddDiv.attr("ddState", -2);
  case -2:
    return;
  case 3:
    ddDiv.attr("ddState", -2);
    break;
  case 2:
    ddDiv.attr("ddState", 1);
  case 1:
    return;
  default:
    return;
  }
  ddDiv.slideUp("fast", function() {
    ddDiv.css('display', 'none');
    ddDiv.removeClass("open");
    if (ddDiv.attr("ddState") == -1) {
      // marked to be opened
      ddDiv.attr("ddState", 0); // closed
      _openDropDown(ddDiv);
    } else {
      ddDiv.attr("ddState", 0); // closed
    }
  });
}

function changeCurrentStreetManualHandler() {
  var cityInputIdNode = $("#deliveryCityId");
  var streetInputNode = $("#currentStreetInput");
  var streetListNode = $("#streetDropDownUL");
  var streetInputIdNode = $("#streetInputId");
  var choosenCityId = cityInputIdNode.val();
  var filterExpression = $.trim(streetInputNode.val());
  var cityInputKladrNode = $("#cityKladrCode");

  if (!choosenCityId) {
    return;
  }
  var jsonPage = contextPath + $streetListJsonAddress;
  $.ajax({
    url : jsonPage,
    dataType : 'json',
    type : 'POST',
    data : {
      "cityId" : choosenCityId,
      "filterExpression" : filterExpression
    },
    async : true,
    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    success : function(data) {
      streetListNode.children("li").each(function() {
        ($(this)).remove();
      });
      streetInputIdNode.val("");
      if (data[0].streetName == -1) {
        streetListNode.slideUp();
        streetListNode.removeClass("open");
        streetInputIdNode.val(cityInputKladrNode.val());
        return;
      }
      if (data.length == 1) {
        if (filterExpression.toLowerCase() == (data[0].streetName.toLowerCase() + " " + data[0].streetType.toLowerCase())) {
          streetInputIdNode.val(data[0].streetKladr);
        }
      }
      streetListNode.slideDown();
      streetListNode.addClass("open");
      jQuery.each(data, function(i, val) {
        var oLi = document.createElement("li");
        var oA = document.createElement("a");
        oA.appendChild(document.createTextNode(val.streetName + " " + val.streetType));
        oA.setAttribute("href", "#");
        oA.setAttribute("value", val.streetKladr);
        oA.onclick = function(event) {
          // click on street node
          event ? event.stopPropagation() : window.event.cancelBubble = !0;
          event ? event.preventDefault() : window.event.returnValue = false;
          var newStreetName = $(this).html();
          streetInputNode.val(newStreetName);
          var streetId = $(this).attr("value");
          streetInputIdNode.val(streetId);
          slideUpDropDown(streetListNode);
          $(".dropdown ul").stop(true, true).slideUp("fast");
        };
        oLi.appendChild(oA);
        streetListNode.append(oLi);
      });
    },
  });
}

function slideUpDropDown(dropdown) {
  dropdown.find("ul").slideUp();
  dropdown.removeClass("open")
}
