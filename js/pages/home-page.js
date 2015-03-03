(function() {
	require.config({
		paths: {
			jQuery: '../vendor/jquery-1.10.2.min',
			Handlebars: '../vendor/handlebars-v2.0.0',
			CollraApi: '../collra/api',
			CollraLoader: '../collra/loader'
		}
	});
	
	require([
		'../plugins',
		'../blocks/masonry'
	], function(plugins, masonry){
		masonry();
	});
})();