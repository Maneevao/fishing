$(document).ready(function () {
	$('#add_to_cart').replaceWith('<a onclick="" id="add_to_cart" class="button">' + $('#add_to_cart').html() + '</a>');

	$('#add_to_cart').click(function () {
		$.ajax({
			type: 'post',
			url: 'index.php?route=module/cart/callback',
			dataType: 'html',
			data: $('#product :input'),
			success: function (html) {
				$('#module_cart').html(html);
			},	
			complete: function () {
				var image = $('#image').offset();
				var cart  = $('#module_cart').offset();
	
				$('#image').before('<img src="' + $('#image').attr('src') + '" id="temp" style="position: absolute; top: ' + image.top + 'px; left: ' + image.left + 'px;" />');
	
				params = {
					top : cart.top + 'px',
					left : cart.left + 'px',
					opacity : 0.0,
					width : $('#module_cart').width(),  
					heigth : $('#module_cart').height()
				};		
	
				$('#temp').animate(params, 'slow', false, function () {
					$('#temp').remove();
				});		
			}			
		});			
	});	

        $('input.buy_button[class]').each(function() {
            var $t = $(this);
            $t.removeAttr('onclick')
        });

        $("input[id^='product']").click(function () {
        var productIDValSplitter    = (this.id).split("_");
        var productIDVal            = productIDValSplitter[1];
           //alert(productIDVal);
            $.ajax({
                type: 'post',
                url: '/shopping_cart.html?ajax=true&action=add_product&products_id='+productIDVal+'',
                dataType: 'html',
                data: $('#cart_quantity_'+ productIDVal +' :input'),
                success: function (html) {
                    $('#shoppingcart-content').html(html);
                },   
                complete: function () {
                    var image = $('#cart-image-1' + productIDVal).offset();
                    var cart  = $('#shoppingcart-content').offset();
           
//                    $('#cart-image-1').before('<img src="' + $('#cart-image-1').attr('src') + '" id="temp" style="position: absolute; top: ' + image.top + 'px; left: ' + image.left + 'px;" />');

                    $('#cart-image-1').before('<img src="' + $('#cart-image-1').attr('src') + '" id="temp" style="position: absolute; top: 400px; left: 300px;" />');
           
                    params = {
                        top : cart.top + 'px',
                        left : cart.left + 'px',
                        opacity : 0.0,
                        width : $('#shoppingcart-content').width(), 
                        heigth : $('#shoppingcart-content').height()
                    };       
           
                    $('#temp').animate(params, 'slow', false, function () {
                        $('#temp').remove();
                    });       
                }           
            });     
		return false;      
        }); 


        $('input.notify_button[class]').each(function() {
            var $p = $(this);
            $p.removeAttr('onclick')
        });

        $("input[id^='formproductnotify']").click(function () {
        var productIDValSplitter    = (this.id).split("_");
        var productIDVal            = productIDValSplitter[1];      
	//alert($('#customers_email_'+ productIDVal+'').val());
		var email = $('#customers_email_'+ productIDVal+'').val();    
                $.ajax({
                type: 'post',
                url: '/index.html?ajax=true&action=notify&products_id='+productIDVal+'',
                dataType: 'html',
                data: 'customers_email='+email+'',
                success: function (html) {
                    $('#form_product_notify_'+ productIDVal).html(html);
                }          
            }); 
		return false;      
        }); 


		
});