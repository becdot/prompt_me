import React from 'react';
import Link from 'next/link';
import Accordion from './accordion';

import './header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { dropdownOpen: false };
  }

  render() {
    const { dropdownOpen } = this.state;
    return (
      <div className="header">
        <div className="icon" onClick={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
          <img src="/static/outline-account_circle.svg" alt="account circle" />
        </div>
        <Accordion
          className="account-dropdown="
          open={dropdownOpen}
        >
          <Link href="/compose">Write Story</Link>
          <Link href="/account">Account Settings</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/logout">Logout</Link>
        </Accordion>
        <h1>prompt me</h1>
        <h5>a writing prompt generator</h5>
      </div>
    );
  }
}

export default Header;
