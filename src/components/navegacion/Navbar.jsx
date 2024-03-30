import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import undraw_profile from "../../assets/img/undraw_profile.svg";

function Navbar({ handleLogout, userData }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
    }

    useEffect(() => {
        // Inicializar los menús desplegables de Bootstrap
        $('.dropdown-toggle').dropdown();
    }, []);

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`@${userData.nombres}`}</span>
                        <img className="img-profile rounded-circle"
                            src={undraw_profile} alt="User profile" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">               
                        <a className="dropdown-item" href="#" onClick={handleLogoutClick}>
                            <i className="fas fa-power-off fa-sm fa-fw mr-2 text-gray-400"></i>
                            Cerrar sesión
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
