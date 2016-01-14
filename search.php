<!DOCTYPE HTML>   
<html>                                                         
	<head><title>Test lego</title><link href="multiple.css" rel="stylesheet" type="text/css">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="script.js"></script></head>           
	<body onload="blurPreviousButton('previousButton'); blurNextButton('nextButton')">       
	<div class="centerWrapper">
		
		 <!--Huvuddelen av sidan, absolut så den täcker hela sidans höjd-->
		<div class="centerDiv">
			
			<!--Logga i toppen-->
			<div class="logo">
				<div id="imgLogo">	
					<img src="images/logo.jpg" alt="Logotypbild" id="imgLogotyp">
				</div>
				<div class="menuContainer">
					<ul>
						<li><a class="active" href="start.html">Search</a></li>
						<li><a href="help.html">Help</a></li>
						<li><a href="about.html">About</a></li>
					</ul>
				</div>
				<!--Ingen aning om det går att skicka till samma fil-->
				<div class="topSearchBar">
					<form action="search.php" method="post">
						<input id="searchIcon" type="image" src="images/magnify.gif"></input>
						<input class="topSearchBox" placeholder="Search piece" 
						type="text" name="searchWord">
				</div>
			</div>		
			<?php                                                                                                                     
				include('search_handler.php');
			?>
			<div class="buttonDiv">
				<form method="post" action="search.php">
					<input type="hidden" name="hiddenEntry" value="<?php echo htmlspecialchars($search); ?>">
					<input type="hidden" name="offsetValue" value="<?php echo htmlspecialchars($offset); ?>" id="offsetValue">
					<input type="hidden" name="ContentOnNextPage" value="<?php echo htmlspecialchars($contentOnNextPage); ?>" id="contentOnNextPage">
					<input type="submit" name="page" class="pageButton" value="previous" id="previousButton">
					<input type="submit" name="page" class="pageButton" value="next" id="nextButton">
				</form>
			</div>
		</div>
	</div>
	</body>
</html> 