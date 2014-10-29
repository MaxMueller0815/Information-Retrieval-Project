var TweetManager;

(function ($) {
	$(function () {
		TweetManager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/collection1/'
		});
		TweetManager.addWidget(new AjaxSolr.ResultWidget({
			id: 'result',
			target: '#docs'
		}));
		TweetManager.init();

		UserManager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/collection2/'
		});

		$("#search").submit(function(event) {
			var term = $("#search-field").val();
			requestFullText("content:" + term);
			addToPrevious(term)
			event.preventDefault();
		});

		$("#search-again").click(function(event) {
			requestFullText(buildQuery());
			event.preventDefault();
		});
	});

	var requestFullText = function(term) {
		TweetManager.store.addByValue('q', term);
		TweetManager.doRequest();
	};

	var addToPrevious = function(term) {
		$("#previous").append("<p>" + term + "</p>")
	};
})(jQuery);