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
		var $html = $('html, body');
		console.log(collra.search());
		$grid.render('template/item', collra.search(), function()
		{
			var $gridImage = $grid.find('img');
			var $gridItem = $(".js-grid").find('.item');
			
			new ImagesLoaded($gridImage, function(){
				var msnry = new Masonry('.js-grid', {
					itemSelector: '.item',
				});
				
				$gridItem.on('click', function(){
					msnry.destroy();
					
					var $this = $(this);
					var $wrapSideBar = $('.js-wrap-sidebar');
					var $mainHomepage = $('.js-main-home-page');
					var itemID = $this.data('id');
					var itemDetail = collra.getItem(itemID);
					
					$wrapSideBar.hide();
					$mainHomepage.addClass('is-full-width');
					
					var $container = $('<div/>', {
						class: 'is-viewed-item'
					}).html($this);
					
					var $itemAttribute = $('<div/>', {
						class: 'item-attibute'
					}).render('template/itemAttributeList', itemDetail.item);
					
					var $commentList = $('<div/>', {
						class: 'comment-list'
					}).render('template/itemCommentList', itemDetail.comments);
					
					$grid.html($container.append($itemAttribute).append($commentList));
					$html.animate({ scrollTop: 0 }, "slow");
				});
			});
		});
	};
	
	return Grid;
});