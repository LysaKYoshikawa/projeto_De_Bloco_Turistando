import React from "react"
import { Nav, Navbar, Container, Button }  from 'react-bootstrap'
import { MdAccountCircle } from 'react-icons/md'
import { IconContext } from "react-icons"
import { Link } from "react-router-dom"

class NavBar extends React.Component {
    render() {
        return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
            <Nav className="flex-grow-1"></Nav>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Restaurantes</Nav.Link>
                    <Nav.Link href="#action2">Pontos turísticos</Nav.Link>
                    <Nav.Link href="#action3">Dviversão</Nav.Link>
                    <Nav.Link href="#action4">Hotéis</Nav.Link>
                    <Nav.Link href="#action5">Hospital</Nav.Link>
                    <Link to="/rating">
                        <Button variant="primary">
                            Avalie-nos
                        </Button>
                    </Link>
                </Nav>
                </Navbar.Collapse>
                <Nav.Link href="#action7"> 
                    <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <div>
                            <MdAccountCircle />
                        </div>
                    </IconContext.Provider>               
                </Nav.Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
            </Container>
        </Navbar>
        )
    }
}

export default NavBar