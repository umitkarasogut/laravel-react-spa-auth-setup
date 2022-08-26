import React from 'react';
import { Navbar as NavigationBar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../context/useAuth';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <NavigationBar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavigationBar.Brand as={Link} to='/'>
                    Dashboard
                </NavigationBar.Brand>
                <NavigationBar.Toggle aria-controls="responsive-navbar-nav" />
                <NavigationBar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link>Example Menu</Nav.Link>
                        <Nav.Link>Example Menu</Nav.Link>
                        <Nav.Link>Example Menu</Nav.Link>
                        <Nav.Link>Example Menu</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user?.name}>
                            <NavDropdown.Item>Action</NavDropdown.Item>
                            <NavDropdown.Item>Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={async () => await logout()}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavigationBar.Collapse>
            </Container>
        </NavigationBar>
    );
}
