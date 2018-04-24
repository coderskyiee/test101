$("#comment").keydown(function (e) {
	if (e.keyCode == 13 && !e.shiftKey) {
		e.preventDefault();
		$("#comment-btn").click();
	}
});

$('.err').hide();

$("#comment-btn").click(function (e) {
	e.preventDefault();

	var name = $('#name').val();
	var comment = $('#comment').val();
	var weather = false;
	var wcity = '';
	var wcheck = comment.slice(0, 8);
	var temp;
	var description;
	var icon;
	var timestamp;

	if (name.trim() == '' || comment.trim() == '') {
		$('.err').show();

	} else {
		$('.err').hide();
		var refobjarr = JSON.parse(localStorage.getItem("comments")) || [];

		console.log(wcheck);
		if (wcheck == '+weather') {
			var l = comment.length;
			var wcity = comment.slice(9, l);
			console.log(wcity);
			var url = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=105a01a184626ca822bc272f00e1f386&q=' + wcity;
			$.get(url, function (data, status) {
				if (status) {
					temp = data.list[0].main.temp;
					description = data.list[0].weather[0].description;
					icon = data.list[0].weather[0].icon;
					console.log(description);

					var obj = {
						name: name,
						weather: true,
						wcity: wcity,
						temp: temp,
						description: description,
						icon: "http://openweathermap.org/img/w/" + icon + ".png"
					};

					//object entry


					if (refobjarr.length > 0) {
						refobjarr = JSON.parse(localStorage.getItem("comments"));
						refobjarr.unshift(obj);
						localStorage.setItem("comments", JSON.stringify(refobjarr));
						console.log(JSON.parse(localStorage.getItem("comments")));

					} else {

						refobjarr.unshift(obj);
						localStorage.setItem("comments", JSON.stringify(refobjarr));
						console.log(JSON.parse(localStorage.getItem("comments")));
					}


				} else {
					alert("enter the correct city name");
				}
			});

		} else {
			var obj = {
				name: name,
				weather: false,
				comment: comment
			};

			if (refobjarr.length > 0) {
				refobjarr = JSON.parse(localStorage.getItem("comments"));
				refobjarr.unshift(obj);
				localStorage.setItem("comments", JSON.stringify(refobjarr));
				console.log(JSON.parse(localStorage.getItem("comments")));

			} else {

				refobjarr.unshift(obj);
				localStorage.setItem("comments", JSON.stringify(refobjarr));
				console.log(JSON.parse(localStorage.getItem("comments")));
			}
		}


	}


});


var refobjarr = JSON.parse(localStorage.getItem("comments")) || [];

if (refobjarr.length > 0) {
	$('.no-comments').hide();

	refobjarr.forEach(function (element) {
		if (element.weather == true) {
			addWeather(element);
		} else {
			addComment(element);
		}
	});

	function addComment(el) {
		var rowElement = $('<div class="comment-box"><h4>' + el.name + '</h4><p>' + el.comment + '</p></div>');
		$('.comment-section').append(rowElement);
	}

	function addWeather(el) {
		console.log(el);
		var rowElement = $('<div class="weather-box"><h4>' + el.name + '</h4><p>' + el.wcity+' '+el.temp+ '</p><img src="'+el.icon+'"><p>'+el.description+'</p></div>');
		$('.comment-section').append(rowElement);
	}



} else {
	$('.no-comments').show();
}
