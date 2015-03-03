define([
	'jQuery',
	'CollraApi',
	'CollraLoader',
], function(jQuery)
{
	
	function Masonry()
	{
		var collra = new collraApi();
		$(".js-masonry").render('template/item', collra.search());
	};
	
	return Masonry;
});