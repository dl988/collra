require(['BlockGrid', 'BlockHeader', 'BlockSidebar'], function(BlockGrid, BlockHeader, BlockSidebar){
	var PageLayout = 'text!templates/user_account.html';
	var blockHeader = new BlockHeader;
	var blockGrid = new BlockGrid;
	var blockSidebar = new BlockSidebar;
	
	blockHeader.init();
	blockGrid.init();
	blockSidebar.init();
});