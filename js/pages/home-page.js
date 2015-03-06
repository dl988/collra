(function() {
	require.config({
		paths: {
			domReady: '../vendor/domReady',
			jQuery: '../vendor/jquery-1.10.2.min',
			jQueryUI: '../../components/jquery-ui/jquery-ui.min',
			Handlebars: '../vendor/handlebars-v2.0.0',
			CollraApi: '../collra/api',
			CollraLoader: '../collra/loader',
			Modernizr: '../vendor/modernizr-2.6.2.min',
			Bridget: '../vendor/jquery.bridget',
			Masonry: '../vendor/masonry.min',
			ImagesLoaded: '../vendor/imagesloaded.min',
			Plugins: '../plugins',
			Tagit: '../../components/tag-it-master/js/tag-it',
			BlockGrid: '../blocks/grid',
			BlockHeader: '../blocks/header'
		},
		shim: {
			'Tagit': ['jQuery', 'jQueryUI'],
			'Masonry': ['jQuery'],
			'Bridget': ['jQuery'],
			'CollraLoader': ['jQuery', 'Handlebars'],
		}
	});
	
	require([
		'domReady',
		'BlockGrid',
		'BlockHeader',
		'Modernizr'
	], function(domReady, BlockGrid, BlockHeader){
		domReady(function(){
			var blockHeader = new BlockHeader();
			var blockGrid = new BlockGrid();
			
			blockHeader.init();
			blockGrid.init();
		});
	});
})();