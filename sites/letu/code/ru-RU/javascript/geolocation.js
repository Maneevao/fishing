var API_URL = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard&amp;lang=ru-RU&amp;onload=saveGeolocationInfo';

$(document).ready(function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = API_URL;
  document.body.appendChild(script);
});

function requestToGeolocationDroplet(pSuccessCallback) {
   $.ajax({
         cache : false,
            url : '/GeolocationDroplet',
            type : 'POST',
            data : {
                'geolocationCountry' : ymaps.geolocation.country,
                'geolocationRegion' : ymaps.geolocation.region,
                'geolocationCity' : ymaps.geolocation.city
            },
            dataType : 'html',
            success : function() {if (pSuccessCallback) pSuccessCallback(); },
            failure: function() {if (pSuccessCallback) pSuccessCallback(); }
        });
}