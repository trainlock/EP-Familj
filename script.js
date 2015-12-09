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

function redirect(pieceId){
	window.location= "PLACEHOLDER/pieces.php?partId=" + pieceId;
}

function displayPartId(boxId){
	var child= document.getElementById(boxId).children;
	// om <span> i <p>
	/*var grandChild= child[1].children;
	grandChild[0].className= "visiblePartId";*/
	child[2].className = "visiblePartId";
}
function hidePartId(boxId){
	var child= document.getElementById(boxId).children;
	/*var grandChild= child[1].children;
	grandChild[0].className= "hiddenPartId";*/
	child[2].className = "hiddenPartId";
}