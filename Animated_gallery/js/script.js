$(document).ready(function(){
    var items = $('#gallery li'),
        itemsByTags = {};

    //Loop

    items.each(function(i) {
        var element = $(this),
            tags = element.data('tags').split(',');

        /*Add data attribute for quicksand*/
        element.attr('data-id',i);

        $.each(tags, function(key, value) {
            value = $.trim(value);

            if(!(value in itemsByTags)) {
                //Add empty value
                itemsByTags[value] = [];
            }

            //Add image to the array

            itemsByTags[value].push(element);
        });
    });

    //Create 'all items'
    createList('All items', items);

    $.each(itemsByTags, function(k, v){
        createList(k, v);
    });

    //Click handler
    $('#navbar a').live('click', function(e){
        var link = $(this);

        //Add Class

        link.addClass('active').siblings().removeClass('active');

        $('#gallery').quicksand(link.data('list').find('li'));
        e.preventDefault();
    });

    $('#navbar a:first').click();


    //Create the list
    function createList(text, items) {
        //Create UL
        var ul = $('<ul>', {'class': 'hidden'});


        $.each(items, function () {
            $(this).clone().appendTo(ul);
        });

        //Add gallery div

        ul.appendTo('#gallery');

        //Create menu item

        var a = $('<a>',{
            html:text,
            href:'#',
            data:{list:ul}
        }).appendTo('#navbar');
    }
});