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
		
		var vi_data = {
			'site': {
				'homePage': '#/' + _coreParams.getLanguage()
			},
			'user': {
				'firstName': 'Linh_vi',
				'lastName': 'Nguyen_vi',
				'avatar': 'img/user/avatar.png'
			}
		};
		
		var en_data = {
			'site': {
				'homePage': '#/' + _coreParams.getLanguage()
			},
			'user': {
				'firstName': 'Linh',
				'lastName': 'Nguyen',
				'avatar': 'img/user/avatar.png'
			}
		};
		
		if(_coreParams.getLanguage() == 'vi'){
			data = vi_data;
		}else{
			data = en_data;
		}
		
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