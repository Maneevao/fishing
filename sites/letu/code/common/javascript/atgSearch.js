var searchURL;

function addParamToSearchURL(paramName, paramValue) {
  searchURL += "&" + encodeURIComponent(paramName) + "=" + encodeURIComponent(paramValue);
}

function addQuestionParamToSearchURL(searchQuestion) {
  addParamToSearchURL("q_question", searchQuestion);
}

function validateSearchQuestion(searchQuestion) {
  return searchQuestion != '' && searchQuestion != $("#hintText").val();
}

function searchInCurrentCategorySelected() {
  return $("#searchInCurrentCategory").prop('checked');
}

function addFacetTrailParamToSearchURL(searchQuestion) {
  var currentFacetTrailToCache = $("#currentCategoryFacetValue").val();
  currentFacetTrailToCache = currentFacetTrailToCache.replace(new RegExp(":SRCH:.*"), "");
  var facetTrail = 'SRCH:' + searchQuestion + ':' + currentFacetTrailToCache;
  addParamToSearchURL('q_facetTrail', facetTrail);
}

function onBrandPage() {
  return $("#brandId").val();
}

function addBrandIdToSearchURL() {
  addParamToSearchURL("q_brandId", $("#brandId").val());
}

function onMarkerPage() {
  return $("#markerId").val();
}

function addMarkerIdToSearchURL() {
  addParamToSearchURL("q_markerId", $("#markerId").val());
}

$(document).ready(function () {
  //Next code replace "'" symbol with %27 to correct jquery work
  $(".brandBlock ul li a").each(function (index, element) {
    var element = $(this);
    var hrefVal = element.attr("href");
    var relVal = element.attr("rel");
    hrefVal = hrefVal.replace(new RegExp("'"), "%27");
    relVal = relVal.replace(new RegExp("'"), "%27");
    element.attr("href", hrefVal);
    element.attr("rel", relVal);
  });
  $(".brandBlock #select option").each(function (index, element) {
    var element = $(this);
    var value = element.val();
    value = value.replace(new RegExp("'"), "%27");
    element.val(value);
  });
  
  $('#atg_store_searchInput').blur(function() {
    var searchText = $("#atg_store_searchInput").val().trim();
    $("#atg_store_searchInput").val(searchText);
  });
  
  $('#searchForm').submit(function () {
    var searchQuestion = $("#atg_store_searchInput").val().trim();
    if (!validateSearchQuestion(searchQuestion)) {
      return false;
    }

    searchURL = $("#searchForm").attr('action');
    addQuestionParamToSearchURL(searchQuestion);

    if (searchInCurrentCategorySelected()) {
      addFacetTrailParamToSearchURL(searchQuestion);
      if (onBrandPage()) {
        addBrandIdToSearchURL();
      }
      if (onMarkerPage()) {
        addMarkerIdToSearchURL();
      }
    }

    window.location.href = searchURL;
    return false;
  });
});