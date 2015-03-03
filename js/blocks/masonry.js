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
		$("#list").render('template/item', collra.search());
	};
	
	return Masonry;
});