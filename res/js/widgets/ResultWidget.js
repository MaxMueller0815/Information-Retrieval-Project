(function ($) {
	AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			$(this.target).empty();
			for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
				var doc = this.manager.response.response.docs[i];
				$(this.target).append(this.template(doc));
			}
			_registerOnClickListeners();
		},

		template: function (doc) {
			var output = 
			"<div id='" + doc.status_id+"' class='one-tweet col-sm-12'>" + 
				"<div id='bild-container'> " +
					"<img class='avatar col-sm-2' src='" + doc.image_url + "'alt='' />" + 
				"</div>" +
				"<div class='name-container col-sm-10'>"+
					"<span class='user-name name-container-content'>" + doc.screen_name + " </span>"+
					"<span class='tweet-date name-container-content'> "+ doc.date + " </span>"+
					"<span class='tweet-time name-container-content'> "+ doc.time + " </span>"+
				"</div>"+
				"<div class='text-container col-sm-10'>"+
                	"<span class='text'>"+ doc.content +"</span> "+
	            "</div>"+
	            "<button type='button' title='Zu Favoriten hinzufügen' class='btn btn-default btn-lg addFav-button'> " +
  					"<span class='glyphicon glyphicon-star-empty'></span>" +
				"</button>" +
            "</div>";
            //registerClicklistenerOnNewObjects
				// $(".one-tweet").on("click", "button.addFav-button", function () {
				// 	var tweet = $(this).parents(".one-tweet").html();
				// 	$(".fav-punkt").append("<div class='one-tweet col-sm-9'>" + tweet + "</div>")

				// 	console.log(tweet);

				// });

			return output;
		}
	});
		_registerOnClickListeners = function () {
			_regOnCLickAddButton();
			_regOnCLickTweet();
		}

		_regOnCLickTweet = function () {
			$("#docs").on("click", ".one-tweet", function () {
				var tweet = $(this).html();
				$(".modal-body").append(
					"<div class='one-tweet'>" + 
					tweet +
					"</div>"
	                );
			});
		}

		_regOnCLickAddButton = function () {
			$(".one-tweet").on("click", "button.addFav-button", function () {
				var tweet = $(this).parents(".one-tweet").html();
				$(".fav-punkt").append(
					"<div class='one-fav-punkt'>"+
						"<div class='one-tweet col-sm-9'>" + tweet + "</div>"+
						"<div class='term-box col-sm-3'>" + 
			                  "<p class='terms'>" + document.getElementById("search-field").value + "</p>" +
		                "</div>"+
	                "</div>"
	                );

				_regOnCLickOnTerms();
			});
		}

		_regOnCLickOnTerms = function () {
			$(".one-fav-punkt").on("click", "div.term-box", function () {
				var content = $(this).text();
				document.getElementById('search-field').value = content;
				$('#search-button').submit();
			});
		}

})(jQuery);
