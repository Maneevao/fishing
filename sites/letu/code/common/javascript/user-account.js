$(document).ready(function() {
	
	$("#print-dialog").dialog({
	    width: "auto",
	    modal: true,
	    autoOpen: false,
	    resizable: false,
	  });
	  
	  $(".open-print-dialog").each(function (event) {
        $(this).click(function(event) {
			event.preventDefault();
			$("#print-dialog-content").load("http://www.letu.ru/myaccount/profile/giftCertDetails.jsp?id=" + $(this).attr("href"), function(){
				$("#print-dialog").dialog("open");
			});

		});
      });
	  
	$("#print-dialog .closeD").click(function() {
	    $("#print-dialog").dialog("close");
	    $("#print-dialog-content").empty();
	});

});