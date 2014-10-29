var idLocations = ["#check-ort-1", "#check-ort-2", "#check-ort-3"];
var idPeople = ["#check-person-1", "#check-person-2", "#check-person-3"];
var idHashtags = ["#check-hashtag-1", "#check-hashtag-2", "#check-hashtag-3", "#check-hashtag-4", "#check-hashtag-5"];
var idProducts = ["#check-produkt-1", "#check-produkt-2", "#check-produkt-3"];
var idOwnFlag = ["#check-eigen-1", "#check-eigen-2", "#check-eigen-3", "#check-eigen-4"];
var idOwnText = ["#text-eigen-1", "#text-eigen-2", "#text-eigen-3", "#text-eigen-4"];

	var buildQuery = function() {
		var queryLocation = "locations:";
		var queryContent = "content:";
		var queryPeople = "screen_name:";
		var queryHashtag = "hashtag:"
		var finalQuery = "";

		if (buildQueryLocations() != "") {
			queryLocation += buildQueryLocations();
			queryContent += buildQueryLocations();
		}

		if (buildQueryPeople() != "") {
			queryPeople += buildQueryPeople();
			queryContent += buildQueryPeople();
		}

		if (buildQueryHashtags() != "") {
			queryHashtag += buildQueryHashtags();
		}

		if (buildQueryProducts() != "") {
			queryContent += buildQueryProducts();
		}

		// put it together

		if (queryContent.contains(",")) {
			if (finalQuery != "") {
				finalQuery += "+OR+"
			}
			finalQuery += queryContent;
		}

		if (queryPeople.contains(",")) {
			if (finalQuery != "") {
				finalQuery += "+OR+"
			}
			finalQuery += queryPeople;
		}

		if (queryLocation.contains(",")) {
			if (finalQuery != "") {
				finalQuery += "+OR+"
			}
			finalQuery += queryLocation;
		}

		if (queryHashtag.contains(",")) {
			if (finalQuery != "") {
				finalQuery += "+OR+"
			}
			finalQuery += queryHashtag;
		}

		return finalQuery
	};

	var buildQueryLocations = function() {
		var location = "";

		$.each(idLocations, function(index, value) {
			if($(value).is(":checked")) {
				location += $(value).val() + ",";
			}
		});

		return location;
	};

	var buildQueryPeople = function() {
		var people = "";

		$.each(idPeople, function(index, value) {
			if($(value).is(":checked")) {
				people += $(value).val() + ",";
			}
		});

		return people;
	};

	var buildQueryHashtags = function() {
		var hashtags = "";

		$.each(idHashtags, function(index, value) {
			if($(value).is(":checked")) {
				hashtags += $(value).val() + ",";
			}
		});

		return hashtags;
	};

	var buildQueryProducts = function() {
		var products = "";

		$.each(idProducts, function(index, value) {
			if($(value).is(":checked")) {
				products += $(value).val() + ",";
			}
		});

		return products;
	};

	var buildQueryOwn = function() {
		var own = "";

		$.each(idFlag, function(index, value) {
			if($(value).is(":checked")) {
				own += $(idOwnText[index]).val() + ",";
			}
		});

		return own;
	};