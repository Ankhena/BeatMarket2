function initTicketSelect() {
    $('.inputSelect__radio').on('change', function(){
        $('.inputSelect__value').html($(this).next().html());
    });
}

initTicketSelect();