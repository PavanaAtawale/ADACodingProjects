google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawGraphs);

function drawGraphs() {
	//drawChart();
    drawFromGoogle();
}

function drawChart() {
    
	var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 5],
      ['Pineapple', 5],
      ['Cheese', 10 ]
    ]);

    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':800,
                   'height':800};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


function drawFromGoogle() {
    var opts = {sendMethod: 'auto'}
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1Mr9rp-O9-uDvKkGBwFhvxZLznpK3tFSaxBwIPkWFSWM/edit#gid=0');
    query.send(handleQueryResponse);
    //alert('query sent');
}


function handleQueryResponse(response) {
  var data = response.getDataTable();
  var chart = new google.visualization.PieChart(document.getElementById('chart_div_google'));
  var options = {'title':'Pizza Toppings','width':500, 'height':500};  
  chart.draw(data, options);
}