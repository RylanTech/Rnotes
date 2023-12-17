import { RequestHandler } from "express";
import { note } from "../models/note";
import { verifyUser } from "../services/authService";
import { Op, Sequelize } from "sequelize";

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
            let usersNotes = await note.findAll({ where: { userId: usr.userId } })
            res.status(200).send(usersNotes)
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}

export const saveNote: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        let id = req.params.id

        if (usr) {
            if (id) {
                let savedNote: note = req.body;

                savedNote.userId = usr.userId
                let updated = await note.update(savedNote, {where: {noteId: id}})
                if (updated) {
                    res.status(200).send("updated")
                } else {
                    res.status(500).send("Error saving note")
                }
            } else {
                res.status(400).send("no id")
            }
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        let id = req.params.id

        if (usr) {
            if (id) {
                let savedNote: note = req.body;

                savedNote.userId = usr.userId
                let deleted = await note.destroy({where: {noteId: id, userId: usr.userId}})
                if (deleted) {
                    res.status(200).send("deleted")
                } else {
                    res.status(500).send("Error deleting  note")
                }
            } else {
                res.status(400).send("no id")
            }
        } else {
            res.status(400).send('No user signed in')
        }
    } catch {
        res.status(500).send()
    }
}

export const searchNote: RequestHandler = async (req, res, next) => {
    // Convert the search query to lowercase
    let query = req.params.query.toLowerCase();
    // Minimum length of the search query

    //To add a required query length, uncomment these lines of code

    // const minimumQueryLength = 3;
    // // Check if the query has fewer characters than the minimum length
    // if (query.length < minimumQueryLength) {
    //   return res.status(400).json({ error: 'Search query must have at least 3 characters' });
    // }

    try {
        let usr = await verifyUser(req)
        if (usr) {
            let searchArr: any = []
            let resultsDB = await note.findAll({
                where: {
                    [Op.or]: [
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${query.toLowerCase()}%`),
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('content')), 'LIKE', `%${query.toLowerCase()}%`),
                    ],
                    userId: usr.userId,
                },
                limit: 10,
            });

            resultsDB.map((result) => {
                searchArr.push(result)
            })

            res.status(200).json(searchArr);
        }
    } catch (err) {
        res.status(404).json({ error: 'Database search query failed' });
    }
};
