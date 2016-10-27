// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '716322429169-uka8nvtq0mf943iq46h5bbgjsfdslm80.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadSheetsApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
    var discoveryUrl =
        'https://sheets.googleapis.com/$discovery/rest?version=v4';
    gapi.client.load(discoveryUrl).then(loadPage);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1L3_WojemoFeh9qTPOtIl2_leXpKAQ308jX7lgED96X0/edit
 */

function loadPage() {
    $("#container").html('<div class="btn waves-effect" onclick="searchById()">Search</div><input id="searchBar" type="text"/>');
}

function loadData() { 
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1L3_WojemoFeh9qTPOtIl2_leXpKAQ308jX7lgED96X0',
        range: 'Form Responses 1',
    });
}

function searchById() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1L3_WojemoFeh9qTPOtIl2_leXpKAQ308jX7lgED96X0',
        range: 'Form Responses 1',
    }).then(function(response) {

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

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */

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