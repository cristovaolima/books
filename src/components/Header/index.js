import React from 'react';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header() {
    return (
      <div>
        <Navbar color="primary" expand="md" dark>
          <NavbarBrand href="/">Book Search</NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/favorites">Favorites</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
}