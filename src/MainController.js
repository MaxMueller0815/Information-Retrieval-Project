SearchEngine.MainController = (function() {
	var that = {},
	uiController ,
	searchController,

	init = function(UIController, SearchController) {
		
		uiController = UIController;
		searchController = SearchController;
		return that;
	};
	

	that.init = init;
	return that;
})();