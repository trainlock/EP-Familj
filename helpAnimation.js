/* Tanken bakom animationen är att skapa en mindre version av hemsidan, 
med andra ord genereras alla element, all text osv. via javascript i den animationsdiv
som finns i help.html. All rörelse är gjord via att sätta intervaller på ett liknande
sätt som den klocka vi gjorde under en av laborationerna, nämligen genom att kalla en funktion upprepade
gånger och för varje gång göra en koll om elementet har nått sin önskade position.
Det finns även en del funktioner för att hantera för små fönsterstorlekar och för att kunna avbryta 
uppspelningen på ett korrekt sätt.
 */



const demoHeight = 400; //px
const demoWidth = 600; //px
const moveMouseAt = 1; //px per ms

const textFieldHelpMessage = "Write your piece's name or id here"
const pauseAtInputFor = 4; //*600ms
var pauseAtInputCounter = 0;
var textFieldHelpMessageCounter = 0;

var animationPlaying = false;

var expandAnimationContainer;
var shrinkAnimationContainer;
var moveMouseToTheRight;
var moveMouseToTheLeft;
var simulateTextFieldInput;

// Inaktivera knapp och starta animering
function playAnimation(){
	var animationButtonID = "startAnimationButton";
	
	disableElement(animationButtonID);
	initiateAnimation();	
}

// Starta animering, sätt intervall
function initiateAnimation(){
	animationPlaying = true;
	expandAnimationContainer = setInterval(displayAnimationContainer, 1);
}


// Expandera containerdiv
function displayAnimationContainer(){
	var containerID = 'animationContainer';

	expandHorizontally(containerID);
	expandVertically(containerID);	
}

// Horizontellt
function expandHorizontally(containerID){
	var container = document.getElementById(containerID);
	
	var containerWidth = getContainerWidth(containerID);
	
	if(containerWidth < demoWidth){
		containerWidth += demoWidth / 100;
	}
	
	container.style.width= containerWidth+ "px"; 
}

// Vertikalt
function expandVertically(containerID){
	var container = document.getElementById(containerID);
	
	var containerHeight = getContainerHeight(containerID);
	
	if(containerHeight < demoHeight){
		containerHeight += demoHeight / 100;
	}
	else{
		displayAnimationContent(containerID)
	}
	
	container.style.height= containerHeight + "px"; 
}

// Hämta aktuell storlek på element
// Bredd
function getContainerWidth(containerID){

	var container = document.getElementById(containerID);

	var containerWidth = container.offsetWidth;
	
	return containerWidth;
}

// Höjd
function getContainerHeight(containerID){
	var container = document.getElementById(containerID);
	
	var containerHeight = container.offsetHeight;
	
	return containerHeight;
}



// Skapa sidans innehåll
function displayAnimationContent(containerID){
	clearInterval(expandAnimationContainer);
	
	var mouseID = "animationMouse";
	var parentDiv = "animationCenterDiv";
	
	
	addBorder(containerID);
	
	scrollToAnimationContainer();
	addAnimationBody(containerID);
	
	changeOriginalButtonFunctionallity();
	
	addCenterDivs();
	
	addLogo();
	
	expandAnimationContainer = setInterval(expandAnimationBody, 1)
	
	addWelcomeText();
	
	addSearchContainer();
	
	addMouse(mouseID, parentDiv);
	
	moveMouseToSearchField();
}

// Scrolla så att animeringen syns
// Sätt hash
function scrollToAnimationContainer(){
	location.hash = "animationContainer";
}

// Återställ hash
function resetHash(){
	location.hash = "";
}

// Lägg till border på container
function addBorder(containerID){
	var container = document.getElementById(containerID);
	
	container.style.border= "1px solid #cccccc";
}

// Lägg till grundlager i form av en div
function addAnimationBody(containerID){
	var divID = "animationBody";
	
	createDiv(divID, containerID);
}

// Ändra "start demo"-knappens värde och funktion
// Kalla funktionerna
function changeOriginalButtonFunctionallity(){
	var buttonID = "startAnimationButton";
	var newValue = "Stop Demo";
	
	var newFunction = "abortAnimation()";
	
	changeButtonValue(buttonID, newValue);
	changeButtonFunctionCall(buttonID, newFunction);
	enableElement(buttonID);
}

// Ändra värde
function changeButtonValue(buttonID, newValue){
	var buttonElement = document.getElementById(buttonID);
	
	textContent = buttonElement.childNodes[0];
	
	buttonElement.removeChild(textContent);
	
	textContent = document.createTextNode(newValue);
	
	buttonElement.appendChild(textContent);
}

// Ändra funktionen som kallas
function changeButtonFunctionCall(buttonID, newFunctionName){
	var buttonElement = document.getElementById(buttonID);
	
	buttonElement.setAttribute("onClick", newFunctionName);
}


// Lägg till centerdivar
// Kalla funktioner
function addCenterDivs(){
	addCenterWrapper();
	addCenterDiv();
}

// Lägg till centerWrapper
function addCenterWrapper(){
	var divID = "animationCenterWrapper";
	var divParentID = "animationBody";
	createDiv(divID, divParentID);
}

// Lägg till centerDiv
function addCenterDiv(){
	var divID = "animationCenterDiv";
	var divParentID = "animationCenterWrapper";
	createDiv(divID, divParentID);
}

// Skapa div
function createDiv(divID, divParentID){
	var childDiv = document.createElement("div");
	var parentDiv = document.getElementById(divParentID);
	
	childDiv.setAttribute("id", divID);
	
	parentDiv.appendChild(childDiv);	
}

// Lägg till område för loggan
function addLogo(){
	var divID = "animationLogo";
	var divParentID = "animationCenterDiv";
	var logotypeID = "animationLogotype";
	
	createDiv(divID, divParentID);
	
	createDiv(logotypeID, divID);
	
	addMenu(divID);
}

// Expandera animationBody
function expandAnimationBody(){
	var divID = "animationBody";
	var divElement = document.getElementById(divID);
	
	var containerWidth = getContainerWidth(divID);
	
	if(containerWidth < 600)
		containerWidth += 6;
	else 
		clearInterval(expandAnimationContainer);
	
	divElement.style.width = containerWidth + "px";
}

// Lägg till h3
function addH3(header, parentID){
	var h3Header = document.createElement("h3");
	var parentDiv = document.getElementById(parentID);
	
	var textContent = document.createTextNode(header);
	
	h3Header.appendChild(textContent);
	
	h3Header.setAttribute("id", "animationH3");
	
	parentDiv.appendChild(h3Header);
}

// Lägg till h4
function addH4(header, parentDiv){
	var h4Header = document.createElement("h4");
	//var parentDiv = document.getElementById(parentID);
	
	var textContent = document.createTextNode(header);
	
	h4Header.appendChild(textContent);
	
	h4Header.setAttribute("id", "animationH4");
	
	parentDiv.appendChild(h4Header);
}

// Lägg till menyn i toppen
// Kalla funktioner
function addMenu(parentID){
	var menuContainerID = "animationMenuContainer";
	var menuListID = "animationMenuList";
	
	addMenuContainer(menuContainerID, parentID);
	
	createList(menuListID, menuContainerID);
}

// Lägg till menycontainer
function addMenuContainer(divID, parentID){
	createDiv(divID, parentID);
}

// Skapa lista
// Kalla funktioner
function createList(menuListID, menuContainerID){
	var li1 = "Search";
	var li2 = "Help";
	var li3 = "About";
	var liClass = "animationMenu";
	
	createUl(menuListID, menuContainerID);
	var sendLi;
	
	for(var i = 1; i < 4; i++){
		if(i == 1)
			sendLi = li1;
		else if(i == 2)
			sendLi = li2;
		else
			sendLi = li3;

		createLi(sendLi, menuListID, liClass, i);
	}

}

// Skapa listan
function createUl(divID, parentID){
	var list = document.createElement("ul");
	var parentDiv = document.getElementById(parentID);
	
	list.setAttribute("id", divID);
	
	parentDiv.appendChild(list);
}

// Lägg till poster
function createLi(li, menuListID, liClass, liIDNumber){
	var post = document.createElement("li");
	var parentDiv = document.getElementById(menuListID);
	
	var liID = "animationLi" + liIDNumber;
	
	var textContent = document.createTextNode(li);
	
	post.appendChild(textContent);
	
	post.setAttribute("class", liClass);
	post.setAttribute("id", liID);
	
	parentDiv.appendChild(post);
}

// Lägg till textdiv på förstasidan
function addWelcomeText(){
	var divID = "animationTextContainer";
	var parentID = "animationCenterDiv";
	
	var textContent = "Welcome! Search for a lego part.";
	
	createDiv(divID, parentID);
	
	addP(textContent, divID);
}

// Lägg till text
function addP(textToWrite, parentID){
	var parentDiv = document.getElementById(parentID);
	
	var textContent = document.createTextNode(textToWrite);
	
	parentDiv.appendChild(textContent);
}

// Lägg till sökcontainer
// Kalla funktioner
function addSearchContainer(){
	var divID = "animationSearchContainer";
	var parentDiv = "animationCenterDiv";
	
	var inputFieldID = "animationInputField";
	var searchButtonID = "animationSearchButton";
	var helpIconID = "animationHelpIcon";
	
	var placeHolder = "Search piece name or id";
	
	createDiv(divID, parentDiv);
	
	addSearchField(inputFieldID, divID, placeHolder);
	
	addSearchButton(searchButtonID, divID);
	
	addHelpIcon(helpIconID, divID);
}

// Lägg till sökfältet
function addSearchField(fieldID, parentID, placeHolder){
	var field = document.createElement("input");
	var parentDiv = document.getElementById(parentID);
	
	field.setAttribute("id", fieldID);
	field.setAttribute("placeholder", placeHolder);
	
	parentDiv.appendChild(field);
	
	disableElement(fieldID);
}

// Lägg till submitknappen
function addSearchButton(buttonID, parentID){
	var searchButton = document.createElement("BUTTON");
	var parentDiv = document.getElementById(parentID);
	
	var buttonText = document.createTextNode("Search");

	searchButton.setAttribute("id", buttonID);
	
	searchButton.appendChild(buttonText);
	
	parentDiv.appendChild(searchButton);
	
	disableElement(buttonID);
}

// Lägg till hjälpikonen
function addHelpIcon(iconID, parentID){
	var textContent = "?";
	
	createDiv(iconID, parentID);
	
	addP(textContent, iconID);
}

// Lägg till muspekare
function addMouse(mouseID, parentID){
	createDiv(mouseID, parentID);
}


// Inaktivera ett element
function disableElement(elementID){
	var elementObject = document.getElementById(elementID);
	
	elementObject.disabled = true;
}

// Aktivera ett element
function enableElement(elementID){
	var elementObject = document.getElementById(elementID);
	
	elementObject.disabled = false;
}


// Flytta muspekaren
// Sätt intervall
function moveMouseToSearchField(){
	moveMouseToTheRight = setInterval(moveMouseToForm, 5);
}

// Flytta horisontellt
function moveMouseToForm(){
	var mouseID = "animationMouse";
	
	moveMouseHorizontally(mouseID);
}

// Kalla funktioner
function moveMouseHorizontally(mouseID){
	moveMouseRight(mouseID);
}

// Flytta åt höger
function moveMouseRight(mouseID){
	var mouse = document.getElementById(mouseID);
	
	moveMouseDown(mouseID);
	
	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft < 0.65 * demoWidth){
		
		offsetLeft += moveMouseAt;
		
		mouse.style.left= offsetLeft + "px";
	}
	else{
		clearInterval(moveMouseToTheRight);
		moveMouseToTheLeft = setInterval(moveMouseLeft, 5);
	}
}

// Flytta åt vänster
function moveMouseLeft(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	moveMouseUp(mouseID);

	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft > 0.4 * demoWidth){
		
		offsetLeft -= moveMouseAt;
		mouse.style.left= offsetLeft + "px";
	}
	else{
		clearInterval(moveMouseToTheLeft);
		simulateTextFieldInput = setInterval(simulateInputCursor, 600);
	}
	
}


// Hämta offsetavstånd
// Hämta avstånd från vänster
function getOffsetLeft(elementID){
	var elementObject = document.getElementById(elementID);
	
	var offsetLeft = elementObject.offsetLeft;
	
	return offsetLeft;
}

// Hämta avstånd från toppen
function getOffsetTop(elementID){
	var elementObject = document.getElementById(elementID);
	
	var offsetTop = elementObject.offsetTop;
	
	return offsetTop;
}

// Flytta nedåt
function moveMouseDown(mouseID){
	var mouse = document.getElementById(mouseID);
	
	var offsetTop = getOffsetTop(mouseID);
	
	if(offsetTop < 309){
		offsetTop += moveMouseAt;
		
		mouse.style.top= offsetTop + "px";
	}
}

// Flytta uppåt
function moveMouseUp(mouseID){
	var mouse = document.getElementById(mouseID);
	
	var offsetTop = getOffsetTop(mouseID);
	
	if(offsetTop > 157){
		offsetTop -= moveMouseAt;
		
		mouse.style.top= offsetTop + "px";
	}
}


// Simulera linkande inputpekare
function simulateInputCursor(){
	var textFieldID = "animationInputField";
	var textField = document.getElementById(textFieldID);
	
	var fieldValue = getValue(textFieldID);
	
	if(fieldValue == " " || fieldValue == ""){
		fieldValue = "|";
	}
	else if(fieldValue == "|"){
		fieldValue = " ";
	}
	
	textField.value = fieldValue;
	
	if(pauseAtInputCounter == 0)
		moveMouseToTheRight = setInterval(moveMouseOutOfTextField, 1);
	
	else if(pauseAtInputCounter == pauseAtInputFor){
		clearInterval(simulateTextFieldInput);
		simulateTextFieldInput = setInterval(simulateInput, 100);
	}
	++pauseAtInputCounter;
}

// Hämta ett elements värde 
function getValue(elementID){
	var elementObject = document.getElementById(elementID);
	
	var value = elementObject.value;
	
	return value;
}

// Flytta ut muspekare från sökfält
function moveMouseOutOfTextField(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft < 0.5 * demoWidth){
		offsetLeft += moveMouseAt;
		mouse.style.left = offsetLeft + "px";
	}
	else{
		clearInterval(moveMouseToTheRight);
	}
}


// Simulera input
// Skriv text
function simulateInput(){
	var textFieldID = "animationInputField";
	var textField = document.getElementById(textFieldID);
	
	var value;
	
	if(textFieldHelpMessageCounter == textFieldHelpMessage.length){
		clearInterval(simulateTextFieldInput);
		pauseAtInputCounter = 1;
		simulateTextFieldInput = setInterval(simulateInputCursorWithText, 600);
	}
	else{
		value = textFieldHelpMessage.substr(0, textFieldHelpMessageCounter + 1) + "|";
		
		textField.value = value;
		
		++textFieldHelpMessageCounter;
	}
}

// Simulera blinkande inputpekare med text
function simulateInputCursorWithText(){
	var textFieldID = "animationInputField";
	var textField = document.getElementById(textFieldID);
	
	var fieldValue = getValue(textFieldID);
	var valueLength = fieldValue.length;
	
	if(fieldValue[valueLength - 1] == ""){
		fieldValue = textFieldHelpMessage + "|";
	}
	else if(fieldValue[valueLength - 1] == "|"){
		fieldValue = textFieldHelpMessage;
	}
	
	textField.value = fieldValue;
	
	
	if(pauseAtInputCounter == pauseAtInputFor){
		clearInterval(simulateTextFieldInput);
		moveMouseToSearchButton();
	}
	
	++pauseAtInputCounter;
}

// Flytta mus till sökknapp
// Sätt intervall
function moveMouseToSearchButton(){
	moveMouseToTheLeft = setInterval(moveMouseLeftTowardSearchButton, 5);
}

// Flytta vänster
function moveMouseLeftTowardSearchButton(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	moveMouseDownToSearchButton(mouseID);

	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft > 0.37 * demoWidth){
		
		offsetLeft -= moveMouseAt;
		mouse.style.left= offsetLeft + "px";
	}
}

// Flytta nedåt
function moveMouseDownToSearchButton(mouseID){
	var mouse = document.getElementById(mouseID);
	
	var offsetTop = getOffsetTop(mouseID);
	if(offsetTop < 209){
		offsetTop += moveMouseAt;
		
		mouse.style.top= offsetTop + "px";
	}
	else{
		clearInterval(moveMouseToTheLeft);
		moveMouseToTheLeft = setInterval(moveMouseLeftToSearchButton, 5);
	}
}

// Flytta vänster
function moveMouseLeftToSearchButton(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	moveMouseUpToSearchButton(mouseID);

	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft > 0.36 * demoWidth){
		
		offsetLeft -= moveMouseAt;
		mouse.style.left= offsetLeft + "px";
	}
	else{
		clearInterval(moveMouseToTheLeft);
		simulateButtonPressDown();
	}
}

// Flytta uppåt
function moveMouseUpToSearchButton(mouseID){
	var mouse = document.getElementById(mouseID);
	
	var offsetTop = getOffsetTop(mouseID);
	
	if(offsetTop > 178){
		offsetTop -= moveMouseAt;
		
		mouse.style.top= offsetTop + "px";
	}
}


// Simulera knapptryck
// Tryck ner
function simulateButtonPressDown(){
	var buttonID = "animationSearchButton";
	var buttonElement = document.getElementById(buttonID);
	
	buttonElement.style.transform= "scale(0.95)";
	
	changeButtonBackgroundColor(buttonID, "press");
	setTimeout(simulateButtonPressUp, 500);
}

// Återställ knapp
function simulateButtonPressUp(){
	var buttonID = "animationSearchButton";
	var buttonElement = document.getElementById(buttonID);
	
	buttonElement.style.transform= "scale(1)";
	
	changeButtonBackgroundColor(buttonID, "");
	
	changeViewToSearchPage();
}

// Ändra knappens bakgrundsfärg
function changeButtonBackgroundColor(buttonID, action){
	var buttonElement = document.getElementById(buttonID);
	
	var background;
	
	if(action == "press")
		background = "#B3D2F5";
	else
		background = "#C8DEF7"
	
	
	buttonElement.style.backgroundColor = background;
}

// Ta bort förstasidan, gå till sökresultatet
// Kalla functioner
function changeViewToSearchPage(){
	var parentID = "animationCenterDiv";
	
	removeWelcomeText(parentID);
	removeSearchContainer(parentID);
	
	addTopSearchBar();
	
	addSearchResults(parentID);
	
	setTimeout(moveMouseAmongSearchResults, 2000);
}

// Ta bort sökcontainer
function removeSearchContainer(parentID){
	var searchContainerID = "animationSearchContainer";
	var container = document.getElementById(searchContainerID);
	
	var parentElement = document.getElementById(parentID);
	
	parentElement.removeChild(container);
}

// Ta bort textcontainer
function removeWelcomeText(parentID){
	var welcomeTextID = "animationTextContainer";
	var container = document.getElementById(welcomeTextID);
	
	var parentElement = document.getElementById(parentID);
	
	parentElement.removeChild(container);
}

// Lägg till sökfält i toppen
// Kalla functioner
function addTopSearchBar(){
	var topSearchDivID = "animationTopSearchBar";
	var logoID = "animationLogo";
	
	var fieldID = "animationTopSearchField";
	var fieldPlaceHolder = "Search piece";
	
	createDiv(topSearchDivID, logoID);
	
	addSearchField(fieldID, topSearchDivID, fieldPlaceHolder);
	
	addSearchMagnifyingGlass(topSearchDivID);
}

// Lägg till förstoringsglas till toppfältet
function addSearchMagnifyingGlass(parentID){
	var elementID = "animationTopMagnifyDiv";
	var input = document.createElement("input");
	
	var parentDiv = document.getElementById(parentID);
	
	input.setAttribute("id", elementID);
	input.setAttribute("type", "image");
	input.setAttribute("src", "images/animation/magnify_small.gif");
	
	parentDiv.appendChild(input);
	
	disableElement(elementID);
}

// Lägg till sökresultat
function addSearchResults(parentID){
	var searchResultContainerID = "animationLegoBoxContainer";
	var searchResultID = "animationLegoBox";
	
	var searchResultNameText = "Antenna Whip 8H";
	var searchResultIDText = "Part-ID: 2569";
	
	createDiv(searchResultContainerID, parentID);
	createDiv(searchResultID, searchResultContainerID);
	
	addResultPicture(searchResultID);
	
	addResultText(searchResultNameText, searchResultID, "none");
	addResultText(searchResultIDText, searchResultID, "none");
}

// Lägg till bild
function addResultPicture(parentID){
	var pictureNode = document.createElement("img");
	var parentElement = document.getElementById(parentID);
	
	var picturePath = "images/animation/2569_small.gif";
	
	pictureNode.setAttribute("src", picturePath);
	
	parentElement.appendChild(pictureNode);
}

// Lägg till namn och id på sökresultat
function addResultText(textToWrite, parentID, className){
	var pElement = document.createElement("p");
	var parentElement = document.getElementById(parentID);
	
	var textContent = document.createTextNode(textToWrite);
	
	if(className != "none")
		pElement.setAttribute("class", className);
	
	pElement.appendChild(textContent);
	
	parentElement.appendChild(pElement);
}


// Flytta muspekare till sökresultat
// Sätt intervall
function moveMouseAmongSearchResults(){
	moveMouseToTheLeft = setInterval(moveMouseToSearchResult, 5);
}

// Flytta vänster
function moveMouseToSearchResult(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	var offsetLeft = getOffsetLeft(mouseID);
	
	if(offsetLeft > 0.19 * demoWidth){
		offsetLeft -= moveMouseAt;
		mouse.style.left = offsetLeft + "px";
	}
	else{
		clearInterval(moveMouseToTheLeft);
		expandSearchResultBox();
	}
}


// Förstora resultat då pekaren är över det
function expandSearchResultBox(){
	var boxID = "animationLegoBox";
	var box = document.getElementById(boxID);
	
	box.style.transform = "scale(1.3)";
	
	setTimeout(simulateClickOnSearchResultDown, 1000);
}

// Simulera klick
// Förminska div
function simulateClickOnSearchResultDown(){
	var boxID = "animationLegoBox";
	var box = document.getElementById(boxID);
	
	box.style.transform = "scale(1.25)";
	
	setTimeout(simulateClickOnSearchResultUp, 300);
}

// förstora div
function simulateClickOnSearchResultUp(){
	var boxID = "animationLegoBox";
	var box = document.getElementById(boxID);
	
	box.style.transform = "scale(1.3)";
	
	setTimeout(changeViewToSingleSearchResult, 200);
}


// Ändra till singlesidan
// Kalla funktioner
function changeViewToSingleSearchResult(){
	var centerDivID = "animationCenterDiv";
	var h3Text = "Antenna Whip 8H";
	var colorNameText = "Colorname: Yellow";
	
	var className = "animationSinglePageText";
	
	removeAnimationLegoBox(centerDivID);
	
	addH3(h3Text, centerDivID);
	addSinglePagePicture(centerDivID);
	addSets(centerDivID);
	
	setTimeout(resetAnimation, 5000);
}

// Ta bort sökresultat
function removeAnimationLegoBox(parentID){
	var centerDiv = document.getElementById(parentID);
	
	var legoBoxContainerID = "animationLegoBoxContainer";
	var legoBox = document.getElementById(legoBoxContainerID);
	
	centerDiv.removeChild(legoBox);
}

// Lägg till stor bild
function addSinglePagePicture(parentID){
	var pictureID = "singlePageImg";
	
	var pictureNode = document.createElement("img");
	var parentElement = document.getElementById(parentID);
	
	var picturePath = "images/animation/2569.gif";
	
	pictureNode.setAttribute("id", pictureID);
	
	pictureNode.setAttribute("src", picturePath);
	
	parentElement.appendChild(pictureNode);
}

// Lägg till set som biten finns i
function addSets(parentID){
	var tableID = createTable(parentID);
	
	createTableContent(tableID);
}

// Skapa tabell
function createTable(parentID){
	var tableID = "animationSinglePageTable";
	
	var table = document.createElement("table");
	var parentElement = document.getElementById(parentID);
	
	table.setAttribute("id", tableID);
	
	parentElement.appendChild(table);
	
	return tableID;
}

// Lägg till tabellinnehåll
function createTableContent(parentID){
	var IDContent = "ID|2569";
	var colorContent = "Color|Yellow";
	var setNames = "Sets|• Death Star II - UCS|• Hot Rod|• City Airport -- Full Size Image Box|• Death Star|• Shuttle Adventure|• Speed Patroller|• Steven Spielberg Moviemaker Set|• Mobile Satellite Up-Link|• 2-Pilot Craft|";
	
	var setsSent = false;
	
	var singlePageTextContent = [IDContent, colorContent, setNames];
	
	var className = "animationSinglePageText";
	
	for(var i = 0; i < singlePageTextContent.length; i++){
			createTableRow(singlePageTextContent[i], parentID, className, setsSent);
			if(i == singlePageTextContent.length - 2){
				setsSent = true;
			}
	}
}

// Lägg till de individuella cellernas innehåll
function createTableRow(textToWrite, parentID, className, setsSent){
	var header = getTdHeader(textToWrite);
	textToWrite = getTextToWrite(textToWrite);

	var tableRow = document.createElement("tr");
	var tableRowContent = document.createElement("td");
	var textNode = document.createTextNode(textToWrite);
	var parentElement = document.getElementById(parentID);
	
	addH4(header, tableRowContent);
	
	tableRowContent.setAttribute("class", className);
	if(!setsSent){
		tableRowContent.appendChild(textNode);
	}
	else{
		var setArray = getSetArray(textToWrite);
		elementObject = convertArrayToTextNode(setArray);
		tableRowContent.appendChild(elementObject);
	}
	tableRow.appendChild(tableRowContent);
	parentElement.appendChild(tableRow);
}

// Separera sträng efter rubrik och vanlig text
// Hämta rubrik
function getTdHeader(inText){
	var counter = 0;
	while(inText[counter] != "|"){
		++counter;
	}
	
	var header = inText.substr(0, counter);
	
	return header;
}

// Hämta brödtext
function getTextToWrite(inText){
	var counter = 0;
	while(inText[counter] != "|"){
		++counter;
	}

	var textToWrite = inText.substr(counter + 1, inText.length);
	
	return textToWrite;
}

// Skapa array av brödtext
function getSetArray(inText){
	
	var setArray = inText.split("|");
	
	return setArray;
}

// Skriv ut medradbrytningar
function convertArrayToTextNode(setArray){
	var elementObject = document.createElement("div");
	
	for(var i = 0; i < setArray.length; i++){
		elementObject.appendChild(document.createTextNode(setArray[i]));
		elementObject.appendChild( document.createElement("br"));
	}
	
	return elementObject;
}


// Återställ animering
// Kalla funktioner
function resetAnimation(){
	var logoID = "animationLogo";
	var centerDivID = "animationCenterDiv";
	var buttonID = "startAnimationButton";
	
	disableElement(buttonID);
	
	resetCursorPosition();
	removeTopMenu(logoID);
	removeTopSearchBar(logoID);
	removeCursor(centerDivID);
	shrinkAnimationContainer = setInterval(shrinkAnimationBody, 1);
}

// Flytta tillbaka muspekaren till dess ursprungliga position
function resetCursorPosition(){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	mouse.style.top = 268 + "px";
	mouse.style.left = 350 + "px";	
}

// Ta bort toppmeny
function removeTopMenu(parentID){
	var menuID = "animationMenuContainer";
	var menuContainer = document.getElementById(menuID);
	
	var logo = document.getElementById(parentID);
	
	logo.removeChild(menuContainer);
}

// Ta bort sökfält i toppen
function removeTopSearchBar(parentID){
	var barID = "animationTopSearchBar";
	var container = document.getElementById(barID);
	
	var logo = document.getElementById(parentID);
	
	logo.removeChild(container);
}

// Ta bort innehåll i loggan
function removeLogoContent(){
	var logoID = "animationLogo";
	var logo = document.getElementById(logoID); 
	
	var childNodes = logo.childNodes;
	
	for(var i = 1; i < childNodes.length; i++){
		logo.removeChild(childNodes[i]);
	}
	
}

// Ta bort muspekaren
function removeCursor(parentID){
	var mouseID = "animationMouse";
	var mouse = document.getElementById(mouseID);
	
	var parentDiv = document.getElementById(parentID);
	
	parentDiv.removeChild(mouse);
}


// Förminska bakgrunden
function shrinkAnimationBody(){
	var divID = "animationBody";
	var divElement = document.getElementById(divID);
	
	var containerWidth = getContainerWidth(divID);
	
	if(containerWidth > 2)
		containerWidth -= 6;
	else{
		clearInterval(shrinkAnimationContainer);
		removeAnimationBody();
		shrinkAnimationContainer = setInterval(shrinkContainer, 1);
	}
	
	divElement.style.width = containerWidth + "px";
}

// Ta bort bakgrund
function removeAnimationBody(){
	var divID = "animationBody";
	var animationBody = document.getElementById(divID);
	
	var parentID = "animationContainer";
	var parentElement = document.getElementById(parentID);
	
	parentElement.removeChild(animationBody); 
}


// Förminska animeringscontainer
// Kalla funktioner
function shrinkContainer(){
	var containerID = "animationContainer";
	
	shrinkHorizontally(containerID);
	shrinkVertically(containerID);
}

// Förminska horisontellt
function shrinkHorizontally(containerID){
	var container = document.getElementById(containerID);
	
	var containerWidth = getContainerWidth(containerID);
	
	if(containerWidth > demoWidth / 100){
		containerWidth -= demoWidth / 100;
	}
	
	container.style.width= containerWidth + "px"; 
}

// Förminska vertikalt
function shrinkVertically(containerID){
	var buttonID = "startAnimationButton";
	
	var container = document.getElementById(containerID);
	
	var containerHeight = getContainerHeight(containerID);
	
	if(containerHeight > demoHeight / 100){
		containerHeight -= demoHeight / 100;
	}
	else{
		clearInterval(shrinkAnimationContainer);
		finalizeReset(buttonID, containerID);
	}
	
	container.style.height= containerHeight + "px"; 
}

// Slutför återställning
// Kalla funktioner
function finalizeReset(buttonID, containerID){
	var newButtonValue = "Start Demo";
	var newFunctionName = "playAnimation()";
	
	changeButtonValue(buttonID, newButtonValue);
	changeButtonFunctionCall(buttonID, newFunctionName);
	setContainerSizeToZero(containerID);
	resetGlobalVariables();
	resetHash();
	
	enableElement(buttonID);
	animationPlaying = false;
}

// Tvinga containerns storlek till 0x0 px
function setContainerSizeToZero(containerID){
	var container = document.getElementById(containerID);
	
	container.style.border = "none";
	container.style.height = "0px";
	container.style.width = "0px";
}

// Återställ globala variabler
function resetGlobalVariables(){
	pauseAtInputCounter = 0;
	textFieldHelpMessageCounter = 0;
}


// Avbryt animationBody
// Kalla funktioner
function abortAnimation(){
	clearIntervals();
	
	var buttonID = "startAnimationButton";
	var containerID = "animationContainer";
	
	removeAnimationBody();
	
	finalizeReset(buttonID, containerID);
}

// Återställ intervaller
function clearIntervals(){
	clearInterval(expandAnimationContainer);
	clearInterval(shrinkAnimationContainer);
	clearInterval(moveMouseToTheRight);
	clearInterval(moveMouseToTheLeft);
	clearInterval(simulateTextFieldInput);
}


// Kontrollera så att fönstret inte är för litet för animeringen
// Upprepas varje 0.5 sekunder
function determineIfAnimationPlayable(){
	var windowSizeWarningID = "windowTooSmallWarning";
	var buttonID = "startAnimationButton";
	
	if(isMobile.any()){
		showWindowSizeWarning(windowSizeWarningID);
	}
	else{
		
		var windowWidth = getWindowWidth();
		var windowSizeWarningVisible = elementVisible(windowSizeWarningID);
		var animationButtonDisabled = checkIfElementDisabled(buttonID);
		
		if(windowWidth < demoWidth + 50){
			
			if(animationPlaying)
				abortAnimation();
			
			if(!windowSizeWarningVisible)
				showWindowSizeWarning(windowSizeWarningID);
			
			if(!animationButtonDisabled)
				disableElement(buttonID);
		}
		else{
			if(windowSizeWarningVisible)
				hideWindowSizeWarning(windowSizeWarningID);
			if(animationButtonDisabled && !animationPlaying)
				enableElement(buttonID);
		}
		
		var repeatCheckIn = setTimeout(determineIfAnimationPlayable, 500);
	}
}


// Hämta webbläsarens bredd
function getWindowWidth(){
	var windowWidth = window.innerWidth;
	
	return windowWidth;
}

// Kolla om element är synligt
function elementVisible(elementID){
	var elementObject = document.getElementById(elementID);
	
	var opacity = window.getComputedStyle(elementObject).opacity;
	
	if(opacity != 0)
		return true;
	else 
		return false;
}

// Sätt opacitet till 1
function showWindowSizeWarning(elementID){
	var elementObject = document.getElementById(elementID);
	
	elementObject.style.opacity = "1";
}

// Sätt opacitet till 0
function hideWindowSizeWarning(elementID){
	var elementObject = document.getElementById(elementID);
	
	elementObject.style.opacity = "0";
}

// Kolla om element är inaktiverat
function checkIfElementDisabled(elementID){
	var elementObject = document.getElementById(elementID);
	
	return elementObject.disabled;
}





