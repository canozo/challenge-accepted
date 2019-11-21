import React from 'react';
import PropTypes from 'prop-types';

const MenuContext = React.createContext();
const MenuConsumer = MenuContext.Consumer;

class MenuProvider extends React.Component {
  constructor(props) {
    super(props);

    this.sideChange = this.sideChange.bind(this);
    this.breadChange = this.breadChange.bind(this);
    this.mobileChange = this.mobileChange.bind(this);

    this.state = {
      sideActive: null,
      breadActive: null,
      mobileMenu: [],
    };
  }

  sideChange(value) {
    this.setState({ sideActive: value });
  }

  breadChange(value) {
    this.setState({ breadActive: value });
  }

  mobileChange(mobileMenu) {
    this.setState({ mobileMenu });
  }

  render() {
    const { sideActive, breadActive, mobileMenu } = this.state;
    const { children } = this.props;

    const value = {
      sideActive,
      breadActive,
      mobileMenu,
      sideChange: this.sideChange,
      breadChange: this.breadChange,
      mobileChange: this.mobileChange,
    };

    return (
      <MenuContext.Provider value={value}>
        {children}
      </MenuContext.Provider>
    );
  }
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MenuContext, MenuConsumer, MenuProvider };
