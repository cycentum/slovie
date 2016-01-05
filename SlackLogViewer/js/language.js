$(function(){
	$("#langSelect #"+lang+"Option").prop("selected", true);
});

function languageSelected()
{
	var nextLang=$("#langSelect").val();
	if(nextLang!=lang)
	{
		location.href="index.php?la="+nextLang;
	}
}