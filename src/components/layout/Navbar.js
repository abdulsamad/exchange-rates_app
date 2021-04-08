import React from 'react';
import { Navbar } from 'react-bootstrap';

function Nav() {
  return (
    <div>
      <Navbar bg='transparent'>
        <Navbar.Brand href='#home'>
          <h3>Exchange Rates</h3>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Nav;
