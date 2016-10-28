function initializeGraphs() {
	hideSearch();
	loadData().then(function(response) {
        var results = [];
        response.result.values.map(function(row){
            results.push(row);
        });
        displayGraphs(results);
    }, function(response) {
        appendPre('Error: ' + response.result.error.message);
    });
}

function hideSearch() {
	$('#searchContainer').addClass("invisible");
	$('#graph').removeClass("invisible");
}

function displayGraphs(data) {
	var periods = {};
	data.map(function (row, index, array){
		if(index != 0) {
			if(!periods.hasOwnProperty(row[2])) {
				periods[row[2]] = 1;
			} else {
				periods[row[2]]++;
			}
		}
	});
	console.log(JSON.stringify(periods));
	var options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Lit Center Visits By Period'
        },
        xAxis: {
            categories: getXAxisCategories(periods),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of Visits'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Niles West Lit Center',
            data: getSeriesData(periods),
            color: "red"
        }]
    };
	$('#graph').highcharts(options);
}

function getXAxisCategories(data) {
	var xAxis = [];
	for(key in data) {
		if(data.hasOwnProperty(key)) {
			xAxis.push(key);
		}
	}
	return xAxis;
}

function getSeriesData(data) {
	var xAxisData = [];
	for(key in data) {
		if(data.hasOwnProperty(key)) {
			xAxisData.push(data[key]);
		}
	}
	return xAxisData;
}