define([
	'Masonry',
	'ImagesLoaded',
	'BlockSidebar',
	'CoreParams',
	'Bridget'
], function(Masonry, ImagesLoaded, BlockSidebar, CoreParams)
{
	
	function Grid()
	{
		this._$grid = $(".js-grid");
		this._$html = $('html, body');
		this._$doc = $(document);
		this._$win = $(window);
		Grid._isLockInfiniteScroll = false;
	};
	
	Grid.prototype.init = function()
	{
		this.generate();
		CoreParams = new CoreParams;
		console.log('Default language is (grid block):' + CoreParams.getLanguage());
	}
	
	Grid.prototype.infiniteScrolll = function()
	{
		this.lockInfiniteScroll = function()
		{
			Grid._isLockInfiniteScroll = true;
		}
		
		this.unlockInfiniteScroll = function()
		{
			Grid._isLockInfiniteScroll = false;
		}
		
		this.isLockInfiniteScroll = function()
		{
			if(Grid._isLockInfiniteScroll){
				return true;
			}
		}
		
		this.init = function(el, data)
		{
			var self = this;
			el._$doc.bind('scroll.infinite', function() {
				
				if(self.isLockInfiniteScroll()) return;
				
				var $this = $(this);
				var $pageNav = el._$doc.find('.js-page-nav');
				var topPageNav = $pageNav.offset().top;
				
				if($this.scrollTop() >= topPageNav + $pageNav.innerHeight() - el._$win.height()){
					
					self.lockInfiniteScroll();
					
					var $data = $('<div/>').render('template/list', data, function()
					{
						var $dataAppend = $data.find('.item');
						var $dataImage = $data.find('img');
						
						new ImagesLoaded($dataImage, function(){
							el._$masonry.append($dataAppend).masonry('appended', $dataAppend);
							self.unlockInfiniteScroll();
						});
					});
				}
			});
		}
	}
	
	Grid.prototype.loading = function()
	{
		var self = this;
		
		this.show = function()
		{
			console.log('show');
		}
		
		this.hide = function()
		{
			console.log('hide');
		}
	}
	
	Grid.prototype.orientation = function()
	{
		Grid.size = null;
		
		this.set = function(data)
		{
			Grid.size = data;
		}
		
		this.isChange = function(data)
		{
			if(data != Grid.size){
				return true;
			}
		}
	}
	
	Grid.prototype.generate = function()
	{
		
		var self = this;
		var collra = new collraApi();
		var sidebar = new BlockSidebar;
		var infiniteScrolll = new self.infiniteScrolll();
		var orientation = new self.orientation();
		
		var updateOrientation = function()
		{
			orientation.set(self._$win.width());
		}
		
		updateOrientation();
		self._$win.on('resize.grid', updateOrientation);
		
		self._$grid.render('template/list', collra.search(), function()
		{
			self._$masonry = self._$grid.find('.js-wrap-masonry');
			var $gridImage = self._$grid.find('img');
			
			var $pageNav = $('<div/>', {
				class: 'js-page-nav'
			});
			
			$pageNav.insertAfter('.js-grid');
			
			new ImagesLoaded($gridImage, function(){
				
				$.bridget('masonry', Masonry );
				
				self._$masonry.masonry({
					itemSelector: '.item'
				});
				
				var isViewed = false;
				
				self._$grid.on('click', function(e){
					
					itemPosition = self._$doc.scrollTop();
					$itemClicked = $(e.target).closest('.item');
					itemID = $itemClicked.data('id');
					itemDetail = collra.getItem(itemID);
					
					sidebar.lockWrapSidebar();
					sidebar.hideWrapSidebar();
					$mainHomepage = $('.js-main-home-page');
					$mainHomepage.addClass('is-full-width');
					orientationWidth = self._$win.width();

					if (itemID === null || isViewed === true || typeof itemDetail === 'undefined') return ;
					
					infiniteScrolll.lockInfiniteScroll();
					
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
							
							sidebar.unlockWrapSidebar();
							sidebar.showWrapSidebar();
							infiniteScrolll.unlockInfiniteScroll();
							$mainHomepage.removeClass('is-full-width');

							self._$grid.children().detach();
							self._$grid.append(gridTmp);
							
							self._$html.scrollTop( itemPosition );
							isViewed = false;
							
							if(orientation.isChange(orientationWidth)){
								self._$masonry.masonry();
							}
							
							return false;
						});
						
						isViewed = true;
					});
				});
			});
			
			infiniteScrolll.init(self, collra.search());
		});
	}
	
	return Grid;
});