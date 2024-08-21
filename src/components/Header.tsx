import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { logOut } from '~/actions';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';

import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import AddRecipes from './DashboardComponents/AddRecipes';
import { BsPersonCircle } from 'react-icons/bs';

const HeaderWrapper = styled.header`
  background-color: #113740;
  height: ${headerHeight}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;
  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const NavLinkContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled(RouterNavLink)`
  color: #fff;
  text-decoration: none;
  margin-left: 16px;
  font-size: 14px;
  ${responsive({ lg: { fontSize: '14px' } })};
  &.active {
    font-weight: bold;
    color: ${appColor};
  }
    &:hover{
    color: ${appColor};
    }
`;
const AddRecipeLink = styled.button`
  color: #fff;
  background: none;
  border: none;
  margin-left: 16px;
  font-size: 14px;
  ${responsive({ lg: { fontSize: '14px' } })};
  &:hover {
    color: ${appColor};
  }
  &:focus {
    outline: none;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: #333;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  top: 100%;
  right: 0;
`;

const DropdownItem = styled.div`
  color: #fff;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #575757;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, role, userId } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  const handleClickLogin = () => {
    navigate('/Login');
  }

  const icon = {
    verticalAlign: 'middle',
    lineHeight: '1px',
    fontSize: '40px',
    color: '#9e9ea4',
};

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        {/* changes */}
        <NavLinkContainer>

          <NavLinkItem to="/">Home</NavLinkItem>

          {isAuthenticated && role === 1 && (<NavLinkItem to="/dashboard">Dashboard</NavLinkItem>)}

          {isAuthenticated && role === 2 && (
            <>
              <AddRecipeLink onClick={handleShow}>
                Add Recipe
              </AddRecipeLink>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddRecipes closeModal={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
          
          {isAuthenticated && role === 2 && (<NavLinkItem to={`/my-post/${userId}`}>My Post</NavLinkItem>)}

          <NavLinkItem to="/about">
            About
          </NavLinkItem>

        </NavLinkContainer>

        {/* changes */}
        <DropdownWrapper>
          <button onClick={toggleDropdown} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
            <BsPersonCircle style={{...icon}} />
          </button>
          <DropdownContent show={showDropdown}>
            {!isAuthenticated ? (
              <DropdownItem onClick={handleClickLogin}>
                Login
                <Icon ml="xs" name="sign-in" />
              </DropdownItem>
            ) : (
              <>
                <DropdownItem onClick={handleClickLogout}>
                  Logout
                  <Icon ml="xs" name="sign-out" />
                </DropdownItem>
              </>
            )}
          </DropdownContent>
        </DropdownWrapper>
      </Container>
    </HeaderWrapper>
  );
}
