var audio = new Audio('media/Linkin Park - By Myself.mp3');

//Hide Button
$('#pause').hide();

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