$(document).ready(function () {
	$("#results-page").hide();
	$("#error").hide();

	let favorites = [];
	$("#add-btn").on('click', function (event) {
		event.preventDefault();
		$("#results-page").show();

		if ($('#user-input').val() === '') {
			return false;
		} else {
			localStorage.clear();
			localStorage.setItem("input-address", $('#user-input').val());

			$('html,body').animate({
				scrollTop: $("#results-page").offset().top
			},
				'slow');

			$('#page-input').val(localStorage.getItem("input-address"));

			drawInitMap();
			getYelpSearchResults();
		}
	});

	$("#user-input").keypress(function (event) {
		if (event.which == 13) {
			event.preventDefault();
			$("#results-page").show();

			if ($('#user-input').val() === '') {
				return false;
			} else {
				localStorage.clear();
				localStorage.setItem("input-address", $('#user-input').val());

				$('html,body').animate({
					scrollTop: $("#results-page").offset().top
				},
					'slow');

				$('#page-input').val(localStorage.getItem("input-address"));

				drawInitMap();
				getYelpSearchResults();
			}
		}
	});

	$("#back2Top").click(function (event) {
		event.preventDefault();
		localStorage.clear();
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
		return false;
	});

	$("#page-btn").on('click', function (event) {
		event.preventDefault();

		if ($('#page-input').val() === '') {
			return false;
		} else {
			localStorage.clear();
			localStorage.setItem("input-address", $('#page-input').val());

			drawInitMap();
			getYelpSearchResults();
		}

	});

	$("#page-input").keypress(function (event) {
		if (event.which == 13) {
			event.preventDefault();

			if ($('#page-input').val() === '') {
				return false;
			} else {
				localStorage.clear();
				localStorage.setItem("input-address", $('#page-input').val());

				drawInitMap();
				getYelpSearchResults();
			}

		};
	});

	$("#content-results").on('click', '.direction', function () {
		let latitude = $(this).attr('data-lat');
		let longitude = $(this).attr('data-long');

		// let directionsId = $(this).siblings('div').attr('id');
		let directionsId = $(this).parent().parent().parent().siblings('div').attr('id');

		let origin = localStorage.getItem("input-address");

		getAddressTxt(latitude, longitude, function (destination) {
			getDirections(origin, destination, directionsId);
		});

	});


	$("#content-results").on('click', '.fa', function () {
		let origin = localStorage.getItem("input-address");
		$(this).toggleClass("red");
		let mode = $(this).data('mode').toUpperCase();
		localStorage.setItem('mode', mode);
	});


	$("#number-menu .dropdown-item").on('click', function (event) {
		event.preventDefault();
		$("#selected-value").text($(this).text());
		numOfResults = $(this).text();
		drawInitMap();
		getYelpSearchResults();
	});


	$("#food-menu .dropdown-item").on('click', function (event) {
		event.preventDefault();
		$("#selected-food").text($(this).text());
		localStorage.setItem("input-category", $(this).text());
		drawInitMap();
		getYelpSearchResults();
	});

});

$(document).ready(function () {
	$('.fixed-action-btn').floatingActionButton();
});

var instance = M.FloatingActionButton.getInstance(elem);

instance.open();

instance.close();

instance.destroy();


