(function() {
	require.config({
		waitSeconds: 200,
		baseUrl: 'js/',
		paths: {
			domReady: '../components/dom-ready/domReady',
			jQuery: '../components/jquery/jquery-1.10.2.min',
			jQueryUI: '../components/jquery-ui/jquery-ui.min',
			Handlebars: '../components/handlebars/handlebars-v2.0.0',
			Modernizr: '../components/modernizr/modernizr-2.6.2.min',
			Bridget: '../components/bridget/jquery.bridget',
			Masonry: '../components/masonry/masonry.min',
			ImagesLoaded: '../components/images-loaded/imagesloaded.min',
			Tagit: '../components/tag-it-master/js/tag-it',
			CollraApi: 'collra/api',
			CollraLoader: 'collra/loader',
			BlockGrid: 'blocks/grid',
			BlockHeader: 'blocks/header',
			BlockSidebar: 'blocks/sidebar'
		},
		shim: {
			'Tagit': ['jQuery', 'jQueryUI'],
			'Masonry': ['jQuery'],
			'WayPoints': ['jQuery'],
			'Bridget': ['jQuery'],
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