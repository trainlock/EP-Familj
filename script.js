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

function focusTextField(){
	var windowWidth = window.innerWidth;
	
	if(windowWidth < 400)
		var textFieldId = 'smallPlaceholder';
	else
		var textFieldId = 'largePlaceholder';
	
	document.getElementById(textFieldId).focus();
}

// Inaktivera previousknappen då första sidan visas

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

