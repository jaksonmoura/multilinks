$(document).ready(function(){
	if (navigator.platform == "MacIntel") {
		$('#shortcut').html('<b>&#x2318;+Shift+M</b> to open your links.');
	} else {
		$('#shortcut').html('<b>Alt+Shift+M</b> to open your links.');
	}

	// Add Link to list
	$('#add_link_list').click(function(){
	  i = $('#list .link').length + 1;
		j = $('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" placeholder="http://www..."><a class="remove" href="#">-</a></div></div>').hide().fadeIn(500);
		$('#list').append(j);
	});
	// Remove link
	$(document).on('click', '.remove', function(){
		$(this).closest(".link").fadeOut(500).remove();
	});

});
function getOptions(){
	chrome.storage.sync.get('links', function(r){
		links = r.links;

		for (url in links){
			$('#list').append('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" value="'+links[url]+'" placeholder="http://www..."><a class="remove" href="#">-</a></div></div>');
		};
		if (!links) {
			$("#add_form").fadeIn( "fast" );
		  for (var i = 1; i <= 3; i++) {
		    $('#list').append('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" placeholder="http://www..."><a class="remove" href="#">-</a></div></div>');
		  };
		};
	});
}

$(function(){
		var links = [];
		$('#flash').hide();
		getOptions();
		$('form').submit(function (){
			$('#list .link').each(function(){
				url = $(this).children().children('.link_url').val();
				// Cannot be empty
				if (url) {
					links.push(url);
				};
			});
			// Save them all!
			chrome.storage.sync.set({'links': links}, function() {
		    // Notify that we saved.
		    $('#flash').slideDown().delay(1000).slideUp();
		  });
			return false;
		});
});