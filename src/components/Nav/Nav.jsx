import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { signOut } from '../../Auth/user-services'
import { AppContext } from '../App/App'

const NavContainer = styled.nav`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`

const MenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }
`

const Drawer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 200px;
  background-color: #333;
  padding: 2rem;
  transform: ${({ $isopen }) => ($isopen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  color: #fff;
  z-index: 1000;
`

const DrawerItem = styled.li`
  padding: 1rem 0;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`

const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: white;
    top: 50%;
    left: 0;
    transform-origin: center;
    transition: 0.3s;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`

export function Nav() {
  const { userContext, messageContext} = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  function handleSignOut() {
    signOut()
    userContext.setUser(null)
  }

  return (
    <NavContainer className='header'>
      <h1>Client Browser Game</h1>
      <MenuIcon onClick={toggleDrawer}>
        <div></div>
        <div></div>
        <div></div>
      </MenuIcon>
      <Drawer $isopen={isOpen}>
        <CloseIcon onClick={toggleDrawer} />
        {userContext.user ? (
          <>
            <DrawerItem onClick={() => handleSignOut()}>Sign Out</DrawerItem>
            <DrawerItem>
              <Link to={'/games'}>Games</Link>
            </DrawerItem>
          </>
        ) : (<>
          <DrawerItem>
            <Link to={'/signup'}>Sign Up</Link>
          </DrawerItem>
          <DrawerItem>
            <Link to={'/signin'}>Sign In</Link>
          </DrawerItem>
        </>)}
      </Drawer>
    </NavContainer>
  )
}
