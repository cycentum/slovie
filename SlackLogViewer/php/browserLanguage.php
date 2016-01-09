<!-- 
Copyright (c) 2016 Takuya KOUMURA.
http://slovie.cycentum.com/

This file is part of Slovie.

Slovie is licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
-->

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
