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
        db.transaction(function(tn){
            tn.executeSql("INSERT INTO MyStickys (id, note, timestamp, left, top, zindex)");
        });
    }

}
