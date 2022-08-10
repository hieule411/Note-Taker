var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

var activeNote = {};

var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// delete note function
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

  var note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });

var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

var renderNoteList = function(notes) {
    $noteList.empty();
  
    var noteListItems = [];
  
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
  
      var $li = $("<li class='list-group-item'>").data(note);
      var $span = $("<span>").text(note.title);
      var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
  
      $li.append($span, $delBtn, $editBtn);
      noteListItems.push($li);
    }
}  

var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();