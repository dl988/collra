define([
	'Modernizr',
	'jQuery',
], function()
{
	
	function Header()
	{
		var $body = $('body');
		var $win = $(window);
		var $header = $('.js-header');
		
		var checkIsXsmall = function()
		{
			if ($win.width() <= 768)
			{
				$header.removeClass('is-fixed');
				$body.removeAttr('style');
				return true;
			}
		}
		
		var update = function()
		{
			if(checkIsXsmall()) return;
			
			$header.addClass('is-fixed');
			$body.css({'padding-top': $header.height() + 'px'});
		}
		
		update();
		
		$win.on('resize.header', function(){
			update();
		});
	};
	
	return Header;
});