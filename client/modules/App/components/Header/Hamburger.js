import React, { Component } from 'react';
import styles from './Header.css';
import { Link } from 'react-router';
import Hamburgerimg from './images/hamburger.png';
import HamburgerBlueimg from './images/hamburgerblue.png';
class Card extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }
  render() {
    return (
      <div>
        <div className={styles.menuimg}>
        {
          !this.state.showMenu ?
            <img onClick={this.showMenu} src={Hamburgerimg} alt="Menu Tobcity" /> :
            <img onClick={this.showMenu} src={HamburgerBlueimg} alt="Menu Tobcity" />
        }
        </div>
        {
          this.state.showMenu
            ? (
            <div
              className={styles.menu}
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <Link to="/"> <span className={styles.home}>INICIO</span></Link>
              <Link to="/policies"> <span className={styles.terminos}>TERMINOS Y CONDICIONES</span> </Link>
              {(this.props.Logged) ? <Link to="/profile"> <span className={styles.profile}>MI PERFIL</span></Link> : null}
            </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
export default Card;
