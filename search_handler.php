<?php                 
	$OFFSET_NR = 12;
	$search = "";
	$offset = 0;
	
	if(isset($_POST['hiddenEntry'])) {
		$search = $_POST['hiddenEntry'];
	}
	
	// $offset bestämmer från vilken rad databasen ska läsas in i $resultat
	// första gången sökresultatet visas så är offset 0, annars tilldelas den $_POST['offset']
	if(isset($_POST['offsetValue'])) {
		$offset = $_POST['offsetValue'];
	}
	
	// Koppla upp mot databasen                               
	mysql_connect("mysql.itn.liu.se","lego");              
	mysql_select_db("lego");
	$limit = $OFFSET_NR+1;
	
	if($search == "")
	{
		$searchEntry = mysql_real_escape_string($_POST['searchWord']);
	
		if($searchEntry == "") {
			$searchEntry = mysql_real_escape_string($_POST['searchWordShort']);
		}
	}
	else {
		$searchEntry = $search;
	}
		
	if(!isset($_POST['page']))
		$_POST['page'] = "";
	else if($_POST['page'] === "next")
		$offset += $OFFSET_NR;
	else if($_POST['page'] === "previous")
	{
		if($_POST['offsetValue'] == 0)
			echo '<script>goToErrorPage();</script>';
		else
			$offset -= $OFFSET_NR;
	}
	
	// Ställ frågan    
	$result = mysql_query("SELECT parts.Partname, parts.PartID, images.colorID, images.has_gif, images.has_jpg, images.itemtypeID
							FROM parts
								INNER JOIN images
									ON parts.PartID=images.itemID
							WHERE parts.Partname LIKE '%$searchEntry%' 
							OR parts.PartID LIKE '%$searchEntry%'
							LIMIT 10;
							");
	
	// Skriv ut alla poster i svaret 
	if(mysql_num_rows($result) === 0){
		echo '<script>goToErrorPage();</script>';
	}
	else{
		$rowCounter = 0;
	
		while($row = mysql_fetch_array($result)) {
			if($rowCounter < $OFFSET_NR) {
				$smallGif = $row['has_gif'];
				$smallJpg = $row['has_jpg'];
				$partName= $row['Partname'];
				$partID = $row['PartID'];
				$itemtypeID = $row['itemtypeID'];
				$colorID = $row['colorID'];	
					
				print("<div class='legoBoxContainer'>");
				// redirect(this.id) skickar vidare till den specifika sidan
				print("<div class='legoBox' id=$partID onclick='redirect(this.id, $colorID)'>");

				if ($smallGif == 1) 
					echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.gif">'; 
				else if($smallJpg == 1) 
					echo '<img src="http://webstaff.itn.liu.se/~stegu/img.bricklink.com/' , $itemtypeID, '/', $colorID, '/', $partID, '.jpg">'; 
				else 
					echo 'No image found.'; 
				
				print("<p>$partName<br>Part-ID: $partID</p>");                           		
				print("</div></div>");
				
				$rowCounter += 1;
			}
			else {
				$search = $searchEntry;
			}
		} // end while
	}
?>