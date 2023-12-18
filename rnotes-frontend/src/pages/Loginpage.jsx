import { useContext, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function Loginpage() {
    const [loginOrSignIn, setLOS] = useState(1)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()

    const { login, createAccount } = useContext(UserContext)
    const navigate = useNavigate()

    async function handleSubmit() {
        let credentials = {
            email,
            password
        }
        let res = await login(credentials)
        navigate('/')
    }

    async function handleCreate() {
        let credentials = {
            email,
            password,
            name
        }
        let res = await createAccount(credentials)
        if (res) {
            setLOS(1)
        }
    }

    if (loginOrSignIn === 1) {
        return (
            <>
                <Container>
                    <br /><br />
                    <center>
                        <h1 className='fancyLetters'>Sign in</h1>
                    </center>
                    <Row>
                        <Row>
                            <div className='col-2' />
                            <Form.Group className='col-8'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <div className='col-2' />
                            <br /><br /><br />
                        </Row>
                        <Row>
                            <div className='col-2' />
                            <Form.Group className='col-8'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Row>
                    <br /><br /><br />
                    <center>
                        <Button onClick={handleSubmit}>Sign in</Button>
                        <br/><br/>
                        <Button 
                        variant='secondary'
                        onClick={() => setLOS(2)}>
                            Create an Account
                        </Button>    
                    </center>
            
                </Container>
            </>
        )
    } else if (loginOrSignIn === 2) {
        return (
            <>
            <Container>
                <br /><br />
                <center>
                        <h1 className='fancyLetters'>Create an Account</h1>
                    </center>
                <Row>
                <Row>
                        <div className='col-2' />
                        <Form.Group className='col-8'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <div className='col-2' />
                        <br /><br /><br />
                    </Row>
                    <Row>
                        <div className='col-2' />
                        <Form.Group className='col-8'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <div className='col-2' />
                        <br /><br /><br />
                    </Row>
                    <Row>
                        <div className='col-2' />
                        <Form.Group className='col-8'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                </Row>
                <br /><br /><br />
                <center>
                    <Button onClick={handleCreate}>Create an Account</Button>
                    <br/><br/>
                    <Button 
                    variant='secondary'
                    onClick={() => setLOS(1)}>
                        Sign in
                    </Button>    
                </center>
        
            </Container>
        </>
        )
    }
}
export default Loginpage