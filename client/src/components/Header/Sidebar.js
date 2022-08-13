import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../Context/GuideContext";


const Sidebar = () => {
  const { state, actions: { handleRoutesLoad } } = useContext(GuideContext)
  const [drop, setDrop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    fetch("/api/all-routes")
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.status === 200) {
          handleRoutesLoad(data.data);
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])

  const handleDropdown = (e) => {
    e.preventDefault();
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

  return (
    <Wrapper>
      <HamburgerWrapper onClick={handleSidebarOpen}>
        <Line className={sidebarOpen ? "a" : ""} />
        <Line className={sidebarOpen ? "b" : ""} />
        <Line className={sidebarOpen ? "c" : ""} />
      </HamburgerWrapper>
      <NavBar className={sidebarOpen ? "slide" : ""}>
        <Nav to="/" onClick={handleNavClick}>Home</Nav>
        <Nav to="/map" onClick={handleNavClick}>Map</Nav>
        <RoutesWrapper>
          <Nav to="/routes" onClick={handleNavClick}>Routes</Nav>
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
              </RouteItem>
            )
          })}
        </RoutesDrop>
        <Nav to="/download">Downlaod</Nav>
      </NavBar>
    </Wrapper >
  )
}

const Wrapper = styled.div`
  font-family: var(--font);
  font-size: 20px;
`

const HamburgerWrapper = styled.div`
  position: absolute;
  height: 60px;
  width: 60px;
  top: 2%;
  left: 2%;
  z-index: 1000;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  background: rgba(255,255,255,0.2);
  
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
  top: calc(2% + 60px);
  margin-left: 3%;
  width: calc(var(--sidebar-width) - 20px);
  transition: all 0.5s ease;

  overflow: hidden;
  background-color: grey;
  &.slide {
    max-height: 800px;
  }
`

const Nav = styled(NavLink)`
  padding: 8px 4px;
  font-size: 20px;
  font-family: var(--font);
  text-align: start;
`

const RoutesWrapper = styled.div`
  display: flex;
`

const RoutesDropButton = styled.button`
  outline: none;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
`

const Arrow = styled.span`
  display: inline-block;
	width: 20px;
	height: 20px;
	padding-left: 5px;
  &:before, &:after {
		position: absolute;
		top: 50%;
		right: calc(50% - 4px);
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
				translate(3px, -1px);
		}
		&:after {
			transform: 
				rotate(-45deg) 
				translate(-5px,-3px);
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
 
`

const RouteNav = styled(Nav)`
  padding: 2px ;
  font-size: 16px; 
`

export default Sidebar;