var data = [];

function initializeSearch() {
	clearDisplayForSearch();
	loadData().then(function(response) {
        //var id = parseInt($("#searchBar").val());
        data = [];
        response.result.values.map(function(row){
        	data.push(row);
        });
        displaySearchBar();
    }, function (error) {
	   	alert(error.result.error.message);
   });
}

function clearDisplayForSearch() {
	$('#graph').addClass("invisible");
	$('#homeImage').addClass('invisible');
	$('#litCenterData').remove();
}

function displaySearchBar() {
   $('#searchContainer').removeClass("invisible");
}

function searchById() {
	$('#litCenterData').remove();
	var results = [];
    var id = parseInt($("#searchBar").val());
    data.map(function(row){
    	if(id === parseInt(row[1])) {
    		results.push(row);
    	}
    });
    displayResults(results);
}

function displayResults(results) {
	displayTuteeTableHeadings();
	displayTuteeTableContent(results);
} 

function displayTuteeTableHeadings() {
	$('#container').append('<div id="litCenterData"></div>');
	$('#litCenterData').append('\
		<div id="totalSessions" class="center-align"></div>\
		<table id="headingTable">\
			<tbody>\
				<tr>\
					<th>Date</th>\
					<th>Period</th>\
					<th>Teacher</th>\
					<th>Tutor</th>\
					<th>Subject</th>\
				</tr>\
			</tbody>\
		</table>');
}

function displayTuteeTableContent(results) {
	$('#litCenterData').append('\
		<div id="tableScroll">\
			<table id="statsTable"></table>\
		</div>');
	results.map(function (result) {
		var rowData = getRowDataFromResult(result);
		$('#statsTable').append('<tr><td>' + rowData.date + '</td><td>' + rowData.period + '</td><td>' + rowData.teacher + '</td><td>' + rowData.tutor + '</td><td>' + rowData.subject + '</td></tr>');
	});
	$('#totalSessions').html('<h2>Total Sessions: ' + results.length + '</h2>');
}

function getRowDataFromResult(result) {
	return {
		date: result[0].split(' ')[0],
		period: result[2],
		teacher: result[5].split('_')[1] + " " + result[5].split('_')[0],
		tutor: result[6].split('_')[1] + " " + result[6].split('_')[0],
		subject: result[7]
	};
}