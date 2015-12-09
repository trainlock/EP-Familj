<!DOCTYPE HTML>
<html>                                                             
	<head><title>Test lego</title><link href="multiple.css" rel="stylesheet" type="text/css">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="script.js"></script></head>           
	<body>       
	<div class="centerWrapper">
		
		 <!--Huvuddelen av sidan, absolut så den täcker hela sidans höjd-->
		<div class="centerDiv">
			
			<!--Logga i toppen-->
			<div class="logo">
				<h1>LegoWars</h1>
				<div class="menuContainer">
					<ul>
						<li><a class="active" href="#home">Search</a></li>
						<li><a href="#news">Help</a></li>
						<li><a href="#about">About</a></li>
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
		</div>
	</div>
	</body>
</html> 