define([
	'Tagit',
], function()
{
	
	function Header()
	{
		this._$body = $('body');
		this._$win = $(window);
		this._$header = $('.js-header');
		this._$tagit = this._$header.find('.js-tagit');
	};
	
	Header.prototype.init = function()
	{
		//this.setStatus();
		this.Tagit();
	}
	
	Header.prototype.setStatus = function()
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
	
	Header.prototype.Tagit = function()
	{
		this._$tagit.tagit({
			availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
			autocomplete: {delay: 0, minLength: 2},
			showAutocompleteOnFocus: true,
		});
	}
	
	return Header;
});