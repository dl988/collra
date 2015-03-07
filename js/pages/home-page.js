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
			InfiniteScroll: '../../components/infinite-scroll-master/jquery.infinitescroll.min',
			BlockGrid: '../blocks/grid',
			BlockHeader: '../blocks/header',
			BlockSidebar: '../blocks/sidebar'
		},
		shim: {
			'Tagit': ['jQuery', 'jQueryUI'],
			'Masonry': ['jQuery'],
			'Bridget': ['jQuery'],
			'InfiniteScroll': ['jQuery'],
			'CollraLoader': ['jQuery', 'Handlebars'],
		}
	});
	
	require([
		'domReady',
		'BlockGrid',
		'BlockHeader',
		'BlockSidebar',
		'Modernizr'
	], function(domReady, BlockGrid, BlockHeader, BlockSidebar){
		domReady(function(){
			var blockHeader = new BlockHeader;
			var blockGrid = new BlockGrid;
			var blockSidebar = new BlockSidebar;
			
			blockHeader.init();
			blockGrid.init();
			blockSidebar.init();
		});
	});
})();