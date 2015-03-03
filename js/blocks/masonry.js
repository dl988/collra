define([
	'jQuery',
	'Handlebars', 
	'CollraApi',
	'CollraLoader',
], function(jQuery, Handlebars)
{
	
	function Masonry()
	{
		var collra = new collraApi();
		$(".js-masonry").render('template/item', collra.search());
	};
	
	return Masonry;
});