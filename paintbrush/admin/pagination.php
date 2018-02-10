<?php  
/*
function ViewSubCategoryListing($id){
	global $db,$request;
	$select_query = "SELECT id,subcategory,category_id,recorddate FROM subcategory WHERE status='active' AND category_id='".$id."' ORDER BY id DESC";
	$count_query = "SELECT count(*) as num FROM subcategory WHERE status='active' AND category_id='".$id."' ORDER BY id DESC";
	$limit = PAGINATION_LIMIT;
	$path = "addsubcategory.php?";
	return $pagingarray = addPagination($count_query,$select_query,$limit,$path);  
}*/	
		
		
function addPagination($count_query,$select_query,$limit,$path){
global $db,$request;
// set adjacent page numbers
$adjacents = 3;
$total_page_numbers = $db['master']->getResults($count_query);
$total_page_numbers = $total_page_numbers[0]['num'];
//how many items to show per page
$page_number = $request['page_number'];
if($page_number)
{
	$start = ($page_number - 1) * $limit;
}	
//if no page_number var is given, set start to 0
else
{
	$start = 0;
}								
// Get data
$select_query .= " LIMIT ".$start.",".$limit; 
$list_users_result = $db['master']->getResults($select_query);
// Setup page_number vars for display.
if ($page_number == 0) 
$page_number = 1;
$prev = $page_number - 1;
$next = $page_number + 1;
$lastpage_number = ceil($total_page_numbers/$limit);
$lpm1 = $lastpage_number - 1;
$pagination = "";
if($lastpage_number > 1)
{	
	$pagination .= "<ul class='pagination pull-right'>";
	//previous button
	if ($page_number > 1) 
		$pagination.= "<li><a href='".$path."&page_number=".$prev."'>&laquo;</a></li>";
	else
		$pagination.= "<li class='disabled'><a href='#'>&laquo;</a></li>";
	//page_numbers	
	if ($lastpage_number < 7 + ($adjacents * 2))
	{	
		for ($counter = 1; $counter <= $lastpage_number; $counter++)
		{
			if ($counter == $page_number)
				$pagination.= "<li class='active'><a>".$counter."</a></li>";
			else
				$pagination.= "<li><a href='".$path."&page_number=".$counter."'>".$counter."</a></li>";
		}
	}
	elseif($lastpage_number > 5 + ($adjacents * 2))
	{
		if($page_number < 1 + ($adjacents * 2))		
		{
			for ($counter = 1; $counter < 4 + ($adjacents * 2); $counter++)
			{
				if ($counter == $page_number)
					$pagination.= "<li class='active'><a>".$counter."</a></li>";
				else
					$pagination.= "<li><a href='".$path."&page_number=".$counter."'>".$counter."</a></li>";					
			}
			$pagination.= "...";
			$pagination.= "<li><a href='".$path."&page_number=".$lpm1."'>".$lpm1."</a></li>";
			$pagination.= "<li><a href='".$path."&page_number=".$lastpage_number."'>".$lastpage_number."</a></li>";
		}
		elseif($lastpage_number - ($adjacents * 2) > $page_number && $page_number > ($adjacents * 2))
		{
			$pagination.= "<li><a href='".$path."&page_number=1'>1</a></li>";
			$pagination.= "<li><a href='".$path."&page_number=2'>2</a></li>";
			$pagination.= "...";
			for ($counter = $page_number - $adjacents; $counter <= $page_number + $adjacents; $counter++)
			{
				if ($counter == $page_number)
					$pagination.= "<li class='active'><a>".$counter."</a></li>";
				else
					$pagination.= "<li><a href='".$path."&page_number=".$counter."'>".$counter."</a></li>";					
			}
			$pagination.= "...";
			$pagination.= "<li><a href='".$path."&page_number=".$lpm1."'>".$lpm1."</a></li>";
			$pagination.= "<li><a href='".$path."&page_number=".$lastpage_number."'>".$lastpage_number."</a></li>";		
		}
		//close to end; only hide early page_numbers
		else
		{
			$pagination.= "<li><a href='".$path."&page_number=1'>1</a></li>";
			$pagination.= "<li><a href='".$path."&page_number=2'>2</a></li>";
			$pagination.= "...";
			for ($counter = $lastpage_number - (2 + ($adjacents * 2)); $counter <= $lastpage_number; $counter++)
			{
				if ($counter == $page_number)
					$pagination.= "<li class='active'><a>".$counter."</a></li>";
				else
					$pagination.= "<li><a href='".$path."&page_number=".$counter."'>".$counter."</a></li>";
			}
		}
	}
	//next button
	if ($page_number < $counter - 1) 
		$pagination.= "<li><a href='".$path."&page_number=".$next."'>&raquo;</a></li>";
	else
		$pagination.= "<li class='disabled'><a href='#'>&raquo;</a></li>";
		$pagination.= "</ul>";		
}

//print_r($pagination);
return array($pagination,$list_users_result);
}

?>
