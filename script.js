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

// Visar pratbubblar om pekaren är över hjälpikonen
function showHelpBox(boxId){
	document.getElementById(boxId).style.opacity= "1";
	
	var child= document.getElementById(boxId).children;
	child[0].style.zIndex= "2";
}

// Gömmer pratbubblan igen när pekaren flyttas
function hideHelpBox(boxId){
	document.getElementById(boxId).style.opacity= "0";
	
	var child= document.getElementById(boxId).children;
	child[0].style.zIndex= "0";
}

// Gå vidare till errorsidan
function goToErrorPage(){
	window.location = "error.html";
}

// Gå vidare till enskillt resultat
function redirect(partId, colorID){
	window.location= "single.php?partID=" + partId + "&colorID=" + colorID;
}

// Hämta webbläsarens bredd
function getWindowWidth(){
	var windowWidth = window.innerWidth;
	
	return windowWidth;
}

// Ladda sidan med fokus på sökfältet
// Väljer rätt fält
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

// Fokuserar på valt sökfält
function focusTextField(textFieldId){
	document.getElementById(textFieldId).focus();
}

/*-------Mobil, liggande: Flytta sökfältet så inte tangentbord kommer ivägen----------*/

function centerTextFieldOnMobile(){
	if(isMobile.any()){
		elongateViewport();
		
		var textField = 'formContainer';
		location.hash = textField;
		
		focusTextField('largePlaceHolder');
		
	}
}

// Scrolla till sökfält
function resetTextFieldCentering(){
	if(isMobile.any()){
		var windowWidth = getWindowWidth();
		
		if(windowWidth >= textFieldMinWidth){
			location.hash = "";
			resetViewport();
		}
	}
}

// Skriv över meta-widthtaggen för att scroll ska vara möjlig
function elongateViewport(){
	var viewport = document.getElementById('viewport');
	
	viewport.setAttribute("content", "width=device-width, initial-scale=1.0, height=600");
}

// Återställ meta-widthtaggen till det ursprungliga värdet
function resetViewport(){
	var viewport = document.getElementById('viewport');
	
	viewport.setAttribute("content", "width=device-width, initial-scale=1.0");
}

/* --------- Inaktivera previous- och nextknapparna då förstasidan visas resp. då nästa sida är tom -------- */

// Kolla offset från gömd input
function checkOffset(){
	var pageOffset = document.getElementById('offsetValue').value;
	
	return pageOffset;
}

// Kolla om innehåll på nästa sida finns (gömd input)
function checkContentNextPage(){
	var contentOnPage = document.getElementById('contentOnNextPage').value;

	if(contentOnPage == 'false')
		return false;
	
	return true;
}

// Inaktivera previousknapp
function blurPreviousButton(buttonID){
	
	var offsetValue = checkOffset();

	if(offsetValue == 0)
		blurButton(buttonID);
}

// Inaktivera nextknapp
function blurNextButton(buttonID){
	
	var contentOnPage = checkContentNextPage();
	
	if(!contentOnPage)
		blurButton(buttonID);
	
	
}

// Deaktivera knappen
function blurButton(buttonID){
	var buttonElement = document.getElementById(buttonID);
		
	buttonElement.disabled = "true";
}

// Förhindrar och varnar om tom sökning
function checkSearchFieldValue(largeFieldID, smallFieldID, emptyWarningID){
	
	var largeFieldValue = document.getElementById(largeFieldID).value;
	var smallFieldValue = document.getElementById(smallFieldID).value;
	var warningDiv = document.getElementById(emptyWarningID);
	
	if(largeFieldValue == ""){
		if(smallFieldValue == ""){
			// Visa varning
			warningDiv.style.opacity = "1";
			
			return false;
		}
	}
}

// Kolla hash på helpsida
// För att scrolla ned till animation även om sidan laddas om med hashen i URL
function checkURL(){
	var URLHash = window.location.hash;
	
	if(URLHash != ""){
		window.location = "help.html";
	}
}