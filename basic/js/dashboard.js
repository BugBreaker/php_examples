rf.StandaloneDashboard (function (db) {
	db.setDashboardTitle ("MySQL Example");
	var top_artists = new ChartComponent();
	top_artists.setDimensions (6,6);
	top_artists.setCaption ("Top 5 artists by revenue");
	top_artists.lock();

	$.get("top_artists.php", function(data) {
		var labels = [], sales_data = [];
		for(var i = 0; i < data.length; i++) {
			labels.push (data[i]["Name"]);
			sales_data.push (parseInt(data[i]["total_sales"]));
		}
		top_artists.setLabels (labels);
		top_artists.addSeries ("sales", "Total Sales", sales_data, {
			numberPrefix: "$"
		});
		top_artists.unlock();
	});
	db.addComponent (top_artists);

	var top_albums= new ChartComponent();
	top_albums.setDimensions (6,6);
	top_albums.setCaption ("Top 5 albums by revenue");
	top_albums.lock();

	$.get("top_albums.php", function(data) {
		var labels = [], sales_data = [];
		for(var i = 0; i < data.length; i++) {
			labels.push (data[i]["Title"]);
			sales_data.push (parseInt(data[i]["total_sales"]));
		}
		top_albums.setLabels (labels);
		top_albums.addSeries ("sales", "Total Sales", sales_data, {
			numberPrefix: "$"
		});
		top_albums.unlock();
	});
	db.addComponent (top_albums);

	top_artists.onItemClick (function(params) {
		top_albums.lock();
		top_albums.setCaption("Top 5 Albums by " + params.label);
		$.get("top_albums.php?artist=" + encodeURIComponent(params.label), function(data) {
			top_albums.clearChart();
			var labels = [], sales_data = [];
			for(var i = 0; i < data.length; i++) {
				labels.push (data[i]["Title"]);
				sales_data.push (parseInt(data[i]["total_sales"]));
			}
			top_albums.setLabels (labels);
			top_albums.addSeries ("sales", "Total Sales", sales_data, {
				numberPrefix: "$"
			});
			top_albums.unlock();
		});
	});

});