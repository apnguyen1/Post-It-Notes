import mongoose from "mongoose";

const note = new mongoose.Schema({
    title: String,
    content: String
});

export const Note = mongoose.model("Note", note);