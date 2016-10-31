function initializeHome() {
	clearDisplayForHome();
}

function clearDisplayForHome() {
	$('#homeImage').removeClass('invisible');
	$('#searchContainer').addClass("invisible");
	$('#graph').addClass("invisible");
	$('#litCenterData').remove();
}