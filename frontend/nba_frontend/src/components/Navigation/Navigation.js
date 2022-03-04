import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons';


library.add(faBasketballBall);


function Navigation() {
return(
          <div>
            <Navbar bg="dark" variant="dark" className="navbar">
              <Navbar.Brand as ={Link} to="/" className="image">
              <FontAwesomeIcon className='link link-icon ' icon={['fas', 'basketball-ball']} />
                Basketball 
              </Navbar.Brand>
              <Nav>
              </Nav>
              <Container>
                <Nav className="nav-bar right">
                  <Nav.Link as ={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as ={Link} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as = {Link} to="/standings/">
                            Standings
                  </Nav.Link>
                </Nav> 
              </Container>
            </Navbar>
          </div>
)
}
    
    export default Navigation;