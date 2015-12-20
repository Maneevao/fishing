jQuery.cookie = function(){
	var url = location.href; 
	var filter = ":/.%-_", id = ''; ID = 0;
	//for(var ch in url) if (filter.indexOf(ch) == -1) id += ch;
	//for(var ch in id) ID += ch;
	//this.cookieID = "cookie"+ID;
	this.cookieID = "cookie";
	
	this.set = function(options){
		var cookieContent = '';
		var filterProperties = {"cookieID":0,"set":1,"get":2};
		options = options || {};
		for(var property in this){
			if(!(property in filterProperties)){
				if (this[property] === null) this[property] = '';
				cookieContent += (property) + ':' + (this[property]) + ',';
			}
		}
		cookieContent = cookieContent.substring(0,cookieContent.length-1);
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [this.cookieID, '=', encodeURIComponent(cookieContent), expires, path, domain, secure].join('');
		return true;
	};

	this.get = function(){
		var cookieValue = '';
		if (document.cookie && document.cookie != '') { // если сокет доступен и существует
			var cookies = document.cookie.split(';'); // разбили и получили массив
			for (var i = 0; i < cookies.length; i++) { // выполняем перебор массива
				var cookie = jQuery.trim(cookies[i]); // обрезали все отступы
				if (cookie.substring(0, this.cookieID.length + 1) == (this.cookieID + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(this.cookieID.length + 1));
					break;
				}
			}
			var properties = cookieValue.split(',');
			for(var i = 0; i<properties.length;i++){
				var property = properties[i].split(':');
				this[property[0]] = property[1];
			}
		}
		return true;
	};
	return this;
};