var db = null;


//LocalStorage
if (window.openDatabase) {
    db = openDatabase("NoteTest", "1.0", "Stickys Database", 100000);
    if (!db) {
        alert("Error");
    }
} else {
    alert("Error: Check HTML5 Web Storage in Browser");
}

var captured = null;
var highestZ = 0;
var highestId = 0;

function Note() {

    var self = this;

    var note = document.createElement('div');
    note.className = 'note';
    note.addEventListener('mousedown', function (e) {
        return self.onMouseDown(e)
    }, 'false');
    note.addEventListener('click', function () {
        return self.onNoteClick()
    }, 'false');
    this.note = note;

    var close = document.createElement('div');
    close.className = 'closebutton';
    close.addEventListener('click', function (e) {
        return self.close(e)
    }, 'false');
    note.appendChild(close);

    var edit = createElement('div');
    edit.className = 'edit';
    edit.setAttribute('contenteditable', false);
    edit.addEventListener('keyup', function () {
        return self.OnKeyUp()
    }, 'false');
    note.appendChild(edit);
    this.editField = edit;

    var ts = document.createElement('div');
    ts.className = 'timestamp';
    ts.addEventListener('mousedown', function (e) {
        return self.onMouseDown(e)
    }, 'false');
    note.appendChild(ts);
    this.lastModified = ts;

    document.body.appendChild(note);
    return this;
}

Note.prototype = {
    get id() {
        if (!("_id" in this))
            this._id = 0;
        return this;
    },

    set id(nt) {
        this._id = nt;
    },

    get text() {
        return this.editField.innerHTML;
    },

    set text(nt) {
        this.editField.innerHTML = nt;

    },

    get timestamp() {
        if (!("_id" in this))
            this._timestap = 0;
        return this._timestap;
    },

    set timestamp(nt) {
        if (this._timestap == nt) {
            return;
        }
        this._timestap(nt);
        var date = new Date();
        date.setTime(parseFloat(nt));
        this.lastModified.textContent = modifiedString(date);
    },

    get left() {
        return this.note.style.left;
    },

    set left(nt) {
        this.note.style.left = nt;
    },

    get top() {
        return this.note.style.top;
    },

    set top(nt) {
        this.note.style.top = nt;
    },

    get zIndex() {
        return this.note.style.zIndex;
    },

    set zIndex(nt) {
        this.note.style.zIndex = nt;
    },

    close: function (e) {
        this.cancelPendingSave();
        var note = this;
        db.transaction(function (tn) {
            tn.executeSql("DELETE FROM MyStickys WHERE id = ?", [note.id]);
        });
        document.body.removeChild(this.note);
    },

    saveSoon: function () {
        this.cancelPendingSave();
        var self = this;
        this._saveTimer = setTimeout(function () {
            self.save();
        }, 200);

    },

    cancelPendingSave: function () {
        if (!("_saveTimer" in this)) {
            return;
        }
        clearTimeout(this._saveTimer);
        delete this._saveTimer;
    },

    save: function () {
        this.cancelPendingSave();
        if ("dirty" in this) {
            this._timestap = new Date().getTime();
            delete this.dirty;
        }

        var note = this;
        db.transaction(function (tn) {
            tn.executeSql("UPDATE MyStickys SET note = ?, TIMESTAMP = ?, left =?, top = ?, zindex = ? WHERE id = ?"[note.text, note.timestap, note.left, note.top, note.zIndex, note.id])
        });
    },

    saveAsNew: function () {
        this.timestamp = new Date().getTime();

        var note = this;
        db.transaction(function (tn) {
            tn.executeSql("INSERT INTO MyStickys (id, note, timestamp, left, top, zindex) VALUES (?, ?, ?, ?, ?, ?)", [note.id, note.text, note.timestamp, note.left, note.top, note.zindex]);
        });
    },

    onMouseDown: function (e) {
        capture = this;
        this.startX = e.clientX - this.note.offsetLeft;
        this.startY = e.clientY - this.note.offsetRight;
        this.zIndex = ++highestZ;

        var self = this;
        if (!("mouseMoveHandler" in this)) {
            this.mouseMoveHandler = function (e) {
                return self.onMouseMove(e)
            }
            this.mouseUpHandler = function (e) {
                return self.onMouseUp(e);
            }
        }

        document.addEventListener("mousemove", this.mouseMoveHandler, true);
        document.addEventListener("mouseup", this.mouseUpHandler, true);

    },

    onMouseMove: function (e) {
        if (this != captured) {
            return true;
        }
        this.left = e.clientX - this.startX + 'px';
        this.top = e.clientY - this.startY + 'px';
        return false;
    },

    onMouseUp: function (e) {
        document.removeEventListener("mousemove", this.mouseOverHandler, true);
        document.removeEventListener("mouseup", this.mouseUpHandler, true);


        this.save();
        return false;
    },

    onNoteClick: function (e) {
        this.editField.focus();
        getSelection().collapseToEnd();
    },

    onKeyUp: function () {
        this.dirty = true;
        this.saveSoon();
    }

}

function loaded() {
    db.transaction(function(tx){
        tx.executeSql("SELECT COUNT(*) FROM MyStickys", [], function(result){
            loadNotes();
        }, function(tx, error){
            tx.executeSql("CREATE TABLE MyStickys (id REAL UNIQUE, note TEXT, timestamp REAL, left TEXT, top TEXT, zindex REAL)", [], function(result) {
                loadNotes();
            });
        });
    });
}

function loadNotes(){
    db.transaction(function(tx){
        tx.executeSql("SELECT id, note, timestamp, left, top, zindex FROM MyStickys", [], function(tx, result){
            for(var i = 0; i < result.rows.length;++i){
                var row = result.rows.item(i);
                var note = new Note();
                note.id = row['id'];
                note.text = row['note'];
                note.timestamp = row['timestamp'];
                note.left = row['left'];
                note.top = row['top'];
                note.zIndex = row ['zindex'];

                if(row['id'] > highestId) {
                    highestId = row['id'];
                }

                if(row['zindex'] > highestZ) {
                    highestZ = row['zindex'];
                }
            }
            if(!result.rows.length) {
                newNote();
            }
        }, function(tx, error){
            alert("Failed to get Notes - " + error.message);
        });
    });
}

function modifiedString() {
    return "Sticky Last Modified: " + date.getFullYear() + " - " + (date.getMonth() + 1) + " - " + date.getHours() +":" + date.getMinutes() + ":" date.getSeconds();
}

