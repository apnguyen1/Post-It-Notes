import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Note} from "../Note";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent {

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient) {}

  @Output() newNoteEvent = new EventEmitter<Note>();

  showTitle = false;
  url = "api/add-note";

  noteForm: FormGroup = this.fb.group({
    title: null,
    content: null
  });

  canSubmit() {
    let condition1 = this.noteForm.value.title == null || this.noteForm.value.title == "";
    let condition2 = this.noteForm.value.content == null || this.noteForm.value.content == "";

    return !(!condition1 || !condition2);
  }

  addNewNote() {
    if (this.noteForm.value.title === null || this.noteForm.value.title === "") {
      this.noteForm.controls['title'].setValue("Untitled");
    }

    this.addNote().subscribe( res => {
      let note: Note = {id: res._id, title: res.title, content: res.content};
      this.newNoteEvent.emit(note);
      this.showTitle = false;
      this.noteForm.reset();
    });

  }

  addNote() {
    return this.httpClient.post<any>(this.url, this.noteForm.value);
  }

}


