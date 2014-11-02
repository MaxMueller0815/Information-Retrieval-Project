var idLocations = ["#check-ort-1", "#check-ort-2", "#check-ort-3"];
var idPeople = ["#check-person-1", "#check-person-2", "#check-person-3"];
var idHashtags = ["#check-hashtag-1", "#check-hashtag-2", "#check-hashtag-3", "#check-hashtag-4", "#check-hashtag-5"];
var idProducts = ["#check-produkt-1", "#check-produkt-2", "#check-produkt-3"];
var idOwnFlag = ["#check-eigen-1", "#check-eigen-2", "#check-eigen-3", "#check-eigen-4"];
var idOwnText = ["#text-eigen-1", "#text-eigen-2", "#text-eigen-3", "#text-eigen-4"];

var eLocations = [];
var eUsers = [];
var eContent = [];
var eDate = [];

var buildUserQuery = function() {
	var queryContent = "q=";

	if ($("#hashtag-search").val() != "") {
		var hashtags = $("#hashtag-search").val().replace(" ", ",");
		queryContent += "hashtag_ci:" + hashtags + " AND ";

	}
	if ($("#user-search").val() != "") {
		var user = $("#user-search").val().replace(" ", ",");
		queryContent += "screen_name:" + user + " AND ";
	}
	if ($("#location-search").val() != "") {
		var location = $("#location-search").val().replace(" ", ",");
		queryContent += "location:" + location + " AND ";
	}
	if ($("#content-search").val() != "") {
		var content = $("#content-search").val().replace(" ", ",");
		queryContent += "content:" + content;
	} else {
		queryContent += "content:*";
	}

	return queryContent;
};

var buildQuery = function() {
	var queryContent = "";

	if (buildQueryLocations() != "") {
		queryContent += buildQueryLocations();
	}

	if (buildQueryPeople() != "") {
		queryContent += buildQueryPeople();
	}

	if (buildQueryHashtags() != "") {
		queryContent += buildQueryHashtags();
	}

	if (buildQueryProducts() != "") {
		queryContent += buildQueryProducts();
	}

	return queryContent;
};

var buildQueryLocationsCustom = function() {
	var location = $(value).val();
	location = location.match(/(".*?")|(\S+)/g);
	location = location.split(",");

	return location;
};

var buildQueryUsersCustom = function() {
	var location = $(value).val();
	location = location.match(/(".*?")|(\S+)/g);
	location = location.split(",");

	return location;
};

var buildQueryHashtagsCustom = function() {
	var location = $(value).val();
	location = location.match(/(".*?")|(\S+)/g);
	location = location.split(",");

	return location;
};

var buildQueryLocations = function() {
	var location = "";

	$.each(idLocations, function(index, value) {
		if($(value).is(":checked")) {
			location += $(value).val() + " ";
		}
	});

	return location;
};

var buildQueryPeople = function() {
	var people = "";

	$.each(idPeople, function(index, value) {
		if($(value).is(":checked")) {
			people += $(value).val() + " ";
		}
	});

	return people;
};

var buildQueryHashtags = function() {
	var hashtags = "";

	$.each(idHashtags, function(index, value) {
		if($(value).is(":checked")) {
			hashtags += $(value).val() + " ";
		}
	});

	return hashtags;
};

var buildQueryProducts = function() {
	var products = "";

	$.each(idProducts, function(index, value) {
		if($(value).is(":checked")) {
			products += $(value).val() + " ";
		}
	});

	return products;
};

var buildQueryOwn = function() {
	var own = "";

	$.each(idFlag, function(index, value) {
		if($(value).is(":checked")) {
			own += $(idOwnText[index]).val() + " ";
		}
	});

	return own;
};