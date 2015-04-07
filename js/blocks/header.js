define([
	'CoreParams',
	'Tagit',
], function(CoreParams)
{
	
	function Header()
	{
		this._layoutPath = 'template/blocks/header';
		this._$header = $('.js-header');
	};
	
	Header.prototype.init = function()
	{
		
		this.initLayout();
	}
	
	Header.prototype.initLayout = function()
	{
		var self = this;
		_coreParams = new CoreParams;
		
		var data = {
			'site': {
				'homePage': '#/' + _coreParams.getLanguage()
			},
			'user': {
				'firstName': 'Linh',
				'lastName': 'Nguyen',
				'avatar': 'img/user/avatar.png'
			}
		};
		
		this._$header.render(this._layoutPath, data, function(){
			self.initFunction();
		});
	}
	
	Header.prototype.initFunction = function()
	{
		this.Tagit();
	}
	
	Header.prototype.Tagit = function()
	{
		this._$header.find('.js-tagit').tagit({
			availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
			autocomplete: {delay: 0, minLength: 2},
			showAutocompleteOnFocus: true,
		});
	}
	
	return Header;
});