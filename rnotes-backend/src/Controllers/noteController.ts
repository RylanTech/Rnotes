import { RequestHandler } from "express";
import { note } from "../models/note";
import { verifyUser } from "../services/authService";

export const createNote: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)

        if (usr) {
            let newNote: note = req.body;

            if (newNote.title && newNote.content) {
                    newNote.userId = usr.userId
                    let created = await note.create(newNote)
                    res.status(200).send(created)
            } else {
                res.status(400).send('Title and content required');
            }
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr) {
            let id = req.params.id
            let retrivedNote = await note.findByPk(id)
            if (retrivedNote) {
                if (retrivedNote.userId === usr.userId) {
                    res.status(200).send(retrivedNote)
                } else {
                    res.status(401).send("User not associated")
                }
            } else {
                res.status(404).send("Note not found")
            }
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}

export const getAllUserNotes: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr) {
            let usersNotes = note.findAll({where: {userId: usr.userId}})
            res.status(200).send(usersNotes)
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}