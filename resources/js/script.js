$("#comment").keydown(function (e) {
	if (e.keyCode == 13 && !e.shiftKey) {
		e.preventDefault();
		$("#comment-btn").click();
	}
});

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
	
	if(name)
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

	}

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

});
