define([
	'Masonry',
	'ImagesLoaded',
	'BlockSidebar',
	'InfiniteScroll',
	'Bridget',
	'CollraApi',
	'CollraLoader',
], function(Masonry, ImagesLoaded, BlockSidebar)
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
		var sidebar = new BlockSidebar;
		
		self._$grid.render('template/list', collra.search(), function()
		{
			self._$masonry = self._$grid.find('.js-wrap-masonry');
			var $gridImage = self._$grid.find('img');
			
			var $pageNav = $('<div/>', {
				class: 'js-page-nav'
			}).html('<a href="index2.html"></a>');
			
			self._$grid.append($pageNav);
			
			new ImagesLoaded($gridImage, function(){
				
				$.bridget('masonry', Masonry );
				
				self._$masonry.masonry({
					itemSelector: '.item'
				});
				
				var isViewed = false;
				
				self._$grid.on('click', function(e){
					var itemPosition = self._$doc.scrollTop();

					var $itemClicked = $(e.target).closest('.item');
					var $mainHomepage = $('.js-main-home-page');
					var itemID = $itemClicked.data('id');
					var itemDetail = collra.getItem(itemID);

					if (itemID === null || isViewed === true || typeof itemDetail === 'undefined') return ;

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
						
						sidebar.hideWrapSidebar();
						$mainHomepage.addClass('is-full-width');
						var gridTmp = self._$grid.children().detach();
						
						self._$grid.append($container.append($backButton).append($itemAttribute).append($commentList));
						
						self._$html.on("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
							self._$html.stop();
						});

						self._$html.animate({ scrollTop: 0 }, 'slow', function(){
							self._$html.off("scroll mousedown DOMMouseScroll mousewheel keyup");
						});
						
						self._$grid.find('.back-button').on('click', function(){
							
							sidebar.showWrapSidebar();
							$mainHomepage.removeClass('is-full-width');

							self._$grid.children().detach();
							self._$grid.append(gridTmp);
							self._$masonry.masonry();
							
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