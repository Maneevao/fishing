var ajaxSubmit;
$(document).ready(function(){
ajaxSubmit = function(){
  function submitForm(form, callback, options){
    options = options || {};
    callback = callback || function (data, textStatus, jqXHR) {};
    var rawData = collectFields(form);
    var data = processData(rawData, options);
    var url = options.url || form.attr("action");
    $.ajax(url, $.extend({
//      complete: function(textStatus,jqxHR){
//    	alert(textStatus);
//        var a = 1;
//      },
      data: data,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (data, textStatus, jqXHR) {
        callback(data, textStatus, jqXHR);
      }
    }, options.ajaxOptions))
  }
  function processData(rawData, options){
    var data = {};
    for(var i = 0; i < rawData.length; ++i){
      data[rawData[i].name] = filterValue(data, rawData[i], options);
    }
    return data;
  }
  function filterValue(storage, inputData, options, undefined){
    if(!storage[inputData.name]){
      var data = inputData.data;
      if(data.kind == "input"){
        if(data.type == "submit"){
          if(options.submitBy && options.submitBy != inputData.name){
            return undefined;
          }
        }
        if(data.type == "checkbox" || data.type == "radio"){
          if(!data.checked){
            return undefined;
          }
        }
      }
      var value = data.value;
      return $.isArray(value) ? value[0] : value; //TODO pass whole array
    }
    return storage[inputData.name]
  }
  var dataMiners = {
    "input": function(element){
      return {
        checked: element.checked
      };
    },
    "button": null,
    "textarea": null,
    "select": function(element){
      var selected = [];
      $(element).find("option").each(function(idx, element){
        if(element.selected){
          selected.push(element.value);
        }
      })
      return {
        value: selected,
        isMulti: $(element).attr("multiple")
      };
    }
  }
  function prepareData(element, kind, undefined){
    if(!element || !element.name || element.name == "") return null;
    return {
      name: element.name,
      data: $.extend({
          kind: kind
        }, {
          id: element.id ? element.id : undefined,
          type: element.type ? element.type : undefined,
          value: element.value
        })
      }
  }
  function collectData(element, kind, callback){
    var data = prepareData(element, kind);
    if(data && callback){
      $.extend(data.data, callback(element));
    }
    return data;
  }
  function collectFields(formSelector){
    var allData = [];
    for(selector in dataMiners){
      var callback = dataMiners[selector];
      formSelector.find(selector).each(function(idx, element){
        var data = collectData(element, selector, callback);
        if(data) allData.push(data);
      });
    }
    return allData;
  }
  return {
    submitForm: submitForm
  }
}()
})