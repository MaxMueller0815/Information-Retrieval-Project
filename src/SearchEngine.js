SearchEngine = {

	init: function() {
	
		UIController = SearchEngine.UIController.init();
		SearchController = SearchEngine.SearchController.init();

		SearchEngine.MainController.init(UIController, SearchController);
	}
};
		

	
