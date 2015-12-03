<!DOCTYPE HTML>
<html>                                                             
	<head><title>Test lego</title><link href="multiple.css" rel="stylesheet" type="text/css">
		<meta charset="utf-8">
		<script src="multiple.js"></script></head>           
	<body>       
	<div class="centerWrapper">
		
		 <!--Huvuddelen av sidan, absolut så den täcker hela sidans höjd-->
			<div class="centerDiv">
			
				<!--Logga i toppen-->
				<div class="logo">
					<h1>LegoWars</h1>
				</div>
					
					
					<!--redirect(this.id) skickar vidare till den specifika sidan-->
					
					<div class="mainContent">
		<?php                                                                                                                    
			// Koppla upp mot databasen                               
			mysql_connect("mysql.itn.liu.se","lego");              
			mysql_select_db("lego");    
			
			$searchEntry = 'Antenna Whip with Flag'; //mysql_real_escape_string($_POST['searchEntry']);
			
			  // Koppla upp mot databasen                               
			mysql_connect("mysql.itn.liu.se","lego");              
			mysql_select_db("lego");                                                                      
			
			// Ställ frågan    
			$result = mysql_query("SELECT parts.Partname, parts.PartID, images.colorID, images.has_gif, images.has_jpg, images.itemtypeID
									FROM parts
									INNER JOIN images
									ON parts.PartID=images.itemID
									WHERE parts.Partname LIKE '%$searchEntry%' 
									OR parts.PartID LIKE '%$searchEntry%';
									");
									
			// Skriv ut alla poster i svaret                          
			while ($row = mysql_fetch_array($result)) {
				
				$smallGif = $row['has_gif'];
				$smallJpg = $row['has_jpg'];
				$partName= $row['Partname'];
				$partID = $row['PartID'];  				
				$itemtypeID = $row['itemtypeID'];
				$colorID = $row['colorID'];	
				print("<div class='legoBox' id=$partID>");
				//print("<p>$smallGif</p>\n");
				//print("<p>$smallJpg</p>\n");
				if ($smallGif == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.gif">'; 
				else if($smallJpg == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.jpg">'; 
				else echo 'No image found.';                      
				print("<p>$partName</p>\n");                           		
				print("</div>");
			} // end while  	
		?>            
			</div></div></div>
	</body>
</html> 