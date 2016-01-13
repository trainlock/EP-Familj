<!DOCTYPE html>
<html>
	<head>
		<title>Multiple options</title>
		<link href="multiple.css" rel="stylesheet" type="text/css">
		<meta charset="utf-8">
		<script src="multiple.js"></script>
	</head>
	<body>
		<!--Relativ div för att centrera en absolut-->
		<div class="centerWrapper">
		
		 <!--Huvuddelen av sidan, absolut så den täcker hela sidans höjd-->
			<div class="centerDiv">
			
				<!--Logga i toppen-->
				<div class="logo">
					<h1>LegoWars</h1>
				
					<div class="menuContainer">
						<ul>
							<li><a class="active" href="start.html">Search</a></li>
							<li><a href="help.html">Help</a></li>
							<li><a href="#about">About</a></li>
						</ul>
					</div>
					<!--Sökruta-->
					<div class="topSearchBar">
					<form action="search.php" method="post">
						<input id="searchIcon" type="image" src="images/magnify.gif"></input>
						<input class="topSearchBox" placeholder="Search piece" 
						type="text" name="searchWord">
					</div>
				</div>
				
				<div class="singleContent">

						<?php
							// Koppla upp mot databasen                               
							mysql_connect("mysql.itn.liu.se","lego") or die ("Ooops! Something went wrong :P");              
							mysql_select_db("lego") or die("Error on database connection");    
			
							//SKICKA MED PartID, Partname och den sista snutten på bild URL:n
							$searchEntry = "2569"; //mysql_real_escape_string($_POST['searchEntry']);
							
							$partID = $_GET['partID'];
							$colorID = $_GET['colorID'];
			
							// Koppla upp mot databasen                               
							mysql_connect("mysql.itn.liu.se","lego");              
							mysql_select_db("lego");                                                                      
			
			
							$content = mysql_query("SELECT parts.Partname, parts.PartID,
													images.itemtypeID, images.colorID,
													images.has_gif, images.has_jpg, 
													images.has_largegif, images.has_largejpg,
													colors.Colorname
													FROM parts
														INNER JOIN images
															ON parts.PartID=images.ItemID
														INNER JOIN colors
															ON colors.ColorID=images.ColorID
													WHERE parts.PartID = '$partID'
													AND colors.ColorID = '$colorID'
													LIMIT 1");
													
							print("<div class='singleContent'>");
							
							while ($baby_row = mysql_fetch_array($content)) {
								$partName= $baby_row['Partname'];
								$partID = $baby_row['PartID'];
								
								//Images
								$largeGif = $baby_row['has_largegif'];
								$largeJpg = $baby_row['has_largejpg'];
								$smallGif = $baby_row['has_gif'];
								$smallJpg = $baby_row['has_jpg'];
								$itemtypeID = $baby_row['itemtypeID'];
								$colorID = $baby_row['colorID'];
								$colorName = $baby_row['Colorname'];
								
								print("<h2>$partName</h2>\n");
								
								if ($largeGif == 1) 
									echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, 'L/', $partID, '.gif">'; 
								else if($largeJpg == 1) 
									echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, 'L/', $partID, '.jpg">'; 
								else if ($smallGif == 1) 
									echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.gif">'; 
								else if ($smallJpg == 1) 
									echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.jpg">'; 
								else 
									echo 'No image found.';
								
								print("<p>colorname = $colorName</p>");
								print("<p>partID = $partID</p>");
							}
							
							// Ställ frågan    
							$result = mysql_query("SELECT sets.Setname
													FROM parts
														INNER JOIN inventory
															ON parts.PartID=inventory.ItemID
														INNER JOIN sets
															ON inventory.SetID=sets.SetID
													WHERE parts.PartID = '$partID'
													LIMIT 10;
													");
													

							print('<table id="setTable" border="1">');
							
							print("<tr>
									Color
									</tr>");
							
							print("<th>
									Alla set som finns
									</th>");
							
							// Skriv ut alla poster i svaret                          
							while ($row = mysql_fetch_array($result)) {
								
								$setName = $row["Setname"];
							
								
								print("<tr>
									<td>$setName</td>
									</tr>");
									
							} // end while
							
							print("</table>");
							print("</div>");
						?>
				</div>
			</div>
		</div>
	</body>
</html>