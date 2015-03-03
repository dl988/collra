define([
	'jQuery',
	'Masonry',
	'ImagesLoaded',
	'CollraApi',
	'CollraLoader',
], function(jQuery, Masonry, ImagesLoaded)
{
	
	function Grid()
	{
		var collra = new collraApi();
		var $grid = $(".js-grid");
		
		$grid.render('template/item', collra.search(), function()
		{
			new ImagesLoaded($grid.find('img'), function(){
				var msnry = new Masonry('.js-grid', {
					itemSelector: '.item',
				});
			});
		});
	};
	
	return Grid;
});