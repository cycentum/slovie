<?php
require "./php/setLanguage.php";
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Slovie -Slack LOg VIEwer-</title>
</head>
<link rel="stylesheet" href="./style/lib/html5reset-1.6.1.css" />
<link rel="stylesheet" href="./style/style.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="./js/lib/jszip.js"></script>
<script type="text/javascript" src="./js/main.js"></script>
<script type="text/javascript" src="./js/io.js"></script>
<script type="text/javascript" src="./js/user.js"></script>
<script type="text/javascript" src="./js/channel.js"></script>
<script type="text/javascript" src="./js/content.js"></script>
<script type="text/javascript" src="./js/utils.js"></script>
<script type="text/javascript" src="./js/language.js"></script>
<body>
<h1><a href="http://slovie.cycentum.com/">Slovie -Slack LOg VIEwer-</a></h1>
<input type="file" onchange="fileSelected(this.files)" accept=".zip"/>
<select name="channels" id="channels" class="hid" onChange="channelSelected()"></select>
<span id="loadingMsg" class="hid"><?php echo $loading;?></span>
<table id="contents" class="hid" border="1"></table>
<p id="notice"><?php echo $notice;?></p>
<div id="err" class="red"></div>
<div id="msg"></div>
<div class="top1em"><?php echo $futurePlans;?></div>
<div class="top1em">
<?php echo $language;?>: <select name="langSelect" id="langSelect" onChange="languageSelected()">
<option value="en" id="enOption">English</option>
<option value="ja" id="jaOption">日本語</option>
</select>
</div>
<p id="copyright">&copy; 2015 Takuya KOUMURA.</p>
</body>
</html>