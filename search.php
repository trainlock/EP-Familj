<!DOCTYPE HTML>   
<html>                                                         
	<head><title>Search Result</title><link href="multiple.css" rel="stylesheet" type="text/css">
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
					<a href="start.html">
						<img src="images/logo.jpg" alt="Logotypbild" id="imgLogotyp">
					</a>
				</div>
				<div class="menuContainer">
					<ul>
						<li><a class="active" href="start.html">Search</a></li>
						<li><a href="help.html">Help</a></li>
						<li><a href="about.html">About</a></li>
					</ul>
				</div>
				<!-- Ny sökning från sökruta i menyn -->
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
					<!-- Spara sökordet -->
					<input type="hidden" name="hiddenEntry" value="<?php echo htmlspecialchars($search); ?>">
					<!-- Talar om vilken sida med sökresultat som visas -->
					<input type="hidden" name="offsetValue" value="<?php echo htmlspecialchars($offset); ?>" id="offsetValue">
					<!-- Boolean för om det finns innehåll på nästa sida, används i ett javascript -->
					<input type="hidden" name="ContentOnNextPage" value="<?php echo htmlspecialchars($contentOnNextPage); ?>" id="contentOnNextPage">
					<input type="submit" name="page" class="pageButton" value="previous" id="previousButton">
					<input type="submit" name="page" class="pageButton" value="next" id="nextButton">
				</form>
			</div>
		</div>
	</div>
	</body>
</html> 