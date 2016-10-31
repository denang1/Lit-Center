function initializeTables() {
	clearDisplayForTables();
	var topTutors = {};
	loadData().then(function(response) {
        var results = [];
        response.result.values.map(function(row){
        	if(!topTutors.hasOwnProperty(row[6])) {
        		topTutors[row[6]] = 1;
        	} else {
        		topTutors[row[6]]++;
        	}
        });
        var tutorsList = Object.keys(topTutors).map(function(key) {
		    return [key, topTutors[key]];
		});
		tutorsList.sort(function(a, b) {
			return b[1] - a[1];
		});
		tutorsList = tutorsList.slice(0, 10);
        displayTables(tutorsList);
    }, function (error) {
        alert(error.result.error.message);
    });
}

function clearDisplayForTables() {
	$('#homeImage').addClass('invisible');
	$('#searchContainer').addClass("invisible");
	$('#graph').addClass("invisible");
	$('#litCenterData').remove();
}

function displayTables(topTutors) {
	displayTopTutorTableHeadings();
	displayTopTutorTableContent(topTutors);
}

function displayTopTutorTableHeadings() {
	$('#container').append('<div id="litCenterData"></div>');
	$('#litCenterData').append('\
		<h3 class="center-align">Top Tutors</h3>\
		<table id="headingTable">\
			<tbody>\
				<tr>\
					<th>Rank</th>\
					<th>Tutor</th>\
					<th># of Sessions</th>\
				</tr>\
			</tbody>\
		</table>');
}

function displayTopTutorTableContent(results) {
	$('#litCenterData').append('\
		<div id="tableScroll">\
			<table id="statsTable"></table>\
		</div>');
	results.map(function (result, index, array) {
		$('#statsTable').append('<tr><td>#' + (index + 1) + '</td><td>' + result[0].split('_')[1] + " " + result[0].split('_')[0] + '</td><td>' + result[1] + '</td></tr>');
	});
}