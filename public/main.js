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

    //closest
(function () {
    function deleteEntity (id) {
        $.ajax({
            url: 'quotes/' + id,
            method: 'delete'
        });
    }

    var deletesQuote = document.getElementsByClassName("btn-delete"),
        l = deletesQuote.length,
        i;
    for (i = 0; i < l; i++) {
        (function (i) {
            const btnDelete = deletesQuote[i];
            btnDelete.onclick = function () {
                var self = $(this),
                    id = self.data("quote");
                deleteEntity(id);
                self.closest('li').hide();
            };
        })(i);
    }
})();
