const updateQuote = document.getElementById('btn-update');

updateQuote.addEventListener('click', function () {
	// Send PUT Request here
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'new :P',
			'quote': 'new quote'
		})
	})
});

(function() {
	var deletesQuote = document.getElementsByClassName("btn-delete"),
        l = deletesQuote.length, i;
    for( i=0; i<l; i++) {
        (function(i) {
            deletesQuote[i].onclick = function(e) {
            	console.log('aaa2', e);
            };
        })(i);
    }
})();
