(function() {
	require.config({
		paths: {
			jQuery: '../vendor/jquery-1.10.2.min',
			Handlebars: '../vendor/handlebars-v2.0.0',
			CollraApi: '../collra/api',
			CollraLoader: '../collra/loader',
			Modernizr: '../vendor/modernizr-2.6.2.min',
			Bridget: '../vendor/jquery.bridget',
			Masonry: '../vendor/masonry.min',
			ImagesLoaded: '../vendor/imagesloaded.min',
			Plugins: '../plugins',
			BlockGrid: '../blocks/grid',
			BlockHeader: '../blocks/header'
		}
	});
	
	require([
		'Plugins',
		'BlockGrid',
		'BlockHeader',
		'Modernizr'
	], function(plugins, BlockGrid, BlockHeader){
		var blockHeader = new BlockHeader();
		var blockGrid = new BlockGrid();
		
		blockHeader.init();
		blockGrid.init();
	});
})();