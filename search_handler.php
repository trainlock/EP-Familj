<?php                 
	$searchEntry = $_POST['searchEntry']; //mysql_real_escape_string($_POST['searchEntry']);
	
	// $offset bestämmer från vilken rad databasen ska läsas in i $resultat
	// första gången sökresultatet visas så är offset 0, annars tilldelas den $_POST['offset']
	if(!isset($_POST['offset']))
		$offset = 0;
	else
		$offset = $_POST['offset'];
	
	if(!isset($_POST['page']))
		$_POST['page'] = "";
	else if($_POST['page'] === "next")
		$offset += 12;
	else if($_POST['page'] === "previous")
	{
		if($_POST['offset'] == 0)
			echo 'nej';
		else
			$offset -= 12;
	}
	
	if($searchEntry == "")
		$searchEntry = $_POST['searchWordShort'];
	
	// Koppla upp mot databasen                               
	mysql_connect("mysql.itn.liu.se","lego");              
	mysql_select_db("lego");
	$limit = 12;
	
	// Ställ frågan    
	$result = mysql_query("SELECT parts.Partname, parts.PartID, images.colorID, images.has_gif, images.has_jpg, images.itemtypeID
							FROM parts
							INNER JOIN images
							ON parts.PartID=images.itemID
							WHERE parts.Partname LIKE '%$searchEntry%' 
							OR parts.PartID LIKE '%$searchEntry%'
							LIMIT $limit OFFSET $offset;
							");
							
	
	// Skriv ut alla poster i svaret 
		// Det här bör skicka vidare till errorsidan om inga resultat fås
	if(mysql_num_rows($result) === 0 && )
	if(mysql_num_rows($result) === 0){
		echo '<script>goToErrorPage();</script>';
	}
	
	else{
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
			print("<div class='legoBox' id=$partID onclick='redirect(this.id)'>");

			if ($smallGif == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.gif">'; 
			else if($smallJpg == 1) echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.jpg">'; 
			else echo 'No image found.';                      
			print("<p>$partName<br>Part-ID: $partID</p>");                           		
			print("</div></div>");
		} // end while
	}
?>