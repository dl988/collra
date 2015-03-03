(function() {
	require.config({
		paths: {
			jQuery: '../vendor/jquery-1.10.2.min',
			Handlebars: '../vendor/handlebars-v2.0.0',
			CollraApi: '../collra/api',
			CollraLoader: '../collra/loader',
			Modernizr: '../vendor/modernizr-2.6.2.min',
			Plugins: '../plugins'
		}
	});
	
	require([
		'Plugins',
		'../blocks/masonry',
		'Modernizr'
	], function(plugins, masonry){
		masonry();
	});
})();