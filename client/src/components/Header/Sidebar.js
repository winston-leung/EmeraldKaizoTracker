import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../Context/GuideContext";
import { FaCheck } from "react-icons/fa";
import { smallbutton } from "../helpers/buttoncss";

const Sidebar = () => {
  const { state } = useContext(GuideContext)
  const [drop, setDrop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setDrop(!drop);
  }

  const handleSidebarOpen = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  }

  const handleNavClick = () => {
    setDrop(false);
    setSidebarOpen(false);
  }

  const handleOutsideClick = (e) => {
    e.preventDefault();
    setDrop(false);
    setSidebarOpen(false);
  }

  return (
    <Wrapper>
      <OutsideWrapper onClick={handleOutsideClick} className={sidebarOpen ? "" : "hidden"} />
      <HamburgerWrapper onClick={handleSidebarOpen}>
        <Line className={sidebarOpen ? "a" : ""} />
        <Line className={sidebarOpen ? "b" : ""} />
        <Line className={sidebarOpen ? "c" : ""} />
      </HamburgerWrapper>
      <NavBar className={sidebarOpen ? "slide" : ""} onClick={handleNavClick}>
        <Nav to="/" className="top">Home</Nav>
        <Nav to="/map" onClick={handleNavClick} className="big">Map</Nav>
        <RoutesWrapper>
          <Nav to="/routes" onClick={handleNavClick} className="big">Routes</Nav>
          <RoutesDropButton onClick={handleDropdown}>
            <Arrow className={drop ? "active" : ""} />
          </RoutesDropButton>
        </RoutesWrapper>
        <RoutesDrop className={drop ? "active" : ""}>
          {state.routes.map((route) => {
            if (route.includes(" ")) {
              route.replace(" ", "%20")
            }
            return (
              <RouteItem key={route}>
                <RouteNav to={`/route/${route}`} onClick={handleNavClick}>{route}</RouteNav>
                {state.user.progression[route]?.pokemon && (
                  <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
                )}
                {state.user.progression[route]?.isChecked && <Check />}
              </RouteItem>
            )
          })}
        </RoutesDrop>
        <Nav to="/download" className="big">Download</Nav>
        <Nav to="/faq" className="big">FAQ</Nav>
        <Nav to="/nuzlocke" className="bottom">Nuzlocke</Nav>

      </NavBar>
    </Wrapper >
  )
}

const OutsideWrapper = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100%;
  top: 0;
  right: 0;
  background-color: rgb(128,128,128,0.7);
  transition: all 0.5s ease;
  z-index: 10;
  &.hidden {
    min-height: 0;
  }
`

const Check = styled(FaCheck)`
  padding: 0 8px;
`

const Image = styled.img`
  width: 30px;
  height: 30px;
`

const Wrapper = styled.div`
  font-family: var(--font);
  font-size: 16px;
  background-color: white;
`

const HamburgerWrapper = styled.div`
  position: absolute;
  height: 60px;
  width: 60px;
  top: 2%;
  left: 2%;
  z-index: 100;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  background-color: rgb(192, 192, 192, 0.2);
  &:hover {
    background-color: rgb(192, 192, 192, 0.7);
  }
  &:after {
		border-radius: 50%;
		position: absolute;
		top: -2px;
		right: -2px;
		bottom: -2px;
		left: -2px;
		content: "";
    box-shadow: inset -2px -2px 3px #696969;
	}
  &:hover:after {
    box-shadow: inset -4px -4px 3px #696969;
  }
  
  &:active:after{
    box-shadow: inset 4px 4px 3px #696969;
  }
`

const Line = styled.div`
    position: absolute;
    left: 25%;
    top: 50%;
    width: 32px;
    height: 3px;
    background-color: black;
    transition: all 0.4s cubic-bezier(.84,.06,.52,1.8);
    &:first-of-type {
    transform: translateY(-8px);
    }
    &:last-of-type {
    transform: translateY(8px);
    }
    &.a {
      transform: rotate(40deg);
    }
    &.b {
      opacity: 0;
    }
    &.c {
      transform: rotate(-40deg);
    }
`

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 0;
  position: absolute;
  top: 2%;
  margin-left: 7%;
  min-width: calc(var(--sidebar-width) - 20px);
  transition: all 0.5s ease;
  z-index: 1000;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
  
  &.slide {
    max-height: 1000px;
    padding: 2px;
    border: 2px solid black;
  }
`

const Nav = styled(NavLink)`
  ${smallbutton};
  text-decoration: none;
  color: black;
  padding: 8px 4px;
  margin: 1px 8px;
  font-size: 16px;
  font-family: var(--font);
  text-align: start;
  &.top {
    margin-top: 8px;
  }
  &.bottom {
    margin-bottom: 8px;
  }
  &.big {
    margin: 5px 8px;
  }
`

const RoutesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RoutesDropButton = styled.button`
  ${smallbutton}
  border: none;
  padding: 8px 8px;
`

const Arrow = styled.span`
  display: inline-block;
	width: 20px;
	height: 20px;
	padding-left: 5px;
  &:before, &:after {
		position: absolute;
		top: 50%;
		right: calc(50% - 7px);
		width: 15px;
		height: 3px;
		background: black;
		content: "";
		transition: all .2s ease;
	}
	&:before {
		transform: 
			rotate(45deg)
			translate(-2px,2px);
	}
	&:after {
		transform: 
			rotate(-45deg)
			translate(4px,4px);
	}
  &.active {
    &:before {
			transform: 
				rotate(45deg) 
				translate(2px, -2px);
		}
		&:after {
			transform: 
				rotate(-45deg) 
				translate(-4px,-4px);
		}
  }
`

const RoutesDrop = styled.ul`
  transition: all 0.5s ease-in-out;
  overflow: auto;
  height: 0;
  &.active {
    padding: 8px 0;
    height: 600px;
  }
`

const RouteItem = styled.li`
  list-style-type: none;
  padding: 4px 2px;
  display: flex;
  align-items: center;
`

const RouteNav = styled(Nav)`
  padding: 2px 8px;
  font-size: 14px; 
`

export default Sidebar;