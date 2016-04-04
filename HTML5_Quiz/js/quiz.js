var score = 0;
var total = 5;
var point = 1;
var highest = total * point;


function init() {
    //Set correct answers
    sessionStorage.setItem('a1','b');
    sessionStorage.setItem('a2','d');
    sessionStorage.setItem('a3','c');
    sessionStorage.setItem('a4','a');
    sessionStorage.setItem('a5','b');
}

$(document).ready(function(){
    $('.questionForm').hide();

    //show question
    $('#q1').show();

    $('.questionForm #submit').click(function(){
        //Get data attributes
        var current  = $(this).parents('form:first').data('question');
        var next  = $(this).parents('form:first').data('question')+1;
        //Hide all questions
        $('.questionForm').hide();
        //Show next question
        $('#q'+next+'').fadeIn(300);
        process(''+current+'');
        return false;
    });
});

function process(n) {
    var submitted = $('input[name=q1]:checked').val();


    if(q == "q1") {
        var submitted = $('input[name=q1]:checked').val();
        if(submitted == sessionStorage.a1){
            score++;
        }
    }
    if(q == "q2") {
        var submitted = $('input[name=q2]:checked').val();
        if(submitted == sessionStorage.a2){
            score++;
        }
    }
    if(q == "q3") {
        var submitted = $('input[name=q3]:checked').val();
        if(submitted == sessionStorage.a3){
            score++;
        }
    }
    if(q == "q4") {
        var submitted = $('input[name=q4]:checked').val();
        if(submitted == sessionStorage.a4){
            score++;
        }
    }
    if(q == "q5") {
        var submitted = $('input[name=q5]:checked').val();
        if(submitted == sessionStorage.a5){
            score++;
        }
        $('#results').html('<h3>Youre final score: ' + score +' out of ' + highest + '</h3>');
    }
    return false;
}

//Add event listener
window.addEventListener('load', init, false);