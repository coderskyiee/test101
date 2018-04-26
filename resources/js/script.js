//hiding error

$('.err').hide();


// shift+enter for new line.
//enter to post 

$("#comment").keydown(function (e) {
	if (e.keyCode == 13 && !e.shiftKey) {
		e.preventDefault();
		$("#comment-btn").click();
	}
});

//comment button 

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

	var date = new Date();
	date = date.toString();
	date = date.slice(4, 24);
	timestamp = date;

	if (name.trim() == '' || comment.trim() == '') {
		$('.err').show();

	} else {
		$('.err').hide();
		var refobjarr = JSON.parse(localStorage.getItem("comments")) || [];

		console.log(wcheck);
		if (wcheck.trim() == '+weather') {
			var l = comment.length;
			var wcity = comment.slice(9, l);
			console.log(wcity);
			var url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=105a01a184626ca822bc272f00e1f386&q=' + wcity;
			var data;
			$.ajax({
				url: url,
				data: data,
				error: function () {
					alert("enter valid city name");
					location.reload();
				},
				success: function (data) {
					console.log(status);
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
						timestamp: timestamp,
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
					location.reload();

				}
			});

		} else {
			var obj = {
				name: name,
				weather: false,
				comment: comment,
				timestamp: timestamp
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

			location.reload();
		}


		$('#name').val('');
		$('#comment').val('');


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
		var rowElement = $('<div class="comment-box"><img src="https://randomuser.me/api/portraits/men/86.jpg"><h4>' + el.name + '</h4><div class="comment-timestamp"><i class="ion-ios-clock-outline"> ' + el.timestamp + '</i></div><div style="clear:both;"></div><p><i class="ion-quote"></i>' + el.comment + '</p></div>');
		$('.comment-section').append(rowElement);
	}

	function addWeather(el) {
		console.log(el);
		var rowElement = $('<div class="weather-box"><img src="https://randomuser.me/api/portraits/men/86.jpg"><h4>' + el.name + '</h4><div class="comment-timestamp"><i class="ion-ios-clock-outline"> ' + el.timestamp + '</i></div><div style="clear:both;"></div><h2><i class="ion-ios-location-outline"></i>' + el.wcity + '</h2><h2 class="comment-temp"><i class="ion-thermometer"></i>' + el.temp + '°C</h2></div>');
		$('.comment-section').append(rowElement);
	}



} else {
	$('.no-comments').show();
}