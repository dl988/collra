define([
	'Masonry',
	'ImagesLoaded',
	'jQuery',
	'CollraApi',
	'CollraLoader',
], function(Masonry, ImagesLoaded)
{
	
	function Grid()
	{
		this._$grid = $(".js-grid");
		this._$html = $('html, body');
	};
	
	Grid.prototype.init = function()
	{
		this.generate();
	}
	
	Grid.prototype.generate = function()
	{
		
		var self = this;
		var collra = new collraApi();
		
		self._$grid.render('template/item', collra.search(), function()
		{
			var $gridImage = self._$grid.find('img');
			
			new ImagesLoaded($gridImage, function(){
				self.msnry = new Masonry('.js-grid', {
					itemSelector: '.item',
				});
				
				self._$grid.on('click', function(e){
					
					self.msnry.destroy();
					
					var $itemClicked = $(e.target).closest('.item');
					var $wrapSideBar = $('.js-wrap-sidebar');
					var $mainHomepage = $('.js-main-home-page');
					var itemID = $itemClicked.data('id');
					var itemDetail = collra.getItem(itemID);
					
					$wrapSideBar.hide();
					$mainHomepage.addClass('is-full-width');
					
					var $container = $('<div/>', {
						class: 'is-viewed-item'
					}).render('template/itemDetail', {
						id: itemDetail.id,
						statistic: itemDetail.statistic,
						item: itemDetail.item,
						user: itemDetail.user
					}, function(){
						
						var $itemAttribute = $('<div/>', {
							class: 'item-attibute'
						}).render('template/itemAttributeList', itemDetail.item);
						
						var $commentList = $('<div/>', {
							class: 'comment-list'
						}).render('template/itemCommentList', itemDetail.comments, function(){
							
							var $commentForm = $('<div/>', {
								class: 'user-wrap'
							}).render('template/commentForm', {
								id: itemDetail.id,
								user: itemDetail.user
							}, function(){
								
								$commentList.children().append($commentForm);
							});
						});
						
						var Gridtmp = self._$grid.children().detach();
						self._$grid.append($container.append($itemAttribute).append($commentList));
						self._$html.animate({ scrollTop: 0 }, "slow");
					});
				});
			});
		});
	}
	
	return Grid;
});