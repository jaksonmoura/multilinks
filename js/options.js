function getOptions(){
	chrome.storage.sync.get('links', function(r){
		links = r.links;

		for (name in links){
			$('#list').append('<div class="link"><div class="division"><label>Name:</label><input name="link_name" class="link_name" type="text" value="'+name+'"placeholder="Site name" required></div><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="text" value="'+links[name]+'" placeholder="http://www..." required pattern="https?://.+"></div></div>');  
		};
		if (!links) {
			$("#add_form").fadeIn( "fast" );
		  for (var i = 1; i <= 3; i++) {
		    $('#list').append('<div class="link"><div class="division"><label>Name:</label><input name="link_name" class="link_name" type="text" placeholder="Site name" required></div><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="text" placeholder="http://www..." required pattern="https?://.+"></div></div>');  
		  };
		};
	});
}

$(function(){
		var links = {};
		$('#flash').hide();
		getOptions();
		$('form').submit(function (){
			$('#list .link').each(function(){
				link_name = $(this).children().children('.link_name').val();
				url = $(this).children().children('.link_url').val();
				// Cannot be empty
				if (link_name && url) {
					links[link_name] = url;
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
		j = $('<div class="link"><div class="division"><label>Name:</label><input name="link_name" class="link_name" type="text" placeholder="Site name" required></div><div class="division"><label>URL:</label><input name="link_url" class="link_url" type="text" placeholder="http://www..." required pattern="https?://.+"></div></div>').hide().fadeIn(500);
		$('#list').append(j);
  });
});