let input_category = 'burger,drink';
// Default on search, limit to 20 results in a radius of currently set to 1 mile limit (1610 meters = 1 miles), open_now returns false will display results of close shops as well.
function getYelpSearchResults(){

  let input_location = localStorage.getItem("input-address"); 
    
  let queryURL = "https://api.yelp.com/v3/businesses/search?location=" + input_location + "&limit=20&radius=1610&open_now=false";
  const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';

  //adding input category to URL to select cuisine from dropdown
  if(localStorage.getItem("input-category")){
    input_category = localStorage.getItem('input-category');

    if(input_category == "All"){
      input_category = "burger,drink";
    }
  }

  queryURL += "&term=" + input_category;  
  console.log("qyeryURL =", queryURL);

	$('#content-results').empty();
	
	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + yelpAPI
		}
	}).done(response => {		
		const results = response.businesses;
		displayMarkers(results); 

		for (let i = 0; i < numOfResults && i < results.length; i++) {

			let newTable = createTable(i, results[i]);

			if(results && results != null && results != undefined){

				let newDiv = $('<div class="div-result">');
				newDiv.css("border-bottom", "2px solid #fff");
				newDiv.css("padding", "10px");

		        const ratingNum = parseInt(results[i].rating);
				newDiv.append(newTable);

				let collapseDiv = $("<div>");
				collapseDiv.attr('id', 'collapse-link-' + i);
				collapseDiv.attr('class', 'collapse');
				collapseDiv.attr('class', 'directionsDiv');
				newDiv.append(collapseDiv);

				$('#content-results').append(newDiv);

				for(let j=0; j < ratingNum; j++) {
        			$("#"+results[i].id+"-rating").append($('<span>').text('⭐️'));
        		}

			}else{
				console.log("no results found");
			}
		}
	}).catch(error => {
		console.error(error);
	});

}

function createTable(i, results){
	
    let newTable = $('<table width="100%"">');
    let newTr1 = $('<tr>');
    newTr1.append("<td class='td-results-l' id='results-name'>" + results.name + '</td>');
    newTr1.append("<td></td>");
    newTr1.append("<td class='td-results-ri' id='results-distance'>" + (results.distance * 0.0006213).toFixed(2) + ' Mi</td>');
    newTable.append(newTr1);

 	let newTr2 = $('<tr>');
    newTr2.append("<td class='td-results-l'>" + results.display_phone + '</td>');
    newTr2.append("<td></td>");
    newTr2.append("<td class='td-results-ri td-results-rating' id='"+results.id+"-rating'>" + '</td>');
    newTable.append(newTr2);

 	let newTr3 = $('<tr>');
 	let newTd1 = $("<td class='td-results-l' id='results-directions'>");
 	let newLink = $("<a>").attr(
			{
				"href" : "#collapse-link-" + i,
				"data-toggle" : 'collapse',
				"data-lat" : results.coordinates.latitude,
				"data-long" : results.coordinates.longitude,
				"class" : 'direction'
			});

	newLink.text('Get Directions');

	newTd1.append(newLink);
    newTr3.append(newTd1);
    newTr3.append("<td width=12%><i class='fa fa-car' data-mode='driving' id='driving-" + i + "'></i></td>");
    newTable.append(newTr3);

    return newTable;
}

function getRatingStars(ratingNum){
	let newSpan = ""
	for(let j=0; j < ratingNum; j++) {
		newSpan += '⭐️' ;
	}
	return newSpan;
}