(function ($) {
	AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			$(this.target).empty();
			for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
				var doc = this.manager.response.response.docs[i];
				$(this.target).append(this.template(doc));
			}
		},

		template: function (doc) {
			var output = "<div><p> " +
			"<img class='profile-picture' src='" + doc.image_url + "'/>" +
			doc.screen_name + "</br>" + 
			doc.time + "     " + doc.date +
			"</p></div>" +
			"<div><p>" + doc.content + "</p></div>";
			return output;
		}
	});
})(jQuery);