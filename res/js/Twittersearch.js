var Manager;
(function ($) {
	$(function () {
		Manager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/'
		});
		Manager.addWidget(new AjaxSolr.ResultWidget({
			id: 'result',
			target: '#one-tweet'
		}));
		Manager.init();

		$("#search").submit(function(event) {
			requestFullText($("#search-field").val());
			event.preventDefault();
		});
	});

	var requestFullText = function(term) {
		Manager.store.addByValue('q', 'content:' + term);
		Manager.doRequest();
	};
})(jQuery);