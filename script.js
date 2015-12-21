const textFieldMinWidth = 400;

/* Used code to detect if the user is using a mobile device
http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/ */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}


function showHelpBox(boxId){
	document.getElementById(boxId).style.opacity= "1";
	
	var child= document.getElementById(boxId).children;
	child[0].style.zIndex= "2";
}
function hideHelpBox(boxId){
	document.getElementById(boxId).style.opacity= "0";
	
	var child= document.getElementById(boxId).children;
	child[0].style.zIndex= "0";
}

function goToErrorPage(){
	window.location = "error.html";
}

function redirect(partId, colorID){
	window.location= "single.php?partID=" + partId + "&colorID=" + colorID;
}

function getWindowWidth(){
	var windowWidth = window.innerWidth;
	
	return windowWidth;
}

function focusTextFieldOnLoad(){
	if(!isMobile.any()){
		var windowWidth = getWindowWidth();
		
		if(windowWidth < textFieldMinWidth)
			var textFieldId = 'smallPlaceHolder';
		else
			var textFieldId = 'largePlaceHolder';
		
		focusTextField(textFieldId);
	}
}

function focusTextField(textFieldId){
	document.getElementById(textFieldId).focus();
}

/*-------Mobil, liggande: Flytta fältet så inte tangentbord kommer ivägen----------*/

function centerTextFieldOnMobile(){
	if(isMobile.any()){
		elongateViewport();
		
		var textField = 'formContainer';
		location.hash = textField;
		
		focusTextField('largePlaceHolder');
		
	}
}
function resetTextFieldCentering(){
	if(isMobile.any()){
		var windowWidth = getWindowWidth();
		
		if(windowWidth >= textFieldMinWidth){
			location.hash = "";
			resetViewport();
		}
	}
}

function elongateViewport(){
	var viewport = document.getElementById('viewport');
	
	viewport.setAttribute("content", "width=device-width, initial-scale=1.0, height=600");
}

function resetViewport(){
	var viewport = document.getElementById('viewport');
	
	viewport.setAttribute("content", "width=device-width, initial-scale=1.0");
}

// Inaktivera previousknappen då förstasidan visas

// Kolla offset från gömd input
function checkOffset(){
	var pageOffset = document.getElementById('offsetValue').value;
	
	return pageOffset;
}

function blurButton(buttonID){
	
	var offsetValue = checkOffset();

	if(offsetValue == 0){
		var buttonElement = document.getElementById(buttonID);
		
		// Ändra färg på text
		buttonElement.style.color = "#B3BABD";
		
		// Deaktivera knappen
		buttonElement.disabled = "true";
	}
}

