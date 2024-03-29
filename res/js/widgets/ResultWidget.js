var favIds = [];

(function ($) {
	AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			$(this.target).empty();
			for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
				var doc = this.manager.response.response.docs[i];
				$(this.target).append(this.template(doc));
				_regOnClickInfo(doc);
			}
			_regOnClickAddButtons();
		},

		template: function (doc) {
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
			 + "</div>";
			return output;
		}
	});
})(jQuery);
