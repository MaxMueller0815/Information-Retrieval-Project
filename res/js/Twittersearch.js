var TweetManager;

(function ($) {
	$(function () {
		TweetManager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/collection1/'
		});
		UserManager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/collection2/'
		});
		TweetManager.addWidget(new AjaxSolr.ResultWidget({
			id: 'result',
			target: '#docs'
		}));
		TweetManager.init();
		UserManager.init();

		$("#search").submit(function(event) {
			var term = $("#search-field").val();
			requestFullText("content:" + term);
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

	_getFavButton = function(id) {
		var output = "<button type='button' id='" + id + "-add' title='Zu Favoriten hinzufügen' class='btn btn-default btn-lg addFav-button'> " +
		"<span class='glyphicon glyphicon-star-empty'></span></button>";

		if (_checkExistingId(id)) {
			output = "<button type='button' id='" + id + "-add' title='Zu Favoriten hinzufügen' class='btn btn-default btn-lg addFav-button'> " +
			"<span class='glyphicon glyphicon-star'></span></button>";
			return output;
		}
		return output;
	}

	_regOnClickInfo = function (doc) {
		$("#"+doc.status_id+"-info").click(function () {
			var tweet = $(this).html();
			$("#modal-content").empty();
			$("#modal-content").append(_buildDetailedTweet(doc));
			$("#myModal").modal();
		});
	}

	_checkExistingId = function(id) {
		var i;
		for (i = 0; i < favIds.length; i++) {
			if (favIds[i] === id) {
				return true;
			}
		}
		return false;
	}

	_regOnClickAddButtons = function () {
		$(".addFav-button").click(function (event) {
			if(!_checkExistingId(event.target.id)) {
				$(this).find("span").removeClass("glyphicon-star-empty");
				$(this).find("span").addClass("glyphicon-star");
				var tweet = $(this).parents(".one-tweet").html();
				tweet = tweet.replace(event.target.id, event.target.id+"-rem");
				_addTweet(tweet, event.target.id);
			} else {
				$(this).find("span").removeClass("glyphicon-star");
				$(this).find("span").addClass("glyphicon-star-empty");
				_removeTweet(event.target.id);
			}
		});
	}

	_addTweet = function(tweet, id) {
		favIds.push(id);
		$(".fav-punkt").append(
			"<div id='"+ id +"-fav' class='one-fav-punkt'>"+
			"<div class='one-tweet col-sm-9'>" + tweet + "</div>"+
			"<div class='term-box col-sm-3'>" + 
			"<p class='terms'>" + $("#search-field").val() + "</p>" +
			"</div>"+
			"</div>"
			);
		_registerRemoveListener(id);
		_regOnClickOnTerms();
	}

	_registerRemoveListener = function(id) {
		$("#"+id+"-rem").click(function (event) {
			$("#"+id).find("span").removeClass("glyphicon-star");
			$("#"+id).find("span").addClass("glyphicon-star-empty");
			var index = favIds.indexOf(id);
			favIds.splice(index, 1);
			$("#"+id+"-fav").remove();
		})
	}

	_removeTweet = function(id) {
		var index = favIds.indexOf(id);
		favIds.splice(index, 1);
		$("#"+id+"-fav").remove();
	}

	_regOnClickOnTerms = function () {
		$(".one-fav-punkt").on("click", "div.term-box", function () {
			var content = $(this).text();
			document.getElementById('search-field').value = content;
			$('#search-button').submit();
		});
	}

	_buildDetailedTweet = function(doc) {
		content = linkify(doc.content)
		var output = 
		"<div class='detail-content'><div id='bild-container'> " +
		"<img class='avatar col-sm-2' onerror=\"this.src='res/images/no_image.png'\" src='" + doc.image_url + "'alt='' />" + 
		"</div>" +"<div class='name-container col-sm-10'>"+
		"<span class='user-name name-container-content'>" + doc.screen_name + " </span>"+
		"<span class='tweet-date name-container-content'> "+ doc.date + " </span>"+
		"<span class='tweet-time name-container-content'> "+ doc.time + " </span></div>"+
		"<div class='text-container col-sm-10'>"+
		"<div class='text'>"+ content +"</div> </div>"+
		"<div class='detail-user'>" + doc.location +"</div>" +
		"</div>";
		return output;
	}

	linkify = function(text) {
		var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
		return text.replace(urlRegex, function(url) {  
			return '<a href="' + url + '" target="_blank">' + url + '</a>';  
		})
	}
})(jQuery);