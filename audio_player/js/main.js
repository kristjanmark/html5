var audio;
//Hide Button
$('#pause').hide();

initAudio('#playist li:first-child');

function initAudio(element) {
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    //Create Audio
    audio = new Audio('media/'+ song);

    //Audio info append to div
    $('.artist').text(artist);
    $('.title').text(title);

    //Song cover
    $('img.cover').attr('src','images/covers/'+cover);

    $('#playlist li').removeClass('active');
    element.addClass('active');
}

//Player
$('#play').click(function(){
    audio.play();
    $('#pause').show();
    $('#play').hide();
    showDuration();
});
$('#pause').click(function(){
    audio.pause();
    $('#play').show();
    $('#pause').hide();
});
$('#stop').click(function() {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
    audio.currentTime = 0;
});


//Volume
$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 10);
});


//Audio Player Time Duration
function showDuration(){
    $(audio).bind('timeupdate', function(){
        var s  = parseInt(audio.currentTime % 60);
        var min = parseInt(audio.currentTime / 60) % 60;
        if(s < 10) {
            s = '0' + s;
        }
        $('#duration').html(min + ':' + s);
        var value = 0;
        if(audio.currentTime > 0){
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $('#progress').css('width', value+'%');
    });
}