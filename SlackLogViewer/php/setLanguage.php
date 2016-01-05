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
</script>
