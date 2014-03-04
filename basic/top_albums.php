<?php

$mysqli = new mysqli("localhost", "demouser", "demopass", "Chinook");
if(isset($_GET['artist'])) {
	$artistString = $mysqli->escape_string($_GET['artist']);
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId WHERE Artist.Name = '$artistString' GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
else {
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
// fetch all rows from the query
$all_rows = array();
while($row = $res->fetch_assoc()) {
	$all_rows []= $row;
}
header("Content-Type: application/json");
echo json_encode($all_rows);
