var UserManager;
var dates = ["2014-06-02", "2014-06-03", "2014-06-04", "2014-06-05", "2014-06-06"];
var clearStack = true;
var stackCount = 0;
var lastRequest;
var useDismax = true;

(function ($) {
	$(function () {
		UserManager = new AjaxSolr.Manager({
			solrUrl: 'http://localhost:8983/solr/collection2/'
		});
		UserManager.addWidget(new AjaxSolr.ResultWidgetDetailed({
			id: 'result',
			target: '#modal-content'
		}));
		UserManager.init();

		$("#search").submit(function(event) {
			stackCount = 0;
			useDismax = true;
			var term = $("#search-field").val();
			requestFullText(term);
			event.preventDefault();
		});

		$("#search-suggestion").click(function(event) {
			stackCount = 0;
			useDismax = true;
			requestFullTextUnconverted(buildQuery());
			event.preventDefault();
		});

		$("#search-extended").click(function(event) {
			stackCount = 0;
			useDismax = false;
			defaultHandlerRequest(buildUserQuery());
			event.preventDefault();
		});

		$(".date-box").click(function(event){
			$("#"+event.target.id).css("background-color", "#5BC0DE");
		});
	});

	requestFullText = function(term) {
		term = term.replace(/[^a-zA-Z0-9]/g, '');
		var request = "q="+ term +"&qf=hashtag_ci^2 content^1 &bf=div(ord(follower),300)^0.7&tie=0.1";
		$.ajax({
			url: "http://localhost:8983/solr/collection1/select?qt=dismax&rows=10&start="+stackCount+"&"+ request +"&wt=json",
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'json.wrf',
			success: function(data) {
				afterRequest(data.response.docs);
				lastRequest = request;
				registerMoreButton();
				clearStack =true;
			}
		});
	}

		requestFullTextUnconverted = function(term) {
		var request = "q="+ term +"&qf=hashtag_ci^2 content^1 &bf=div(ord(follower),300)^0.7&tie=0.1";
		$.ajax({
			url: "http://localhost:8983/solr/collection1/select?qt=dismax&rows=10&start="+stackCount+"&"+ request +"&wt=json",
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'json.wrf',
			success: function(data) {
				afterRequest(data.response.docs);
				lastRequest = request;
				registerMoreButton();
				clearStack =true;
			}
		});
	}

	appendRequest = function(request) {
		$.ajax({
			url: "http://localhost:8983/solr/collection1/select?qt=dismax&rows=10&start="+stackCount+"&"+ request +"&wt=json",
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'json.wrf',
			success: function(data) {
				afterRequest(data.response.docs);
				lastRequest = request;
				registerMoreButton();
				clearStack =true;
			}
		});
	}

	defaultHandlerRequest = function(request) {
		$.ajax({
			url: "http://localhost:8983/solr/collection1/select?rows=10&start="+stackCount+"&"+ request +"&wt=json",
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'json.wrf',
			success: function(data) {
				afterRequest(data.response.docs);
				lastRequest = request;
				registerMoreButton();
				clearStack =true;
			}
		});
	}

	registerMoreButton = function() {
		$("#more-button").click(function(event) {
			clearStack = false;
			stackCount += 10;
			if (useDismax) {
				appendRequest(lastRequest);
			} else {
				defaultHandlerRequest(lastRequest);
			}
		});
	}

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
			UserManager.store.addByValue('q', 'user_id:' + doc.user_id);
			UserManager.doRequest();
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
		"</div>";
		return output;
	}

	linkify = function(text) {
		var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
		return text.replace(urlRegex, function(url) {  
			return '<a href="' + url + '" target="_blank">' + url + '</a>';  
		})
	}

	afterRequest = function (docs) {
		if (clearStack) {
			$("#docs").empty();
		}
		for (var i = 0, l = docs.length; i < l; i++) {
			var doc = docs[i];
			$("#docs").append(template(doc));
			_regOnClickInfo(doc);
		}
		_regOnClickAddButtons();
	}

	template = function (doc) {
		$("#more-button").remove();
		var content = linkify(doc.content)
		var output = 
		"<div id='" + doc.status_id+"' class='one-tweet col-sm-12'>" + 
		"<div id='bild-container'> " +
		"<img class='avatar col-sm-2' onerror=\"this.src='res/images/no_image.png'\" src='" + doc.image_url + "'alt='' />" + 
		"</div>" +
		"<div class='name-container col-sm-10'>"+
		"<span class='user-name name-container-content'>" + doc.screen_name + " </span>"+
		"<span class='tweet-date name-container-content'> "+ doc.date + " </span>"+
		"<span class='tweet-time name-container-content'> "+ doc.time + " </span>"+
		"</div>"+
		"<div class='text-container col-sm-10'>"+
		"<span class='text'>"+ content +"</span> "+
		"</div>"+ _getFavButton(doc.status_id)+ "<button type='button' id='" + doc.status_id + 
		"-info' title='Zu Favoriten hinzufügen' class='btn btn-default btn-lg info-button'> " +
		"<span class='glyphicon glyphicon-info-sign'></span></button>"
		+ "</div><button id='more-button' type='button' class='show-more btn btn-info col-sm-12'>Give me more!</button>";
		return output;
	}
})(jQuery);