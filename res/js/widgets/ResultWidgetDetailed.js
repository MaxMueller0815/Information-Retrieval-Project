var favIds = [];

(function ($) {
	AjaxSolr.ResultWidgetDetailed = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
				var doc = this.manager.response.response.docs[i];
				$(this.target).append(this.template(doc));
			}
		},

		template: function (doc) {
			if (doc.description === "null") {
				doc.description = "---";
			}
			var output = 
			"<div class='detail-user'><span class='more-info'>Mehr über den Nutzer "+ doc.screen_name +":</span>" +
			"</br><div><span class='more-info'>Beschreibung:</span> "+ doc.description +"</div><div><span class='more-info'>Ort:</span> "+ doc.location +
			"</div><div><span class='more-info'>Follower:</span> "+ doc.follower +"</div>";
			return output;
		}
	});
})(jQuery);
