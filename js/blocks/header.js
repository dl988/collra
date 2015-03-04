define([
	'Modernizr',
	'jQuery',
], function()
{
	
	function Header()
	{
		this._$body = $('body');
		this._$win = $(window);
		this._$header = $('.js-header');
	};
	
	Header.prototype.init = function()
	{
		var self = this;
		
		var checkIsXsmall = function()
		{
			if (self._$win.width() <= 768)
			{
				self._$header.removeClass('is-fixed');
				self._$body.removeAttr('style');
				return true;
			}
		}
		
		var update = function()
		{
			if(checkIsXsmall()) return;
			
			self._$header.addClass('is-fixed');
			self._$body.css({'padding-top': self._$header.height() + 'px'});
		}
		
		update();
		
		self._$win.on('resize.header', function(){
			update();
		});
	}
	
	Header.prototype.formInit = function()
	{
		console.log('form init');
	}
	
	return Header;
});