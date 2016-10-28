function initializeSearch() {
	hideGraphs();
	displaySearchBar();
}

function hideGraphs() {
	$('#graph').addClass("invisible");
	$('#searchContainer').removeClass("invisible");
}

function displaySearchBar() {
    $("#container").html(
        '<div id="searchContainer" class="row center-align">\
            <input id="searchBar" type="text" class="center-align"/>\
            <div class="btn waves-effect" onclick="searchById()" class="center-align">Search</div>\
        </div>'
    );
}

function searchById() {
   loadData().then(function(response) {
        var id = parseInt($("#searchBar").val());
        var results = [];
        response.result.values.map(function(row){
        	if(id === parseInt(row[1])) {
        		results.push(row);
        	}
        });
        displayResults(results);
    }, function(response) {
        appendPre('Error: ' + response.result.error.message);
    });
}

function displayResults(results) {
	results.map(function(result){
		appendPre(result);
	});
} 

function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}