<?php
function browserLanguage()
{
	$language = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
	$weight=array("ja"=>-1, "en"=>-1,);
	foreach ($language as $lang)
	{
		$key="";
		$q=-1;
		if(preg_match("/^en.*;q=(.+)$/i", $lang, $m))
		{
			$key="en";
			$q=$m[1]+0;
		}
		elseif(preg_match("/^en/i", $lang))
		{
			$key="en";
			$q=1;
		}
		elseif(preg_match("/^ja.*;q=(.+)$/i", $lang, $m))
		{
			$key="ja";
			$q=$m[1]+0;
		}
		elseif(preg_match("/^ja/i", $lang))
		{
			$key="ja";
			$q=1;
		}
		if($q>$weight[$key]){$weight[$key]=$q;}
	}

	$maxKey="";
	$maxWeight=-1;
	foreach ($weight as $k=>$w)
	{
		if($w==$maxWeight && $k=="en"){$maxKey="en";}
		elseif($w>$maxWeight)
		{
			$maxKey=$k;
			$maxWeight=$w;
		}
	}
	return $maxKey;
}
?>
