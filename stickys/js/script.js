var db = null;

if (window.openDatabase) {
    db = openDatabase("NoteTest", "1.0", "Stickys Database", 100000);
    if(!db) {
        alert("Error");
    }
} else {
    alert("Error: Check HTML5 Web Storage in Browser");
}

function Note() {

    var self = this;

    var note = document.createElement('div');
    note.className = 'note';
    note.addEventListener('mousedown', function(e){
        return self.onMouseDown(e)
    }, 'false');
    note.addEventListener('click', function(){
        return self.onNoteClick()
    }, 'false');

    this.note = note;

    var close = document.createElement('div');
    close.className = 'closebutton';
    close.addEventListener('click', function(e){
        return self.close(e)
    }, 'false');
    note.addEventListener('mousedown', function(e){
        return self.onMouseDown(e)
    }, 'false');
    note.appendChild(close);

    var edit = createElement('div');

    edit.className = 'edit';
    edit.setAttribute('contenteditable', false);
}