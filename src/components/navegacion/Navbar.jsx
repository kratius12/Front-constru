import React from "react";
import { Dropdown } from "react-bootstrap";
import undraw_profile from "../../assets/img/undraw_profile.svg";

function Navbar({ handleLogout, userData }) {
    const handleLogoutClick = () => {
        handleLogout();
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <Dropdown>
                    <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {`@${userData.nombres}`}
                        </span>
                        <img
                            className="img-profile rounded-circle"
                            src={undraw_profile}
                            alt="Profile"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight>
                        <Dropdown.Item onClick={handleLogoutClick}>
                            <i className="fas fa-power-off fa-sm fa-fw mr-2 text-gray-400"></i>
                            Cerrar sesión
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        </nav>
    );
}

export default Navbar;
