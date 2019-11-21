import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
} from 'reactstrap';
import { MenuConsumer } from '../context/Menu';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      mobileOpen: false,
    };
  }

  render() {
    const { mobileOpen } = this.state;
    const { title, items } = this.props;

    return (
      <MenuConsumer>
        {context => (
          <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">
              {title}
            </NavbarBrand>
            <NavbarToggler onClick={() => this.setState({ mobileOpen: !mobileOpen })} />
            <Collapse isOpen={mobileOpen} navbar>
              <Nav className="ml-auto" navbar>
                {!mobileOpen ? null : (
                  <React.Fragment>
                    {context.mobileMenu.map(({ title: itemTitle, path }) => (
                      <NavItem key={itemTitle}>
                        <NavLink tag={Link} to={path}>{itemTitle}</NavLink>
                      </NavItem>
                    ))}
                    <DropdownItem divider />
                  </React.Fragment>
                )}
                {items.map(({ title: itemTitle, path }) => (
                  <NavItem key={itemTitle}>
                    <NavLink tag={Link} to={path}>{itemTitle}</NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </MenuConsumer>
    );
  }
}

Toolbar.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.stringisRequired,
    }).isRequired,
  ).isRequired,
};

Toolbar.defaultProps = {
  title: 'Challenge Accepted',
};

export default Toolbar;
