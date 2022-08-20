import express from 'express';
import {Note} from '../model/note.js';

const router = express.Router();

router.get("/loadNotes", async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

router.post("/add-note", async (req,res) => {
    const newNote = new Note({title: req.body.title, content: req.body.content});
    await newNote.save();
    res.send(newNote);

});

router.post("/edit-note", async (req,res) => {
    const note = await Note.findByIdAndUpdate(req.body.id, {title: req.body.title, content: req.body.content});
    res.send(note);
});

router.post("/delete-note", async (req,res) => {
    const note = await Note.deleteOne({_id: req.body.id});
});


export {router}
