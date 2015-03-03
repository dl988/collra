define([
	'jQuery'
], function(jQuery)
{
	
	function Header()
	{
		var $body = $('body');
		var $win = $(window);
		var $header = $('.js-header');
		
		var update = function()
		{
			
			$body.css({'padding-top': $header.height() + 'px'});
		}
		
		update();
		
		$win.on('resize.header', function(){
			update();
		});
	};
	
	return Header;
});