define([
	'Masonry',
	'ImagesLoaded',
	'Bridget',
	'CollraApi',
	'CollraLoader',
], function(Masonry, ImagesLoaded)
{
	
	function Grid()
	{
		this._$grid = $(".js-grid");
		this._$html = $('html, body');
		this._$doc = $(document);
	};
	
	Grid.prototype.init = function()
	{
		this.generate();
	}
	
	Grid.prototype.generate = function()
	{
		
		var self = this;
		var collra = new collraApi();
		
		self._$grid.render('template/list', collra.search(), function()
		{
			self._$masonry = self._$grid.find('.js-wrap-masonry');
			var $gridImage = self._$grid.find('img');
			
			new ImagesLoaded($gridImage, function(){
				
				$.bridget('masonry', Masonry );
				
				self._$masonry.masonry({
					itemSelector: '.item'
				});
				
				var isViewed = false;
				
				self._$grid.on('click', function(e){
					var itemPosition = self._$doc.scrollTop();

					var $itemClicked = $(e.target).closest('.item');
					var $wrapSideBar = $('.js-wrap-sidebar');
					var $mainHomepage = $('.js-main-home-page');
					var itemID = $itemClicked.data('id');
					var itemDetail = collra.getItem(itemID);

					if (itemID === null || isViewed === true || typeof itemDetail === 'undefined') return ;
					
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
						
						var $backButton = $('<div/>', {
							class: 'back-button'
						}).html('<i class="fa fa-angle-left"></i>');
						
						var gridTmp = self._$grid.children().detach();
						
						self._$grid.append($container.append($backButton).append($itemAttribute).append($commentList));
						
						self._$html.on("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
							self._$html.stop();
						});

						self._$html.animate({ scrollTop: 0 }, 'slow', function(){
							self._$html.off("scroll mousedown DOMMouseScroll mousewheel keyup");
						});
						
						self._$grid.find('.back-button').on('click', function(){
							
							$wrapSideBar.show();
							$mainHomepage.removeClass('is-full-width');

							self._$grid.children().detach();
							self._$grid.append(gridTmp);
							
							self._$html.scrollTop( itemPosition );
							isViewed = false;
							
							return false;
						});
						
						isViewed = true;
					});
				});
			});
		});
	}
	
	return Grid;
});