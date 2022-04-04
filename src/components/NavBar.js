import React from "react"
import { Nav, Navbar, Container }  from 'react-bootstrap'
import { MdAccountCircle } from 'react-icons/md'
import { IconContext } from "react-icons"

class NavBar extends React.Component {
    render() {
        return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
            <Nav className="flex-grow-1"></Nav>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action3">Restaurantes</Nav.Link>
                    <Nav.Link href="#action4">Pontos turísticos</Nav.Link>
                    <Nav.Link href="#action4">Dviversão</Nav.Link>
                    <Nav.Link href="#action4">Hotéis</Nav.Link>
                    <Nav.Link href="#action4">Hospital</Nav.Link>
                    <Nav.Link href="#action4">Serviços públicos</Nav.Link>
                    {/* <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Restaurantes</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Pontos turísticos</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Dviversão</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Hotéis</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Hospital</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Serviços públicos</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                </Navbar.Collapse>
                <Nav.Link href="#action2"> 
                    <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <div>
                            <MdAccountCircle />
                        </div>
                    </IconContext.Provider>               
                </Nav.Link>
            </Container>
        </Navbar>
        )
    }
}

export default NavBar