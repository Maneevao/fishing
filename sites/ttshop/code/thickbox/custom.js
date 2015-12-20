$(document).ready(function() {
						   
// Функция для обработки нажатия кнопки мыши на ссылки в классе popup				   
$('td.popup').click(function() {
									
									
// Переменная для хранения атрибута rel нажатой ссылки	
var popupid = $(this).attr('rel');


// Теперь надо показать все, что принадлежит атрибуту rel
// Предположим, что атрибут rel нажатой ссылки - это popuprel. Тогда код ниже затеняет #popuprel
$('#' + popupid).fadeIn();


// Добавим div fade вниз тэга body
// и мы уже задавали ему стиль на шаге  2 : CSS
$('body').append('<div id="fade"></div>');
$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();


// Теперь надо поместить модальное окно в центр вэбстраницы, когда она затенена
// Мы добавляем 10px к высоте и ширине
var popuptopmargin = ($('#' + popupid).height() + 10) / 2;
var popupleftmargin = ($('#' + popupid).width() + 10) / 2;



});


// Определяем еще одну функцию, которая используется для постепенного затенения слоя и открывания окна при нажатии на затененный слой
$('#fade').click(function() {


// ДОбавляем ids всех модальных окон здесь
$('#fade , #popuprel').fadeOut()
return false;
});
});