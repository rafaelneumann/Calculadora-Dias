// Global variables
var checkBoxCount = 0;
var concomitances = [];

// Colors the title randomly with red and green
function colorMe(who) {
	var colors = new Array("red", "green");
	who.style.color = colors[Math.floor(Math.random()*2)];
}

// Undo the coloring
function decolorMe(who) {
	who.style.color = "black";
}

// Calculates the number of years, months and days between two specific dates
function calcFirstLast(first, last) {
	if (first.length == 8 && last.length == 8) {
		first = first.substring(0, 2) + "/" + first.substring(2, 4) + "/" + first.substring(4, 8);
		last = last.substring(0, 2) + "/" + last.substring(2, 4) + "/" + last.substring(4, 8);
	}
	
	if (first.length == 10 && last.length == 10) {
	dateFirst = first.split('/');
	dateLast = last.split('/');
	} else {
	alert("Data inválida.");
	return;
	}
	
	let dateYear = (dateLast[2]*1) - (dateFirst[2]*1) - 1;
	let dateMonth = (dateLast[1]*1) - (dateFirst[1]*1) + 11;
	let dateDay = (dateLast[0]*1) - (dateFirst[0]*1) + 31;
	
	while (dateDay >= 30) {
	dateDay -= 30;
	dateMonth += 1;
	}
	
	while (dateMonth >= 12) {
	dateMonth -= 12;
	dateYear += 1;
	}
	
	let days = dateDay + (dateMonth * 30) + (dateYear * 365);
	
	if (days < 0) {
	return "-#";
	} else {
	return days + ";" + dateYear + "/" + dateMonth + "/" + dateDay;
	}
}

// Gets years, months and days and calculates only days
function toDays(yearsMonthsDays) {
	let x = yearsMonthsDays.split(';');
	let result = (x[0] * 365) + (x[1] * 30) + (x[2] * 1);
	let result2 = 0;
	if (x[0] > 0 && x[1] == 0 && x[2] == 0) {
	let y = x[0] - 1;
	let m = (x[1] * 1) + 12;
	result2 = (y * 365) + (m * 30) + (x[2] * 1);
	return ("De " + result2 + " a " + result + " dias<br/>Prefira " + result);
	}
	return result;
}

// A number of days to years, months and days
function toDate(days) {
	days *= 1; // ensures it is a number
	if (days > 100000000) {
	alert("Value is too big.\nBypass me, if you can. ;)");
	return "";
	} else if (days == 0) {
	return "0 dias";
	}
	let years = 0;
	let months = 0;
	let text = "";
	while (days/365 >= 1) {
	days -= 365;
	years += 1;
	}
	while (days/30 >= 1) {
	days -= 30;
	months += 1;
	}
	if (months == 12) {
	years += 1;
	months = 0;
	days = 0;
	}
	if (years == 1) {
	text = years + " ano, ";
	} else if (years==0) {
	text = text;
	} else {
	text = years + " anos, ";
	}
	if (months == 1) {
	text = text + months + " mês, ";
	} else if (months == 0) {
	text = text;
	} else {
	text = text + months	+ " meses, ";
	}
	if (days == 1) {
	text = text + days + " dia";
	} else if (days == 0) {
	let len = text.length - 2;
	text = text.substring(0, len);
	} else {
	text = text + days + " dias";
	}
	if (text.lastIndexOf(',') > 0) {
	let lastCommaBefore = text.lastIndexOf(',');
	let lastCommaAfter = text.lastIndexOf(',') + 1;
	let len = text.length;
	text = text.substring(0, lastCommaBefore) + " e" + text.substring(lastCommaAfter, len);
	}
	return text;
}
	
function yearsMonthsDaystoDays() {
	years = document.getElementById('id_yearsMonthsDaysToDays_years').value;
	months = document.getElementById('id_yearsMonthsDaysToDays_months').value;
	days = document.getElementById('id_yearsMonthsDaysToDays_days').value;
	valueToPass = years + ';' + months + ';' + days;
	justDays = toDays(valueToPass);
	document.getElementById('id_yearsMonthsDaysToDays_result').innerHTML = justDays + ' dias';
	return;
}

function daysToYearsMonthsDays() {
	let days = document.getElementById('id_daysToYearsMonthsDays_days').value;
	if (days.indexOf('+', 0) > 0) {
	let a = days.split('+');
	days = 0;
	for (i in a) {
	days += a[i] * 1;
	}
	}
	document.getElementById('id_daysToYearsMonthsDays_days').value = days;
	let result = toDate(days);
	document.getElementById('id_daysToYearsMonthsDays_result').innerHTML = result;
	return false;
}

function sumDaysMonthsYears() {
	document.getElementById('id_sumDaysMonthsYears_separator').style.visibility = "visible";
	
	let alreadyDays = document.getElementById('id_sumDaysMonthsYears_result_days').innerHTML;
	let alreadyMonths = document.getElementById('id_sumDaysMonthsYears_result_months').innerHTML;
	let alreadyYears = document.getElementById('id_sumDaysMonthsYears_result_years').innerHTML;
	let nowYears = document.getElementById('id_sumDaysMonthsYears_years').value;
	let nowMonths = document.getElementById('id_sumDaysMonthsYears_months').value;
	let nowDays = document.getElementById('id_sumDaysMonthsYears_days').value;
	if (nowYears == "") { nowYears = 0; }
	if (nowMonths == "") { nowMonths = 0; }
	if (nowDays == "") { nowDays = 0; }
	let years = ((alreadyYears*1) + (nowYears*1));
	let months = ((alreadyMonths*1) + (nowMonths*1));
	let days = ((alreadyDays*1) + (nowDays*1));
	while (days > 29) {
	days -= 30;
	months += 1;
	}
	while (months > 11) {
	months -= 12;
	years += 1;
	}
	while (days < 0) {
	months -= 1;
	days += 30;
	}
	while (months < 0) {
	years -= 1;
	months += 12;
	}
	document.getElementById('id_sumDaysMonthsYears_result_years').innerHTML = years;
	document.getElementById('id_sumDaysMonthsYears_result_months').innerHTML = months;
	document.getElementById('id_sumDaysMonthsYears_result_days').innerHTML = days;
	
	let tblBody = document.getElementById('id_sumDaysMonthsYears').tBodies[0];
	let newRow = tblBody.insertRow(-1);
	let newCell0 = newRow.insertCell(0);
	let newCell1 = newRow.insertCell(1);
	let newCell2 = newRow.insertCell(2);
	newCell0.align = 'center';
	newCell1.align = 'center';
	newCell2.align = 'center';
	newCell0.appendChild(document.createTextNode(nowYears));
	newCell1.appendChild(document.createTextNode(nowMonths));
	newCell2.appendChild(document.createTextNode(nowDays));
	
	// limpa os campos
	document.getElementById('id_sumDaysMonthsYears_years').value = "";
	document.getElementById('id_sumDaysMonthsYears_months').value = "";
	document.getElementById('id_sumDaysMonthsYears_days').value = "";
	
	document.getElementById('id_sumDaysMonthsYears_years').focus();
	document.getElementById('id_sumDaysMonthsYears_years').select();
	
	return;
}

// Hide or show the main bodies
function changeBottom(id) {
	if (document.getElementById(id).style.display == "inline") {
	document.getElementById(id).style.display = "none"
	} else {
	document.getElementById(id).style.display = "inline"
	}
	return;
}

// keyPress event handler
function keyPress(event, who) {
	if (event.keyCode == 27) {
	hideAll();
	}
	if (event.keyCode == 13)
	{
	if (who == "id_daysToYearsMonthsDays_days") { daysToYearsMonthsDays(); }
	if (who == "div_yearsMonthsDaysToDays") { yearsMonthsDaystoDays(); }
	if (who == "id_fistDateLastDate_form") { getPeriod(); }
	if (who == "id_sumDaysMonthsYears_form") { sumDaysMonthsYears(); }
	}
	return;
}

// Hides all main div bodies
function hideAll() {
	changeBottom('id_yearsMonthsDaysToDays');
	changeBottom('id_daysToYearsMonthsDays');
	changeBottom('id_sumDaysMonthsYears');
	changeBottom('id_fistDateLastDate');
	return;
}

function calcFirstLastINSS(first, last) {
	if (first.length == 8 && last.length == 8) {
	first = first.substring(0, 2) + "/" + first.substring(2, 4) + "/" + first.substring(4, 8);
	last = last.substring(0, 2) + "/" + last.substring(2, 4) + "/" + last.substring(4, 8);
	}
	if (first.length == 10 && last.length == 10) {
	dateFirst = first.split('/');
	dateLast = last.split('/');
	} else {
	alert("Data inválida.");
	return;
	}

	if (dateLast[0] == "31") {
	dateLast[0] = 30;
	} else if (dateLast[0] == "28" && dateLast[1] == "02") {
	dateLast[0] = 30;
	} else if (dateLast[0] == "29" && dateLast[1] == "02") {
	dateLast[0] = 30;
	}

	var dateYear = (dateLast[2]*1) - (dateFirst[2]*1) - 1;
	var dateMonth = (dateLast[1]*1) - (dateFirst[1]*1) + 11;
	var dateDay = (dateLast[0]*1) - (dateFirst[0]*1) + 31;
	
	while (dateDay >= 30) {
	dateDay -= 30;
	dateMonth += 1;
	}
	while (dateMonth >= 12) {
	dateMonth -= 12;
	dateYear += 1;
	}
	
	var returnText = dateYear + " anos, " + dateMonth + " meses e " + dateDay + " dias";
	returnText = returnText.replace("11", "DFgdfgdSFGdfgasdfsdf");
	returnText = returnText.replace("1 anos", "1 ano");
	returnText = returnText.replace("1 meses", "1 mês");
	returnText = returnText.replace("1 dias", "1 dia");
	returnText = returnText.replace("DFgdfgdSFGdfgasdfsdf", "11");
	return returnText;
 
}

// Main function. Calculates the period
function getPeriod() {
	let firstDate = document.getElementById('id_fistDateLastDate_beginning').value;
	let lastDate = document.getElementById('id_fistDateLastDate_ending').value;
	let text = calcFirstLast(firstDate, lastDate);
	if (text == "-#") {
	alert("Data inválida");
	return;
	}
	let returned = text.split(";");
	let returnedCompleteDate = returned[1].split("/");
	let textToWrite = returnedCompleteDate[0] + " anos, " + returnedCompleteDate[1] + " meses e " + returnedCompleteDate[2] + " dias";
	textToWrite = textToWrite.replace("11", "DFgdfgdSFGdfgasdfsdf");
	textToWrite = textToWrite.replace("1 dias", "1 dia");
	textToWrite = textToWrite.replace("1 meses", "1 mês");
	textToWrite = textToWrite.replace("1 anos", "1 ano");
	textToWrite = textToWrite.replace("DFgdfgdSFGdfgasdfsdf", "11");
	
	textToWriteINSS = calcFirstLastINSS(firstDate, lastDate)
	
	if ((firstDate.indexOf('/') == -1) & (lastDate.indexOf('/') == -1)) {
	firstDate = firstDate.substring(0, 2) + "/" + firstDate.substring(2, 4) + "/" + firstDate.substring(4, 8);
	lastDate = lastDate.substring(0, 2) + "/" + lastDate.substring(2, 4) + "/" + lastDate.substring(4, 8);
	}

	let tblBody = document.getElementById('id_fistDateLastDate_table_periods').tBodies[0];
	let newRow = tblBody.insertRow(-1);
	let newCell0 = newRow.insertCell(0);
	let newInput = document.createElement('input');
	newInput.type = 'checkbox';
	newInput.value = returned[0];
	newInput.id = checkBoxCount;
	newInput.checked = 'true';
	newInput.setAttribute("onchange", "checkUncheck();");
	//newInput.setAttribute('checked', 'checked');
	//I can't make it work with IE :|
	
	let lastInput = document.createElement('INPUT');
	lastInput.setAttribute("type", "text");
	lastInput.setAttribute("size", "12");
	
	let newCell1 = newRow.insertCell(1);
	let newCell2 = newRow.insertCell(2);
	let newCell3 = newRow.insertCell(3);
	let newCell4 = newRow.insertCell(4);
	let newCell5 = newRow.insertCell(5);
	let newCell6 = newRow.insertCell(6);
	let newCell7 = newRow.insertCell(7);
	let newCell8 = newRow.insertCell(8);
	let newCell9 = newRow.insertCell(9);

	let datesToWrite = firstDate + "->" + lastDate;

	newCell0.appendChild(newInput);
	newCell1.appendChild(document.createTextNode(datesToWrite));
	newCell2.appendChild(document.createTextNode('|'));
	newCell3.appendChild(document.createTextNode(textToWrite));
	newCell4.appendChild(document.createTextNode('<>'));
	newCell5.appendChild(document.createTextNode(returned[0]));
	newCell6.appendChild(document.createTextNode('|'));
	newCell7.appendChild(document.createTextNode(textToWriteINSS));
	newCell8.appendChild(document.createTextNode('|'));
	newCell9.appendChild(lastInput);

	document.getElementById(checkBoxCount).checked = true;
	checkBoxCount += 1;
	checkUncheck();
	
	document.getElementById('id_fistDateLastDate_beginning').focus();
	document.getElementById('id_fistDateLastDate_beginning').select();

}

// Sum all periods from the dates entered
function checkUncheck() {
	let counter = 0;
	let sumDays = 0;
	let sumDay = 0;
	let sumMonth = 0;
	let sumYear = 0;
	
	while (counter < checkBoxCount) {
	if (document.getElementById(counter).checked) {
	sumDays += parseInt(document.getElementById(counter).value);
	hereDays = parseInt(document.getElementById(counter).value);
	hereMonths = 0;
	hereYears = 0;
	
	while (hereDays/365 >= 1) {
	hereDays -= 365;
	hereYears += 1;
	}
	
	while (hereDays/30 >= 1) {
	hereDays -= 30;
	hereMonths += 1;
	}
	
	if (hereMonths == 12) {
	hereYears += 1;
	hereMonths = 0;
	hereDays = 0;
	}
	
	sumDay += hereDays;
	sumMonth += hereMonths;
	sumYear += hereYears;
	
	while (sumDay/30 >= 1) {
	sumDay -= 30;
	sumMonth += 1;
	}
	while (sumMonth/12 >= 1) {
	sumMonth -= 12;
	sumYear += 1;
	}
	}
	counter += 1;
	}
	 
	let sumDays2 = (sumDay) + (sumMonth*30) + (sumYear*365);
	let textResult = "<table><tr><td class=\"results\">Somando anos, meses e dias: " + sumYear + " anos, " + sumMonth + " meses e " + sumDay + " dias (" + sumDays2 + " dias).<br/>Somando os dias: " + sumDays + " dias.</td></tr></table>";
	textResult = textResult.replace("11", "asdfasdfsdf");
	textResult = textResult.replace("1 anos", "1 ano");
	textResult = textResult.replace("1 meses", "1 mês");
	textResult = textResult.replace("1 dias", "1 dia");
	textResult = textResult.replace("asdfasdfsdf", "11");
	document.getElementById('id_results').innerHTML = textResult;
	
	// check for concomitances
	get_concomitant_periods();
}

// Handles the first-last date calculation (last form)
function tabToNext(e, who) {
	if (who == "id_fistDateLastDate_beginning" && e.keyCode > 35) {
	let checkField = document.getElementById('id_fistDateLastDate_beginning').value;
	if ((checkField.length == 8 && document.getElementById('id_fistDateLastDate_beginning').value.indexOf('/') < 0) || (checkField.length == 10 && document.getElementById('id_fistDateLastDate_beginning').value.indexOf('/') >= 0)) {
	document.getElementById('id_fistDateLastDate_ending').focus();
	document.getElementById('id_fistDateLastDate_ending').select();
	} // double lines -> make it better (later)
	}
	// handles the sum of times (yy-mm-dd) - third form
	else if (who == 'id_sumDaysMonthsYears_years' && e.keyCode > 35) {
	if (document.getElementById('id_sumDaysMonthsYears_years').value.length == 2) {
	document.getElementById('id_sumDaysMonthsYears_months').focus();
	document.getElementById('id_sumDaysMonthsYears_months').select();
	}
	}
	else if (who == 'id_sumDaysMonthsYears_months' && e.keyCode > 35) {
	if (document.getElementById('id_sumDaysMonthsYears_months').value.length == 2) {
	document.getElementById('id_sumDaysMonthsYears_days').focus();
	document.getElementById('id_sumDaysMonthsYears_days').select();
	}
	}
}

// Set focus
function setFocus() {
	document.getElementById('id_fistDateLastDate_beginning').focus();
}

// Selects no one of the inserted periods
function zeroSelection() {
	let c = document.getElementsByTagName('input');
	for(let i = 0; i < c.length; i++){
	if (c[i].getAttribute('type') == 'checkbox') {
	c[i].checked = false;
	}
	}

checkUncheck();
return;
}

// Calculates the period from pasted text
function insertFromText() {
	document.getElementById('direct_input').style = 'display: inline;'
}

// Let the user pass a lot of text and gets the first two
// dates per line to calculate the period
function calculateFromText() {
	document.getElementById('direct_input').style = 'display: none;'
	let wholetxt = document.getElementById('txt_for_direct_input').value;
	
	txt_array = wholetxt.split(/\r?\n/g);

	for (let i = 0; i < txt_array.length; i++) {
	// 2 formats allowed
	let matches1 = txt_array[i].match(/\d{2}\/\d{2}\/\d{4}/g);
	let matches2 = txt_array[i].match(/\d{8}/g);
	
	if (matches1 && matches1.length >= 2) {
	document.getElementById('id_fistDateLastDate_beginning').value = matches1[0];
	document.getElementById('id_fistDateLastDate_ending').value = matches1[1];
	getPeriod();
	}
	
	if (matches2 && matches2.length >= 2) {
	document.getElementById('id_fistDateLastDate_beginning').value = matches2[0];
	document.getElementById('id_fistDateLastDate_ending').value = matches2[1];
	getPeriod();
	}
	}
}

// Look out for concomitant periods
function get_concomitant_periods() {
	let dates = [];
	let ids = [];
	let tds = document.querySelectorAll('td');
	
	for (let i = 0; i < tds.length; i++) {
		let fields = tds[i].innerHTML.split('-&gt;');
		if (fields.length == 2) {
			let this_initial = new Date(fields[0].slice(6), fields[0].slice(3, 5) - 1, fields[0].slice(0, 2));
			let this_final = new Date(fields[1].slice(6), fields[1].slice(3, 5) - 1, fields[1].slice(0, 2));
			dates.push([this_initial, this_final]);
		}
	}
	
	let el = document.getElementById('id_concomitances');
	el.innerHTML = '';
	
	let txt_to_html = '';
	let first = true;
	
	for (let i = 0; i < dates.length; i++) {
	let this_initial = dates[i][0];
	let this_final = dates[i][1];
	let first_found_for_j = true;
	
	for (let j = 0; j < dates.length; j++) {
		if (i == j) {
			continue;
		}
		let checking_initial = dates[j][0];
		let checking_final = dates[j][1];
		
		if ((checking_initial >= this_initial && checking_initial <= this_final) || (checking_final >= this_initial && checking_final <= this_final) || (checking_initial <= this_initial && checking_final >= this_final)) {
			if (first) {
				first = false;
				txt_to_html = "<span><br><b>Concomitâncias:</b><br></span>"
			}
			if (first_found_for_j) {
				txt_to_html += '<span id ="found" onmouseover="highlight_others(event);" onmouseout="dehighlight_others(event);">' + this_initial.ddmmyyyy() + '->' +
				this_final.ddmmyyyy() + ' é concomitante com ' +
				checking_initial.ddmmyyyy() + '->' +
				checking_final.ddmmyyyy();
				first_found_for_j = false;
			} else {
				txt_to_html += ' <i>e com</i> ' +
								checking_initial.ddmmyyyy() + '->' +
								checking_final.ddmmyyyy();
				}
			}
			//el.innerHTML += "</span>";
		}
		txt_to_html += "<br></span>";
	}
    //el.innerHTML += "</span>";
	el.innerHTML += txt_to_html;
	return;
}

function highlight_others(event) {
	txt_array = event.target.innerHTML;
	let matches = txt_array.match(/\d{2}\/\d{2}\/\d{4}-&gt\;\d{2}\/\d{2}\/\d{4}/g);
	for (let i = 0; i < matches.length; i++) {
		highlight(matches[i]);
	}
}

function dehighlight_others(event) {
	let matches = txt_array.match(/\d{2}\/\d{2}\/\d{4}-&gt\;\d{2}\/\d{2}\/\d{4}/g);
	for (let i = 0; i < matches.length; i++) {
		dehighlight(matches[i]);
	}
}

// A new toString method. Returns dd/mm/yyyy.
Date.prototype.ddmmyyyy = function() {
	let mm = this.getMonth() + 1; // getMonth() is zero-based
	let dd = this.getDate();

	return [(dd>9 ? '' : '0') + dd,
	(mm>9 ? '' : '0') + mm,
	this.getFullYear()].join('/');
};

function linedraw(ax, ay, bx, by) {
	if(ay > by) {
		bx = ax + bx;
		ax = bx - ax;
		bx = bx - ax;
		by = ay + by;
		ay = by - ay;
		by = by - ay;
	}
	let calc = Math.atan((ay - by) / (bx - ax));
	calc = calc*180 / Math.PI;
	var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
	document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc	+ "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
}

function highlight(searched_text) {
	let elems = document.querySelectorAll('tr');
	
	for (let i = 0; i < elems.length; i++) {
		let html = elems[i].innerHTML;
		let index = html.indexOf(searched_text);
	
		if (index >= 0) {
			html = html.substring(0, index) + "<span class='highlight'>" + html.substring(index,index+searched_text.length) + "</span>" + html.substring(index + searched_text.length);
			elems[i].setAttribute('class', 'highlight');
		}
	}
}

function dehighlight(searched_text) {
	let elems = document.querySelectorAll('tr');
	
	for (let i = 0; i < elems.length; i++) {
		let html = elems[i].innerHTML;
		let index = html.indexOf(searched_text);
	
		if (index >= 0) {
			html = html.substring(0, index) + "<span>" + html.substring(index,index+searched_text.length) + "</span>" + html.substring(index + searched_text.length);
			elems[i].setAttribute('class', '');
		}
	}
}

