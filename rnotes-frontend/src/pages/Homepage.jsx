import { useContext, useEffect, useState } from "react"
import { Button, Card, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../contexts/UserContext"
import { NoteContext } from "../contexts/NoteContext"

function Homepage() {
    const [screenWidth, setScreenWidth] = useState(undefined)
    const [currentTitle, setCurrentTitle] = useState()
    const [currentContent, setCurrentContent] = useState()
    const [currentUserId, setCurrentUserId] = useState();
    const [currentNoteId, setCurrentNoteId] = useState()
    const [newTitle, setNewTitle] = useState();
    const [newContent, setNewContent] = useState();
    const [notes, setNotes] = useState();
    const [query, setQuery] = useState("")

    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    function handleShow(note) {
        setCurrentTitle(note.title)
        setCurrentContent(note.content)
        setCurrentUserId(note.userId)
        setCurrentNoteId(note.noteId)
        setShow(true)
    }

    const [showTwo, setShowTwo] = useState()
    const handleTwoShow = () => setShowTwo(true)
    const handleTwoClose = () => setShowTwo(false);

    const [showThird, setShowThird] = useState()
    const handleThirdShow = () => setShowThird(true)
    const handleThridClose = () => setShowThird(false)

    const { verify } = useContext(UserContext)
    const { createNote, getNotes, saveNote, deleteNote, searchNote } = useContext(NoteContext)
    const navigate = useNavigate()


    useEffect(() => {
        async function startup() {
            let res = await verify()
            if (!res) {
                navigate('/login')
            }

            let ntes = await getNotes()
            setNotes(ntes)

        }
        startup()

        let screWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        setScreenWidth(screWidth)
    }, [])

    function handleResize() {
        let newScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        setScreenWidth(newScreenWidth)
    }

    window.addEventListener("resize", handleResize);

    async function search(q) {
        setQuery(q)
        if (q.length > 0) {
            let res = await searchNote(q)
            setNotes(res)
        } else {
            let ntes = await getNotes()
            setNotes(ntes)
        }
    }

    async function handleSubmitEdit() {
        const editedNote = {
            title: currentTitle,
            content: currentContent,
            userId: currentUserId,
            noteId: currentNoteId
        }
        let res = await saveNote(editedNote)
        if (res) {
            let refreshedNote = await getNotes()
            setNotes(refreshedNote)
            handleClear()
            handleClose()
        }
    }

    async function handleDelete(id) {
        let res = await deleteNote(id)
        if (res) {
            if (res) {
                let refreshedNote = await getNotes()
                setNotes(refreshedNote)
                handleClear()
                handleClose()
            }
        }
    }

    async function handleSubmitNew() {
        let newNote = {
            content: newContent,
            title: newTitle
        }
        let res = await createNote(newNote)
        if (res) {
            handleThridClose()
            let refreshedNote = await getNotes()
            setNotes(refreshedNote)
            handleClear()
        }
    }

    async function handleSubmitNewOnLarge() {
        let newNote = {
            content: currentContent,
            title: currentTitle
        }
        let res = await createNote(newNote)
        if (res) {
            handleThridClose()
            let refreshedNote = await getNotes()
            setNotes(refreshedNote)
            handleClear()
        }
    }

    function handleClear() {
        setCurrentContent("")
        setCurrentTitle("")
        setNewContent("")
        setNewTitle("")
    }

    function MapTroughOne() {
        if (notes) {
            if (notes.length > 0) {
                return notes.map((note) => {
                    console.log(note)
                    return (
                        <div className="col-6" key={note.noteId}>
                            <Card
                                onClick={() => handleShow(note)}
                                className="contentCard col-12"
                            >
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Body className="pageTxtContent">{note.content}</Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        }
    }

    function MapTroughTwo() {
        if (notes) {
            if (notes.length > 0) {
                return notes.map((note) => {
                    console.log(note)
                    return (
                        <div className="col-6" key={note.noteId}>
                            <Card
                                onClick={() => handleShow(note)}
                                className="contentCard col-12"
                            >
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Body className="pageTxtContent">{note.content}</Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        }
    }

    if (screenWidth <= 992) {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="mainTitle">
                                <textarea
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    className="txtarea"
                                    spellCheck="false"
                                    rows={1}
                                    value={currentTitle}>

                                </textarea>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <textarea
                            onChange={(e) => setCurrentContent(e.target.value)}
                            className="col-12 txtarea"
                            rows={18}
                            spellCheck={false}
                            value={currentContent}>
                        </textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => { handleDelete(currentNoteId) }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleSubmitEdit}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showTwo} onHide={handleTwoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Menu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={"/"}>
                            <Button variant="secondary" onClick={handleTwoClose}>
                                Close
                            </Button>
                        </Link>
                        <Button>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showThird} onHide={handleThridClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="mainTitle">
                                <textarea
                                    placeholder="title"
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="txtarea"
                                    spellCheck="false"
                                    rows={1}
                                    value={newTitle}>

                                </textarea>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <textarea
                            placeholder="Body"
                            onChange={(e) => setNewContent(e.target.value)}
                            className="col-12 txtarea"
                            rows={18}
                            spellCheck={false}
                            value={newContent}>
                        </textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={"/"}>
                            <Button variant="secondary" onClick={handleThridClose}>
                                Close
                            </Button>
                        </Link>
                        <Button onClick={handleSubmitNew}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="navigation">
                    <Container>
                        <Row>
                            <Form.Group
                                className="col-9 searchBar"
                            >
                                <Form.Control value={query} onChange={(e) => search(e.target.value)} />
                            </Form.Group>
                            <div className="col-3">
                                <center>
                                    <Button
                                        onClick={handleTwoShow}
                                        className="MenuBtn col-12">
                                        Menu
                                    </Button>
                                </center>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <br />
                    <Row>
                        <div className="col-12">
                            <Button onClick={handleThirdShow} className="col-12">
                                Create
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        {MapTroughOne()}
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Modal show={showTwo} onHide={handleTwoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Menu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={"/"}>
                            <Button variant="secondary" onClick={handleTwoClose}>
                                Close
                            </Button>
                        </Link>
                        <Button>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="navigation">
                    <Container>
                        <Row>
                            <Form.Group
                                className="col-9 searchBar"
                            >
                                <Form.Control />
                            </Form.Group>
                            <div className="col-3">
                                <center>
                                    <Button
                                        onClick={handleTwoShow}
                                        className="MenuBtn col-12">
                                        Menu
                                    </Button>
                                </center>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <div className="col-6">
                            <br />
                            <Row>
                                {MapTroughTwo()}
                            </Row>
                        </div>
                        <div className="col-6">
                            <br />
                            <div>
                                <Button onClick={handleSubmitNewOnLarge} className="col-12">
                                    Create
                                </Button>
                            </div>
                            <br />
                            <div className="mainTitle">
                                <textarea
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    className="txtarea"
                                    placeholder="Title"
                                    spellCheck="false"
                                    rows={1}
                                    value={currentTitle}>

                                </textarea>
                                <hr />
                            </div>
                            <textarea
                                onChange={(e) => setCurrentContent(e.target.value)}
                                className="col-12 txtarea"
                                placeholder="content"
                                rows={9}
                                spellCheck={false}
                                value={currentContent}>
                            </textarea>
                            <Row>
                                <div>
                                    <Button
                                        className="col-12"
                                        onClick={handleSubmitEdit}
                                    >
                                        Save
                                    </Button>
                                    <br/><br/>
                                    <Row>
                                        
                                        <Button
                                            className="col-4"
                                            variant="danger"
                                            onClick={() => { handleDelete(currentNoteId) }}
                                        >
                                            Delete
                                        </Button>
                                        <div className="col-4" />
                                        <Button
                                            className="col-4"
                                            variant="secondary"
                                            onClick={handleClear}>
                                            Clear
                                        </Button>
                                    </Row>
                                </div>

                                <br />
                                <br />

                            </Row>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }
}
export default Homepage