import axios from "axios";
import { createContext } from "react";

export const NoteContext = createContext()
let baseUrl = "http://localhost:3001/"
// let baseUrl = "http://192.168.1.18:3002/"

export const NoteProvider = (props) => {

    function getNotes() {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rnotesToken')}`
        };
        return axios.get(baseUrl + "api/notes/get", {
            headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function createNote(newNote) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rnotesToken')}`
        };
        return axios.post(baseUrl + "api/notes/create", newNote, {
            headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function saveNote(savedNote) {
        console.log(savedNote)
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rnotesToken')}`
        };
        return axios.put(baseUrl + "api/notes/save/" + savedNote.noteId, savedNote, {
            headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function searchNote(query) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rnotesToken')}`
        };
        return axios.get(baseUrl + "api/notes/search/" + query, {
            headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function deleteNote(noteId) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rnotesToken')}`
        };
        return axios.delete(baseUrl + "api/notes/delete/" + noteId, {
            headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    return (
        <NoteContext.Provider
            value={{
                getNotes,
                createNote,
                saveNote,
                deleteNote,
                searchNote
            }}
        >
            {props.children}
        </NoteContext.Provider>
    )
}