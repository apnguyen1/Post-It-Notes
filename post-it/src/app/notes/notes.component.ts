import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Note} from "../Note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  constructor(private httpClient : HttpClient) { }

  @Input() notes!: Note[];
  @Input() snackbar!: MatSnackBar

  deleteUrl = "/api/delete-note";
  undoUrl = "/api/add-note";

  setNotes(newNotes: Note, idx: number) {
    this.notes.splice(idx, 1);

    this.deleteNote(this.deleteUrl, newNotes).subscribe(() => {
      console.log(this.notes);
    })

    this.snackbar.open("You deleted the note titled: " + newNotes.title, "Undo", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    }).onAction().subscribe(() => {
      this.deleteNote(this.undoUrl, newNotes).subscribe((res) => {
        this.notes.unshift(newNotes);
      });
    });
  }

  deleteNote(url: string, note: Note) {
    return this.httpClient.post<any>(url, note);
  }
}
