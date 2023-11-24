import { useEffect, useState } from "react"
import { Button, Card, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Home from "../components/Home";

function Homepage() {
    const [screenWidth, setScreenWidth] = useState(undefined)
    const [currentTitle, setCurrentTitle] = useState()
    const [currentContent, setCurrentContent] = useState()

    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    function handleShow(note) {
        setCurrentTitle(note.title)
        setCurrentContent(note.content)
        setShow(true)
    }

    const [showTwo, setShowTwo] = useState()
    const handleTwoShow = () => setShowTwo(true)
    const handleTwoClose = () => setShowTwo(false);


    useEffect(() => {
        let screWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        setScreenWidth(screWidth)
    }, [])

    function handleResize() {
        // Get the new screen width
        let newScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Log the new screen width to the console
        setScreenWidth(newScreenWidth)

        // You can do additional things with the new width here
    }

    window.addEventListener("resize", handleResize);

    let notes = [
        {
            noteId: 1,
            title: "title",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            noteId: 2,
            title: "title2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
    ]

    function handleSubmit() {
        console.log(currentContent)
        console.log(currentTitle)
    }

    function MapTroughOne() {
        if (notes) {
            return notes.map((note) => {
                return (
                    <>
                        <div className="col-6">
                            <Card
                                onClick={() => handleShow(note)}
                                className="contentCard col-12"
                            >
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Body className="pageTxtContent">{note.content}</Card.Body>
                            </Card>
                        </div>
                    </>
                )
            })
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
                                    rows={1}>
                                    {currentTitle}
                                </textarea>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <textarea
                            onChange={(e) => setCurrentContent(e.target.value)}
                            className="col-12 txtarea"
                            rows={18}
                            spellCheck={false}>
                            {currentContent}
                        </textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={"/"}>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Link>
                        <Button
                        onClick={handleSubmit}
                        >
                            Submit
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
                        {MapTroughOne()}
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Home />
                <Container>
                    <Row>
                        test2
                    </Row>
                </Container>
            </>
        )
    }
}
export default Homepage