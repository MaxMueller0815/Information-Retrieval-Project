SearchEngine.UIController = (function() {
	var that = {},
	$searchTerm,
	$buttonShowRight,
	$buttonSearch,
	isRightSighthidden = true,

	init = function() {
		_initUI();
		_registerListeners();
		return that;
	},

	_handleClickOnShowRight = function () {
		if (!isRightSighthidden) {
			$('#options').hide();
			isRightSighthidden = true;
		}else {
			$('#options').show();
			isRightSighthidden = false;
		}
	},

	_handleClickOnTerm = function () {
	},

	_registerListeners = function () {
		$buttonShowRight.on('click', _handleClickOnShowRight);
		$searchTerm.on('click', _handleClickOnTerm);

		_registerExtraListener();
		_registerPopularSearchTermsClicklistener();
	},

	_registerPopularSearchTermsClicklistener = function () {
		$("#last-search-terms").on("click", "li", function () {
			var content = $(this).text();
			document.getElementById('search-field').value = content;
			$buttonSearch.submit();
			useDismax = true;
		});
	},

	_registerExtraListener = function () {
		$buttonSearch.on('click', _handleClickOnSearch);
		_openTweetAndAddToVerlauf();
	},

	_handleClickOnSearch = function () {
		document.getElementById("search-button").onclick = null;
	},

	_openTweetAndAddToVerlauf = function () {

	},

	_initUI = function () {
		$('#options').hide();
		$searchTerm = $('.previous-search-term');
		$buttonShowRight = $('#button-show-right');
		$buttonSearch = $('#search-button');
	};

	that.init = init;
	return that;
})();