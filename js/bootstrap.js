(function(){
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
			Crossroads: '../components/crossroads/crossroads.min',
			signals: '../components/signals/signals',
			Hasher: '../components/hasher/hasher',
			CoreParams: 'collra/core-params',
			CollraApi: 'collra/api',
			CollraLoader: 'collra/loader',
			HomePage: 'pages/home-page',
			BlockGrid: 'blocks/grid',
			BlockHeader: 'blocks/header',
			BlockSidebar: 'blocks/sidebar'
		},
		shim: {
			'Tagit': ['jQuery', 'jQueryUI'],
			'Crossroads': ['signals'],
			'Masonry': ['jQuery'],
			'BlockHeader': ['jQuery'],
			'Bridget': ['jQuery'],
			'CollraLoader': ['jQuery', 'Handlebars'],
		}
	});
	
	require([
		'CoreParams',
		'domReady',
		'Hasher',
		'Crossroads',
		'Modernizr',
		'CollraApi',
		'CollraLoader'
	], function(CoreParams, domReady, Hasher, Crossroads){
		domReady(function(){
			_config = {
				'languageSupported': ['vi', 'en', ''],
				'baseUrl': ''
			}
			_coreParams = new CoreParams;
			
			// Homepage routing
			var homePageRouting = Crossroads.addRoute('/:language:');
			
			homePageRouting.rules = {
			  language : _config.languageSupported
			};
			
			homePageRouting.matched.add(function(language){
				
				if(language !== undefined){
					_coreParams.setLanguage(language);
				}
				
				require(['HomePage'], function(HomePage){
					HomePage = new HomePage;
					HomePage.init();
				});
			});
			
			// Testpage routing
			Crossroads.addRoute('lorem/ipsum', function(){
				console.log('lorem/ipsum');
			});
			
			function parseHash(newHash, oldHash){
				Crossroads.parse(newHash);
			}
			
			Hasher.initialized.add(parseHash);
			Hasher.changed.add(parseHash);
			Hasher.init();
		});
	});
})();