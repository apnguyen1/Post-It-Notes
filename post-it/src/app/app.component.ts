import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Note} from "./Note";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public snackbar: MatSnackBar,
              private httpClient : HttpClient) {}

  ngOnInit() {
    const url = 'api/loadNotes';
    // this.fetchNotes(url);
  }

  title = 'post-it';
  notes: Note[] = [];

  fetchNotes(url: string) {
    this.loadNotes(url).subscribe(res => {
      for (let note of res) {
        const newNote: Note = {id: note._id, title: note.title, content: note.content};
        this.notes.unshift(newNote);
      }
    });
  }

  addNewNote(newNote: Note) {
    this.notes.unshift(newNote);

    this.snackbar.open("Added a new note!", "Close", {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 3000
    });
  }

  loadNotes(url: string) {
    return this.httpClient.get<any>(url);
  }

}
