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
			var $gridImage = $grid.find('img');
			var $gridItem = $(".js-grid").find('.item');
			
			new ImagesLoaded($gridImage, function(){
				var msnry = new Masonry('.js-grid', {
					itemSelector: '.item',
				});
				
				
			});
			
			$gridItem.on('click', function(){
				console.log($(this).data('id'));
			});
		});
	};
	
	return Grid;
});