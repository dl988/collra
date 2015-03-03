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
		var $grid = $(".b-grid");
		
		$grid.render('template/item', collra.search(), function()
		{
			new ImagesLoaded($grid.find('img'), function(){
				var msnry = new Masonry('.b-grid', {
					itemSelector: '.item',
				});
			});
		});
	};
	
	return Grid;
});