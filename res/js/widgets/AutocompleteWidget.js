$(function() {
	$("#search-field").on('input', function(){
		$.ajax({
			'url': 'http://localhost:8983/solr/suggest',
			'data': {'wt':'json', 'q': $("#search-field").val()},
			'success': function(data) { 
				$("#search-field").autocomplete({
					source: data.spellcheck.suggestions[1].suggestion
				});
			},
			'dataType': 'jsonp',
			'jsonp': 'json.wrf'
		});
	}
	);
});