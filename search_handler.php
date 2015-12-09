<?php                                                                                                                     	
	$searchEntry = $_POST['searchWord']; //mysql_real_escape_string($_POST['searchEntry']);			
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
	if(isset($result)){
		while ($row = mysql_fetch_array($result)) {
					
			$smallGif = $row['has_gif'];
			$smallJpg = $row['has_jpg'];
			$partName= $row['Partname'];
			$partID = $row['PartID'];  				
			$itemtypeID = $row['itemtypeID'];
			$colorID = $row['colorID'];	
			print("<div class='legoBoxContainer'>");
			// redirect(this.id) skickar vidare till den specifika sidan
			// displayPartId() visar id om pekaren är över
			// hidePartId() gömmer id igen
			print("<div class='legoBox' id=$partID onclick='redirect(this.id)' onmouseover='displayPartId(this.id)' onmouseout='hidePartId(this.id)'>");
			//print("<p>$smallGif</p>\n");
			//print("<p>$smallJpg</p>\n");
			if ($smallGif == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.gif">'; 
			else if($smallJpg == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.jpg">'; 
			else echo 'No image found.';                      
			print("<p>$partName</p><p class='hiddenPartId'>$partID</p>\n");                           		
			print("</div></div>");
		} // end while 	
	}
	// Det här bör skicka vidare till errorsidan om inga resultat fås
	else{
		echo '<script>goToErrorPage();</script>';
	}
?>