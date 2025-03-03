import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import proImg from '../assets/images/user-1.jpg'
import { useNavigate } from 'react-router';

const Header = ({
  setShowSideBar,
  showSideBar,
}) => {
  const { logout, user, isLoading } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const sidebarToggler = () => {
    setShowSideBar(true);
    const mainWrapper = document.querySelector(".sidebar--container");
    mainWrapper.classList.remove("collapse--sidebar"); 
    mainWrapper.classList.add("expand--sidebar"); 
  };

  const handdleLogout = () => {
    logout();
    navigate('/auth/login');
  }
  return (
    <nav className="navbar navbar-light bg-tranparent w-100 p-2 "> 
          {showSideBar == false?  <a
            onClick={sidebarToggler}
            className="nav-link sidebartoggler nav-icon-hover flex-grow-1"
          >
            <i className="ti ti-menu-2 fs-7"></i>
          </a>: <div className='flex-grow-1'></div>}
        <Dropdown align="end" className="me-auto align-self-end">
        
          <Dropdown.Toggle variant="light" className="d-flex align-items-center border-0 shadow-md">
            <Image
              src={proImg}
              alt="Profile"
              roundedCircle
              width={32}
              height={32}
              className="me-2"
            />
            {user && user.firstName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item ><button onClick={handdleLogout} className='btn btn-outline-warning'> Logout</button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      
    </nav>
  );
};

export default Header;
