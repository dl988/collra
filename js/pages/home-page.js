define([
	'BlockGrid',
	'BlockHeader',
	'BlockSidebar'
], function(BlockGrid, BlockHeader, BlockSidebar)
{
	
	function HomePage()
	{
		this._$globalLayout = $('.js-global-layout');
		this._layoutPagePath = 'template/pages/home-page';
	}
	
	HomePage.prototype.init = function()
	{
		this.initLayout();
	}
	
	HomePage.prototype.initLayout = function()
	{
		var self = this;
		
		this._$globalLayout.render(this._layoutPagePath, '', function(){
			self.initFunction();
		});
	}
	
	HomePage.prototype.initFunction = function()
	{
		var blockHeader = new BlockHeader;
		var blockGrid = new BlockGrid;
		var blockSidebar = new BlockSidebar;
		
		blockHeader.init();
		blockGrid.init();
		blockSidebar.init();
	}
	
	return HomePage;
});