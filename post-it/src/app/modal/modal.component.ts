import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../Note";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(
    public dialogRef : MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note) {}

  updateNote(id: string, title: string, content: string): void {
    const newNote: Note = {id: id, title: title, content: content};
    this.dialogRef.close(newNote);
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

}
