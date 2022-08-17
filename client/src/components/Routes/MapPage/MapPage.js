import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { cordinates } from "./cordinates";
import { BiDoorOpen } from "react-icons/bi"
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/tippy.css'

const MapPage = () => {

  return (

    <Wrapper>
      <Text>**As this map is from the original Emerald, some paths might differ**</Text>
      <MapWrapper>
        <Image src="https://i.imgur.com/kA00Vsy.jpeg" alt="EmeraldMap" useMap="#EmeraldMap" />
        {cordinates.map((route, index) => {
          if (route?.index) {
            return (
              <Tippy animation='perspective' key={index} content={
                <Tip>{route.route}</Tip>
              }>
                <IconNav to={`/route/${route.route}`} id={index} >

                  <Icon />
                </IconNav>
              </Tippy>

            )
          } else {
            return (
              <Tippy animation='perspective' content={
                <Tip>{route.route}</Tip>
              }>
                < Area
                  id={index}
                  to={`/route/${route.route}`}
                />
              </Tippy>

            )
          }
        })}
      </MapWrapper>

    </Wrapper >
  )
}

const Text = styled.div`
  font-family: var(--font);
  margin: 0 auto;
  width: fit-content;
  padding: 5px 0;
`

const Tip = styled.div`
  z-index: 4;
  font-family: var(--font);
`

const IconNav = styled(NavLink)`
  border-radius: 50%;
  width: fit-content;
  height: fit-content;
  top: ${p => `${cordinates[p.id].y}%`};
  left: ${p => `${cordinates[p.id].x}%`};
  position: absolute; 
  z-index: 2;
`

const Icon = styled(BiDoorOpen)`
  background-color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`

const MapWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: fit-content;

`

const Area = styled(NavLink)`
  display: block;
  position: absolute; 
  top: ${p => `${cordinates[p.id].y}%`};
  left: ${p => `${cordinates[p.id].x}%`};
  width: ${p => `${cordinates[p.id].width}%`};
  height: ${p => `${cordinates[p.id].length}%`};
  &:hover {
    outline: 2px solid white;
  }
`

const Wrapper = styled.div`
  padding: var(--page-padding);
`

const Image = styled.img`
  width: 1800px;
`

export default MapPage;