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
require "browserLanguage.php";

$lang="";
if(isset($_GET["la"])) $lang=$_GET["la"];
if($lang=="")
{
	if(isset($_COOKIE["lang"])) $lang=$_COOKIE["lang"];
	else
	{
		$lang=browserLanguage();
	}
}
if($lang!="ja"&&$lang!="en") $lang="en";

setcookie("lang", $lang, time()+60*60*24*365);

if($lang=="ja")
{
	require "text/ja.php";
}
else
{
	require "text/en.php";
}
?>

<script>
var lang="<?php echo $lang;?>";

var selectChannelText="<?php echo $selectChannel;?>";
var reverseText="<?php echo $reverse;?>";
var notAZipFileText="<?php echo $notAZipFile;?>";
var notASlackLogFileText="<?php echo $notASlackLogFile;?>";

<?php if($lang=="ja"):?>
	function timeString(date)
	{
		var mo=date.toLocaleString("ja-jp", { month: "short" });
		var hr=('0'+date.getHours()).slice(-2);
		var mi=('0'+date.getMinutes()).slice(-2);
		return date.getFullYear()+"年"+mo+date.getDate()+"日 "+hr+":"+mi;
	}
<?php else:?>
	function timeString(date)
	{
		var mo=date.toLocaleString("en-us", { month: "short" })+".";
		var hr=('0'+date.getHours()).slice(-2);
		var mi=('0'+date.getMinutes()).slice(-2);
		var da=date.getDate()+ordinal(date.getDate());
		return hr+":"+mi+" "+da+" "+mo+" "+date.getFullYear();
	}
<?php endif;?>
</script>
