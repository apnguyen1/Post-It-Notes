import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Note} from "../Note";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  constructor(private dialog: MatDialog,
              private httpClient: HttpClient) { }

  @Input() note!: Note;
  @Output() delete = new EventEmitter<Note>();

  url = "api/edit-note";

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      width: "500px",
      data: this.note
    })
      .afterClosed().subscribe(editedNote => {
      if(editedNote !== undefined) {
        console.log(editedNote);

        this.editNote(this.url, editedNote).subscribe((res) => {
          this.note.title = editedNote.title;
          this.note.content = editedNote.content;
        });
      }
    });
  }

  deleteNote(value: Note) {
    this.delete.emit(value);
  }

  editNote(url: string, note: Note) {
    return this.httpClient.post<any>(url, note);
  }

}
