function getOptions(){
	chrome.storage.sync.get('links', function(r){
		links = r.links;

		for (url in links){
			$('#list').append('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" value="'+links[url]+'" placeholder="http://www..."></div></div>');  
		};
		if (!links) {
			$("#add_form").fadeIn( "fast" );
		  for (var i = 1; i <= 3; i++) {
		    $('#list').append('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" placeholder="http://www..."></div><a class="remove" href="#"></div>');  
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
		  })
		});

// Add Link to list
  $('#add_link_list').click(function(){
    i = $('#list .link').length + 1;
		j = $('<div class="link"><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="url" placeholder="http://www..."></div></div>').hide().fadeIn(500);
		$('#list').append(j);
  });
});