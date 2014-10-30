SearchEngine.UIController = (function() {
	var that = {},
	$searchTerm,
	$buttonShowRight,
	$buttonSearch,
	isRightSighthidden = false,

	init = function() {
		_initUI();
		_registerListeners();
		return that;
	},

	_handleClickOnShowRight = function () {
		if (!isRightSighthidden) {
			document.getElementById('options').className = "tab-pane jumbotron col-sm-5 my-jumbotron fade hidden";
			isRightSighthidden = true;
		}else {
			document.getElementById('options').className = "tab-pane jumbotron col-sm-5 my-jumbotron fade in";
			isRightSighthidden = false;
		}

	},

	_handleClickOnTerm = function () {
		//kommt nicht bis hierher. wird nicht ausgeführt aus einem mir nicht ersichtlichen Grund
		console.log("click");
	},

	_registerListeners = function () {
		$buttonShowRight.on('click', _handleClickOnShowRight);

		//um zu sehen, welches element angeklickt wird
		$(document).click(function(e) {
    		// console.log(e.target);//e.target will be the dom element that was clicked on
		});
		$searchTerm.on('click', _handleClickOnTerm);

		_registerExtraListener();
		_registerPopularSearchTermsClicklistener();

	},

	_registerPopularSearchTermsClicklistener = function () {
		$("#popular-search-terms").on("click", "li", function () {
			var content = $(this).text();
			document.getElementById('search-field').value = content;
			$buttonSearch.submit();

			// document.forms["Search"].submit();

		});
	},

	_registerExtraListener = function () {
		$buttonSearch.on('click', _handleClickOnSearch);
		_addToFav();
		_openTweetAndAddToVerlauf();
		
	},

	_handleClickOnSearch = function () {
		document.getElementById("search-button").onclick = null;
		console.log("fucking button was clicked");
		_addToFav();
	},

	_addToFav = function () {
		$(".one-tweet").on("click", "button.addFav-button", function () {
			var tweet = $(this).parents(".one-tweet").html();
			$(".fav-punkt").append("<div class='one-tweet col-sm-9'>" + tweet + "</div>");

	        // var sel = $(this).text(),
	        //     ul = $(this).parents("ul");
	        // console.log(sel);
	        // ul.find("span").text(sel);
	        // ul.children("li:not('#first')").toggle();
	        // ul.find("li").removeClass("selected_option");
	        // ul.toggleClass("open");
	        // $(this).addClass("selected_option");
    	});
	},

	_openTweetAndAddToVerlauf = function () {

	},

	_initUI = function () {
		$searchTerm = $('.previous-search-term');
		$buttonShowRight = $('#button-show-right');
		$buttonSearch = $('#search-button');
	};

	that.init = init;
	return that;
})();