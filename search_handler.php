<?php                 
	$OFFSET_NR = 12;
	$search = "";
	$offset = 0;
	// Antalet chars som skrivs ut i varje bits namn
	$charsInNameDisplayed = 40;
	
	$cookie_query_name = "query";
	$cookie_offset_name = "offset";
	$save_cookie_for = 86400; // == 1 dag
	
	// Koppla upp mot databasen                               
	mysql_connect("mysql.itn.liu.se","lego");              
	mysql_select_db("lego");
	
	// $offset bestämmer från vilken rad databasen ska läsas in i $resultat
	// första gången sökresultatet visas så är offset 0, annars tilldelas den $_POST['offset']
	if(isset($_POST['offsetValue'])) {
		$offset = $_POST['offsetValue'];
	}
	
	
	if(!isset($_POST['searchWord']) && !isset($_POST['searchWordShort']) && !isset($_POST['hiddenEntry'])){
		$searchEntry = $_COOKIE[$cookie_query_name];
		$offset = $_COOKIE[$cookie_offset_name];
	}
	else{
		// Kolla om sökning gjorts från sidan
		if($_POST['searchWord'] != ""){
			$search = mysql_real_escape_string($_POST['searchWord']);
			
			// Skriv över offsetvärdet så förstasidan för nya sökningen visas
			$offset = 0;
		}
		
		// Om ingen sökning gjorts
		else if(isset($_POST['hiddenEntry'])) {
			$search = $_POST['hiddenEntry'];
		}
		
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
	}
	
	$limit = $OFFSET_NR+1;
		
	if(!isset($_POST['page']))
		$_POST['page'] = "";
	else if($_POST['page'] === "next")
		$offset += $OFFSET_NR;
	else if($_POST['page'] === "previous")
	{
		if($_POST['offsetValue'] != 0)
			$offset -= $OFFSET_NR;
	}
	
	// cookie för sökord
	setcookie($cookie_query_name, $searchEntry, time() + $save_cookie_for, "/");
	// cookie för offset
	setcookie($cookie_offset_name, $offset, time() + $save_cookie_for, "/");
	
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
	
	// Skicka vidare till errorsidan om inga resultat fås
	if(mysql_num_rows($result) === 0){
		echo '<script>goToErrorPage();</script>';
	}
	else{
		$rowCounter = 0;
		
		print("<div class='searchResultContainer'>");
	
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
				
				// Kapa namnet om det är för långt så inte allt skrivs ut
				if(strlen($partName) > $charsInNameDisplayed){
					$partName = substr($partName, 0, $charsInNameDisplayed) . "...";
				}
				
				print("<p>$partName<br>Part-ID: $partID</p>");                           		
				print("</div></div>");
				
				$rowCounter += 1;
			} // end while
			else {
				$search = $searchEntry;
			}
		} 
		print("</div>");
		
		// Kolla om det finns resultat på nästa sida
		$offsetNextPage = $offset + $OFFSET_NR;
		
		$nextPage = mysql_query("SELECT parts.Partname, parts.PartID, images.colorID, images.has_gif, images.has_jpg, images.itemtypeID
							FROM parts
								INNER JOIN images
									ON parts.PartID=images.itemID
							WHERE parts.Partname LIKE '%$searchEntry%' 
							OR parts.PartID LIKE '%$searchEntry%'
							LIMIT 1 OFFSET $offsetNextPage;
							");
		if(mysql_num_rows($nextPage) === 0){
			$contentOnNextPage = "false";
		}					
		
	}
?>