define([
	'jQuery',
], function()
{
	
	function SideBar()
	{
		this._$win = $(window);
		this._$wrapSidebar = $('.js-wrap-sidebar');
		this._$sidebar = $('.js-sidebar');
		SideBar._isLockWrapSidebar = false;
		SideBar._isShowWrapSidebar = null;
		SideBar._defaultWrapSidebar = null;
	};
	
	SideBar.prototype.init = function()
	{
		var self = this;
		
		var updateWrapSidebar = function()
		{
			if(self._$wrapSidebar.css('display') == 'block'){
				SideBar._defaultWrapSidebar = true;
				SideBar._isShowWrapSidebar = true;
			}else{
				SideBar._defaultWrapSidebar = false;
				SideBar._isShowWrapSidebar = false;
			}			
			
			if(self._$win.width() <= 1200){
				SideBar._defaultWrapSidebar = false;
			}else{
				SideBar._defaultWrapSidebar = true;
			}
			
			if(SideBar._isLockWrapSidebar === true){
				self._$wrapSidebar.hide();
			}else{
				self._$wrapSidebar.removeAttr('style');
			}
		}
		
		updateWrapSidebar();
		
		self._$win.on('resize.sidebar', updateWrapSidebar);
	}
	
	SideBar.prototype.showWrapSidebar = function()
	{
		if(SideBar._defaultWrapSidebar === false) return;
		this._$wrapSidebar.show();
		SideBar._isShowWrapSidebar = true;
	}
	
	SideBar.prototype.hideWrapSidebar = function()
	{
		if(SideBar._defaultWrapSidebar === false) return;
		this._$wrapSidebar.hide();
		SideBar._isShowWrapSidebar = false;
	}
	
	SideBar.prototype.lockWrapSidebar = function()
	{
		SideBar._isLockWrapSidebar = true;
	}
	
	SideBar.prototype.unlockWrapSidebar = function()
	{
		SideBar._isLockWrapSidebar = false;
	}
	
	return SideBar;
});