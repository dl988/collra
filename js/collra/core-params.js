define([], function()
{
	var language  = 'en';
	var params  = null;
	var url  = null;
	
	function CoreParams(){};
	
	CoreParams.prototype.setLanguage = function(name)
	{
		language = name;
	}
	
	CoreParams.prototype.getLanguage = function()
	{
		return language;
	}
	
	CoreParams.prototype.setParams = function(data)
	{
		params = data;
	}
	
	CoreParams.prototype.getParams = function()
	{
		return params;
	}
	
	CoreParams.prototype.setBaseUrl = function(data)
	{
		url = data;
	}
	
	CoreParams.prototype.getBaseUrl = function()
	{
		return url;
	}
	
	return CoreParams;
});