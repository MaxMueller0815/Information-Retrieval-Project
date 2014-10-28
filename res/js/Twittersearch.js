var TweetManager;
var UserManager;

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
			requestFullText(term);
			addToPrevious(term)
			event.preventDefault();
		});
	});

	var requestFullText = function(term) {
		TweetManager.store.addByValue('q', 'content:' + term);
		TweetManager.store.addByValue('q', 'hashtag:wwdc');
		TweetManager.doRequest();
	};

	var addToPrevious = function(term) {
		$("#last-search-terms").append("<p class='previous-search-term'>" + term + "</p>")
	};
})(jQuery);