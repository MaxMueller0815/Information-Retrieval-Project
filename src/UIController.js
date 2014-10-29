SearchEngine.UIController = (function() {
	var that = {},
	$searchTerm,
	$buttonShowRight,
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
    		console.log(e.target);//e.target will be the dom element that was clicked on
		});
		$searchTerm.on('click', _handleClickOnTerm);


	},


	_initUI = function () {
		$searchTerm = $('.previous-search-term');
		$buttonShowRight = $('#button-show-right');
	};

	that.init = init;
	return that;
})();