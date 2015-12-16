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

function redirect(pieceId, colorID){
	window.location= "single.php?partID=" + pieceId + "&colorID=" + colorID;
}

function focusTextField(){
	var windowWidth = window.innerWidth;
	
	if(windowWidth < 400)
		var textFieldId = 'smallPlaceholder';
	else
		var textFieldId = 'largePlaceholder';
	
	document.getElementById(textFieldId).focus();
}

