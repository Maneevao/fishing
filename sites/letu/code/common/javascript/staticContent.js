$(document).ready(function (){
  $("div[src]").each(function(){
    var staticFileURL = $(this).attr('src');
    $(this).load(staticFileURL, function() {
      $(this).css("background", "none");
      $(this).css("height", "auto");
    });
  });
});

$(window).load(function() {
  setTimeout(function(){
    if (window.location.href.indexOf("#") != -1){
	  window.location.href = window.location.href;
	}
  }, 30);  
});