$(document).ready(function() {

//Add Todo
    $('#add_form').submit(function () {
        //Get Submited Values
        var todo_name = $('#todo_name').val();
        var todo_date = $('#todo_date').val();
        //Filed Validation
        if (todo_name == '') {
            alert('Please fill the todo name');
        } else if (todo_date == '') {
            alert('Please add todo date');
        } else {
            var todos = JSON.parse(localStorage.getItem('todos'));
            //Check todos
            if (todos == null) {
                todos = [];
            }
            //Create array with new todo
            var new_todo = {
                "todo_name": todo_name,
                "todo_date": todo_date
            }
            todos.push(new_todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    });
});