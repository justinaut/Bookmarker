$(function() {
	$.ajax({
		dataType: "json",
		method: "GET",
		cache: false,
		url: "json/data.json",
		mimeType: "application/json", // suppresses a FireFox error about reading JSON from a local file
		success: function( data ) { 
			buildBookmarkTable(data);
		}
	});
	
	// Adds Bookmarks to a container div.
	// Parameter: "data" a JSON object containing links
	function buildBookmarkTable(data) {
		var rows = [];
		rows.push( "<thead><tr><th>Bookmark</th><th>Tags</th></tr></thead>" );
		rows.push( "<tbody>" );
		$.each(data, function( key, val ) {
			rows.push("<tr>");
			rows.push("<td><a href='" + val.destination +"'>" + val.label + "</a></td>");
			rows.push("<td>" + val.tags.join( ", " ) + "</td>");
			rows.push("</tr>");
		});
		rows.push( "</tbody>" );

		$( "<table/>", {
			"id": "bookmark_table",
			"class": "table table-condensed table-bordered table-striped table-hover",
			html: rows.join( "" )
		}).appendTo( "#bookmark_container" );
		
		$( "#bookmark_table" ).DataTable({
			paging: false
		});
		
		$( "div.dataTables_filter input" ).focus();
	}
});
