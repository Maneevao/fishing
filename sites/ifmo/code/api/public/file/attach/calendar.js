
function leapYear(year) {
	if (year % 4 == 0)
    	return true
    return false
}

function getDays(month, year) {
	var ar = new Array(12)
	ar[0] = 31
	ar[1] = (leapYear(year)) ? 29 : 28 // February
	ar[2] = 31
	ar[3] = 30
	ar[4] = 31
	ar[5] = 30
	ar[6] = 31
	ar[7] = 31
	ar[8] = 30
	ar[9] = 31
	ar[10] = 30
	ar[11] = 31
	return ar[month]
}
function getMonthName(month) {
	var ar = new Array(12)
	ar[0] = "&#1071;&#1085;&#1074;&#1072;&#1088;&#1100;"
	ar[1] = "&#1060;&#1077;&#1074;&#1088;&#1072;&#1083;&#1100;"
	ar[2] = "&#1052;&#1072;&#1088;&#1090;"
	ar[3] = "&#1040;&#1087;&#1088;&#1077;&#1083;&#1100;"
	ar[4] = "&#1052;&#1072;&#1081;"
	ar[5] = "&#1048;&#1102;&#1085;&#1100;"
	ar[6] = "&#1048;&#1102;&#1083;&#1100;"
	ar[7] = "&#1040;&#1074;&#1075;&#1091;&#1089;&#1090;"
	ar[8] = "&#1057;&#1077;&#1085;&#1090;&#1103;&#1073;&#1088;&#1100;"
	ar[9] = "&#1054;&#1082;&#1090;&#1103;&#1073;&#1088;&#1100;"
	ar[10] = "&#1053;&#1086;&#1103;&#1073;&#1088;&#1100;"
	ar[11] = "&#1044;&#1077;&#1082;&#1072;&#1073;&#1088;&#1100;"
	/*Январь, Февраль, Март, Апрель, Май, Июнь, Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь*/
	return ar[month]
}

function setCal(month1, year1, element, formName, ishod_data, DivName) {
	var year
	var month
	var monthName
	var date
	var days

	var now = new Date()
	if ((year1=='') &&(month1=='')&&(ishod_data!='')){
		year = parseInt(ishod_data.substring(6, 10),10);
		month = parseInt(ishod_data.substring(3, 5),10)-1;
		if ((year >= 0) && (year <= 30))  year+=2000;
		else if ((year > 30) && (year < 100)) year+=1900;
		else year=year; 
	} else {
		if(year1!='') {
			year = year1
		} else {
			year = now.getYear()
			if (year < 1000)  year+=1900
		}
		if(month1!='')  month = month1
		else  month = now.getMonth()
	}	
	monthName = getMonthName(month)
	date = now.getDate()
	now = null
	var firstDayInstance = new Date(year, month, 1)
	var firstDay = firstDayInstance.getDay()-1
	if (firstDay == -1) firstDay = 6
	firstDayInstance = null
	days = getDays(month, year)
	
	drawCal(firstDay + 1, days, date, monthName, month, year, element,formName,ishod_data,DivName)
}

function setStatDate(datetemp, element,DivName){
	element.value=datetemp;
	document.getElementById(DivName).style.visibility='hidden'; 
}

function drawCal(firstDay, lastDate, date, monthName, month, year, element1,formName,ishod_data,DivName) {
    var text_html = ""
    text_html += "<table cellpadding='0px' cellspacing='0px' width='100%' class='d_form' style='margin:0;padding:0' border=0>";
	text_html += "<colgroup span=\"7\"><col width=\"16%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"></colgroup>";
	text_html += "<tr><td colspan='7' style='border:0'>"
	text_html += "<table cellpadding='0'  cellspacing='0' class='d_table' style='margin:0;padding:0'><tr>"
	//------------месяц
	text_html += "<th width='40px'><select name='month_select' "
	text_html += 'onchange="setCal(this.value, document.'+formName+'.year_select.value, '
	text_html +="'"+element1+"'"
	text_html += ', '
	text_html +="'"+formName+"'"
	text_html += ', '
	text_html +="'"+ishod_data+"'"
	text_html += ', '
	text_html +="'"+DivName+"'"
	text_html +=')">'
	for (var i = 0; i <= 11; i++) {
		text_html += "<option value='"+i+"'"
		if (i==parseInt(month,10)) text_html += "selected"
		text_html += ">"+getMonthName(i)+"</option>";
	}
	text_html += "</select></th>"
//---------год--------
	text_html += "<th align='left' width='90%'><select name='year_select' "
	text_html += 'onchange="setCal(document.'+formName+'.month_select.value, this.value,'
	text_html +="'"+element1+"'"
	text_html += ', '
	text_html +="'"+formName+"'"
	text_html += ', '
	text_html +="'"+ishod_data+"'"
	text_html += ', '
	text_html +="'"+DivName+"'"
	text_html +=')">'
	for (var i = 1901; i <= 2050; i++) {
		text_html += "<option value='"+i+"'"
		if (i==parseInt(year,10)) text_html += " selected"
		text_html += ">"+i+"</option>";
	}
	text_html += "</select></th>"
	text_html += "<th align='right'>"
	text_html += '<a style="color:#000000; padding-right:15px; cursor:hand" onclick="'
	text_html += "document.getElementById('"+DivName+"').style.visibility='hidden'; "
	text_html += '"><strong>X</strong></a></th>'
	text_html += "</tr></table></td></tr>";
//--------недели----------
    var weekDay = new Array(7)
    weekDay[0] = "&#1042;&#1089;"
    weekDay[1] = "&#1055;&#1085;"
    weekDay[2] = "&#1042;&#1090;"
    weekDay[3] = "&#1057;&#1088;"
    weekDay[4] = "&#1063;&#1090;"
    weekDay[5] = "&#1055;&#1090;"
    weekDay[6] = "&#1057;&#1073;"
	/*Вс, Пн, Вт, Ср, Чт, Пт, Сб*/
    text_html += "<tr>";
    /*строим недели с понедельника, доп. строкой вписываетм воскр. в конец*/
	for (var dayNum = 1; dayNum < 7; ++dayNum) {
    	text_html += "<td width='20px' align='center' style='border:0;border-bottom: 1px solid #4E90BF; padding-bottom:5px'><strong>" + weekDay[dayNum] + "</strong></td>";
    }	
	text_html += "<td width='20px' align='center' style='border:0;border-bottom: 1px solid #4E90BF; padding-bottom:5px'><strong>" + weekDay[0] + "</strong></td>";

    text_html += "</tr>";
    var digit = 1
    var curCell = 1
    for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
		text_html += "<tr>";
		for (var col = 1; col <= 7; ++col) {
			if (digit > lastDate)
				break  
			if (curCell < firstDay) {
				text_html += "<td width='20px' style='border:0'></td>";
				curCell++
			} else {
				var datetemp = ""
				if (digit<10) datetemp += "0"
				datetemp += digit+'.'
				if ((parseInt(month,10)+1)<10) datetemp += "0"
				datetemp += (parseInt(month,10)+1)+'.'+year;
				text_html += "<td width='20px' align='center' style='border:0'>";
				text_html += "<a "
				if (datetemp == ishod_data) text_html += " style='cursor:pointer;cursor:hand;color:red'"
				else text_html += " style='cursor:pointer;cursor:hand'"
				text_html += 'onclick="setStatDate(';
				text_html += "'" + datetemp +"',"+element1+",'"+DivName+"'";
				text_html +=');">';
				text_html += digit;	
				text_html +='</a></td>';
				digit++;
			}
		}
		text_html += "</tr>";
	}
	text_html += "</table>";
	document.getElementById(DivName).innerHTML=text_html;
}

